"use client";

import type { Lang } from "@/data/houses";
import type { Cur, Settings, Unit } from "@/data/format";
import { useApp } from "./AppContext";

export type RateInfo = { status: "idle" | "loading" | "ok" | "stale" | "none"; v?: number; at?: string };

type Props = {
  draft: Settings;
  saved: Settings;
  rate: RateInfo;
  onChange: (s: Settings) => void;
  onApply: () => void;
  onCancel: () => void;
};

const langs: [Lang, string][] = [["ko", "한국어"], ["en", "English"], ["zh", "中文"]];
const curs: Cur[] = ["KRW", "USD", "CNY"];
const units: Unit[] = ["m2", "py", "ft2"];

export const summary = (s: Settings, t: (k: string) => string) =>
  `${langs.find((l) => l[0] === s.lang)![1]} · ${{ KRW: "₩", USD: "$", CNY: "¥" }[s.cur]} · ${t(`unit.${s.unit}`)}`;

export default function SettingsPanel({ draft, saved, rate, onChange, onApply, onCancel }: Props) {
  const { t } = useApp();

  const rateText =
    draft.cur === "KRW"
      ? null
      : rate.status === "loading"
        ? t("set.rate.loading")
        : rate.status === "ok"
          ? t("set.rate.ok", { cur: draft.cur, v: rate.v!.toLocaleString("en-US"), at: rate.at! })
          : rate.status === "stale"
            ? t("set.rate.stale", { cur: draft.cur, v: rate.v!.toLocaleString("en-US"), at: rate.at! })
            : rate.status === "none"
              ? t("set.rate.none")
              : null;

  return (
    <div className="settings" data-tour="settings-panel">
      <div className="set-head">
        <h4>{t("set.title")}</h4>
        <span className="cur-pill"><em>{t("set.current")}</em>{summary(saved, t)}</span>
      </div>

      <div className="set-body">
      <div className="grp" data-tour="set-lang">
        <span className="gl">{t("set.lang")}</span>
        <div className="opts">
          {langs.map(([k, label]) => (
            <button key={k} className={draft.lang === k ? "on" : ""} onClick={() => onChange({ ...draft, lang: k })}>{label}</button>
          ))}
        </div>
      </div>

      <div className="grp" data-tour="set-cur">
        <span className="gl">{t("set.cur")}</span>
        <div className="opts">
          {curs.map((k) => (
            <button key={k} className={draft.cur === k ? "on" : ""} onClick={() => onChange({ ...draft, cur: k })}>{t(`cur.${k}`)}</button>
          ))}
        </div>
      </div>

      <div className="grp" data-tour="set-unit">
        <span className="gl">{t("set.unit")}</span>
        <div className="opts">
          {units.map((k) => (
            <button key={k} className={draft.unit === k ? "on" : ""} onClick={() => onChange({ ...draft, unit: k })}>{t(`unit.${k}`)}</button>
          ))}
        </div>
      </div>

      {rateText && (
        <p className={`rate-line ${rate.status}`} data-tour="rate-line">{rateText}</p>
      )}
      </div>

      <div className="act">
        <button className="cancel" data-tour="set-cancel" onClick={onCancel}>{t("set.cancel")}</button>
        <button className="apply" data-tour="set-apply" onClick={onApply}>{t("set.apply")}</button>
      </div>
    </div>
  );
}
