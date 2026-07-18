---
title: "[Data] 지저분한 엑셀, 함수로 5분 정리 — 데이터 클렌징 실전"
date: 2026-07-18 16:00:00 +0900
categories: ["Data Engineering", "분석·도구"]
tags: [엑셀함수, 데이터정리, 데이터클렌징, trim, 중복제거, nextx]
description: "엑셀 데이터 정리 함수 총정리 — 공백·중복·표기 불일치·텍스트 숫자·빈값을 TRIM·COUNTIF·SUBSTITUTE 등으로 5분 만에 깨끗하게."
image:
  path: /assets/img/posts/data-excel-cleaning.png
  alt: "지저분한 엑셀, 함수로 5분 정리"
---

> 🏷️ **[NextX_Data_Solution]** · 주식회사 넥스트엑스(NEXT X) 정식 데이터 솔루션
{: .prompt-tip }

> 분석도 자동화도, **데이터가 지저분하면 결과도 지저분**합니다(Garbage In, Garbage Out). 다행히 흔한 문제 대부분은 **엑셀 함수 몇 개**로 5분이면 정리됩니다.
{: .prompt-info }

## 🧹 흔한 5가지 문제 → 함수 해법

| 문제 | 증상 | 해법 함수 |
|------|------|-----------|
| **여분 공백** | " 홍길동 " 처럼 앞뒤 공백 | `=TRIM(A2)` |
| **표기 불일치** | 서울/서울시/SEOUL | `=SUBSTITUTE`, `=UPPER/PROPER` |
| **중복 행** | 같은 데이터 두 번 | `=COUNTIF(A:A,A2)>1` 로 표시 후 제거 |
| **텍스트로 된 숫자** | 합계가 안 됨 | `=VALUE(A2)` |
| **텍스트로 된 날짜** | 정렬이 이상함 | `=DATEVALUE(A2)` |

## 🛠️ 바로 쓰는 예시

```text
// 앞뒤 공백 + 중간 이중 공백 정리
=TRIM(A2)

// 표기 통일: "서울시"·"서울특별시" → "서울"
=SUBSTITUTE(SUBSTITUTE(A2,"특별시",""),"시","")

// 중복 여부 표시 (2번째부터 '중복')
=IF(COUNTIF($A$2:A2,A2)>1,"중복","")

// 빈칸을 '미입력'으로
=IF(ISBLANK(A2),"미입력",A2)
```

> 💡 **원본은 절대 덮어쓰지 마세요.** 옆에 '정리' 열을 만들어 함수를 걸고, 결과만 값으로 복사(붙여넣기 → 값)합니다.
{: .prompt-warning }

## ✅ 정리 후 검증 체크

- [ ] 행 수가 예상과 맞는가? (중복 제거 후)
- [ ] 합계·평균이 계산되는가? (숫자 인식 확인)
- [ ] 범주 값 종류가 몇 개인가? (`COUNTA`+중복제거로 표기 흔들림 점검)

## 🚀 매번 반복된다면 = 자동화 신호

같은 정리를 **매주** 하고 있다면, 함수 대신 [파이썬으로 자동화]({% post_url 2026-07-13-automation-python-excel-guide %})할 때입니다. 대량·반복은 코드가 더 싸고 정확합니다. 더 깊은 정제 원칙은 [데이터 클렌징]({% post_url 2026-07-15-data-cleansing %}) 참고.

## 📩 데이터가 지저분해 분석을 못 하고 있다면

지저분한 파일 1개만 주셔도 됩니다 — **정리 규칙과 자동화 방안**을 진단해 드립니다.
→ [Business Inquiry]({% post_url 2026-07-12-inside-nextx-business-inquiry %}) · [csnextx@gmail.com](mailto:csnextx@gmail.com)

> 관련 → [데이터 클렌징 실전]({% post_url 2026-07-15-data-cleansing %}) · [구글시트 대시보드]({% post_url 2026-07-18-data-google-sheet-dashboard %})
{: .prompt-info }


---

> 📎 본 글은 **주식회사 넥스트엑스(NEXT X) 기술연구소**의 R&D 자산입니다.
> **함께 읽기** — [📊 데이터 대표 사례]({% post_url 2026-07-12-data-pipeline-showcase %}) · [📖 블로그 안내]({% post_url 2026-07-12-start-here-reading-guide %}) · [📩 비즈니스 문의]({% post_url 2026-07-12-inside-nextx-business-inquiry %})
{: .prompt-info }
