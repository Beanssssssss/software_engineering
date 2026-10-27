import type { ReactNode } from "react";
import logo from "./img/logo.png";
import asis from "./img/asisdiagram.png";
import cause2 from "./img/cause/2.png";
import tobe from "./img/tobediagram.png";
import UcMainFlow from "@/components/UcMainFlow";
import tobeUc from "./img/tobeusecasediagram.png";

export type Slide = { id: string; label: string; body?: ReactNode; app?: boolean };

// 문제점 번호 → 이름 (현재 시스템의 한계·문제점 슬라이드와 동일)
const P1 = "외국어 미지원";
const P2 = "지도-목록 연동 오류";
const P3 = "내 위치 표시 없음";
const P4 = "주변 생활 정보 부족";

const stakeholders: [string, string, string, string][] = [
  ["S1", "임차인(내국인)", "최종 사용자", "지도에서 매물을 검색해 방을 구하는 내국인 사용자"],
  ["S2", "외국인 임차인(유학생 등)", "최종 사용자 (주 사용자)", "한국어와 부동산 용어에 익숙하지 않은 외국인 사용자"],
  ["S3", "임대인", "최종 사용자", "직거래로 매물을 등록하고 문의에 답하는 사람"],
  ["S4", "공인중개사", "최종 사용자, 광고 구매 고객", "중개 매물을 등록하고 문의에 응대하는 사람"],
  ["S5", "운영자", "운영자", "번역 품질과 서비스 운영을 관리하는 사람"],
  ["S6", "개발·유지보수팀", "개발자, 유지보수자", "서비스를 개선·배포·유지하는 팀"],
  ["S7", "피터팬 사업자(경영진)", "고객(서비스 소유자)", "서비스를 소유하고 수익에 책임지는 주체"],
  ["S8", "네이버 지도 API 제공자", "공급자", "지도·위치 정보를 제공하는 외부 서비스"],
  ["S9", "번역 서비스 제공자", "공급자", "매물 설명·문의 메시지 번역을 제공하는 외부 서비스"],
  ["S10", "환율 서비스 제공자", "공급자", "환율 정보를 제공하는 외부 서비스"],
];

const needs: [string, string, string, string[]][] = [
  ["S1 임차인(내국인)", "방을 빠르고 쉽게 구한다", "목록에서 고른 매물의 위치가 지도에 정확히 강조됨, 지도와 목록이 일치함, 내 위치를 지도에서 바로 확인, 선택한 매물 주변 편의시설 확인", [P2, P3, P4]],
  ["S2 외국인 임차인", "한국어를 몰라도 방을 구한다", "외국어 화면, 매물 설명 번역, 가격 표기 풀이와 용어 설명, 내 통화·단위 표시, 외국어 문의, 내 위치 표시, 주변 편의시설(편의점·마트·빨래방) 정보", [P1, P3, P4]],
  ["S3 임대인", "매물을 쉽게 알리고 임차인과 소통한다", "내 매물이 지도에 정확히 표시됨, 외국인에게도 이해되게 노출됨, 외국인 문의를 번역해서 받음, 주변 편의시설과 함께 매물 매력 전달", [P1, P2, P4]],
  ["S4 공인중개사", "매물을 노출해 문의로 연결한다", "매물이 지도에 빠짐없이 표시됨, 번역된 설명으로 외국인 문의 확대, 외국인 문의를 번역해서 받음, 주변 편의시설과 함께 매물 매력 전달", [P1, P2, P4]],
  ["S5 운영자", "서비스를 안정적으로 운영한다", "번역 품질 관리(오류 수정, 신고 처리), 지도 오류 모니터링", [P1, P2]],
  ["S6 개발·유지보수팀", "개선과 배포를 쉽게 한다", "언어를 추가해도 화면 수정이 적은 구조, 지도 오류 재현·수정이 쉬운 구조", [P1, P2]],
  ["S7 피터팬 사업자", "이용자와 수익을 늘린다", "외국인 시장 확대, 이용 불편 감소", [P1, P2, P3, P4]],
  ["S8 네이버 지도 API 제공자", "지도 서비스를 안정적으로 제공한다", "API 규격 준수, 마커·클러스터 기능과의 안정적 연동, 내 위치·주변 시설 표시와의 연동", [P2, P3, P4]],
  ["S9 번역 서비스 제공자", "번역을 안정적으로 제공한다", "API 규격 준수, 번역 품질·비용 관리, 교체 가능한 연동 구조", [P1]],
  ["S10 환율 서비스 제공자", "환율을 안정적으로 제공한다", "API 규격 준수, 최신 환율 제공", [P1]],
];

// [대분류, 세부 특성, As-Is 문제, 관련 문제점, To-Be 개선 방안]
const qualities: [string, string, string, string, string][] = [
  ["Interaction Capability", "Inclusivity", "외국어 UI 없음", P1, "언어 선택 기능 제공 (영어, 중국어 등). 메뉴·필터·매물 설명 번역"],
  ["Interaction Capability", "User assistance / Self-descriptiveness", "보증금/월세, 옵션 등 한국식 표기를 외국인이 이해하기 어려움", P1, "용어 설명 툴팁, 1,000/85를 \"보증금 1,000만원 / 월세 85만원\"으로 풀어서 표시"],
  ["Interaction Capability", "Operability", "목록 클릭 시 지도 마커가 가려짐", P2, "선택한 매물의 마커를 맨 위에 강조 표시하고 지도를 그 위치로 이동"],
  ["Interaction Capability", "Operability", "지도에 내 위치가 표시되지 않아 내 주변 매물을 찾기 어려움", P3, "내 위치 버튼으로 현재 위치를 지도에 표시하고 그 위치로 이동하며 지역 표시에 내 위치를 보여줌. 위치 권한이 없으면 안내"],
  ["Functional Suitability", "Functional correctness", "클러스터 밖에 마커가 찍히는 등 지도와 목록이 불일치", P2, "지도·목록·클러스터가 같은 데이터로 계산되게 하여 매물 수와 위치를 항상 일치시킴"],
  ["Functional Suitability", "Functional completeness", "매물을 선택해도 주변 편의점·마트·빨래방 정보가 없어 동네를 따로 검색해야 함", P4, "선택한 매물 주변의 편의점·마트·빨래방을 지도에 표시하고 이름과 도보 거리를 카드로 보여줌"],
  ["Flexibility", "Adaptability", "사용자의 언어·지역에 맞춘 표기 없음", P1, "통화(원, 달러, 위안 등)와 면적 단위(m², 평, ft²)를 사용자 설정에 맞춰 환산 표시"],
];

// [ID, 요구사항명, 구분, 요구사항 설명, 출처(주체), 출처(문제점), 중요도]
type Req = [string, string, string, string, string, string, string];

const frs: Req[] = [
  ["FR-01", "언어 선택", "기능", "사용자가 언어(한국어, 영어, 중국어)를 선택하면 메뉴·필터·안내문 등 화면 전체가 해당 언어로 바뀐다.", "외국인 임차인", P1, "Must"],
  ["FR-02", "매물 설명 번역", "기능", "매물 제목·설명·옵션을 번역 서비스로 번역해 보여 주고, 원문도 볼 수 있다.", "외국인 임차인, 임대인, 공인중개사", P1, "Must"],
  ["FR-03", "가격 표기 풀이", "기능", "월세 1,000/85를 \"보증금 1,000만원 / 월세 85만원\"처럼 풀어서 표시한다.", "외국인 임차인", P1, "Must"],
  ["FR-04", "용어 설명 툴팁", "기능", "보증금, 관리비, 옵션 등 부동산 용어에 마우스를 올리거나 누르면 설명이 표시된다.", "외국인 임차인", P1, "Should"],
  ["FR-05", "통화 환산 표시", "기능", "사용자가 선택한 통화(원, 달러, 위안 등)로 가격을 환산해 함께 표시한다. 환율은 환율 서비스에서 조회한다.", "외국인 임차인, 사업자", P1, "Should"],
  ["FR-06", "면적 단위 전환", "기능", "전용면적을 m², 평, ft² 중 사용자가 선택한 단위로 표시한다.", "외국인 임차인", P1, "Could"],
  ["FR-07", "선택 매물 마커 강조", "기능", "목록에서 매물을 선택하면 지도에서 해당 마커가 다른 요소에 가려지지 않게 맨 위에 강조되고, 지도가 그 위치로 이동한다.", "임차인, 외국인 임차인", P2, "Must"],
  ["FR-08", "지도-목록 연동", "기능", "지도 영역을 이동·확대하면 목록이 같은 범위의 매물로 갱신되고, 클러스터에 표시된 숫자의 합과 목록 개수가 일치한다.", "임차인, 임대인, 공인중개사", P2, "Must"],
  ["FR-10", "내 위치 표시", "기능", "내 위치 버튼을 누르면 현재 위치를 지도에 점으로 표시하고 지도를 그 위치로 이동하며, 지역 표시에 내 위치를 보여준다. 위치 권한이 없으면 안내 문구를 보여준다.", "임차인, 외국인 임차인", P3, "Should"],
  ["FR-11", "주변 편의시설 표시", "기능", "매물을 선택하면 주변의 편의점·마트·빨래방 위치를 지도에 표시하고, 이름과 도보 거리를 카드로 보여준다.", "임차인, 외국인 임차인", P4, "Should"],
  ["FR-09", "번역 품질 관리", "기능", "운영자가 번역 오류를 수정하거나 신고를 처리할 수 있다.", "운영자", P1, "Could"],
];

const qrs: Req[] = [
  ["QR-01", "다국어 지원 범위", "Interaction Capability (Inclusivity)", "지원 언어는 3개 이상이고, 검색·상세·문의 등 주요 화면의 번역 적용률은 100%이다.", "외국인 임차인", P1, "Must"],
  ["QR-02", "가격·용어 이해도", "Interaction Capability (User assistance, Self-descriptiveness)", "외국인 사용자의 90% 이상이 별도 도움 없이 매물 가격과 조건을 올바르게 해석한다.", "외국인 임차인", P1, "Should"],
  ["QR-03", "마커 강조 반응성", "Interaction Capability (Operability)", "목록에서 매물을 선택한 후 1초 이내에 해당 마커가 강조되어 보인다.", "임차인", P2, "Must"],
  ["QR-04", "지도-목록 일치 정확성", "Functional Suitability (Functional correctness)", "같은 지도 영역에서 지도 마커(클러스터 포함) 수와 목록 매물 수의 불일치는 0건이다.", "임차인, 공인중개사", P2, "Must"],
  ["QR-05", "통화·단위 적응", "Flexibility (Adaptability)", "통화는 3종 이상, 면적 단위는 3종을 지원하고 사용자 설정을 유지한다.", "외국인 임차인, 사업자", P1, "Should"],
  ["QR-07", "내 위치 표시 반응성", "Interaction Capability (Operability)", "내 위치 버튼을 누른 후 2초 이내에 내 위치가 지도에 표시된다.", "임차인", P3, "Should"],
  ["QR-08", "주변 정보 표시 완전성", "Functional Suitability (Functional completeness)", "매물을 선택하면 편의점·마트·빨래방 3종의 위치와 도보 거리가 모두 표시된다.", "임차인, 외국인 임차인", P4, "Should"],
  ["QR-06", "번역 서비스 교체 용이성", "Flexibility (Replaceability)", "번역 서비스를 다른 서비스로 바꿔도 화면 기능 변경 없이 연동만 교체할 수 있다.", "개발팀", P1, "Could"],
];

const reqTable = (rows: Req[], kind: string) => (
  <table className="s-table req">
    <thead>
      <tr><th>ID</th><th>요구사항명</th><th>{kind}</th><th>요구사항 설명</th><th>요구사항 출처</th><th>중요도</th></tr>
    </thead>
    <tbody>
      {[...rows].sort((a, b) => a[0].localeCompare(b[0])).map(([id, name, type, desc, who, prob, level]) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{type}</td>
          <td>{desc}</td>
          <td>{who} / <span className="prob">{prob}</span></td>
          <td className={`lv ${level.toLowerCase()}`}>{level}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const actors: [string, string, string][] = [
  ["주 Actor", "임차인", "방을 구하는 내국인 사용자"],
  ["주 Actor", "외국인 임차인", "임차인의 한 유형(유학생 등). 임차인을 상속"],
  ["주 Actor", "임대인", "직거래로 매물을 올리는 사람"],
  ["주 Actor", "공인중개사", "중개 매물을 올리고 문의에 응대하는 사람"],
  ["주 Actor", "운영자", "번역 품질 등 서비스를 관리하는 사람"],
  ["외부 시스템 Actor", "네이버 지도 API", "지도·위치 정보 제공"],
  ["외부 시스템 Actor", "환율 서비스", "환율 정보 제공"],
  ["외부 시스템 Actor", "번역 서비스", "번역 결과 제공"],
];

const goals: [string, string[]][] = [
  ["임차인", ["원하는 지역의 매물을 지도에서 찾고 위치를 확인한다", "언어·통화·단위를 설정한다", "매물 상세 정보를 확인한다", "내 위치와 선택한 매물의 주변 편의시설을 확인한다", "매물에 대해 문의한다"]],
  ["외국인 임차인", ["자신의 언어, 통화, 단위로 화면과 가격을 보고 방을 구한다 (임차인의 목표를 모두 포함)"]],
  ["임대인", ["매물을 등록하고, 문의에 답한다"]],
  ["공인중개사", ["중개 매물을 등록하고, 문의에 답한다"]],
  ["운영자", ["번역 오류를 수정해 서비스 품질을 유지한다"]],
  ["네이버 지도 API", ["지도·위치 정보를 정확히 제공한다"]],
  ["환율 서비스", ["최신 환율 정보를 제공한다"]],
  ["번역 서비스", ["요청된 문구(매물 설명, 문의 메시지)를 번역해 돌려준다"]],
];

const useCases: [string, string, string][] = [
  ["UC-01", "지도에서 매물 검색하고 위치 확인하기", "FR-07, FR-08, FR-10, FR-11, QR-03, QR-04, QR-07, QR-08"],
  ["UC-02", "언어·통화·단위 설정하기", "FR-01, FR-05, FR-06, QR-01, QR-05"],
  ["UC-03", "매물 상세 보기", "FR-02, FR-03, FR-04, QR-02"],
  ["UC-04", "매물 문의하기", "FR-02 (문의 내용 번역 시)"],
  ["UC-05", "매물 등록하기", "FR-02"],
  ["UC-06", "번역 품질 관리하기", "FR-09, QR-06"],
];

// Actor-Use case 매트릭스: 각 Actor가 참여하는 UC 번호
const matrix: [string, number[]][] = [
  ["임차인", [1, 2, 3, 4]],
  ["외국인 임차인 (임차인 상속)", [1, 2, 3, 4]],
  ["임대인", [4, 5]],
  ["공인중개사", [4, 5]],
  ["운영자", [6]],
  ["네이버 지도 API", [1, 3]],
  ["환율 서비스", [2, 3]],
  ["번역 서비스", [3, 4, 5, 6]],
];

// ── UC-01 Use Case Description ──
const UC01 = "UC-01. 지도에서 매물 검색하고 위치 확인하기";

// [주체, 내용, To-Be 여부]
const uc01Main: [string, string, boolean][] = [
  ["사용자는", "지도 검색 화면에 진입한다.", false],
  ["시스템은", "네이버 지도 API에 지도 정보를 요청한다.", false],
  ["네이버 지도 API는", "지도 정보를 시스템에 제공한다.", false],
  ["사용자는", "검색창에 동·지하철역·대학교 이름을 입력하거나 필터(월세, 면적, 층수 등)를 선택한다.", false],
  ["시스템은", "조건에 맞는 매물을 조회하고 해당 위치로 지도를 이동한다.", false],
  ["시스템은", "지도 영역 안의 매물을 하나의 데이터로 계산하여 마커와 클러스터를 지도에 표시하고, 클러스터 숫자의 합과 목록의 매물 수가 일치하도록 목록을 함께 표시한다. 클러스터 밖에는 마커를 따로 표시하지 않는다.", true],
  ["사용자는", "지도를 이동하거나 확대·축소한다.", false],
  ["시스템은", "변경된 지도 영역에 맞춰 마커·클러스터·목록을 함께 갱신한다.", true],
  ["사용자는", "목록에서 매물 하나를 선택한다.", false],
  ["시스템은", "선택한 매물의 마커를 다른 마커와 클러스터에 가려지지 않게 맨 위에 강조 표시하고, 지도를 그 위치로 이동하며, 목록에 선택 상태를 표시하며, 주변 편의시설(편의점·마트·빨래방)의 위치와 도보 거리를 함께 표시한다.", true],
  ["사용자는", "강조된 위치와 주변(지하철역, 학교, 편의점·마트·빨래방 등)을 지도에서 확인한다.", false],
  ["사용자는", "필요하면 매물 상세 보기를 요청한다. → UC-03", false],
];

// [번호, 조건, To-Be 여부, 처리 내용]
const uc01Alt: [string, string, boolean, string[]][] = [
  ["3A", "네이버 지도 API와의 통신에 실패한 경우", false, ["시스템은 지도를 불러오지 못했음을 안내하고 목록만 먼저 표시한다.", "시스템은 \"지도 다시 불러오기\" 기능을 제공한다.", "사용자가 다시 불러오기를 선택하면 → 2단계로 복귀"]],
  ["4B", "사용자가 내 위치 버튼을 선택한 경우", true, ["시스템은 현재 위치를 지도에 점으로 표시하고 지도를 그 위치로 이동하며, 지역 표시에 내 위치를 함께 보여준다.", "→ 5단계로 진행"]],
  ["4C", "위치 권한을 허용하지 않은 경우", true, ["시스템은 내 위치를 표시할 수 없음을 안내하고 권한 허용 방법을 알려준다.", "→ 4단계로 복귀"]],
  ["5A", "조건에 맞는 매물이 없는 경우", false, ["시스템은 조건에 맞는 매물이 없음을 안내하고 조건 완화 방법을 제안한다.", "→ 4단계로 복귀"]],
  ["7A", "사용자가 클러스터를 선택한 경우", false, ["시스템은 해당 지역으로 확대하거나 클러스터를 펼쳐 개별 마커를 표시하고, 목록을 해당 매물로 좁힌다.", "→ 9단계로 진행"]],
  ["9A", "사용자가 지도의 마커를 직접 선택한 경우", false, ["시스템은 목록에서 해당 매물을 강조하고 목록 위치를 스크롤한다.", "→ 11단계로 진행"]],
  ["10A", "선택한 매물이 현재 지도 화면 밖에 있는 경우", true, ["시스템은 지도를 해당 매물이 보이는 위치로 자동 이동하고 마커를 강조한다.", "→ 11단계로 진행"]],
  ["10B", "선택한 매물의 마커가 클러스터 안에 합쳐져 있는 경우", true, ["시스템은 클러스터를 자동으로 펼치거나 확대해 선택한 매물의 마커를 드러낸 뒤 강조한다.", "→ 11단계로 진행"]],
];

// [제목, 항목들] — 항목 앞의 [To-Be] 표시는 tobe 플래그로 구분
const uc01Etc: [string, [string, boolean][]][] = [
  ["Stakeholder and Interest", [
    ["임차인: 목록에서 고른 매물의 위치를 지도에서 바로 확인하고, 내 위치와 주변 편의시설도 보고 싶음", false],
    ["외국인 임차인: 언어 설정이 적용된 상태에서 같은 방식으로 위치와 주변 편의시설을 확인하고 싶음", false],
    ["임대인·공인중개사: 내 매물이 지도에 정확하게 노출되길 원함", false],
    ["피터팬 사업자: 지도 사용 불편을 줄여 이용을 늘리고 싶음", false],
  ]],
  ["Pre-condition", [
    ["사용자는 서비스에 접속해 있어야 한다. 로그인은 필요하지 않다.", false],
  ]],
  ["Post-condition", [
    ["조건에 맞는 매물이 지도와 목록에 같은 수로 표시된다.", false],
    ["사용자는 선택한 매물의 위치를 지도에서 확인할 수 있다.", false],
    ["언어·통화·단위 설정(UC-02)이 있으면 그 설정으로 표시된다.", false],
  ]],
  ["Special Requirements", [
    ["Interaction Capability (Operability): 목록에서 매물을 선택한 후 1초 이내에 해당 마커가 강조되어 보여야 함", true],
    ["Functional Suitability (Functional correctness): 같은 지도 영역에서 지도 마커(클러스터 포함) 수와 목록 매물 수의 불일치는 0건이어야 함", true],
    ["Interaction Capability (Operability): 내 위치 버튼을 누른 후 2초 이내에 내 위치가 지도에 표시되어야 함", true],
    ["Functional Suitability (Functional completeness): 매물 선택 시 편의점·마트·빨래방 3종이 모두 표시되어야 함", true],
  ]],
];

const tobeBadge = <span className="badge-tobe">To-Be</span>;

type UcMain = [string, string, boolean][];
type UcAlt = [string, string, boolean, string[]][];
type UcEtc = [string, [string, boolean][]][];

// Use Case Description 3장 (Main Success Flow / Alternate Flow / 그 외)
function ucSlides(c: { code: string; name: string; primary: string; supporting: string; main: UcMain; alt: UcAlt; etc: UcEtc }): Slide[] {
  return [
    {
      id: `${c.code}-main`,
      label: `${c.code} Main Success Flow`,
      body: (
        <>
          <h2 className="s-h tight">Use Case Description · Main Success Flow</h2>
          <p className="uc-name">{c.name}</p>
          <p className="uc-meta">
            <span><em>Primary Actor</em>{c.primary}</span>
            <span><em>Supporting Actor</em>{c.supporting}</span>
          </p>
          <UcMainFlow steps={c.main} alts={c.alt} />
        </>
      ),
    },
    {
      id: `${c.code}-alt`,
      label: `${c.code} Alternate Flow`,
      body: (
        <>
          <h2 className="s-h tight">Use Case Description · Alternate Flow</h2>
          <p className="uc-name">{c.name}</p>
          <div className={`uc-alt${c.alt.length > 6 ? " dense" : ""}`}>
            {c.alt.map(([no, cond, tb, lines]) => (
              <div className="uc-box" key={no}>
                <h4>{no}. {tb && tobeBadge}{cond}</h4>
                <ul>
                  {lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: `${c.code}-etc`,
      label: `${c.code} Stakeholder·조건·요구사항`,
      body: (
        <>
          <h2 className="s-h tight">Use Case Description · Stakeholder, 조건, 요구사항</h2>
          <p className="uc-name">{c.name}</p>
          <div className="uc-alt">
            {c.etc.map(([title, items]) => (
              <div className="uc-box" key={title}>
                <h4>{title}</h4>
                <ul>
                  {items.map(([text, tb]) => (
                    <li key={text}>{tb && tobeBadge}{text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];
}

// ── UC-02 ──
const UC02 = "UC-02. 언어·통화·단위 설정하기";

const uc02Main: UcMain = [
  ["사용자는", "설정 메뉴에서 언어·통화·단위 설정을 요청한다.", false],
  ["시스템은", "현재 설정과 선택 가능한 목록(언어 3개 이상, 통화 3종 이상, 면적 단위 3종)을 표시한다.", true],
  ["사용자는", "언어(예: 영어)를 선택한다.", false],
  ["시스템은", "자체 언어 리소스를 이용해 메뉴·필터·안내문 등 화면 전체를 선택한 언어로 전환한다.", true],
  ["사용자는", "통화(예: 달러)와 면적 단위(예: ft²)를 선택한다.", false],
  ["시스템은", "선택한 통화의 환율 조회를 환율 서비스에 요청한다.", true],
  ["환율 서비스는", "환율 정보를 시스템에 제공한다.", true],
  ["사용자는", "설정 적용을 요청한다.", false],
  ["시스템은", "선택한 언어·통화·단위를 저장하고 적용 완료를 안내한다.", true],
  ["시스템은", "UC-01(지도에서 매물 검색하고 위치 확인하기)을 수행한다. (include) 이때 가격은 선택한 통화로 환산해 함께 표시하고, 면적은 선택한 단위로 표시한다.", false],
];

const uc02Alt: UcAlt = [
  ["4A", "선택한 언어의 번역 문구가 일부 없는 경우", true, ["시스템은 해당 문구만 영어로 대체해 표시한다.", "→ 5단계로 진행"]],
  ["5A", "사용자가 통화와 단위를 모두 변경하지 않는 경우", false, ["시스템은 언어만 변경하고 통화는 원화, 면적은 m²를 유지한다.", "→ 8단계로 진행"]],
  ["5B", "사용자가 통화만 변경하는 경우", false, ["시스템은 선택한 통화로 환율을 조회하고 면적은 m²를 유지한다.", "→ 6단계로 진행"]],
  ["5C", "사용자가 면적 단위만 변경하는 경우", false, ["시스템은 선택한 단위를 적용하고 통화는 원화를 유지한다. 환율 조회는 생략한다.", "→ 8단계로 진행"]],
  ["7A", "환율 서비스가 응답하지 않는 경우", true, ["시스템은 마지막으로 저장된 환율을 기준 시각과 함께 사용한다.", "저장된 환율이 없으면 시스템은 원화만 표시하고 환율을 불러오지 못했음을 안내한다.", "→ 8단계로 진행"]],
  ["8A", "사용자가 취소를 선택한 경우", false, ["시스템은 변경 내용을 버리고 이전 설정을 유지한 채 종료한다."]],
  ["9A", "로그인한 사용자가 설정을 변경한 경우", false, ["시스템은 설정을 계정에 저장하여 다른 기기에서도 유지한다. (비로그인 사용자는 해당 기기에만 저장)", "→ 10단계로 진행"]],
];

const uc02Etc: UcEtc = [
  ["Stakeholder and Interest", [
    ["외국인 임차인: 한국어를 몰라도 자신의 언어·통화·단위로 서비스를 사용하고 싶음", false],
    ["임차인: 필요하면 원하는 단위로 정보를 보고 싶음", false],
    ["피터팬 사업자: 외국인 이용자를 늘려 시장을 확대하고 싶음", false],
    ["개발·유지보수팀: 언어를 추가해도 화면 수정이 적은 구조를 원함", false],
  ]],
  ["Pre-condition", [
    ["사용자는 서비스에 접속해 있어야 한다. 로그인은 필요하지 않다.", false],
  ]],
  ["Post-condition", [
    ["선택한 언어·통화·단위가 저장되고 화면에 적용된다.", false],
    ["지도 검색 결과가 선택한 설정으로 표시된다.", false],
  ]],
  ["Special Requirements", [
    ["Interaction Capability (Inclusivity): 지원 언어는 3개 이상이고 주요 화면의 번역 적용률은 100%여야 함", true],
    ["Flexibility (Adaptability): 통화는 3종 이상, 면적 단위는 3종을 지원하고 설정이 유지되어야 함", true],
  ]],
];

// ✏️ 발표 내용은 여기서만 수정하면 돼요. (JSX 그대로 사용 가능)
export const slides: Slide[] = [
  {
    id: "title",
    label: "표지",
    body: (
      <div className="s-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="s-logo" src={logo.src} alt="" />
        <h1 className="s-title">피터팬의 좋은방 구하기</h1>
        <p className="s-meta">20221518 구종빈 </p>
      </div>
    ),
  },
  {
    id: "purpose",
    label: "시스템 목적",
    body: (
      <>
        <h2 className="s-h">시스템 목적</h2>
        <ul className="s-list">
          <li><b>직거래 매물과 중개 매물</b>을 한곳에 모아 보여준다</li>
          <li><b>검증된 매물</b>과 <b>실거주 후기</b>로 믿을 수 있는 방 구하기를 돕는다</li>
          <li>부동산 정보 플랫폼</li>
        </ul>
      </>
    ),
  },
  {
    id: "users",
    label: "사용자",
    body: (
      <>
        <h2 className="s-h">사용자</h2>
        <ul className="s-list">
          <li><b>임차인/매수자</b> : 방을 구하는 사람. 주 사용자</li>
          <li><b>임대인</b> : 직거래로 매물을 등록하는 사람</li>
          <li><b>공인중개사</b> : 중개 매물을 등록하는 사람</li>
          <li><b>운영자</b> : 매물 검증, 후기 관리, 회원 관리 담당</li>
        </ul>
      </>
    ),
  },
  {
    id: "features",
    label: "주요 기능",
    body: (
      <>
        <h2 className="s-h">주요 기능</h2>
        <ol className="s-feat">
          <li><b>매물 검색</b>아파트, 빌라, 원룸, 오피스텔 매물을 지도에서 조회하고, 상세 필터(반려동물, 전세대출 등)로 걸러냅니다.</li>
          <li><b>매물 등록/관리</b>임대인과 공인중개사가 매물을 올립니다.</li>
          <li><b>매물 검증</b>중개사 네임택 인증, 네이버 부동산 제휴, 직거래 재검증으로 허위매물을 줄입니다.</li>
          <li><b>실거주 후기</b>층간소음, 채광, 주차 등의 후기를 조회하고 평점을 확인합니다.</li>
          <li><b>부가 정보</b>실거래가와 학군 정보를 제공합니다.</li>
        </ol>
      </>
    ),
  },
  {
    id: "asis",
    label: "AS-IS System Diagram",
    body: (
      <>
        <h2 className="s-h">AS-IS Diagram</h2>
        <div className="s-diagram">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asis.src} alt="AS-IS Diagram" />
        </div>
      </>
    ),
  },
  {
    id: "limits",
    label: "현재 시스템의 한계·문제점",
    body: (
      <>
        <h2 className="s-h tight">현재 시스템의 한계·문제점</h2>
        <ol className="s-prob four">
          <li>
            <b>외국어 미지원</b>
            <p>
              <em>근거</em>
              <span>
                화면의 메뉴, 필터, 매물 설명이 모두 한국어뿐이고 언어 전환 버튼이 없습니다.
                <br />
                앱스토어 리뷰에도 “English please”라는 지적이 3건 있었습니다.
              </span>
            </p>
            <p><em>품질 특성</em>Interaction Capability (Inclusivity)</p>
          </li>
          <li>
            <b>지도-목록 연동 오류 (마커 가림, 클러스터 밖 마커)</b>
            <p><em>근거</em>직접 사용 (스크린샷)</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="s-evidence" src={cause2.src} alt="지도에서 마커가 추천부동산 배너에 가려진 화면" />
            <p><em>품질 특성</em>Interaction Capability (Operability), Functional Suitability (정확성)</p>
          </li>
          <li>
            <b>내 위치 표시 없음</b>
            <p><em>근거</em>지도에 현재 위치가 표시되지 않아 내 주변 매물을 찾기 어렵습니다. (직접 사용)</p>
            <p><em>품질 특성</em>Interaction Capability (Operability), Functional Suitability (Functional completeness)</p>
          </li>
          <li>
            <b>주변 생활 정보 부족</b>
            <p><em>근거</em>매물을 선택해도 주변 편의점·마트·빨래방 정보가 나오지 않아 동네를 따로 검색해야 합니다. (직접 사용)</p>
            <p><em>품질 특성</em>Functional Suitability (Functional completeness), Interaction Capability (User assistance)</p>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "stakeholders",
    label: "Stakeholder 식별",
    body: (
      <>
        <h2 className="s-h tight">Stakeholder 식별</h2>
        <table className="s-table">
          <thead>
            <tr><th></th><th>Stakeholder</th><th>유형</th><th>설명</th></tr>
          </thead>
          <tbody>
            {stakeholders.map(([id, name, type, desc]) => (
              <tr key={id}><td>{id}</td><td>{name}</td><td>{type}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "needs",
    label: "Stakeholder별 목적/니즈",
    body: (
      <>
        <h2 className="s-h tight">Stakeholder별 목적/니즈 식별</h2>
        <table className="s-table needs">
          <thead>
            <tr><th>Stakeholder</th><th>목적</th><th>니즈</th><th>문제점</th></tr>
          </thead>
          <tbody>
            {needs.map(([who, goal, need, probs]) => (
              <tr key={who}>
                <td>{who}</td>
                <td>{goal}</td>
                <td>{need}</td>
                <td className="probs">{probs.map((p) => <span key={p}>{p}</span>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "quality",
    label: "중요 품질 특성별 개선방안",
    body: (
      <>
        <h2 className="s-h tight">중요 품질 특성별 개선방안 식별</h2>
        <table className="s-table quality">
          <thead>
            <tr><th>대분류</th><th>세부 특성</th><th>As-Is 문제</th><th>To-Be 개선 방안</th></tr>
          </thead>
          <tbody>
            {qualities.map(([group, sub, asis, prob, improve], n) => (
              <tr key={`${group}-${sub}-${n}`}>
                {qualities[n - 1]?.[0] !== group && (
                  <td rowSpan={qualities.filter((q) => q[0] === group).length}>{group}</td>
                )}
                <td>{sub}</td>
                <td>{asis} <span className="prob">({prob})</span></td>
                <td>{improve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "tobe",
    label: "To-Be System Diagram",
    body: (
      <>
        <h2 className="s-h">To-Be Diagram</h2>
        <div className="s-diagram">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tobe.src} alt="To-Be Diagram" />
        </div>
      </>
    ),
  },
  {
    id: "fr",
    label: "주요 고객 요구사항(기능)",
    body: (
      <>
        <h2 className="s-h tight">주요 고객 요구사항(기능)</h2>
        {reqTable(frs, "구분")}
      </>
    ),
  },
  {
    id: "qr",
    label: "주요 고객 요구사항(품질)",
    body: (
      <>
        <h2 className="s-h tight">주요 고객 요구사항(품질)</h2>
        {reqTable(qrs, "구분 (품질 특성)")}
      </>
    ),
  },
  {
    id: "actors",
    label: "Actor List",
    body: (
      <>
        <h2 className="s-h tight">Actor List</h2>
        <table className="s-table uc">
          <thead>
            <tr><th>구분</th><th>Actor</th><th>설명</th></tr>
          </thead>
          <tbody>
            {actors.map(([kind, name, desc]) => (
              <tr key={name}><td>{kind}</td><td>{name}</td><td>{desc}</td></tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "goals",
    label: "Actor-Goal List",
    body: (
      <>
        <h2 className="s-h tight">Actor-Goal List</h2>
        <table className="s-table uc">
          <thead>
            <tr><th>Actor</th><th>목표 (Goal)</th></tr>
          </thead>
          <tbody>
            {goals.map(([name, list]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{list.map((g) => <div key={g}>{g}</div>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "uclist",
    label: "Use case 목록",
    body: (
      <>
        <h2 className="s-h tight">Use case 목록 (요구사항 연결)</h2>
        <table className="s-table uc">
          <thead>
            <tr><th>ID</th><th>Use case</th><th>관련 요구사항</th></tr>
          </thead>
          <tbody>
            {useCases.map(([id, name, reqs]) => (
              <tr key={id}><td>{id}</td><td>{name}</td><td>{reqs}</td></tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "actor-uc",
    label: "Actor-Use case List",
    body: (
      <>
        <h2 className="s-h tight">Actor-Use case List</h2>
        <table className="s-table uc matrix">
          <thead>
            <tr>
              <th>Actor</th>
              {useCases.map(([id]) => <th key={id}>{id}</th>)}
            </tr>
          </thead>
          <tbody>
            {matrix.map(([name, ucs]) => (
              <tr key={name}>
                <td>{name}</td>
                {useCases.map((_, n) => <td key={n}>{ucs.includes(n + 1) ? "●" : ""}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: "tobe-uc",
    label: "To-Be Use Case Diagram",
    body: (
      <>
        <h2 className="s-h tight">To-Be Use Case Diagram</h2>
        <div className="s-diagram">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tobeUc.src} alt="To-Be Use Case Diagram" />
        </div>
      </>
    ),
  },
  ...ucSlides({ code: "UC-01", name: UC01, primary: "사용자 (임차인, 외국인 임차인 포함)", supporting: "네이버 지도 API", main: uc01Main, alt: uc01Alt, etc: uc01Etc }),
  ...ucSlides({ code: "UC-02", name: UC02, primary: "사용자 (외국인 임차인, 임차인도 수행 가능)", supporting: "환율 서비스", main: uc02Main, alt: uc02Alt, etc: uc02Etc }),
  // 서비스 시연: 실제 서비스 화면(프로토타입) (SlideDeck에서 RoomApp으로 렌더링)
  { id: "demo", label: "서비스 시연", app: true },
  {
    id: "qa",
    label: "Q&A",
    body: (
      <div className="s-center">
        <h1 className="s-title">감사합니다</h1>
      </div>
    ),
  },
];
