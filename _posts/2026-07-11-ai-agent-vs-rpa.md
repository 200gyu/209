---
title: "[인사이트] AI 에이전트 vs RPA — '시키는 대로' vs '목표를 주면 알아서'"
date: 2026-07-11 12:00:00 +0900
categories: ["Workplace Automation"]
tags: [ai에이전트, rpa, 자동화, agentic, 개념정리]
description: "실무자가 가장 헷갈리는 개념 정리. RPA는 스크립트를, 에이전트는 목표를 받는다. 언제 무엇을 쓰고 어떻게 결합할까."
image:
  path: /assets/img/posts/agent-vs-rpa.svg
  alt: "AI 에이전트 vs RPA"
---

> "그거 그냥 자동화(RPA) 아니야?" — AI 에이전트를 이야기하면 꼭 나오는 질문입니다. 둘은 **닮았지만 근본이 다릅니다.**
{: .prompt-info }

## 🎯 한 줄 차이

> **RPA는 '스크립트'를 받고, AI 에이전트는 '목표'를 받는다.**
>
> RPA: *"이 버튼 클릭 → 이 값 복사 → 여기 붙여넣기"* (정해진 순서)
> 에이전트: *"이번 주 리포트 만들어줘"* (목표만 주면 스스로 방법을 계획)

---

## 📊 정면 비교

| 기준 | RPA | AI 에이전트 (Agentic AI) |
|------|-----|--------------------------|
| 지시 방식 | 단계별 스크립트 | 목표(Goal) |
| 동작 | 규칙 기반·결정론적 | 추론·계획·적응 |
| 입력 데이터 | **정형**(늘 같은 양식) | **비정형**도 해석 가능 |
| 예외 상황 | 미리 코딩한 것만 | 스스로 판단해 대응 |
| 변경 시 | 규칙을 다시 짜야 함 | 목표·맥락만 바꾸면 됨 |
| 강점 | 빠름·정확·저렴 | 유연·판단·비정형 처리 |
| 약점 | 양식 바뀌면 깨짐 | 비용·예측 어려움·검수 필요 |

---

## 🧭 언제 무엇을 쓸까

- **RPA가 맞는 일**: 양식이 절대 안 바뀌는 반복 — 매일 같은 화면에서 숫자 긁어 엑셀에 붙이기.
- **에이전트가 맞는 일**: 해석·판단이 필요한 일 — 형식이 제각각인 고객 문의를 읽고 분류·요약하기.

> 실무에선 **둘을 합치는 게 정답**입니다. RPA로 *정형 데이터를 정확·저렴하게* 수집하고, 에이전트가 *그걸 해석·판단*하는 구조. (출처들이 공통적으로 강조하는 결론)
{: .prompt-tip }

## 🏢 내 도메인(운영)에 대입하면

[운영 리포트 에이전트]({% post_url 2026-07-10-agent-build-01-problem %})를 이 렌즈로 쪼개보면 역할 분담이 선명해집니다.

| 작업 | 성격 | 담당 |
|------|------|:----:|
| 대시보드에서 지표 숫자 수집 | 정형·반복 | 🤖 RPA(또는 API) |
| 전주 대비 증감 계산 | 규칙 | 🤖 RPA/코드 |
| VOC(고객 문의) 분류·요약 | 비정형·판단 | 🧠 AI 에이전트 |
| 핵심 이슈 Top3 선정 | 판단 | 🧠 에이전트 + 사람 |

## ⚠️ 흔한 오해 3가지

1. **"에이전트가 RPA의 상위호환이다"** → ❌ 정형 반복은 여전히 RPA가 더 싸고 정확.
2. **"에이전트면 사람이 필요 없다"** → ❌ 판단·환각 리스크 때문에 **검수 단계는 필수**.
3. **"LLM 부르면 곧 에이전트다"** → ❌ 에이전트의 핵심은 **계획 → 도구 사용 → 관찰 → 재시도** 루프.

---

## 📚 참고 자료

- [Compare AI agents vs. RPA (TechTarget)](https://www.techtarget.com/searchenterpriseai/tip/Compare-AI-agents-vs-RPA-Key-differences-and-overlap)
- [Agentic AI vs RPA (SS&C Blue Prism)](https://www.blueprism.com/resources/blog/agentic-ai-vs-rpa-vs-ai-agents-comparing/)
- [Agentic AI vs. RPA: What's the Difference? (Multimodal)](https://www.multimodal.dev/post/agentic-ai-vs-rpa)

> 요약: **RPA = 손, 에이전트 = 머리.** 손발이 필요한 일과 머리가 필요한 일을 나누는 게 자동화 설계의 첫걸음입니다.
{: .prompt-info }
