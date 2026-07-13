---
title: "[Data] 구글시트로 경영 대시보드 만들기 — 코딩 없이"
date: 2026-07-18 15:00:00 +0900
categories: ["Data Engineering"]
tags: [구글시트, 대시보드, bi, query함수, 경영지표, nextx]
description: "구글시트 대시보드 만드는 법 — 코딩 없이 흩어진 데이터를 취합하고 QUERY·SUMIFS·차트로 자동 갱신되는 경영 지표판을 만드는 실전 순서."
image:
  path: /assets/img/posts/data-gsheet-dashboard.png
  alt: "구글시트로 경영 대시보드 만들기"
mermaid: true
---

> 🏷️ **[NextX_Data_Solution]** · 주식회사 넥스트엑스(NEXT X) 정식 데이터 솔루션
{: .prompt-tip }

> 값비싼 BI 툴 없이도, **구글시트만으로** 매출·비용·재고를 한눈에 보는 대시보드를 만들 수 있습니다. "볼 때마다 수기로 취합"에서 벗어나 **자동으로 갱신되는** 지표판을 만들어 봅시다.
{: .prompt-info }

## ⚙️ 만드는 순서

```mermaid
flowchart LR
    A[원본 데이터 시트] --> B[취합 IMPORTRANGE]
    B --> C[요약 QUERY/SUMIFS]
    C --> D[차트]
    D --> E[자동 갱신]
```

## 🛠️ 4단계

**1) 데이터 시트를 '깨끗하게'** — 한 행 = 한 건, 첫 행은 머리글. 지저분하면 먼저 [정리]({% post_url 2026-07-18-data-excel-cleaning-functions %})부터.

**2) 흩어진 시트 취합** — `IMPORTRANGE`로 여러 파일을 한곳에:

```text
=IMPORTRANGE("시트URL", "매출!A1:E9999")
```

**3) 지표 요약** — `QUERY` 하나로 피벗·집계가 끝납니다:

```text
// 채널별 매출 합계
=QUERY(데이터!A:E, "select B, sum(E) group by B order by sum(E) desc label sum(E) '매출'", 1)

// 이번 달 특정 조건 합계
=SUMIFS(데이터!E:E, 데이터!C:C, ">="&DATE(2026,7,1))
```

**4) 차트 + 자동 갱신** — 요약 표를 차트로. `IMPORTRANGE`·`GOOGLEFINANCE`는 자동 갱신되고, 필요하면 Apps Script로 "매일 아침 새로고침"을 겁니다.

> 💡 **KPI 카드**: 큰 숫자 하나(예: 이번 달 매출)를 셀 병합 + 큰 글씨로. 경영진은 "숫자 하나"를 제일 먼저 봅니다.
{: .prompt-tip }

## 🚦 언제 구글시트를 넘어서나

- 데이터가 **수만 행** 이상으로 무거워질 때
- 여러 소스를 매일 자동 연동해야 할 때
→ 이때는 [데이터 파이프라인]({% post_url 2026-07-12-data-pipeline-showcase %})·전용 BI로 확장합니다. **작게 시트로 시작해, 필요할 때 키우는** 게 정석입니다.

## 📩 우리 지표로 대시보드 만들려면

보고 싶은 지표 3개만 알려주시면 **시트 구조부터** 잡아드립니다.
→ [Business Inquiry]({% post_url 2026-07-12-inside-nextx-business-inquiry %}) · [csnextx@gmail.com](mailto:csnextx@gmail.com)

> 관련 → [경영진 대시보드 설계]({% post_url 2026-07-13-data-dashboard-design %}) · [숫자에 속지 않기]({% post_url 2026-07-16-data-interpretation-pitfalls %})
{: .prompt-info }


---

> 📎 본 글은 **주식회사 넥스트엑스(NEXT X) 기술연구소**의 R&D 자산입니다.
> **함께 읽기** — [📊 데이터 대표 사례]({% post_url 2026-07-12-data-pipeline-showcase %}) · [📖 블로그 안내]({% post_url 2026-07-12-start-here-reading-guide %}) · [📩 비즈니스 문의]({% post_url 2026-07-12-inside-nextx-business-inquiry %})
{: .prompt-info }
