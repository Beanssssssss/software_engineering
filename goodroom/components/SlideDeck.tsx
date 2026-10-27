"use client";

import { useCallback, useEffect, useState } from "react";
import { slides } from "@/data/slides";
import RoomApp from "./RoomApp";

export default function SlideDeck() {
  const [i, setI] = useState(0);
  const [grid, setGrid] = useState(false);
  const last = slides.length - 1;
  const inApp = !!slides[i].app;

  const go = useCallback((n: number) => setI(Math.max(0, Math.min(last, n))), [last]);

  // 항상 표지에서 시작 (스플래시 다음에 발표자료가 바로 보이도록 URL 해시는 복원하지 않음)
  useEffect(() => {
    history.replaceState(null, "", location.pathname);
  }, []);

  const toggleFull = () =>
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // 서비스 시연 슬라이드에서는 지도·입력창 조작을 방해하지 않도록 이전 슬라이드로 돌아가는 키만 허용
      if (inApp) {
        if (e.key === "PageUp") go(i - 1);
        else if (e.key === "PageDown") go(i + 1);
        else if (e.key === "Escape") go(i - 1);
        else if (e.key === "F") toggleFull();
        return;
      }
      if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); go(i + 1); }
      else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); go(i - 1); }
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(last);
      else if (e.key === "f" || e.key === "F") toggleFull();
      else if (e.key === "o" || e.key === "O" || e.key === "Escape") setGrid((g) => (e.key === "Escape" ? false : !g));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, go, last, inApp]);

  return (
    <div className="deck">
      <div className="deck-bar" style={{ width: `${((i + 1) / slides.length) * 100}%` }} />

      {grid ? (
        <div className="deck-grid">
          {slides.map((s, n) => (
            <button key={s.id} className={n === i ? "on" : ""} onClick={() => { go(n); setGrid(false); }}>
              <span>{n + 1}</span>{s.label}
            </button>
          ))}
        </div>
      ) : inApp ? (
        <div className="deck-app">
          <RoomApp onEnd={i < last ? () => go(i + 1) : undefined} />
        </div>
      ) : (
        <main className="slide" key={slides[i].id}>
          {slides[i].body}
        </main>
      )}

      {!inApp && (
        <>
          <button className="deck-nav prev" aria-label="이전" onClick={() => go(i - 1)} disabled={i === 0}>‹</button>
          <button className="deck-nav next" aria-label="다음" onClick={() => go(i + 1)} disabled={i === last}>›</button>

          <footer className="deck-foot">
            <span />
            <span className="keys">
              <button onClick={() => setGrid(!grid)}>목록 (O)</button>
              <button onClick={toggleFull}>전체화면 (F)</button>
            </span>
          </footer>
        </>
      )}
    </div>
  );
}
