export type Lang = "ko" | "en" | "zh";
export type Tri = Record<Lang, string>;

export type House = {
  id: number;
  deal: "월세" | "전세" | "매매";
  deposit: number; // 만원
  rent: number; // 만원 (전세는 0)
  dong: string; // places 의 key
  type: string;
  rooms: number;
  floor: string;
  area: number; // m²
  desc: Tri;
  complex?: string; // 아파트 단지명
  floorNo?: number; // 아파트 층수
  instant?: boolean;
  fee?: "half" | "full";
  n?: boolean;
  ll: [number, number];
};

// 모두 임의 샘플 데이터
export const houses: House[] = [
  { id: 0, deal: "월세", deposit: 1000, rent: 80, dong: "대흥동", type: "원룸", rooms: 1, floor: "중층", area: 26.45, ll: [37.547, 126.942],
    desc: { ko: "이대역1분 풀옵션 넓은원룸 입주협의", en: "1 min to Ewha Station · fully furnished spacious studio · move-in negotiable", zh: "距梨大站1分钟 · 全配置宽敞单间 · 入住可协商" } },
  { id: 1, deal: "월세", deposit: 500, rent: 80, dong: "염리동", type: "단독", rooms: 2, floor: "고층", area: 26, ll: [37.5495, 126.944],
    desc: { ko: "이대역2분 풀옵션 투룸 채광굿", en: "2 min to Ewha Station · fully furnished 2-room · bright", zh: "距梨大站2分钟 · 全配置两居室 · 采光好" } },
  { id: 2, deal: "월세", deposit: 1000, rent: 65, dong: "대흥동", type: "오피스텔", rooms: 1, floor: "고층", area: 15.97, ll: [37.5455, 126.94],
    desc: { ko: "이대역3분 풀옵션 채광좋은 원룸", en: "3 min to Ewha Station · fully furnished sunny studio", zh: "距梨大站3分钟 · 全配置采光好的单间" } },
  { id: 3, deal: "월세", deposit: 3000, rent: 40, dong: "염리동", type: "단독", rooms: 1, floor: "1층", area: 20, ll: [37.551, 126.9455],
    desc: { ko: "이대역3분 풀옵션 깨끗한 큰 원룸 즉시가능", en: "3 min to Ewha Station · clean large studio · available now", zh: "距梨大站3分钟 · 干净的大单间 · 可立即入住" } },
  { id: 4, deal: "월세", deposit: 1000, rent: 65, dong: "염리동", type: "다세대", rooms: 1, floor: "중층", area: 19.05, ll: [37.5485, 126.9465],
    desc: { ko: "이대역1분 풀옵션 채광굿 깨끗한빌라", en: "1 min to Ewha Station · furnished · bright, clean villa", zh: "距梨大站1分钟 · 全配置 · 采光好的干净别墅" } },
  { id: 5, deal: "월세", deposit: 1000, rent: 100, dong: "대흥동", type: "다가구", rooms: 2, floor: "고층", area: 39.67, ll: [37.544, 126.945],
    desc: { ko: "이대역6분 전용넓은 투룸 채광좋아요", en: "6 min to Ewha Station · spacious 2-room · very bright", zh: "距梨大站6分钟 · 宽敞两居室 · 采光极佳" } },
  { id: 6, deal: "월세", deposit: 1000, rent: 55, dong: "염리동", type: "원룸", rooms: 1, floor: "1층", area: 16.53, instant: true, ll: [37.5525, 126.946],
    desc: { ko: "[염리동즉시입주] 가성비 끝판왕! 내부 깔끔 풀옵", en: "[Yeomni-dong · move in now] Best value! Clean interior, fully furnished", zh: "[盐里洞可立即入住] 性价比之王！室内整洁 全配置" } },
  { id: 7, deal: "월세", deposit: 4500, rent: 30, dong: "염리동", type: "원룸", rooms: 1, floor: "고층", area: 23, ll: [37.5535, 126.944],
    desc: { ko: "이대역1분 분리형 넓은원룸", en: "1 min to Ewha Station · spacious separated-layout studio", zh: "距梨大站1分钟 · 宽敞的分离式单间" } },
  { id: 8, deal: "월세", deposit: 1000, rent: 90, dong: "염리동", type: "원룸", rooms: 1, floor: "1층", area: 10.19, instant: true, fee: "half", n: true, ll: [37.5548, 126.9446],
    desc: { ko: "바로입주가능 복층구조 특이한방", en: "Move in right away · unique duplex layout", zh: "可马上入住 · 特别的复式结构" } },
  { id: 9, deal: "월세", deposit: 500, rent: 80, dong: "대흥동", type: "상가주택", rooms: 2, floor: "중층", area: 25, ll: [37.542, 126.938],
    desc: { ko: "이대역5분 투룸 채광좋아요 빠른입주가능", en: "5 min to Ewha Station · bright 2-room · quick move-in", zh: "距梨大站5分钟 · 采光好的两居室 · 可快速入住" } },
  { id: 10, deal: "월세", deposit: 1000, rent: 100, dong: "염리동", type: "다가구", rooms: 1, floor: "저층", area: 23.14, fee: "full", n: true, ll: [37.547, 126.949],
    desc: { ko: "이대 도보2분 7평 1.5룸 분리형 원룸", en: "2 min walk to Ewha · 1.5-room separated studio", zh: "步行2分钟到梨大 · 1.5居分离式单间" } },
  { id: 11, deal: "전세", deposit: 16000, rent: 0, dong: "대흥동", type: "다세대", rooms: 1, floor: "중층", area: 17.27, ll: [37.54, 126.942],
    desc: { ko: "이대역3분 풀옵션 신축급 버팀목 보증보험가능", en: "3 min to Ewha Station · furnished, almost new · deposit insurance available", zh: "距梨大站3分钟 · 全配置准新房 · 可办押金保险" } },
  { id: 12, deal: "월세", deposit: 1000, rent: 85, dong: "신수동", type: "원룸", rooms: 1, floor: "1층", area: 24.5, instant: true, fee: "half", n: true, ll: [37.5456, 126.9366],
    desc: { ko: "신수동깔끔원룸준신축급지상층완전깔끔빠르게", en: "Neat studio in Sinsu-dong · nearly new, above ground · quick move-in", zh: "新水洞整洁单间 · 准新房 地上层 · 可快速入住" } },
  { id: 13, deal: "월세", deposit: 500, rent: 60, dong: "신수동", type: "원룸", rooms: 1, floor: "저층", area: 18.2, ll: [37.549, 126.9388],
    desc: { ko: "서강대 도보5분 신축 원룸", en: "5 min walk to Sogang Univ. · newly built studio", zh: "步行5分钟到西江大学 · 新建单间" } },
  { id: 14, deal: "월세", deposit: 1000, rent: 70, dong: "신수동", type: "투룸", rooms: 2, floor: "중층", area: 33, ll: [37.5512, 126.9405],
    desc: { ko: "서강대 정문 3분 투룸 남향", en: "3 min from Sogang Univ. main gate · south-facing 2-room", zh: "距西江大学正门3分钟 · 朝南两居室" } },
  { id: 15, deal: "월세", deposit: 300, rent: 50, dong: "창천동", type: "원룸", rooms: 1, floor: "고층", area: 14.5, ll: [37.555, 126.9365],
    desc: { ko: "신촌역 5분 가성비 원룸", en: "5 min to Sinchon Station · great-value studio", zh: "距新村站5分钟 · 高性价比单间" } },
  { id: 16, deal: "월세", deposit: 1000, rent: 75, dong: "창천동", type: "오피스텔", rooms: 1, floor: "중층", area: 21, ll: [37.5557, 126.9372],
    desc: { ko: "신촌역 2분 오피스텔 풀옵션", en: "2 min to Sinchon Station · fully furnished officetel", zh: "距新村站2分钟 · 全配置商住两用房" } },
  { id: 17, deal: "전세", deposit: 12000, rent: 0, dong: "창천동", type: "다세대", rooms: 2, floor: "중층", area: 29, ll: [37.5545, 126.938],
    desc: { ko: "신촌 전세 투룸 보증보험가능", en: "Sinchon jeonse 2-room · deposit insurance available", zh: "新村传贳两居室 · 可办押金保险" } },
  { id: 18, deal: "월세", deposit: 500, rent: 55, dong: "노고산동", type: "원룸", rooms: 1, floor: "1층", area: 16, ll: [37.5518, 126.9385],
    desc: { ko: "서강대 후문 1분 원룸", en: "1 min from Sogang Univ. back gate · studio", zh: "距西江大学后门1分钟 · 单间" } },
  { id: 19, deal: "월세", deposit: 1000, rent: 68, dong: "노고산동", type: "다가구", rooms: 1, floor: "고층", area: 19.5, ll: [37.553, 126.9395],
    desc: { ko: "노고산동 조용한 원룸 채광굿", en: "Quiet, bright studio in Nogosan-dong", zh: "老姑山洞安静的单间 · 采光好" } },
  { id: 20, deal: "월세", deposit: 2000, rent: 60, dong: "아현동", type: "원룸", rooms: 1, floor: "중층", area: 22, ll: [37.557, 126.956],
    desc: { ko: "아현역 3분 넓은 원룸", en: "3 min to Ahyeon Station · spacious studio", zh: "距阿岘站3分钟 · 宽敞单间" } },
  { id: 21, deal: "전세", deposit: 20000, rent: 0, dong: "아현동", type: "다세대", rooms: 2, floor: "고층", area: 36, ll: [37.556, 126.9545],
    desc: { ko: "아현역 5분 신축 투룸 전세", en: "5 min to Ahyeon Station · new 2-room jeonse", zh: "距阿岘站5分钟 · 新建两居室传贳" } },
  { id: 22, deal: "월세", deposit: 1000, rent: 72, dong: "공덕동", type: "오피스텔", rooms: 1, floor: "고층", area: 20, ll: [37.544, 126.9515],
    desc: { ko: "공덕역 1분 오피스텔", en: "1 min to Gongdeok Station · officetel", zh: "距孔德站1分钟 · 商住两用房" } },
  { id: 23, deal: "월세", deposit: 500, rent: 45, dong: "공덕동", type: "원룸", rooms: 1, floor: "저층", area: 15, ll: [37.543, 126.953],
    desc: { ko: "공덕시장 근처 저렴한 원룸", en: "Affordable studio near Gongdeok Market", zh: "孔德市场附近的实惠单间" } },
  { id: 24, deal: "월세", deposit: 1000, rent: 78, dong: "대흥동", type: "투룸", rooms: 2, floor: "중층", area: 31, ll: [37.5475, 126.9435],
    desc: { ko: "이대역 4분 투룸 신축", en: "4 min to Ewha Station · newly built 2-room", zh: "距梨大站4分钟 · 新建两居室" } },
  { id: 25, deal: "월세", deposit: 1000, rent: 62, dong: "대흥동", type: "원룸", rooms: 1, floor: "고층", area: 17, ll: [37.5462, 126.9432],
    desc: { ko: "대흥동 조용한 고층 원룸", en: "Quiet high-floor studio in Daeheung-dong", zh: "大兴洞安静的高层单间" } },
  { id: 26, complex: "공덕 래미안", floorNo: 17, deal: "매매", deposit: 78000, rent: 0, dong: "공덕동", type: "아파트", rooms: 3, floor: "고층", area: 84.9, ll: [37.5455, 126.9505],
    desc: { ko: "공덕역 5분 대단지 아파트 남향 올수리", en: "5 min to Gongdeok Station · large complex · south-facing, fully renovated", zh: "距孔德站5分钟 · 大型小区公寓 · 朝南 全面翻新" } },
  { id: 27, complex: "아현 e편한세상", floorNo: 8, deal: "매매", deposit: 52000, rent: 0, dong: "아현동", type: "아파트", rooms: 2, floor: "중층", area: 59.8, ll: [37.5575, 126.9535],
    desc: { ko: "아현역 3분 역세권 아파트 로얄층", en: "3 min to Ahyeon Station · station-area apartment · premium floor", zh: "距阿岘站3分钟 · 地铁口公寓 · 黄金楼层" } },
  { id: 28, complex: "대흥 래미안", floorNo: 9, deal: "전세", deposit: 38000, rent: 0, dong: "대흥동", type: "아파트", rooms: 3, floor: "중층", area: 74, ll: [37.5448, 126.9468],
    desc: { ko: "이대역 7분 래미안 전세 학군좋음", en: "7 min to Ewha Station · Raemian jeonse · good school district", zh: "距梨大站7分钟 · 来美安传贳 · 学区好" } },
  { id: 29, complex: "신수 성원", floorNo: 3, deal: "전세", deposit: 29000, rent: 0, dong: "신수동", type: "아파트", rooms: 2, floor: "저층", area: 59, ll: [37.5465, 126.9392],
    desc: { ko: "서강대 도보7분 아파트 전세 조용한 단지", en: "7 min walk to Sogang Univ. · apartment jeonse · quiet complex", zh: "步行7分钟到西江大学 · 公寓传贳 · 安静小区" } },
  { id: 30, complex: "염리 롯데캐슬", floorNo: 21, deal: "월세", deposit: 5000, rent: 150, dong: "염리동", type: "아파트", rooms: 3, floor: "고층", area: 84, ll: [37.5518, 126.9478],
    desc: { ko: "염리동 신축급 아파트 월세 풀옵션", en: "Almost-new apartment in Yeomni-dong · monthly rent · fully furnished", zh: "盐里洞准新公寓 · 月租 · 全配置" } },
  { id: 31, complex: "창천 자이", floorNo: 9, deal: "월세", deposit: 3000, rent: 120, dong: "창천동", type: "아파트", rooms: 2, floor: "중층", area: 65, ll: [37.5538, 126.9395],
    desc: { ko: "신촌 도보5분 아파트 월세 즉시입주", en: "5 min walk to Sinchon · apartment for rent · move in now", zh: "步行5分钟到新村 · 公寓月租 · 可立即入住" } },
  { id: 32, deal: "월세", deposit: 1000, rent: 58, dong: "노고산동", type: "원룸", rooms: 1, floor: "저층", area: 17.5, ll: [37.5522, 126.9402],
    desc: { ko: "서강대 도보3분 아늑한 원룸", en: "3 min walk to Sogang Univ. · cozy studio", zh: "步行3分钟到西江大学 · 温馨单间" } },
  { id: 33, deal: "월세", deposit: 500, rent: 70, dong: "창천동", type: "오피스텔", rooms: 1, floor: "고층", area: 22, ll: [37.5543, 126.9355],
    desc: { ko: "신촌역 4분 신축 오피스텔 복층", en: "4 min to Sinchon Station · new duplex officetel", zh: "距新村站4分钟 · 新建复式商住两用房" } },
  { id: 34, deal: "월세", deposit: 2000, rent: 65, dong: "아현동", type: "투룸", rooms: 2, floor: "중층", area: 38, ll: [37.5552, 126.9575],
    desc: { ko: "아현동 넓은 투룸 채광굿 주차가능", en: "Spacious bright 2-room in Ahyeon-dong · parking available", zh: "阿岘洞宽敞两居室 · 采光好 · 可停车" } },
  { id: 35, deal: "전세", deposit: 14000, rent: 0, dong: "공덕동", type: "다세대", rooms: 2, floor: "고층", area: 41, ll: [37.5425, 126.949],
    desc: { ko: "공덕역 6분 투룸 전세 올수리", en: "6 min to Gongdeok Station · renovated 2-room jeonse", zh: "距孔德站6分钟 · 翻新两居室传贳" } },
  { id: 36, deal: "월세", deposit: 1000, rent: 48, dong: "염리동", type: "원룸", rooms: 1, floor: "1층", area: 14, ll: [37.5508, 126.9432],
    desc: { ko: "염리동 저렴한 원룸 즉시입주", en: "Affordable studio in Yeomni-dong · move in now", zh: "盐里洞实惠单间 · 可立即入住" } },
  { id: 37, deal: "월세", deposit: 3000, rent: 85, dong: "대흥동", type: "단독", rooms: 3, floor: "고층", area: 55, ll: [37.5445, 126.9405],
    desc: { ko: "대흥동 단독주택 3룸 마당 있음", en: "Detached 3-room house in Daeheung-dong · with yard", zh: "大兴洞独栋三居室 · 带院子" } },
  { id: 39, deal: "월세", deposit: 5000, rent: 350, dong: "창천동", type: "상가", rooms: 0, floor: "1층", area: 58.4, ll: [37.5548, 126.9372],
    desc: { ko: "신촌역 대로변 코너 상가 업종제한 없음", en: "Corner shop on the main road near Sinchon Station · no business restrictions", zh: "新村站大路边转角店铺 · 无行业限制" } },
  { id: 43, deal: "매매", deposit: 120000, rent: 0, dong: "공덕동", type: "공장", rooms: 0, floor: "저층", area: 165, ll: [37.5428, 126.9508],
    desc: { ko: "공덕동 소형 공장 겸 창고", en: "Small factory and warehouse in Gongdeok-dong", zh: "孔德洞小型工厂兼仓库" } },
  { id: 45, deal: "월세", deposit: 1000, rent: 95, dong: "창천동", type: "오피스텔", rooms: 1, floor: "고층", area: 28, ll: [37.556, 126.939],
    desc: { ko: "신촌 복층 오피스텔 야경 좋은 고층 풀옵션", en: "Duplex officetel in Sinchon · high floor with night view · fully furnished", zh: "新村复式商住两用房 · 高层夜景 · 全配置" } },
  { id: 46, deal: "월세", deposit: 3000, rent: 300, dong: "공덕동", type: "공장", rooms: 0, floor: "1층", area: 180, ll: [37.542, 126.9535],
    desc: { ko: "공덕동 소형 공장 작업대·복층 창고 포함", en: "Small factory in Gongdeok-dong · workbenches and loft storage included", zh: "孔德洞小型工厂 · 含工作台和复式仓库" } },
];

export type Place = { key: string; name: Tri; ll: [number, number]; z: number };

// 검색·지역명 표기용 (동·역·대학교)
export const places: Place[] = [
  { key: "이대역", name: { ko: "이대역", en: "Ewha Univ. Station", zh: "梨大站" }, ll: [37.5568, 126.9467], z: 16 },
  { key: "신촌역", name: { ko: "신촌역", en: "Sinchon Station", zh: "新村站" }, ll: [37.5551, 126.9368], z: 16 },
  { key: "서강대학교", name: { ko: "서강대학교", en: "Sogang University", zh: "西江大学" }, ll: [37.551, 126.941], z: 16 },
  { key: "공덕역", name: { ko: "공덕역", en: "Gongdeok Station", zh: "孔德站" }, ll: [37.5440, 126.9516], z: 16 },
  { key: "대흥동", name: { ko: "대흥동", en: "Daeheung-dong", zh: "大兴洞" }, ll: [37.547, 126.942], z: 16 },
  { key: "염리동", name: { ko: "염리동", en: "Yeomni-dong", zh: "盐里洞" }, ll: [37.55, 126.945], z: 16 },
  { key: "신수동", name: { ko: "신수동", en: "Sinsu-dong", zh: "新水洞" }, ll: [37.5485, 126.938], z: 16 },
  { key: "창천동", name: { ko: "창천동", en: "Changcheon-dong", zh: "昌川洞" }, ll: [37.555, 126.937], z: 16 },
  { key: "노고산동", name: { ko: "노고산동", en: "Nogosan-dong", zh: "老姑山洞" }, ll: [37.5525, 126.939], z: 16 },
  { key: "아현동", name: { ko: "아현동", en: "Ahyeon-dong", zh: "阿岘洞" }, ll: [37.5565, 126.955], z: 16 },
  { key: "공덕동", name: { ko: "공덕동", en: "Gongdeok-dong", zh: "孔德洞" }, ll: [37.5435, 126.952], z: 16 },
];

export const HOME: { ll: [number, number]; z: number } = { ll: [37.549, 126.944], z: 15 };

export const findPlace = (q: string): Place | undefined => {
  const s = q.trim().toLowerCase();
  if (!s) return undefined;
  return places.find((p) => Object.values(p.name).some((n) => n.toLowerCase().includes(s) || s.includes(n.toLowerCase())));
};

export const filterOptions: Record<string, string[]> = {
  deal: ["월세", "전세", "매매"],
  area: ["소형", "중형", "대형"],
  loan: ["없음", "있음"],
  floor: ["1층", "저층", "중층", "고층"],
  opt: ["에어컨", "냉장고", "세탁기", "주차"],
};

export type Filters = Record<string, string[]>;

export type Tab = "apt" | "room" | "villa" | "office" | "shop";
export const tabOf = (h: House): Tab =>
  h.type === "아파트"
    ? "apt"
    : h.type === "오피스텔"
      ? "office"
      : ["상가", "사무실", "건물", "공장", "토지"].includes(h.type)
        ? "shop"
        : ["다세대", "다가구", "단독", "상가주택"].includes(h.type)
          ? "villa"
          : "room";

// 탭마다 면적 구분 기준이 다름 (아파트는 크게)
const areaClass = (h: House) => {
  const t = tabOf(h);
  const [s1, s2] = t === "apt" ? [62, 80] : t === "shop" ? [50, 100] : [16.5, 33];
  return h.area < s1 ? "소형" : h.area < s2 ? "중형" : "대형";
};

// 샘플 데이터용 융자금·옵션 (매물 번호로 정해지는 임의 값)
export const OPTIONS = filterOptions.opt;
export const loanOf = (h: House) => (h.id % 4 === 0 ? "있음" : "없음");
export const optsOf = (h: House) => OPTIONS.filter((_, i) => (h.id + i) % 3 !== 0);

export const matchFilters = (h: House, f: Filters) =>
  (!f.deal?.length || f.deal.includes(h.deal)) &&
  (!f.area?.length || f.area.includes(areaClass(h))) &&
  (!f.floor?.length || f.floor.includes(h.floor)) &&
  (!f.loan?.length || f.loan.includes(loanOf(h))) &&
  (!f.opt?.length || f.opt.every((o) => optsOf(h).includes(o)));
