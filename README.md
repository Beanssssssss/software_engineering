# 피터팬의 좋은방 구하기 - 재구축 서비스 정의

서강대학교 소프트웨어 수업 중간 발표 과제 "재구축 서비스 정의"의 결과물입니다.
부동산 정보 플랫폼 **피터팬의 좋은방 구하기**를 분석하고, 외국인 임차인을 주 사용자로 하는 To-Be 서비스를 정의했습니다.

발표자료는 Next.js 슬라이드로 만들었고, 마지막 슬라이드는 To-Be 서비스의 프로토타입(지도 기반 원·투룸 탐색 앱)입니다.

## 저장소 구성

```
.
├── goodroom/        # 발표자료 + 프로토타입 (Next.js)
├── goodroom.pdf     # 발표자료 PDF
└── README.md
```

## 발표 내용

| 단계 | 내용 |
| --- | --- |
| 1. 재구축 대상 시스템 분석 | 시스템 목적·사용자·주요 기능, As-Is System Context Diagram, 현재 시스템의 한계·문제점 |
| 2. To-Be 고객 요구사항 정의 | Stakeholder 식별, 목적/니즈, 품질 특성별 개선 방안, To-Be System Context Diagram, 기능/품질 요구사항과 우선순위 |
| 3. SW 요구사항 정의 | Actor List, Actor-Goal List, Actor-Use case List, Use case Diagram, Use case Description(UC-01, UC-02), 주요 화면 프로토타입 |

### 현재 시스템의 문제점 (As-Is)
- **외국어 미지원**: 메뉴, 필터, 매물 설명이 모두 한국어뿐
- **지도-목록 연동 오류**: 마커가 가려지거나 클러스터 밖에 찍혀 지도와 목록이 불일치
- **내 위치 표시 없음**: 내 주변 매물을 찾기 어려움
- **주변 생활 정보 부족**: 편의점·마트·빨래방 정보를 따로 검색해야 함

### To-Be 개선 방향
- **Interaction Capability**: 언어 선택, 가격 표기 풀이와 용어 툴팁, 선택 매물 마커 강조, 내 위치 표시
- **Functional Suitability**: 지도·목록·클러스터를 같은 데이터로 계산, 선택 매물 주변 편의시설 표시
- **Flexibility**: 통화(원, 달러, 위안 등)와 면적 단위(m², 평, ft²) 환산

기능 요구사항 11개, 품질 요구사항 8개를 Must / Should / Could로 우선순위화했고, Use case 6개를 도출했습니다.

## 프로토타입 기능
- 지도(Leaflet) 기반 매물 탐색, 클러스터와 목록 연동
- 목록에서 매물 선택 시 마커 강조 및 지도 이동
- 내 위치 표시
- 선택 매물 주변 편의점·마트·빨래방과 도보 거리 표시
- 한국어 / 영어 / 중국어 전환, 통화·면적 단위 환산, 가격 표기 풀이

## 기술 스택
Next.js 15 (정적 export) · React 19 · TypeScript · Leaflet

## 실행

```bash
cd goodroom
npm install
npm run dev        # http://localhost:3000
```

### 발표자료 조작
`→ ↓ Space` 다음 · `← ↑` 이전 · `F` 전체화면 · `O` 슬라이드 목록

마지막 슬라이드(서비스 시연)에서는 방향키가 지도 조작용이라, 상단 `← 발표자료` 버튼 또는 `Esc` / `PageUp` 으로 이전 슬라이드로 돌아옵니다.
슬라이드 내용은 `goodroom/data/slides.tsx` 에서 수정합니다.

## 배포 (GitHub Pages)

`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 `goodroom/` 을 정적 파일로 빌드해 GitHub Pages에 배포합니다.

1. 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 선택
2. `main` 에 push (또는 Actions 탭에서 *Deploy to GitHub Pages* 수동 실행)
3. 배포 주소: `https://<아이디>.github.io/<저장소명>/`

저장소 이름이 URL 경로(`basePath`)로 쓰이며, 워크플로가 이름을 자동으로 읽습니다.

로컬에서 배포 결과 확인:

```bash
cd goodroom
NEXT_PUBLIC_BASE_PATH=/<저장소명> npm run build
npx serve out
```
