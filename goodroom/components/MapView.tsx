"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { House } from "@/data/houses";

export type MapCmd = { n: number } & (
  | { t: "view"; ll: [number, number]; z: number }
  | { t: "focus"; id: number } // 목록에서 선택: 마커가 보이도록 이동·확대
  | { t: "cluster"; ll?: [number, number]; z?: number } // 가장 큰 클러스터 펼치기
  | { t: "markerClick" } // 지도의 개별 마커 직접 선택
  | { t: "zoom"; d: 1 | -1 }
  | { t: "gps" }
);

export type MapCmdBody = MapCmd extends infer U ? (U extends { n: number } ? Omit<U, "n"> : never) : never;

type Props = {
  houses: House[]; // 필터·검색이 적용된 매물 (마커·클러스터·목록이 모두 이 데이터에서 계산됨)
  selectedId: number | null;
  onSelect: (id: number) => void;
  onVisible: (ids: number[], clusterSum: number) => void;
  onView: (ll: [number, number], z: number) => void;
  me?: [number, number]; // 내 위치 (모의)
  pois?: { kind: string; label: string; name: string; ll: [number, number] }[]; // 선택한 매물 주변 편의시설
  pinLabel?: (h: House) => string; // 있으면 개별 마커를 가격표로 표시 (아파트 탭)
  pinKey?: string;
  cmd: MapCmd | null;
  initial: { ll: [number, number]; z: number };
  invalidateKey: unknown;
};

const CELL = 64; // 클러스터 셀 크기(px)
const MAX_Z = 18;

// 같은 줌에서 같은 셀에 들어오는 매물을 하나의 그룹으로 묶음
const group = (map: L.Map, hs: House[], z: number) => {
  const m = new Map<string, House[]>();
  for (const h of hs) {
    const p = map.project(L.latLng(h.ll), z);
    const k = `${Math.floor(p.x / CELL)}:${Math.floor(p.y / CELL)}`;
    const g = m.get(k);
    if (g) g.push(h);
    else m.set(k, [h]);
  }
  return [...m.values()];
};

const center = (g: House[]): [number, number] => [g.reduce((s, h) => s + h.ll[0], 0) / g.length, g.reduce((s, h) => s + h.ll[1], 0) / g.length];

const PIN =
  '<svg width="44" height="53" viewBox="0 0 44 53"><path d="M22 52C22 52 4 34 4 20a18 18 0 0 1 36 0c0 14-18 32-18 32z" fill="#eb6600" stroke="#fff" stroke-width="2"/><circle cx="22" cy="20" r="8" fill="#fff"/></svg>';

export default function MapView({ houses, selectedId, onSelect, onVisible, onView, me, pois, pinLabel, pinKey, cmd, initial, invalidateKey }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const poiLayer = useRef<L.LayerGroup | null>(null);
  const meMarker = useRef<L.Marker | null>(null);
  const groups = useRef<House[][]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // 최신 props 를 이벤트 핸들러에서 쓰기 위한 ref
  const latest = useRef({ houses, selectedId, onSelect, onVisible, onView, pinLabel });
  latest.current = { houses, selectedId, onSelect, onVisible, onView, pinLabel };

  const render = useRef<() => void>(() => {});

  useEffect(() => {
    if (!el.current || map.current) return;
    const m = L.map(el.current, { zoomControl: false, maxZoom: 19 }).setView(initial.ll, initial.z);
    map.current = m;
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(m);
    layer.current = L.layerGroup().addTo(m);
    poiLayer.current = L.layerGroup().addTo(m);

    const fitGroup = (g: House[]) => m.fitBounds(L.latLngBounds(g.map((h) => h.ll)), { padding: [90, 90], maxZoom: MAX_Z });

    render.current = () => {
      const { houses, selectedId, onSelect, onVisible, pinLabel } = latest.current;
      const b = m.getBounds();
      const vis = houses.filter((h) => b.contains(h.ll));
      const gs = group(m, vis, m.getZoom());
      groups.current = gs;
      layer.current!.clearLayers();

      for (const g of gs) {
        const hasSel = g.some((h) => h.id === selectedId);
        if (g.length === 1 && hasSel) {
          // 선택한 매물: 다른 마커·클러스터에 가려지지 않게 맨 위에 강조
          L.marker(g[0].ll, {
            zIndexOffset: 2000,
            icon: L.divIcon({ className: "", iconSize: [44, 53], iconAnchor: [22, 53], html: `<div class="pin-sel" data-tour="sel-marker">${PIN}</div>` }),
          }).addTo(layer.current!);
          continue;
        }
        if (g.length === 1 && pinLabel) {
          L.marker(g[0].ll, {
            icon: L.divIcon({ className: "", iconSize: [1, 1], iconAnchor: [0, 0], html: `<div class="pricepin">${pinLabel(g[0])}</div>` }),
          })
            .on("click", () => onSelect(g[0].id))
            .addTo(layer.current!);
          continue;
        }
        L.marker(center(g), {
          icon: L.divIcon({
            className: "",
            iconSize: [48, 48],
            iconAnchor: [24, 24],
            html: `<div class="cluster${hasSel ? " has-sel" : ""}">${g.length}</div>`,
          }),
        })
          .on("click", () => (g.length > 1 ? fitGroup(g) : onSelect(g[0].id)))
          .addTo(layer.current!);
      }
      onVisible(vis.map((h) => h.id).sort((a, c) => a - c), gs.reduce((s, g) => s + g.length, 0));
    };

    m.on("moveend zoomend", () => {
      const c = m.getCenter();
      latest.current.onView([c.lat, c.lng], m.getZoom());
      render.current();
    });
    render.current();

    return () => {
      clearTimeout(timer.current);
      m.remove();
      map.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 매물·선택이 바뀌면 같은 데이터로 다시 계산
  useEffect(() => {
    render.current();
  }, [houses, selectedId, pinKey]);

  // 내 위치 표시 (파란 점)
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    meMarker.current?.remove();
    meMarker.current = null;
    if (me) {
      meMarker.current = L.marker(me, {
        zIndexOffset: 3000,
        interactive: false,
        icon: L.divIcon({ className: "", iconSize: [1, 1], iconAnchor: [0, 0], html: `<div class="me-dot"><i></i><b><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="7.5" r="4.2"/><path d="M3.5 21c.6-4.6 4-7 8.5-7s7.9 2.4 8.5 7z"/></svg></b></div>` }),
      }).addTo(m);
    }
  }, [me]);

  // 선택한 매물 주변 편의시설 마커 (매물 마커·클러스터와 별도 레이어, 개수 계산에 포함되지 않음)
  useEffect(() => {
    const lg = poiLayer.current;
    if (!lg) return;
    lg.clearLayers();
    for (const p of pois ?? []) {
      L.marker(p.ll, {
        zIndexOffset: 500,
        title: p.name,
        icon: L.divIcon({ className: "", iconSize: [26, 26], iconAnchor: [13, 13], html: `<div class="poi ${p.kind}">${p.label}</div>` }),
      }).addTo(lg);
    }
  }, [pois]);

  useEffect(() => {
    const t = setTimeout(() => map.current?.invalidateSize(), 260);
    return () => clearTimeout(t);
  }, [invalidateKey]);

  // 명령 처리 (목록 선택, 투어 장면 등)
  useEffect(() => {
    const m = map.current;
    if (!cmd || !m) return;
    clearTimeout(timer.current);
    const fit = (g: House[]) => m.fitBounds(L.latLngBounds(g.map((h) => h.ll)), { padding: [90, 90], maxZoom: MAX_Z });

    if (cmd.t === "view") m.setView(cmd.ll, cmd.z, { animate: false });
    else if (cmd.t === "zoom") (cmd.d > 0 ? m.zoomIn() : m.zoomOut());
    else if (cmd.t === "gps") return;
    else if (cmd.t === "focus") {
      const h = latest.current.houses.find((x) => x.id === cmd.id);
      if (!h) return;
      // 선택한 매물이 클러스터에 합쳐져 있으면 혼자 보일 때까지 확대
      let z = m.getZoom();
      while (z < MAX_Z && (group(m, latest.current.houses, z).find((g) => g.some((x) => x.id === h.id))?.length ?? 1) > 1) z++;
      m.flyTo(h.ll, z, { duration: 0.6 });
    } else if (cmd.t === "cluster") {
      if (cmd.ll && cmd.z) m.setView(cmd.ll, cmd.z, { animate: false });
      timer.current = setTimeout(() => {
        const big = [...groups.current].sort((a, b) => b.length - a.length)[0];
        if (big && big.length > 1) fit(big);
      }, 500);
    } else if (cmd.t === "markerClick") {
      const one = groups.current.find((g) => g.length === 1);
      if (one) latest.current.onSelect(one[0].id);
    }
  }, [cmd]);

  return <div ref={el} id="map" />;
}
