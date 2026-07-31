# Airtable 디자인 리디자인 — 진행 노트

> Quartz 블로그(Ellie's Digital Garden)에 Airtable 편집형 디자인 시스템을 적용하는 작업 기록.
> 설계 원본: `DESIGN-airtable.md`

## ✅ 완료 (PR #8, main에 머지됨)

**"토큰 리매핑" 단계** — 색·라운드·폰트를 Airtable 시스템으로 교체.

- **`quartz.config.ts`** — 8개 색상 슬롯을 Airtable 토큰으로 매핑 (라이트/다크 양쪽)
  | Quartz slot | Airtable token | 값 |
  |---|---|---|
  | light | canvas | `#ffffff` |
  | lightgray | hairline | `#dddddd` |
  | gray | muted | `#6b7078` |
  | darkgray | body | `#333840` |
  | dark | ink | `#181d26` |
  | secondary | link | `#1b61c9` |
  | tertiary | link-active | `#1a3866` |
  - 라틴 폰트 → Inter (Haas 대체)
- **`quartz/styles/custom.scss`**
  - 본문/내부 링크 색 → link blue (`--secondary`)
  - 라운드 계층화: 입력 6px / 카드·이미지·콜아웃 10px / CTA·signature 12px
  - 간격 토큰(4px 베이스) + 96px 섹션 리듬
  - signature 헬퍼 클래스 추가: `.signature-coral`, `.signature-forest`, `.cream-callout`, `.cta-band`
  - 한글 Pretendard 폰트 + 홈 배너 히어로는 **유지**
- **`DESIGN-airtable.md`** — 디자인 명세 커밋

## 🤔 왜 "크게 안 바뀐" 것처럼 보이나

1. **출발점이 이미 비슷했다** — 기존도 흰 배경 + 거의 검정 텍스트, Airtable도 화이트 캔버스 + near-black 잉크.
2. **자동 변경은 원래 은근하다** — 링크 색, 라운드, 폰트 폴백 정도.
3. **화려한 요소(coral/forest 카드, cream 콜아웃, CTA 밴드)는 자동으로 안 나온다** — 글 안에 raw HTML로 직접 넣어야 보이는 헬퍼. 아직 어떤 글에도 안 넣음.

## 📋 다음에 할 일 (아직 안 함)

v0.app으로 다시 짤 필요 **없음** — Quartz는 React가 아니라 이식이 번거롭고, 지금 콘텐츠/기능(위키링크·태그·그래프뷰·댓글)을 다 다시 만들어야 함. Quartz 안에서 밀어붙이는 게 맞음.

### "크게" 바꾸는 3가지 레버
| 레버 | 파일 | 체감 |
|---|---|---|
| ② 레이아웃 | `quartz.layout.ts` + `quartz/components` | **큼** (구조 자체) |
| ③ 컴포넌트 CSS 대폭 | `custom.scss` | 중간~큼 |
| ④ 콘텐츠에 signature 요소 | 마크다운 글 | 글별로 큼 |

### 제안한 구체 작업 (새 브랜치에서)
1. 🏠 **홈 대문 → coral / dark navy signature 히어로 밴드** (첫인상 변화 가장 큼)
2. 🗂️ **글 목록 → article-card 그리드** (썸네일 + 카테고리 태그)
3. ✨ **글 하나에 coral 카드 + cream 콜아웃 + CTA 밴드 실제 삽입** (브랜드 볼티지 시범)

> 대안: 아예 다른 룩을 원하면, 아티팩트로 디자인 시안 2~3개를 먼저 만들어 비교 (v0보다 이 블로그엔 적합).

## 🧩 signature 헬퍼 사용법 (지금 바로 콘텐츠에서 가능)

마크다운 본문에 raw HTML로 삽입:

```html
<div class="signature-coral">
  <h3>이번 실험의 결과</h3>
  <p>하루 40분을 되찾았다.</p>
</div>

<div class="cream-callout">💡 <b>RPA</b>는 규칙적 반복 작업을 대신하는 기술입니다.</div>

<div class="cta-band">
  <h2>새 글이 올라오면 알려드릴게요</h2>
</div>
```

## 🔧 이어서 작업 재개하는 법

```bash
cd "/Volumes/2TB white/Ellies-digital-garden"
git checkout main && git pull          # 최신화
git checkout -b redesign/airtable-phase2   # 새 작업 브랜치

# 로컬 미리보기 (오프라인이면 quartz.config.ts의 CustomOgImages 한 줄 임시 주석)
npx quartz build --serve   # → http://localhost:8080
```

- 라이브 사이트: https://whiteheron96-svg.github.io/digital-garden
- 배포: main에 push하면 GitHub Actions가 자동 빌드·배포 (Actions 탭에서 진행 확인)
- ⚠️ 로컬 미리보기용으로 `CustomOgImages`를 주석 처리했다면 **커밋하지 말 것** (프로덕션 OG 이미지 생성에 필요)
