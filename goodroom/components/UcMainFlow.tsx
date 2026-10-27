"use client";

import { useEffect, useState } from "react";

export type FlowStep = [who: string, text: string, tobe: boolean];
export type FlowAlt = [no: string, cond: string, tobe: boolean, lines: string[]];

type Props = { steps: FlowStep[]; alts: FlowAlt[] };

const Badge = () => <span className="badge-tobe">To-Be</span>;

// Main Success Flow: 대안 흐름이 있는 단계(번호·내용)를 누르면 해당 Alternate Flow가 팝업으로 열림
export default function UcMainFlow({ steps, alts }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  // "10A" → 10단계
  const altsOf = (step: number) => alts.filter(([no]) => parseInt(no, 10) === step);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <ol className="uc-flow">
        {steps.map(([who, text, tb], n) => {
          const found = altsOf(n + 1);
          if (!found.length) {
            return (
              <li key={n}>
                {tb && <Badge />}
                <b>{who}</b> {text}
              </li>
            );
          }
          return (
            <li key={n} className="has-alt" onClick={() => setOpen(n + 1)}>
              {tb && <Badge />}
              <b>{who}</b> {text}
              {found.map(([no]) => <span key={no} className="alt-chip">{no}</span>)}
            </li>
          );
        })}
      </ol>

      {open !== null && (
        <div className="uc-pop" onClick={() => setOpen(null)}>
          <div className="uc-pop-card" onClick={(e) => e.stopPropagation()}>
            {altsOf(open).map(([no, cond, tb, lines]) => (
              <div className="uc-box" key={no}>
                <h4>{no}. {tb && <Badge />}{cond}</h4>
                <ul>{lines.map((l) => <li key={l}>{l}</li>)}</ul>
              </div>
            ))}
            <button className="uc-pop-x" aria-label="닫기" onClick={() => setOpen(null)}>✕</button>
          </div>
        </div>
      )}
    </>
  );
}
