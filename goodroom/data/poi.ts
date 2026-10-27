import type { House, Tri } from "./houses";
import raw from "./poi-osm.json";

export type PoiKind = "convenience" | "mart" | "laundry";
export type Poi = { kind: PoiKind; name: Tri; ll: [number, number]; dist: number; walk: number };

export const POI_KINDS: PoiKind[] = ["convenience", "mart", "laundry"];

// 도보 약 10분 거리 안에 있는 시설만 표시 (없으면 표시하지 않음)
const RADIUS = 600;

// OpenStreetMap 실제 데이터 (© OpenStreetMap contributors, ODbL)
// 마포구 일대의 편의점·마트·빨래방을 미리 받아 저장한 파일: [종류, 위도, 경도, 한국어, 영어, 중국어]
type Row = [PoiKind, number, number, string, string, string];
const ALL = (raw as Row[]).map(([kind, lat, lng, ko, en, zh]) => ({
  kind,
  ll: [lat, lng] as [number, number],
  // 번역이 없는 이름은 영어 → 한국어 순서로 대체
  name: { ko, en: en || ko, zh: zh || en || ko } as Tri,
}));

const meters = (a: [number, number], b: [number, number]) => {
  const R = 6371000;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos((a[0] * Math.PI) / 180) * Math.cos((b[0] * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
};

// 선택한 매물에서 종류별로 가장 가까운 실제 시설 (반경 안에 없으면 그 종류는 제외)
export const poisFor = (h: House): Poi[] =>
  POI_KINDS.flatMap((kind) => {
    let best: { p: (typeof ALL)[number]; d: number } | undefined;
    for (const p of ALL) {
      if (p.kind !== kind) continue;
      const d = meters(h.ll, p.ll);
      if (d <= RADIUS && (!best || d < best.d)) best = { p, d };
    }
    return best ? [{ kind, name: best.p.name, ll: best.p.ll, dist: Math.round(best.d / 10) * 10, walk: Math.max(1, Math.round(best.d / 70)) }] : [];
  });
