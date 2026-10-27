import type { Lang } from "./houses";

export type Dict = Record<string, string>;

const ko: Dict = {
  "nav.apt": "아파트", "nav.room": "원∙투룸", "nav.villa": "빌라∙주택", "nav.office": "오피스텔", "nav.shop": "상가∙사무실∙건물∙공장∙토지",
  "hdr.post": "방 내놓기", "hdr.account": "내 계정", "hdr.loggedin": "로그인됨", "hdr.settings": "설정",
  "search.ph": "동, 지하철역, 대학교", "search.ph.apt": "동, 지하철역, 아파트",
  "filter.type": "건물유형", "filter.deal": "거래방식", "filter.area": "전용면적", "filter.floor": "층수", "filter.reset": "초기화", "filter.loan": "융자금", "filter.opt": "옵션",
  "opt.원룸": "원룸", "opt.투룸": "투룸", "opt.오피스텔": "오피스텔", "opt.빌라/주택": "빌라/주택",
  "opt.월세": "월세", "opt.전세": "전세", "opt.매매": "매매",
  "opt.소형": "소형", "opt.중형": "중형", "opt.대형": "대형", "opt.없음": "없음", "opt.있음": "있음", "opt.에어컨": "에어컨", "opt.냉장고": "냉장고", "opt.세탁기": "세탁기", "opt.주차": "주차",
  "opt.1층": "1층", "opt.저층": "저층", "opt.중층": "중층", "opt.고층": "고층",
  "list.count": "{n}개의 매물", "list.sort": "기본순", "sort.title": "정렬", "sort.default": "기본순", "sort.dep": "보증금 낮은순", "sort.rent": "월세 낮은순", "sort.area": "면적 넓은순",
  "type.원룸": "원룸", "type.아파트": "아파트", "type.투룸": "투룸", "type.오피스텔": "오피스텔", "type.단독": "단독", "type.다세대": "다세대", "type.다가구": "다가구", "type.상가주택": "상가주택",
  "floor.1층": "1층", "floor.저층": "저층", "floor.중층": "중층", "floor.고층": "고층",
  "card.deposit": "보증금", "card.rent": "월세", "card.jeonse": "전세", "card.sale": "매매", "sec.nearby": "{place} 주변 좋은 방", "floor.n": "{n}층", "pin.매매": "매", "pin.전세": "전", "pin.월세": "월",
  "card.rooms": "방 {n}개", "card.brokerage": "중개", "card.half": "수수료 30% 할인", "card.full": "수수료 100% 할인",
  "card.instant": "즉시입주", "card.original": "원문 보기", "card.translated": "번역 보기", "card.translatedNote": "번역 서비스로 번역됨", "card.detail": "상세 보기",
  "empty.title": "조건에 맞는 매물이 없습니다", "empty.tip": "필터를 줄이거나 지도를 축소해 보세요.",
  "empty.reset": "필터 초기화", "empty.zoomout": "지도 축소",
  "map.err.title": "지도를 불러오지 못했습니다", "map.err.desc": "지도 없이도 매물 목록은 먼저 확인할 수 있어요.",
  "map.gps": "내 위치", "map.retry": "지도 다시 불러오기", "map.loading": "지도를 불러오는 중…",
  coord: "마포구", "loc.me": "내 위치", "toast.locdenied": "위치 권한이 허용되지 않아 내 위치를 표시할 수 없습니다. 브라우저 설정에서 허용해 주세요.", "poi.title": "주변 정보", "poi.convenience": "편의점", "poi.mart": "마트", "poi.laundry": "빨래방", "poi.short.convenience": "편", "poi.short.mart": "마", "poi.short.laundry": "빨", "poi.walk": "{m}m · 도보 {min}분", "addr.city": "서울특별시", "search.ph.shop": "동, 지하철역, 건물명", "sec.nearby.shop": "{place} 주변 매물", "card.nophoto": "사진 준비 중",
  "type.상가": "상가", "type.사무실": "사무실", "type.건물": "건물", "type.공장": "공장", "type.토지": "토지",
  "set.title": "언어·통화·단위 설정", "set.current": "현재 설정", "set.lang": "언어", "set.cur": "통화", "set.unit": "면적 단위",
  "set.apply": "적용", "set.cancel": "취소",
  "set.rate.loading": "환율을 조회하는 중…",
  "set.rate.ok": "{cur} 1 = ₩{v} ({at} 기준)",
  "set.rate.stale": "환율 서비스 응답 없음 · 저장된 환율 사용 ({at} 기준): {cur} 1 = ₩{v}",
  "set.rate.none": "환율을 불러오지 못해 원화만 표시합니다.",
  "cur.KRW": "원 (₩)", "cur.USD": "달러 ($)", "cur.CNY": "위안 (¥)",
  "unit.m2": "m²", "unit.py": "평", "unit.ft2": "ft²",
  "toast.applied": "설정이 적용되었습니다 (이 기기에 저장)",
  "toast.account": "설정이 계정에 저장되었습니다. 다른 기기에서도 유지됩니다.",
  "toast.cancel": "변경을 취소하고 이전 설정을 유지했습니다.",
  "toast.detail": "상세 보기는 UC-03에서 다룹니다.",
};

const en: Dict = {
  "nav.apt": "Apartments", "nav.room": "Studios & 2-rooms", "nav.villa": "Villas & Houses", "nav.office": "Officetels", "nav.shop": "Commercial & Land",
  "hdr.post": "List a room", "hdr.account": "My account", "hdr.loggedin": "Logged in", "hdr.settings": "Settings",
  "search.ph": "Neighborhood, station, university", "search.ph.apt": "Neighborhood, station, apartment",
  "filter.type": "Type", "filter.deal": "Deal", "filter.area": "Size", "filter.floor": "Floor", "filter.reset": "Reset", "filter.loan": "Loan", "filter.opt": "Options",
  "opt.원룸": "Studio", "opt.투룸": "2-room", "opt.오피스텔": "Officetel", "opt.빌라/주택": "Villa/House",
  "opt.월세": "Monthly rent", "opt.전세": "Jeonse", "opt.매매": "Sale",
  "opt.소형": "Small", "opt.중형": "Medium", "opt.대형": "Large", "opt.없음": "None", "opt.있음": "Has loan", "opt.에어컨": "A/C", "opt.냉장고": "Fridge", "opt.세탁기": "Washer", "opt.주차": "Parking",
  "opt.1층": "1st floor", "opt.저층": "Low", "opt.중층": "Mid", "opt.고층": "High",
  "list.count": "{n} listings", "list.sort": "Default", "sort.title": "Sort", "sort.default": "Default", "sort.dep": "Deposit: low to high", "sort.rent": "Rent: low to high", "sort.area": "Size: large to small",
  "type.원룸": "Studio", "type.아파트": "Apartment", "type.투룸": "2-room", "type.오피스텔": "Officetel", "type.단독": "Detached", "type.다세대": "Villa", "type.다가구": "Multi-unit", "type.상가주택": "Mixed-use",
  "floor.1층": "1F", "floor.저층": "Low floor", "floor.중층": "Mid floor", "floor.고층": "High floor",
  "card.deposit": "Deposit", "card.rent": "Monthly rent", "card.jeonse": "Jeonse deposit", "card.sale": "Sale", "sec.nearby": "Good rooms near {place}", "floor.n": "{n}F", "pin.매매": "S", "pin.전세": "J", "pin.월세": "M",
  "card.rooms": "{n} room(s)", "card.brokerage": "Agent", "card.half": "30% fee discount", "card.full": "100% fee discount",
  "card.instant": "Move in now", "card.original": "View original", "card.translated": "View translation", "card.translatedNote": "Translated by translation service", "card.detail": "View details",
  "empty.title": "No listings match your conditions", "empty.tip": "Try removing filters or zooming out the map.",
  "empty.reset": "Reset filters", "empty.zoomout": "Zoom out",
  "map.err.title": "Couldn't load the map", "map.err.desc": "You can still browse the listings without the map.",
  "map.gps": "My location", "map.retry": "Reload map", "map.loading": "Loading map…",
  coord: "Mapo-gu", "loc.me": "My location", "toast.locdenied": "Location permission is off, so we can't show your location. Please allow it in your browser settings.", "poi.title": "Nearby", "poi.convenience": "Convenience store", "poi.mart": "Mart", "poi.laundry": "Laundromat", "poi.short.convenience": "C", "poi.short.mart": "M", "poi.short.laundry": "L", "poi.walk": "{m} m · {min} min walk", "addr.city": "Seoul", "search.ph.shop": "Neighborhood, station, building", "sec.nearby.shop": "Listings near {place}", "card.nophoto": "Photo coming soon",
  "type.상가": "Shop", "type.사무실": "Office", "type.건물": "Building", "type.공장": "Factory", "type.토지": "Land",
  "set.title": "Language, currency & units", "set.current": "Current", "set.lang": "Language", "set.cur": "Currency", "set.unit": "Area unit",
  "set.apply": "Apply", "set.cancel": "Cancel",
  "set.rate.loading": "Fetching exchange rate…",
  "set.rate.ok": "{cur} 1 = ₩{v} (as of {at})",
  "set.rate.stale": "Exchange service unavailable · using last saved rate (as of {at}): {cur} 1 = ₩{v}",
  "set.rate.none": "Couldn't load exchange rates. Showing KRW only.",
  "cur.KRW": "KRW (₩)", "cur.USD": "USD ($)", "cur.CNY": "CNY (¥)",
  "unit.m2": "m²", "unit.py": "pyeong", "unit.ft2": "ft²",
  "toast.applied": "Settings applied (saved on this device)",
  "toast.account": "Saved to your account. It will carry over to your other devices.",
  "toast.cancel": "Changes discarded. Previous settings kept.",
  "toast.detail": "Details are covered in UC-03.",
};

// 일부 문구는 의도적으로 비워 둠 → 영어로 대체 표시 (UC-02 4A)
const zh: Dict = {
  "nav.apt": "公寓", "nav.room": "单间·两居", "nav.villa": "别墅·住宅", "nav.office": "商住两用", "nav.shop": "商铺·办公·楼宇·工厂·土地",
  "hdr.post": "发布房源", "hdr.account": "我的账户", "hdr.loggedin": "已登录", "hdr.settings": "设置",
  "search.ph": "区域、地铁站、大学", "search.ph.apt": "区域、地铁站、公寓",
  "filter.type": "类型", "filter.deal": "交易方式", "filter.area": "面积", "filter.floor": "楼层", "filter.reset": "重置", "filter.loan": "贷款", "filter.opt": "配置",
  "opt.원룸": "单间", "opt.투룸": "两居室", "opt.오피스텔": "商住两用", "opt.빌라/주택": "别墅/住宅",
  "opt.월세": "月租", "opt.전세": "传贳", "opt.매매": "买卖",
  "opt.소형": "小型", "opt.중형": "中型", "opt.대형": "大型", "opt.없음": "无", "opt.있음": "有", "opt.에어컨": "空调", "opt.냉장고": "冰箱", "opt.세탁기": "洗衣机", "opt.주차": "停车", "opt.1층": "1楼", "opt.저층": "低层", "opt.중층": "中层", "opt.고층": "高层",
  "list.count": "{n}个房源", "list.sort": "默认", "sort.title": "排序", "sort.default": "默认", "sort.dep": "押金从低到高", "sort.rent": "月租从低到高", "sort.area": "面积从大到小",
  "type.원룸": "单间", "type.아파트": "公寓", "type.투룸": "两居室", "type.오피스텔": "商住两用", "type.단독": "独栋", "type.다세대": "别墅", "type.다가구": "多户住宅", "type.상가주택": "商住楼",
  "floor.1층": "1楼", "floor.저층": "低层", "floor.중층": "中层", "floor.고층": "高层",
  "card.deposit": "押金", "card.rent": "月租", "card.jeonse": "传贳押金", "card.sale": "买卖", "sec.nearby": "{place}附近好房源", "floor.n": "{n}层", "pin.매매": "买", "pin.전세": "传", "pin.월세": "月",
  "card.rooms": "{n}间", "card.brokerage": "中介", "card.half": "佣金优惠30%", "card.full": "佣金优惠100%",
  "card.instant": "可立即入住", "card.original": "查看原文", "card.translated": "查看译文", "card.translatedNote": "由翻译服务翻译",
  "empty.title": "没有符合条件的房源", "empty.tip": "请减少筛选条件或缩小地图。",
  "empty.reset": "重置筛选", "empty.zoomout": "缩小地图",
  "map.err.title": "无法加载地图", "map.err.desc": "没有地图也可以先浏览房源列表。",
  "map.gps": "我的位置", "map.retry": "重新加载地图", "map.loading": "正在加载地图…",
  coord: "麻浦区", "loc.me": "我的位置", "toast.locdenied": "未允许位置权限，无法显示您的位置。请在浏览器设置中允许。", "poi.title": "周边信息", "poi.convenience": "便利店", "poi.mart": "超市", "poi.laundry": "自助洗衣店", "poi.short.convenience": "便", "poi.short.mart": "超", "poi.short.laundry": "洗", "poi.walk": "{m}米 · 步行{min}分钟", "addr.city": "首尔特别市", "search.ph.shop": "区域、地铁站、楼宇名", "sec.nearby.shop": "{place}附近房源", "card.nophoto": "照片准备中",
  "type.상가": "商铺", "type.사무실": "办公室", "type.건물": "楼宇", "type.공장": "工厂", "type.토지": "土地",
  "set.title": "语言·货币·单位设置", "set.current": "当前设置", "set.lang": "语言", "set.cur": "货币", "set.unit": "面积单位",
  "set.apply": "应用", "set.cancel": "取消",
  "set.rate.loading": "正在查询汇率…",
  "set.rate.ok": "{cur} 1 = ₩{v}（截至 {at}）",
  "set.rate.stale": "汇率服务无响应 · 使用已保存汇率（截至 {at}）：{cur} 1 = ₩{v}",
  "set.rate.none": "无法获取汇率，仅显示韩元。",
  "cur.KRW": "韩元 (₩)", "cur.USD": "美元 ($)", "cur.CNY": "人民币 (¥)",
  "unit.m2": "m²", "unit.py": "坪", "unit.ft2": "ft²",
  "toast.applied": "设置已应用（保存在本设备）",
  "toast.account": "设置已保存到账户，其他设备也会保留。",
  "toast.cancel": "已取消更改，保留原设置。",
};

export const dicts: Record<Lang, Dict> = { ko, en, zh };

export type TFn = (key: string, vars?: Record<string, string | number>) => string;

export const makeT = (lang: Lang): TFn => (key, vars) => {
  let s = dicts[lang][key] ?? dicts.en[key] ?? dicts.ko[key] ?? key; // 없는 문구는 영어로 대체
  if (vars) for (const k in vars) s = s.replace(`{${k}}`, String(vars[k]));
  return s;
};

export const isFallback = (lang: Lang, key: string) => lang !== "ko" && lang !== "en" && dicts[lang][key] === undefined;
