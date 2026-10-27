"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import HouseCard from "./HouseCard";
import SettingsPanel, { type RateInfo } from "./SettingsPanel";
import Tour from "./Tour";
import { AppCtx, buildCtx } from "./AppContext";
import { buildSteps, DEFAULT_SCENE, type Scene, type SortKey } from "./tourSteps";
import type { MapCmd, MapCmdBody } from "./MapView";
import { HOME, findPlace, houses, matchFilters, places, tabOf, type Filters, type House, type Tab } from "@/data/houses";
import { DEFAULT_SETTINGS, RATES, RATE_AT, type Settings } from "@/data/format";
import { poisFor } from "@/data/poi";

// Leaflet은 window가 필요하므로 클라이언트에서만 로드
const MapView = dynamic(() => import("./MapView"), { ssr: false });

const STORE = "goodroom-settings";
const readSaved = (): Settings => {
  try {
    const s = JSON.parse(localStorage.getItem(STORE) || "null");
    if (s?.lang && s?.cur && s?.unit) return s;
  } catch {}
  return DEFAULT_SETTINGS;
};

// 시연용 모의 현재 위치 (서강대 근처)
const MY_LOC: [number, number] = [37.5503, 126.9419];

type Props = { onEnd?: () => void };

// 지도 중심에서 가장 가까운 동 이름 (목록 제목용)
const nearestDong = (ll: [number, number]) =>
  places
    .filter((p) => p.key.endsWith("동"))
    .map((p) => ({ k: p.key, d: (p.ll[0] - ll[0]) ** 2 + (p.ll[1] - ll[1]) ** 2 }))
    .sort((a, b) => a.d - b.d)[0].k;

export default function RoomApp({ onEnd }: Props) {
  // ── 설정 (UC-02) ──
  const [saved, setSaved] = useState<Settings>(readSaved);
  const [draft, setDraft] = useState<Settings>(saved);
  const [panelOpen, setPanelOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [rateFail, setRateFail] = useState(false);
  const [rateHold, setRateHold] = useState(false);
  const [cache, setCache] = useState<Scene["cache"]>({});
  const [rate, setRate] = useState<RateInfo>({ status: "ok", v: 1 });

  // ── 검색·지도 (UC-01) ──
  const [filters, setFilters] = useState<Filters>({});
  const [search, setSearch] = useState("");
  const [committed, setCommitted] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);
  const [tab, setTab] = useState<Tab>("room");
  const [sort, setSort] = useState<SortKey>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [mapState, setMapState] = useState<"ok" | "loading" | "fail">("loading");
  const [mapHold, setMapHold] = useState(false);
  const [mapFailSim, setMapFailSim] = useState(false);
  const [vis, setVis] = useState<{ ids: number[]; sum: number } | null>(null);
  const [cmd, setCmd] = useState<MapCmd | null>(null);
  const view = useRef(HOME);
  const listRef = useRef<HTMLDivElement>(null);

  const [myLoc, setMyLoc] = useState<[number, number] | null>(null);
  const [locDenied, setLocDenied] = useState(false);
  const [poiClosed, setPoiClosed] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const tourRef = useRef(false);
  tourRef.current = tourOpen;

  const eff = panelOpen ? draft : saved;
  const ctx = useMemo(
    () => buildCtx(eff.lang, eff.cur, eff.unit, rate.status === "ok" || rate.status === "stale" ? rate.v ?? null : null),
    [eff, rate],
  );
  const t = ctx.t;

  // 환율 조회 (환율 서비스). 실패하면 마지막으로 저장된 환율, 그것도 없으면 원화만 표시 (7A)
  useEffect(() => {
    if (eff.cur === "KRW") return setRate({ status: "ok", v: 1 });
    setRate({ status: "loading" });
    if (rateHold) return;
    const id = setTimeout(() => {
      if (rateFail) {
        const c = cache[eff.cur as "USD" | "CNY"];
        setRate(c ? { status: "stale", v: c.v, at: c.at } : { status: "none" });
      } else {
        const v = RATES[eff.cur as "USD" | "CNY"];
        setCache((o) => ({ ...o, [eff.cur]: { v, at: RATE_AT } }));
        setRate({ status: "ok", v, at: RATE_AT });
      }
    }, 500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eff.cur, rateFail, rateHold]);

  // 지도 로딩 (지도 API 요청 → 제공 / 실패)
  useEffect(() => {
    if (mapState !== "loading" || mapHold) return;
    const id = setTimeout(() => setMapState(mapFailSim ? "fail" : "ok"), 800);
    return () => clearTimeout(id);
  }, [mapState, mapHold, mapFailSim]);

  useEffect(() => {
    if (mapState !== "ok") setVis(null);
  }, [mapState]);

  useEffect(() => {
    if (!toast || tourOpen) return;
    const id = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(id);
  }, [toast, tourOpen]);

  const sendCmd = useCallback((c: MapCmdBody) => {
    if (c.t === "view") view.current = { ll: c.ll, z: c.z };
    setCmd((o) => ({ ...c, n: (o?.n ?? 0) + 1 }) as MapCmd);
  }, []);

  // ── 설정 흐름 ──
  const toggleSettings = () => {
    if (panelOpen) return cancelSettings();
    setDraft(saved);
    setPanelOpen(true);
  };
  const applySettings = () => {
    setSaved(draft);
    try { localStorage.setItem(STORE, JSON.stringify(draft)); } catch {}
    setPanelOpen(false);
    setToast(loggedIn ? "toast.account" : "toast.applied");
  };
  function cancelSettings() {
    setDraft(saved);
    setPanelOpen(false);
    setToast("toast.cancel");
  }

  // ── 검색·선택 흐름 ──
  const runSearch = (q: string) => {
    setCommitted(q.trim());
    const p = findPlace(q);
    if (p) sendCmd({ t: "view", ll: p.ll, z: p.z });
  };
  const searchMiss = committed !== "" && !findPlace(committed);

  const filtered = useMemo(() => (searchMiss ? [] : houses.filter((h) => tabOf(h) === tab && matchFilters(h, filters))), [filters, searchMiss, tab]);
  // 선택한 매물은 지도가 이동해도 목록 맨 위(1번)에 고정
  const list = useMemo(() => {
    const inView0 = mapState === "ok" && vis ? filtered.filter((h) => vis.ids.includes(h.id)) : filtered;
    const key = { default: (h: House) => h.id, dep: (h: House) => h.deposit, rent: (h: House) => (h.deal === "월세" ? h.rent : Infinity), area: (h: House) => -h.area }[sort];
    const inView = [...inView0].sort((a, b) => key(a) - key(b) || a.id - b.id);
    const sel = inView.find((h) => h.id === selected);
    return sel ? [sel, ...inView.filter((h) => h !== sel)] : inView;
  }, [filtered, vis, mapState, selected, sort]);

  const onVisible = useCallback((ids: number[], sum: number) => {
    setVis((o) => (o && o.sum === sum && o.ids.join() === ids.join() ? o : { ids, sum }));
  }, []);

  const selectHouse = useCallback((id: number, focus: boolean) => {
    setSelected(id);
    if (focus) sendCmd({ t: "focus", id });
  }, [sendCmd]);

  // 선택한 매물 주변 편의시설 (편의점·마트·빨래방)
  const selHouse = selected === null ? undefined : houses.find((h) => h.id === selected);
  const nearby = useMemo(() => (selHouse && mapState === "ok" ? poisFor(selHouse) : []), [selHouse, mapState]);
  const poiMarkers = useMemo(
    () => (poiClosed ? [] : nearby.map((p) => ({ kind: p.kind, label: ctx.t(`poi.short.${p.kind}`), name: p.name[ctx.lang], ll: p.ll }))),
    [nearby, poiClosed, ctx.t, ctx.lang],
  );
  useEffect(() => setPoiClosed(false), [selected]);

  // 선택한 매물이 맨 위에 보이도록 목록을 처음으로 스크롤
  useEffect(() => {
    if (selected === null) return;
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [selected]);

  // 내 위치 버튼: 현재 위치를 지도에 표시하고 그 위치로 이동. 권한이 없으면 안내
  const showMyLoc = () => {
    if (locDenied) return setToast("toast.locdenied");
    setSelected(null); // 매물 강조는 풀고 내 위치(사람 아이콘)만 보여줌
    setMyLoc(MY_LOC);
    sendCmd({ t: "view", ll: MY_LOC, z: 16 });
  };

  const resetAll = () => {
    setFilters({});
    setSearch("");
    setCommitted("");
  };

  // ── 코치마크용 장면 전환 ──
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const api = useMemo(
    () => ({
      scene: (s: Partial<Scene>) => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        const sc = { ...DEFAULT_SCENE, ...s };
        setPanelOpen(sc.panelOpen);
        setSaved(sc.saved);
        setDraft(sc.draft);
        setRateFail(sc.rateFail);
        setRateHold(sc.rateHold);
        setCache(sc.cache);
        setLoggedIn(sc.loggedIn);
        setMapFailSim(sc.mapState === "fail");
        setMapState(sc.mapState);
        setMapHold(sc.mapHold);
        setSearch(sc.search);
        setCommitted(sc.committed);
        setFilters(sc.filters);
        setSelected(sc.selected);
        setToast(sc.toast);
        setTab(sc.tab);
        setSort(sc.sort);
        setMyLoc(sc.myLoc ? MY_LOC : null);
        setLocDenied(sc.locDenied);
        if (sc.cmd) sendCmd(sc.cmd);
      },
      later: (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)); },
      select: (id: number, focus: boolean) => selectHouse(id, focus),
      cmd: sendCmd,
    }),
    [sendCmd, selectHouse],
  );
  const steps = useMemo(() => buildSteps(api), [api]);

  // 서비스 시작 전에 시연 여부를 묻고, 시작을 선택하면 바로 코치마크 시작
  const [ask, setAsk] = useState(true);
  const startTour = () => {
    setAsk(false);
    setTourOpen(true);
  };
  useEffect(() => {
    if (!ask) return;
    const onKey = (e: KeyboardEvent) => {
      if (!["Enter", " ", "Escape"].includes(e.key)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (e.key === "Escape") setAsk(false);
      else startTour();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [ask]);

  return (
    <AppCtx.Provider value={ctx}>
      <div className="app">
        <Header
          tab={tab}
          onTab={(v) => { setTab(v); setSelected(null); setFilters({}); }}
          onEnd={onEnd}
          saved={saved}
          settingsOpen={panelOpen}
          onToggleSettings={toggleSettings}
          loggedIn={loggedIn}
          onToggleLogin={() => setLoggedIn(!loggedIn)}
          mapFail={mapFailSim}
          rateFail={rateFail}
          locDenied={locDenied}
          onLocDenied={setLocDenied}
          onMapFail={(v) => { setMapFailSim(v); setMapState(v ? "fail" : "loading"); }}
          onRateFail={setRateFail}
          onTour={() => setTourOpen(true)}
        />
        {panelOpen && (
          <SettingsPanel draft={draft} saved={saved} rate={rate} onChange={setDraft} onApply={applySettings} onCancel={cancelSettings} />
        )}
        <FilterBar tab={tab} filters={filters} setFilters={setFilters} search={search} setSearch={setSearch} onSearch={runSearch} />

        <div className="main">
          <div className={`panel-wrap${hidden ? " hidden" : ""}`}>
            <div className="list-container" data-tour="list">
              <div className="list-head">
                <div className="count" data-tour="count">
                  {t("list.count", { n: list.length })}
                </div>
                <div className="sort-wrap">
                  <button className="order" data-tour="sort-btn" onClick={() => setSortOpen(!sortOpen)}>⇅ {t(`sort.${sort}`)}</button>
                  {sortOpen && (
                    <div className="sort-menu" onMouseLeave={() => setSortOpen(false)}>
                      {(["default", "dep", "rent", "area"] as SortKey[]).map((k) => (
                        <button key={k} className={sort === k ? "on" : ""} onClick={() => { setSort(k); setSortOpen(false); }}>{t(`sort.${k}`)}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="list" ref={listRef}>
                {list.length === 0 ? (
                  <div className="empty">
                    <b>{t("empty.title")}</b>
                    <p>{t("empty.tip")}</p>
                    <div>
                      <button onClick={resetAll}>{t("empty.reset")}</button>
                      {mapState === "ok" && <button onClick={() => sendCmd({ t: "zoom", d: -1 })}>{t("empty.zoomout")}</button>}
                    </div>
                  </div>
                ) : (
                  <div className="sec">
                    <div className="sec-title">{t(tab === "shop" ? "sec.nearby.shop" : "sec.nearby", { place: ctx.place(nearestDong(view.current.ll)) })}</div>
                    <div className="grid">
                    {list.map((h, n) => (
                      <HouseCard
                        key={h.id}
                        h={h}
                        first={n === 0}
                        selected={selected === h.id}
                        onSelect={() => selectHouse(h.id, true)}
                        onDetail={() => setToast("toast.detail")}
                      />
                    ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="ctl-btn" aria-label="목록 접기/펴기" onClick={() => setHidden(!hidden)} style={{ left: hidden ? 0 : 560 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#323234" strokeWidth="2.4" style={{ transform: hidden ? "rotate(180deg)" : undefined }}>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>

          <section className="mapwrap" data-tour="map">
            {mapState === "ok" && (
              <>
                <MapView
                  houses={filtered}
                  selectedId={selected}
                  onSelect={(id) => selectHouse(id, false)}
                  onVisible={onVisible}
                  onView={(ll, z) => { view.current = { ll, z }; }}
                  me={myLoc ?? undefined}
                  pois={poiMarkers}
                  pinLabel={tab === "apt" ? ctx.pin : undefined}
                  pinKey={`${tab}|${ctx.lang}|${ctx.cur}|${ctx.rate}`}
                  cmd={cmd}
                  initial={view.current}
                  invalidateKey={hidden}
                />
                <div className="map-menu">
                  <div className="box gps" data-tour="gps">
                    <button aria-label={t("map.gps")} onClick={showMyLoc}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="6.5" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                        <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" />
                      </svg>
                      <span>{t("map.gps")}</span>
                    </button>
                  </div>
                  <div className="box">
                    <button aria-label="+" onClick={() => sendCmd({ t: "zoom", d: 1 })}><svg width="24" height="24" viewBox="0 0 24 24" fill="#535c68"><path d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7z" /></svg></button>
                    <button aria-label="-" onClick={() => sendCmd({ t: "zoom", d: -1 })}><svg width="24" height="24" viewBox="0 0 24 24" fill="#535c68"><rect x="3" y="11" width="18" height="2" rx="1" /></svg></button>
                  </div>
                </div>
                <div className="coord">{myLoc ? `${t("loc.me")} · ` : ""}{ctx.address(nearestDong(view.current.ll))}</div>
                {selHouse && nearby.length > 0 && !poiClosed && (
                  <div className="poi-card" data-tour="poi-card">
                    <div className="poi-head">
                      <b>{t("poi.title")}</b>
                      <button aria-label="close" onClick={() => setPoiClosed(true)}>✕</button>
                    </div>
                    {nearby.map((p) => (
                      <div className="poi-row" key={p.kind}>
                        <span className={`poi ${p.kind}`}>{t(`poi.short.${p.kind}`)}</span>
                        <div>
                          <div className="nm">{p.name[ctx.lang]}</div>
                          <div className="sub">{t(`poi.${p.kind}`)} · {t("poi.walk", { m: p.dist, min: p.walk })}</div>
                        </div>
                      </div>
                    ))}
                    <div className="poi-src">© OpenStreetMap contributors</div>
                  </div>
                )}
              </>
            )}
            {mapState === "loading" && <div className="map-state"><i className="spin" />{t("map.loading")}</div>}
            {mapState === "fail" && (
              <div className="map-state error" data-tour="map-error">
                <b>{t("map.err.title")}</b>
                <p>{t("map.err.desc")}</p>
                <button onClick={() => setMapState("loading")}>{t("map.retry")}</button>
              </div>
            )}
          </section>
        </div>

        {toast && <div className="toast" data-tour="toast">{t(toast)}</div>}
        {tourOpen && <Tour steps={steps} onClose={() => setTourOpen(false)} />}
        {ask && (
          <div className="ask">
            <div className="ask-card" role="dialog" aria-label="시연 시작">
              <h3>시연을 시작하겠습니까?</h3>
              <p>UC-02(언어·통화·단위 설정)에서 UC-01(지도 검색)까지 안내합니다.</p>
              <div>
                <button onClick={() => setAsk(false)}>아니오</button>
                <button className="primary" onClick={startTour}>시작</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppCtx.Provider>
  );
}
