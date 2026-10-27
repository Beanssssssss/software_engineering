"use client";

import { useEffect, useState } from "react";

const HOUSE =
  "M116,350 Q106,350 106,340 L106,184 Q106,176 112,171 L216,88 Q222,83 228,88 L334,172 Q340,177 340,184 L340,340 Q340,350 330,350 Z" +
  " M171,282 L171,217 Q171,212 175,209 L219,173 Q222,171 225,173 L270,209 Q275,213 275,218 L275,282 Z";

// 접속할 때마다 재생한 뒤 발표자료로 넘어감. 클릭하면 건너뛰기
export default function Splash() {
  const [phase, setPhase] = useState<"play" | "out" | "done">("play");

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setPhase("out"), reduce ? 300 : 3000);
    const t2 = setTimeout(() => setPhase("done"), reduce ? 600 : 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`splash${phase === "out" ? " out" : ""}`}
      onClick={() => setPhase("done")}
      role="presentation"
    >
      <svg viewBox="60 40 340 340" width="280" height="280" aria-label="좋은방 구하기">
        {/* 1) 초록 선으로 집 그리기 */}
        <path className="sp-stroke" d={HOUSE} pathLength={1} fillRule="evenodd" />
        {/* 2) 면 채우기 (음영 없이 한 가지 초록색) */}
        <path className="sp-fill" d={HOUSE} fillRule="evenodd" />
        {/* 3) 빨간 잎이 아래에서 올라옴 */}
        <g className="sp-leaf">
          <path
            d="M275,215 C270,160 310,128 365,124 C365,170 330,222 275,215 Z"
            fill="#ed5d5a"
            stroke="#fff"
            strokeWidth="6"
            paintOrder="stroke"
          />
        </g>
      </svg>
      <p className="sp-word">피터팬의 좋은방 구하기</p>
    </div>
  );
}
