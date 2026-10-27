"use client";

import { createContext, useContext } from "react";
import type { House, Lang } from "@/data/houses";
import { places } from "@/data/houses";
import { area, money, moneyKRW, type Cur, type Unit } from "@/data/format";
import { makeT, type TFn } from "@/data/i18n";

export type Ctx = {
  lang: Lang;
  cur: Cur; // 실제로 표시에 쓰는 통화 (환율을 못 받으면 KRW)
  unit: Unit;
  rate: number | null;
  t: TFn;
  place: (key: string) => string;
  address: (dong: string) => string; // 서울특별시 마포구 ○○동
  price: (h: House) => { dep: string; rent?: string; sub?: string };
  area: (m2: number) => string;
  pin: (h: House) => string; // 지도 마커용 짧은 가격 표기
};

export const buildCtx = (lang: Lang, cur: Cur, unit: Unit, rate: number | null): Ctx => {
  const t = makeT(lang);
  const useCur: Cur = cur !== "KRW" && rate ? cur : "KRW";
  const m = (v: number) => money(v, useCur, lang, rate);
  return {
    lang, cur: useCur, unit, rate, t,
    place: (key) => places.find((p) => p.key === key)?.name[lang] ?? key,
    price: (h) => {
      const dep = m(h.deposit);
      const rent = h.deal === "월세" ? m(h.rent) : undefined;
      if (useCur === "KRW") return { dep, rent };
      const k = (v: number) => moneyKRW(v, lang);
      return { dep, rent, sub: rent ? `${k(h.deposit)} / ${k(h.rent)}` : k(h.deposit) };
    },
    address: (dong) => {
      const p = places.find((x) => x.key === dong)?.name[lang] ?? dong;
      return lang === "en" ? `${p}, ${t("coord")}, ${t("addr.city")}` : lang === "zh" ? `${t("addr.city")}${t("coord")}${p}` : `${t("addr.city")} ${t("coord")} ${p}`;
    },
    area: (m2) => area(m2, unit, t("unit.py")),
    pin: (h) => {
      const c = (man: number) => {
        if (useCur === "KRW" && lang === "ko") {
          if (man >= 10000) return `${+(man / 10000).toFixed(1)}억`;
          if (man >= 1000) return `${+(man / 1000).toFixed(1)}천`;
          return `${man}`;
        }
        const v = (man * 10000) / (useCur === "KRW" || !rate ? 1 : rate);
        const sym = { KRW: "₩", USD: "$", CNY: "¥" }[useCur];
        return `${sym}${new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(v)}`;
      };
      const p = t(`pin.${h.deal}`);
      return h.deal === "월세" ? `${p}${c(h.deposit)}/${c(h.rent)}` : `${p}${c(h.deposit)}`;
    },
  };
};

export const AppCtx = createContext<Ctx>(buildCtx("ko", "KRW", "m2", null));
export const useApp = () => useContext(AppCtx);
