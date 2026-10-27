"use client";

import { useState } from "react";
import type { House } from "@/data/houses";
import { roomPhoto } from "@/data/rooms";
import { useApp } from "./AppContext";

const grads = ["#9aa0a6,#5f6368", "#a8b5a2,#5b6b58", "#c4b49a,#7c6a52", "#9fb1c4,#586a7e", "#c9a9a6,#7e5a57", "#b0a8c9,#665d85"];

type Props = { h: House; selected: boolean; first?: boolean; onSelect: () => void; onDetail: () => void };

export default function HouseCard({ h, selected, first, onSelect, onDetail }: Props) {
  const { t, lang, address, price, area } = useApp();
  const [fav, setFav] = useState(false);
  const [orig, setOrig] = useState(false);
  const [a, b] = grads[h.id % grads.length].split(",");
  const p = price(h);
  const translated = lang !== "ko";
  const photo = roomPhoto(h.id);

  return (
    <article className={`house${selected ? " selected" : ""}`} data-id={h.id} data-tour={selected ? "card-sel" : first ? "card-first" : undefined} onClick={onSelect}>
      <div className="img" style={{ background: `linear-gradient(135deg,${a},${b})` }}>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="photo" src={photo} alt="" loading="lazy" />
        ) : (
          <div className="nophoto">{t("card.nophoto")}</div>
        )}
        {h.instant && <span className="badge">{t("card.instant")}</span>}
        <button className={`fav${fav ? " on" : ""}`} aria-label="찜" onClick={(e) => { e.stopPropagation(); setFav(!fav); }}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 20 4.5 11.5C2.7 9.3 2.7 6.7 4.6 5c1.9-1.7 4.7-1.4 6.3.6L12 7.2l1.1-1.6c1.6-2 4.4-2.3 6.3-.6 1.9 1.7 1.9 4.3.1 6.5z" />
          </svg>
        </button>
      </div>
      <div className="price">
        {p.rent !== undefined ? (
          <>
            {t("card.deposit")} {p.dep}
            {" / "}
            {t("card.rent")} {p.rent}
          </>
        ) : (
          <>
            {t(h.deal === "매매" ? "card.sale" : "card.jeonse")} {p.dep}
          </>
        )}
      </div>
      {p.sub && <div className="price-sub">{p.sub}</div>}
      <div className="addr">{h.complex ? `${h.complex} · ${address(h.dong)}` : address(h.dong)}</div>
      <div className="info">
        {t(`type.${h.type}`)}
        {h.rooms > 0 && <><b />{t("card.rooms", { n: h.rooms })}</>}
        {!["건물", "공장", "토지"].includes(h.type) && <><b />{h.floorNo ? t("floor.n", { n: h.floorNo }) : t(`floor.${h.floor}`)}</>}
        <b />{area(h.area)}
      </div>
      <div className="desc">{orig || !translated ? h.desc.ko : h.desc[lang]}</div>
      {translated && (
        <div className="trans">
          <span>{orig ? "" : t("card.translatedNote")}</span>
          <button onClick={(e) => { e.stopPropagation(); setOrig(!orig); }}>{orig ? t("card.translated") : t("card.original")}</button>
        </div>
      )}
      <div className="tags">
        <span className="tag">{t("card.brokerage")}</span>
        {h.fee === "half" && <span className="tag blue">{t("card.half")}</span>}
        {h.fee === "full" && <span className="tag red">{t("card.full")}</span>}
        {h.n && <span className="tag n"><em>N</em>OK</span>}
        <button className="detail" onClick={(e) => { e.stopPropagation(); onDetail(); }}>{t("card.detail")} ›</button>
      </div>
    </article>
  );
}
