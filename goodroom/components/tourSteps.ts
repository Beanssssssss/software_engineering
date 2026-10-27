import { HOME, findPlace, type Filters, type Tab } from "@/data/houses";
import { DEFAULT_SETTINGS, STALE_CACHE, type Settings } from "@/data/format";
import type { MapCmdBody } from "./MapView";

export type SortKey = "default" | "dep" | "rent" | "area";

export type Scene = {
  panelOpen: boolean;
  saved: Settings;
  draft: Settings;
  rateFail: boolean;
  rateHold: boolean; // 환율 조회 중 상태를 유지
  cache: Partial<Record<"USD" | "CNY", { v: number; at: string }>>;
  loggedIn: boolean;
  mapState: "ok" | "loading" | "fail";
  mapHold: boolean; // 지도 로딩 상태를 유지
  search: string;
  committed: string;
  filters: Filters;
  selected: number | null;
  toast: string | null;
  tab: Tab;
  sort: SortKey;
  myLoc: boolean;
  locDenied: boolean;
  cmd: MapCmdBody | null;
};

export const DEFAULT_SCENE: Scene = {
  panelOpen: false,
  saved: DEFAULT_SETTINGS,
  draft: DEFAULT_SETTINGS,
  rateFail: false,
  rateHold: false,
  cache: {},
  loggedIn: false,
  mapState: "ok",
  mapHold: false,
  search: "",
  committed: "",
  filters: {},
  selected: null,
  toast: null,
  tab: "room",
  sort: "default",
  myLoc: false,
  locDenied: false,
  cmd: { t: "view", ll: HOME.ll, z: HOME.z },
};

export type TourApi = {
  scene: (s: Partial<Scene>) => void;
  later: (fn: () => void, ms: number) => void;
  select: (id: number, focus: boolean) => void;
  cmd: (c: MapCmdBody) => void;
};

export type TourStep = {
  uc: "UC-02" | "UC-01";
  ref: string; // 단계 번호 (대안은 4A 처럼)
  alt?: boolean;
  tobe?: boolean;
  title: string;
  body: string;
  target?: string;
  place?: "bottom" | "top" | "left" | "right" | "inside";
  run: () => void;
};

const EN: Settings = { lang: "en", cur: "USD", unit: "ft2" };
const sogang = findPlace("Sogang")!;
const view = (ll: [number, number], z: number) => ({ t: "view" as const, ll, z });

export const buildSteps = (api: TourApi): TourStep[] => {
  const S = api.scene;
  const base: Partial<Scene> = { saved: EN, draft: EN };
  return [
    // ───────── UC-02 언어·통화·단위 설정하기 ─────────
    { uc: "UC-02", ref: "1", title: "설정 요청", body: "사용자가 우측 상단 설정 메뉴에서 언어·통화·단위 설정을 요청합니다.", target: "[data-tour=settings-btn]", place: "bottom", run: () => S({}) },
    { uc: "UC-02", ref: "2", tobe: true, title: "현재 설정과 선택 목록 표시", body: "시스템이 현재 설정과 선택 가능한 목록(언어 3개, 통화 3종, 면적 단위 3종)을 표시합니다.", target: "[data-tour=settings-panel]", place: "left", run: () => S({ panelOpen: true }) },
    { uc: "UC-02", ref: "3", title: "언어 선택", body: "사용자가 언어(예: English)를 선택합니다.", target: "[data-tour=set-lang]", place: "left", run: () => S({ panelOpen: true }) },
    { uc: "UC-02", ref: "4", tobe: true, title: "화면 전체 언어 전환", body: "시스템이 자체 언어 리소스로 메뉴·필터·안내문·매물 설명 등 화면 전체를 선택한 언어로 전환합니다. (매물 설명은 번역 서비스 결과이며 원문 보기 가능)", target: "[data-tour=filter-bar]", place: "bottom", run: () => S({ panelOpen: true, draft: { ...DEFAULT_SETTINGS, lang: "en" } }) },
    { uc: "UC-02", ref: "4A", alt: true, tobe: true, title: "번역 문구가 일부 없는 경우", body: "중국어를 선택했는데 번역 문구가 없는 일부(예: 매물 카드의 ‘View details’ 버튼)는 영어로 대체해 표시합니다. → 5단계로 진행", target: "[data-tour=card-first]", place: "right", run: () => S({ panelOpen: true, draft: { ...DEFAULT_SETTINGS, lang: "zh" } }) },
    { uc: "UC-02", ref: "5", title: "통화·면적 단위 선택", body: "사용자가 통화(예: 달러)와 면적 단위(예: ft²)를 선택합니다.", target: "[data-tour=settings-panel]", place: "left", run: () => S({ panelOpen: true, draft: EN, rateHold: true }) },
    { uc: "UC-02", ref: "5A", alt: true, title: "통화·단위를 둘 다 변경하지 않는 경우", body: "시스템은 언어만 변경하고 통화는 원화, 면적은 m²를 유지합니다. 환율 조회도 하지 않습니다. → 8단계로 진행", target: "[data-tour=settings-panel]", place: "left", run: () => S({ panelOpen: true, draft: { ...DEFAULT_SETTINGS, lang: "en" } }) },
    { uc: "UC-02", ref: "5B", alt: true, title: "통화만 변경하는 경우", body: "시스템은 선택한 통화로 환율을 조회하고(6~7단계) 면적은 m²를 그대로 유지합니다.", target: "[data-tour=settings-panel]", place: "left", run: () => S({ panelOpen: true, draft: { lang: "en", cur: "USD", unit: "m2" } }) },
    { uc: "UC-02", ref: "5C", alt: true, title: "면적 단위만 변경하는 경우", body: "시스템은 선택한 면적 단위를 적용하고 통화는 원화를 유지합니다. 환율 조회는 생략하고 8단계로 진행합니다.", target: "[data-tour=settings-panel]", place: "left", run: () => S({ panelOpen: true, draft: { lang: "en", cur: "KRW", unit: "ft2" } }) },
    { uc: "UC-02", ref: "6", tobe: true, title: "환율 조회 요청", body: "시스템이 선택한 통화(USD)의 환율 조회를 환율 서비스에 요청합니다.", target: "[data-tour=rate-line]", place: "left", run: () => S({ panelOpen: true, draft: EN, rateHold: true }) },
    { uc: "UC-02", ref: "7", tobe: true, title: "환율 정보 제공", body: "환율 서비스가 환율 정보를 시스템에 제공합니다. 기준 시각과 함께 표시됩니다.", target: "[data-tour=rate-line]", place: "left", run: () => S({ panelOpen: true, draft: EN }) },
    { uc: "UC-02", ref: "7A", alt: true, tobe: true, title: "환율 서비스가 응답하지 않는 경우 (저장된 환율 있음)", body: "마지막으로 저장된 환율을 기준 시각과 함께 사용합니다. → 8단계로 진행", target: "[data-tour=rate-line]", place: "left", run: () => S({ panelOpen: true, draft: EN, rateFail: true, cache: STALE_CACHE }) },
    { uc: "UC-02", ref: "7A", alt: true, tobe: true, title: "환율 서비스가 응답하지 않는 경우 (저장된 환율 없음)", body: "저장된 환율이 없으면 원화만 표시하고 환율을 불러오지 못했음을 안내합니다. → 8단계로 진행", target: "[data-tour=rate-line]", place: "left", run: () => S({ panelOpen: true, draft: EN, rateFail: true, cache: {} }) },
    { uc: "UC-02", ref: "8", title: "설정 적용 요청", body: "사용자가 [적용] 버튼으로 설정 적용을 요청합니다.", target: "[data-tour=set-apply]", place: "left", run: () => S({ panelOpen: true, draft: EN }) },
    { uc: "UC-02", ref: "8A", alt: true, title: "사용자가 취소를 선택한 경우", body: "시스템은 변경 내용을 버리고 이전 설정(한국어·원화·m²)을 유지한 채 종료합니다.", target: "[data-tour=settings-btn]", place: "bottom", run: () => S({ toast: "toast.cancel" }) },
    { uc: "UC-02", ref: "9", tobe: true, title: "설정 저장 및 적용 안내", body: "시스템이 선택한 언어·통화·단위를 저장하고 적용 완료를 안내합니다. (비로그인: 이 기기에만 저장)", target: "[data-tour=toast]", place: "top", run: () => S({ ...base, toast: "toast.applied" }) },
    { uc: "UC-02", ref: "9A", alt: true, title: "로그인한 사용자가 설정을 변경한 경우", body: "설정을 계정에 저장하여 다른 기기에서도 유지합니다. → 10단계로 진행", target: "[data-tour=account-btn]", place: "bottom", run: () => S({ ...base, loggedIn: true, toast: "toast.account" }) },
    { uc: "UC-02", ref: "10", title: "UC-01 수행 (include)", body: "이어서 UC-01을 수행합니다. 가격은 선택한 통화(USD)로 환산해 원화와 함께, 면적은 ft²로 표시됩니다.", target: "[data-tour=list]", place: "right", run: () => S(base) },

    // ───────── UC-01 지도에서 매물 검색하고 위치 확인하기 ─────────
    { uc: "UC-01", ref: "1", title: "지도 검색 화면 진입", body: "사용자가 지도 검색 화면에 진입합니다.", target: "[data-tour=map]", place: "inside", run: () => S(base) },
    { uc: "UC-01", ref: "2", title: "지도 정보 요청", body: "시스템이 지도 API에 지도 정보를 요청합니다. (로딩 중)", target: "[data-tour=map]", place: "inside", run: () => S({ ...base, mapState: "loading", mapHold: true }) },
    { uc: "UC-01", ref: "3", title: "지도 정보 제공", body: "지도 API가 지도 정보를 제공하고 지도가 표시됩니다.", target: "[data-tour=map]", place: "inside", run: () => S(base) },
    { uc: "UC-01", ref: "3A", alt: true, title: "지도 API 통신 실패", body: "지도를 불러오지 못했음을 안내하고 목록만 먼저 표시합니다. [지도 다시 불러오기]를 제공합니다.", target: "[data-tour=map-error]", place: "inside", run: () => S({ ...base, mapState: "fail" }) },
    { uc: "UC-01", ref: "3A", alt: true, title: "다시 불러오기 → 2단계로 복귀", body: "사용자가 다시 불러오기를 선택하면 지도 정보 요청(2단계)으로 돌아갑니다.", target: "[data-tour=map]", place: "inside", run: () => S({ ...base, mapState: "loading", mapHold: true }) },
    { uc: "UC-01", ref: "4", title: "검색어 입력·필터 선택", body: "사용자가 검색창에 동·역·대학교 이름을 입력하고 필터(거래방식 등)를 선택합니다.", target: "[data-tour=filter-bar]", place: "bottom", run: () => S({ ...base, search: "Sogang", filters: { deal: ["월세"] } }) },
    { uc: "UC-01", ref: "4B", alt: true, tobe: true, title: "내 위치 버튼을 선택한 경우", body: "시스템이 현재 위치를 지도에 파란 점으로 표시하고 지도를 그 위치로 이동하며, 지도 아래 지역 표시에 내 위치를 함께 보여줍니다. → 5단계로 진행", target: "[data-tour=gps]", place: "left", run: () => S({ ...base, myLoc: true, cmd: view([37.5503, 126.9419], 16) }) },
    { uc: "UC-01", ref: "4C", alt: true, tobe: true, title: "위치 권한을 허용하지 않은 경우", body: "내 위치를 표시할 수 없음을 안내하고 권한 허용 방법을 알려줍니다. → 4단계로 복귀", target: "[data-tour=toast]", place: "top", run: () => S({ ...base, locDenied: true, toast: "toast.locdenied" }) },
    { uc: "UC-01", ref: "5", title: "조건에 맞는 매물 조회·지도 이동", body: "시스템이 조건에 맞는 매물을 조회하고 해당 위치(서강대학교)로 지도를 이동합니다.", target: "[data-tour=map]", place: "inside", run: () => S({ ...base, search: "Sogang", committed: "Sogang", filters: { deal: ["월세"] }, cmd: view(sogang.ll, sogang.z) }) },
    { uc: "UC-01", ref: "5A", alt: true, title: "조건에 맞는 매물이 없는 경우", body: "매물이 없음을 안내하고 조건 완화 방법(필터 초기화, 지도 축소)을 제안합니다. → 4단계로 복귀", target: "[data-tour=list]", place: "right", run: () => S({ ...base, search: "Mars", committed: "Mars", filters: { deal: ["월세"] } }) },
    { uc: "UC-01", ref: "6", tobe: true, title: "마커·클러스터·목록을 하나의 데이터로 계산", body: "지도 영역 안의 매물을 하나의 데이터로 계산합니다. 클러스터 숫자의 합과 목록의 매물 수가 일치하고, 클러스터 밖에는 마커를 따로 표시하지 않습니다.", target: "[data-tour=count]", place: "right", run: () => S(base) },
    { uc: "UC-01", ref: "7", title: "지도 이동·확대·축소", body: "사용자가 지도를 이동하거나 확대·축소합니다.", target: "[data-tour=map]", place: "inside", run: () => S({ ...base, cmd: view([37.5505, 126.9395], 16) }) },
    { uc: "UC-01", ref: "7A", alt: true, title: "클러스터를 선택한 경우", body: "해당 지역으로 확대하고 클러스터를 펼쳐 개별 마커를 표시하며, 목록을 해당 매물로 좁힙니다. → 9단계로 진행", target: "[data-tour=map]", place: "inside", run: () => S({ ...base, cmd: { t: "cluster", ll: HOME.ll, z: HOME.z } }) },
    { uc: "UC-01", ref: "8", tobe: true, title: "마커·클러스터·목록을 함께 갱신", body: "변경된 지도 영역에 맞춰 마커·클러스터·목록이 함께 갱신되고 개수가 계속 일치합니다.", target: "[data-tour=count]", place: "right", run: () => S({ ...base, cmd: view([37.5505, 126.9395], 17) }) },
    { uc: "UC-01", ref: "9", title: "목록에서 매물 선택", body: "사용자가 목록에서 매물 하나를 선택합니다.", target: "[data-tour=card-first]", place: "right", run: () => S(base) },
    { uc: "UC-01", ref: "9A", alt: true, title: "지도의 마커를 직접 선택한 경우", body: "목록에서 해당 매물을 강조하고 목록 위치를 스크롤합니다. → 11단계로 진행", target: "[data-tour=list]", place: "right", run: () => { S({ ...base, cmd: view(HOME.ll, 16) }); api.later(() => api.cmd({ t: "markerClick" }), 700); } },
    { uc: "UC-01", ref: "10", tobe: true, title: "선택한 마커를 맨 위에 강조", body: "선택한 매물의 마커를 다른 마커와 클러스터에 가려지지 않게 맨 위에 강조하고, 지도를 그 위치로 이동하며, 목록에 선택 상태를 표시합니다. 주변 편의시설(편의점·마트·빨래방)도 함께 표시합니다.", target: "[data-tour=sel-marker]", place: "right", run: () => { S(base); api.later(() => api.select(14, true), 600); } },
    { uc: "UC-01", ref: "10A", alt: true, tobe: true, title: "선택한 매물이 화면 밖에 있는 경우", body: "지도를 해당 매물이 보이는 위치로 자동 이동하고 마커를 강조합니다. → 11단계로 진행", target: "[data-tour=sel-marker]", place: "right", run: () => { S({ ...base, cmd: view([37.544, 126.952], 16) }); api.later(() => api.select(7, true), 900); } },
    { uc: "UC-01", ref: "10B", alt: true, tobe: true, title: "마커가 클러스터 안에 합쳐져 있는 경우", body: "클러스터를 자동으로 펼치거나 확대해 선택한 매물의 마커를 드러낸 뒤 강조합니다. → 11단계로 진행", target: "[data-tour=sel-marker]", place: "right", run: () => { S({ ...base, cmd: view([37.549, 126.941], 14) }); api.later(() => api.select(0, true), 900); } },
    { uc: "UC-01", ref: "11", title: "강조된 위치와 주변 확인", body: "사용자가 강조된 위치와 주변(학교, 지하철역, 편의점·마트·빨래방 등)을 지도에서 확인합니다. 편의시설의 이름과 도보 거리는 왼쪽 아래 카드에서 볼 수 있습니다.", target: "[data-tour=poi-card]", place: "right", run: () => S({ ...base, selected: 14, cmd: view([37.5512, 126.9405], 17) }) },
    { uc: "UC-01", ref: "12", title: "상세 보기 요청 → UC-03", body: "사용자가 필요하면 매물 상세 보기를 요청합니다. (UC-03, extend)", target: "[data-tour=card-sel]", place: "right", run: () => S({ ...base, selected: 14, cmd: view([37.5512, 126.9405], 17) }) },
  ];
};
