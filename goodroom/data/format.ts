import type { Lang } from "./houses";

export type Cur = "KRW" | "USD" | "CNY";
export type Unit = "m2" | "py" | "ft2";
export type Settings = { lang: Lang; cur: Cur; unit: Unit };

export const DEFAULT_SETTINGS: Settings = { lang: "ko", cur: "KRW", unit: "m2" };

// 환율 서비스(모의): 1단위 = 원
export const RATES: Record<Exclude<Cur, "KRW">, number> = { USD: 1372, CNY: 189 };
export const RATE_AT = "2026-10-26 14:00";
export const STALE_CACHE = { USD: { v: 1368, at: "2026-10-25 18:00" }, CNY: { v: 188, at: "2026-10-25 18:00" } };

const SYMBOL: Record<Cur, string> = { KRW: "₩", USD: "$", CNY: "¥" };
const n = (v: number) => Math.round(v).toLocaleString("en-US");

// 만원 단위 금액 → 한글 표기 (1억 6,000만원)
const koWon = (man: number) => {
  const eok = Math.floor(man / 10000);
  const rest = man % 10000;
  if (eok && rest) return `${eok}억 ${rest.toLocaleString("en-US")}만원`;
  if (eok) return `${eok}억원`;
  return `${man.toLocaleString("en-US")}만원`;
};

export const money = (man: number, cur: Cur, lang: Lang, rate: number | null) => {
  if (cur === "KRW" || !rate) return lang === "ko" ? koWon(man) : `₩${n(man * 10000)}`;
  return `${SYMBOL[cur]}${n((man * 10000) / rate)}`;
};

export const moneyKRW = (man: number, lang: Lang) => (lang === "ko" ? koWon(man) : `₩${n(man * 10000)}`);

export const area = (m2: number, unit: Unit, pyLabel: string) => {
  if (unit === "py") return `${(m2 / 3.3058).toFixed(1)}${pyLabel}`;
  if (unit === "ft2") return `${n(m2 * 10.7639)}ft²`;
  return `${m2.toFixed(1)}m²`;
};
