"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { TourStep } from "./tourSteps";

type Rect = { left: number; top: number; width: number; height: number };

const CARD_W = 400;

// 코치마크: 대상 요소를 강조하고 UC 단계 설명을 보여 줌. 단계가 바뀔 때 화면 상태(장면)도 함께 전환
export default function Tour({ steps, onClose }: { steps: TourStep[]; onClose: () => void }) {
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [cardH, setCardH] = useState(180);
  const card = useRef<HTMLDivElement>(null);
  const step = steps[i];
  const last = steps.length - 1;

  const go = (n: number) => setI(Math.max(0, Math.min(last, n)));

  // 단계 진입 시 장면 전환
  useEffect(() => {
    steps[i].run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  // 대상 위치 추적 (애니메이션·지연 렌더링되는 요소 포함)
  useEffect(() => {
    if (!step.target) { setRect(null); return; }
    const tick = () => {
      const el = document.querySelector(step.target!) as HTMLElement | null;
      if (!el) return setRect(null);
      const r = el.getBoundingClientRect();
      setRect((o) => (o && o.left === r.left && o.top === r.top && o.width === r.width && o.height === r.height ? o : { left: r.left, top: r.top, width: r.width, height: r.height }));
    };
    // 지도 이동·마커 생성처럼 움직이는 대상도 따라가도록 매 프레임 위치를 확인
    let raf = 0;
    const loop = () => {
      tick();
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [step.target, i]);

  useLayoutEffect(() => {
    if (card.current) setCardH(card.current.offsetHeight);
  }, [i, rect]);

  // 투어 중에는 슬라이드 단축키가 동작하지 않도록 가로챔
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (!["ArrowRight", "ArrowLeft", "Escape", " ", "Enter", "PageDown", "PageUp"].includes(k)) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (k === "Escape") onClose();
      else if (k === "ArrowLeft" || k === "PageUp") go(i - 1);
      else if (i === last) onClose();
      else go(i + 1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  const vw = typeof window === "undefined" ? 1440 : innerWidth;
  const vh = typeof window === "undefined" ? 800 : innerHeight;
  const clampX = (x: number) => Math.max(12, Math.min(vw - CARD_W - 12, x));
  const clampY = (y: number) => Math.max(12, Math.min(vh - cardH - 12, y));

  let pos = { left: (vw - CARD_W) / 2, top: (vh - cardH) / 2 };
  if (rect) {
    const p = step.place ?? "bottom";
    if (p === "inside") pos = { left: clampX(rect.left + 24), top: clampY(rect.top + 24) };
    else if (p === "right") pos = rect.left + rect.width + 16 + CARD_W < vw ? { left: rect.left + rect.width + 16, top: clampY(rect.top) } : { left: clampX(rect.left - CARD_W - 16), top: clampY(rect.top) };
    else if (p === "left") pos = rect.left - CARD_W - 16 > 0 ? { left: rect.left - CARD_W - 16, top: clampY(rect.top) } : { left: clampX(rect.left + rect.width + 16), top: clampY(rect.top) };
    else if (p === "top") pos = { left: clampX(rect.left + rect.width / 2 - CARD_W / 2), top: clampY(rect.top - cardH - 16) };
    else pos = { left: clampX(rect.left), top: clampY(rect.top + rect.height + 16) };
  }

  return (
    <div className="tour" role="dialog" aria-label="코치마크">
      {rect ? (
        <>
          {/* 대상 주변을 네 조각으로 어둡게 처리 */}
          <div className="tour-dim" style={{ left: 0, top: 0, right: 0, height: Math.max(0, rect.top - 6) }} />
          <div className="tour-dim" style={{ left: 0, right: 0, top: rect.top + rect.height + 6, bottom: 0 }} />
          <div className="tour-dim" style={{ left: 0, width: Math.max(0, rect.left - 6), top: rect.top - 6, height: rect.height + 12 }} />
          <div className="tour-dim" style={{ left: rect.left + rect.width + 6, right: 0, top: rect.top - 6, height: rect.height + 12 }} />
          <div className="tour-spot" style={{ left: rect.left - 6, top: rect.top - 6, width: rect.width + 12, height: rect.height + 12 }} />
        </>
      ) : (
        <div className="tour-dim" style={{ inset: 0 }} />
      )}

      <div ref={card} className="tour-card" style={pos}>
        <div className="tour-meta">
          <span className="uc">{step.uc} · {step.ref}단계</span>
          {step.alt && <span className="alt">대안 흐름</span>}
          {step.tobe && <span className="badge-tobe">To-Be</span>}
          <button className="x" aria-label="종료" onClick={onClose}>✕</button>
        </div>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
        <div className="tour-foot">
          <span className="prog">{i + 1} / {steps.length}</span>
          <span className="btns">
            <button disabled={i === 0} onClick={() => go(i - 1)}>이전</button>
            <button className="primary" onClick={() => (i === last ? onClose() : go(i + 1))}>{i === last ? "종료" : "다음"}</button>
          </span>
        </div>
      </div>
    </div>
  );
}
