"use client";

import { useEffect, useState } from "react";
import { filterOptions, type Filters, type Tab } from "@/data/houses";
import { useApp } from "./AppContext";

type Props = { tab: Tab; filters: Filters; setFilters: (f: Filters) => void; search: string; setSearch: (s: string) => void; onSearch: (q: string) => void };

const keysFor = (tab: Tab) => (tab === "shop" ? (["deal", "area", "floor"] as const) : (["deal", "loan", "area", "floor", "opt"] as const));

export default function FilterBar({ tab, filters, setFilters, search, setSearch, onSearch }: Props) {
  const { t } = useApp();
  const [open, setOpen] = useState<{ k: string; left: number } | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#dd,#filters")) setOpen(null);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const toggle = (k: string, o: string) => {
    const cur = filters[k] ?? [];
    setFilters({ ...filters, [k]: cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o] });
  };

  return (
    <>
      <div className="sub-header" data-tour="filter-bar">
        <label className="search" data-tour="search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#535c68" strokeWidth="2" onClick={() => onSearch(search)} style={{ cursor: "pointer" }}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            value={search}
            placeholder={t(tab === "apt" ? "search.ph.apt" : tab === "shop" ? "search.ph.shop" : "search.ph")}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(search)}
          />
        </label>
        <div className="filters" id="filters" data-tour="filters">
          {keysFor(tab).map((k) => {
            const n = filters[k]?.length ?? 0;
            return (
              <button
                key={k}
                className={`sel${n ? " selected" : ""}${open?.k === k ? " active" : ""}`}
                onClick={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setOpen(open?.k === k ? null : { k, left: Math.min(r.left, innerWidth - 300) });
                }}
              >
                {t(`filter.${k}`)}{n ? ` ${n}` : ""}
              </button>
            );
          })}
          <button className="sel plain reset" aria-label={t("filter.reset")} onClick={() => setFilters({})}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
            {t("filter.reset")}
          </button>
        </div>
      </div>

      <div id="dd" className={`dropdown${open ? " open" : ""}`} style={{ left: open?.left }}>
        {open && (
          <>
            <h4>{t(`filter.${open.k}`)}</h4>
            <div className="chips">
              {filterOptions[open.k].filter((o) => !(open.k === "deal" && ((o === "매매" && tab !== "apt" && tab !== "shop") || (o === "전세" && tab === "shop")))).map((o) => (
                <button key={o} className={`chip${filters[open.k]?.includes(o) ? " on" : ""}`} onClick={() => toggle(open.k, o)}>
                  {t(`opt.${o}`)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
