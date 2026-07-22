---
# the default layout is 'page'
title: 학습 로드맵
icon: fas fa-map-signs
order: 1
---

> 🧭 **처음 오셨나요?** 넥스트엑스 기술 연구소의 글은 93편이 넘습니다. 무엇부터 읽을지 막막하다면, 아래 **목적별 코스**를 따라가세요. 흩어진 글이 아니라 하나의 이정표가 되도록 엮었습니다.
{: .prompt-tip }

## 🏢 넥스트엑스가 실제로 만든 것 (비즈니스 케이스)
{: #business-cases }

개념 설명이 아니라, **실제 비즈니스 문제를 기술로 해결한 서사**입니다. "이 회사가 무엇을 만들 수 있는가"가 궁금하시다면 여기부터.

### ⭐ 대표 사례 — 파트너스 매칭 매니저 (12부작)

정리수납 프리랜서 80명·3개월 급여 1.1억 원을 관리하는 SaaS를 **프로토타입부터 운영 배포까지** 만든 전 과정. 인증·보안(RLS)·급여 정산·모바일 대응·실데이터 전환까지, 실전 개발의 모든 단계가 담겨 있습니다.

| 단계 | 글 |
|:---:|---|
| 1 | [프로토타입 제작기]({% post_url 2026-07-16-dev-partners-manager %}) — 백엔드 한 겹 붙이기 |
| 2 | [실전 납품 개발기]({% post_url 2026-07-17-ax-partners-manager-delivery %}) — 인증·보안·실데이터 |
| 3 | [Auth 트러블슈팅]({% post_url 2026-07-17-ax-supabase-auth-troubleshooting %}) — 로그인 오류 해결 |
| 4 | [v2 — 명부 교체·스키마 유연화]({% post_url 2026-07-18-ax-partners-manager-v2-upgrade %}) |
| 5 | [v3 — 팀 배정·캘린더 뷰]({% post_url 2026-07-18-ax-partners-manager-v3-team %}) |
| 6 | [v3.1 — 휴무일 관리·충돌 방지]({% post_url 2026-07-19-ax-partners-manager-v3-dayoff %}) |
| 7 | [v4 — 급여 정산 시스템]({% post_url 2026-07-19-ax-partners-manager-v4-payroll %}) |
| 8 | [v4.1 — UX 고도화·기타수당]({% post_url 2026-07-19-ax-partners-manager-v41-enhance %}) |
| 9 | [v5 — 통합 일정 관리 달력]({% post_url 2026-07-19-ax-partners-manager-v5-schedule %}) |
| 10 | [v5.1 — 급여 산식·모바일 카드]({% post_url 2026-07-19-ax-partners-manager-v51-payroll-mobile %}) |
| 11 | [v5.2 — 엑셀 Mock 데이터 파이프라인]({% post_url 2026-07-19-ax-partners-manager-v52-mock-data %}) |
| 12 | [v5.3 — 운영 데이터 전환·공제액 산식]({% post_url 2026-07-20-ax-partners-manager-v53-production-data %}) |

### 💼 업무 자동화 성과 사례

- [매주 2시간 → 40분: 반복 업무를 없애는 법]({% post_url 2026-07-12-ax-showcase-report-automation %})
- [엑셀 반복작업, 사람이 안 해도 됩니다 — 인건비 되찾기]({% post_url 2026-07-12-automation-excel-showcase %})
- [사내 지식 검색 챗봇 만들기 — RAG로 '우리 회사를 아는 AI']({% post_url 2026-07-12-ax-rag-chatbot-guide %})
- [고객 문의(VOC) 자동 분류·응대 초안]({% post_url 2026-07-16-ax-voc-classification %})
- [생성형 AI로 마케팅 콘텐츠 자동화]({% post_url 2026-07-15-ax-marketing-content-automation %})

> 💡 협업·도입을 검토 중이시라면 [대표 사례 & 기술 스택]({% post_url 2026-07-12-inside-nextx-portfolio %}) → [넥스트엑스와 일하는 방식]({% post_url 2026-07-19-inside-nextx-how-we-work %}) → [비즈니스 문의]({% post_url 2026-07-12-inside-nextx-business-inquiry %}) 순서를 추천합니다.
{: .prompt-tip }

---

## 🗺️ 목적별 학습 코스

역할과 목표에 따라 5개 코스로 나눴습니다. 위에서 아래로 순서대로 읽으면 됩니다.

### 🌱 코스 A — 비개발자·기획자를 위한 AI 입문

> 코드를 몰라도 됩니다. AI를 **업무에 쓰는 관점**부터 잡습니다.

1. [Computational Thinking — 컴퓨터처럼 사고하는 법]({% post_url 2026-07-09-computational-thinking %})
2. [기획자를 위한 AI 용어 사전]({% post_url 2026-07-12-toolkit-ai-glossary %})
3. [기획자는 원래 프롬프트 강자다 — 프롬프트 엔지니어링 첫걸음]({% post_url 2026-07-11-prompt-engineering-for-planners %})
4. [오늘 바로 써먹는 AI 활용 팁 10]({% post_url 2026-07-14-ax-ai-tips-10 %})
5. [업무용 생성형 AI 비교 — ChatGPT vs Claude]({% post_url 2026-07-18-ax-chatgpt-vs-claude-work %})
6. [AI 시대, 기획자의 무기는 무엇인가]({% post_url 2026-07-11-pm-role-in-ai-era %})

### ⚡ 코스 B — 업무 자동화 실전

> 반복 수작업을 코드·도구로 없애는 실전 패턴.

1. [코딩 없이 시작하는 업무 자동화 3가지]({% post_url 2026-07-14-automation-nocode-starter %})
2. [파이썬으로 엑셀 업무 자동화하기]({% post_url 2026-07-13-automation-python-excel-guide %})
3. [문서 대량 생성 자동화 — 100장을 1분에]({% post_url 2026-07-16-automation-doc-generation %})
4. [PDF·스캔 문서에서 표 자동 추출]({% post_url 2026-07-18-automation-pdf-extract %})
5. [웹 데이터 수집 자동화 — 크롤링의 경계]({% post_url 2026-07-15-automation-web-scraping %})
6. [급여·근태 정산 자동화 실전]({% post_url 2026-07-18-automation-payroll %})
7. [자동화가 실패하는 5가지 이유]({% post_url 2026-07-17-automation-failure-reasons %})

### 🤖 코스 C — AI 전환(AX)과 RAG·에이전트

> 생성형 AI를 시스템으로 만드는 길. RAG부터 자율 에이전트까지.

1. [RAG 쉽게 이해하기 — '내 문서를 아는 AI']({% post_url 2026-07-11-rag-explained %})
2. [임베딩 & 벡터 DB — 의미 검색 엔진]({% post_url 2026-07-12-embeddings-and-vector-db %})
3. [Tool Calling & 멀티 에이전트]({% post_url 2026-07-11-tool-calling-and-multi-agents %})
4. [AI 에이전트 vs RPA]({% post_url 2026-07-11-ai-agent-vs-rpa %})
5. **운영 리포트 자동화 에이전트 빌드 (6부작)** — 아래 순서대로
   - [#1 문제 정의]({% post_url 2026-07-10-agent-build-01-problem %})
   - [#2 설계도 그리기]({% post_url 2026-07-11-agent-build-02-blueprint %})
   - [#3 프롬프트 실험실]({% post_url 2026-07-11-agent-build-03-prompt-lab %})
   - [#4 데이터 연결]({% post_url 2026-07-11-agent-build-04-data-hookup %})
   - [#5 화면 붙이기 (MVP v1.0)]({% post_url 2026-07-11-agent-build-05-ui %})
   - [#6 사용자 테스트]({% post_url 2026-07-12-agent-build-06-user-test %})

### 💻 코스 D — 웹 개발 & 바이브코딩

> 웹의 원리부터 AI로 직접 서비스를 만드는 바이브코딩까지.

1. [웹을 지탱하는 세 겹(HTML·CSS·JS)]({% post_url 2026-07-14-dev-web-three-layers %})
2. [API란 무엇인가 — 가장 쉬운 설명]({% post_url 2026-07-15-dev-what-is-api %})
3. [웹훅(Webhook)이란?]({% post_url 2026-07-16-dev-what-is-webhook %})
4. [동기·비동기와 이벤트 루프]({% post_url 2026-07-14-dev-async-event-loop %})
5. [화면 뒤에서 일어나는 일들 — 백엔드·네트워크 완전 지도]({% post_url 2026-07-16-dev-backend-networking %})
6. [바이브 코딩이란?]({% post_url 2026-07-11-what-is-vibe-coding %}) → [도구 비교]({% post_url 2026-07-11-vibe-coding-tools-compared %}) → [나만의 AI 작업대 차리기]({% post_url 2026-07-13-dev-vibe-coding-workbench %})
7. 실전 프로젝트 — [오목 웹 게임]({% post_url 2026-07-14-dev-gomoku-game %}) · [3매치 퍼즐]({% post_url 2026-07-14-dev-match3-puzzle %})

### 📊 코스 E — 데이터 엔지니어링

> 흩어진 원시 데이터를 신뢰할 수 있는 경영 지표로.

1. [데이터 파이프라인이란?]({% post_url 2026-07-12-what-is-data-pipeline %})
2. [흩어진 데이터를 경영 지표로 — 구축 접근법]({% post_url 2026-07-12-data-pipeline-showcase %})
3. [ETL vs ELT]({% post_url 2026-07-19-data-etl-vs-elt %}) · [데이터 웨어하우스 vs 레이크]({% post_url 2026-07-20-data-warehouse-vs-lake %})
4. [데이터 클렌징 실전]({% post_url 2026-07-15-data-cleansing %}) · [데이터 거버넌스 & 품질 관리]({% post_url 2026-07-22-data-governance %})
5. [SQL 실전 심화 — JOIN·윈도우 함수·CTE]({% post_url 2026-07-21-data-sql-advanced %})
6. [실시간 데이터 처리 — 스트리밍으로]({% post_url 2026-07-23-data-realtime-streaming %})
7. [Python 데이터 처리 입문 — pandas]({% post_url 2026-07-24-data-python-intro %})
8. [경영진 대시보드 설계]({% post_url 2026-07-13-data-dashboard-design %}) · [숫자에 속지 않기 — 해석의 함정 5]({% post_url 2026-07-16-data-interpretation-pitfalls %})

---

## 🎯 역할별 빠른 시작

| 당신은… | 이 코스부터 |
|---|---|
| 🧑‍💼 **경영자·의사결정자** | [비즈니스 케이스](#business-cases) → 코스 A |
| 📋 **기획자·PM** | 코스 A → 코스 C |
| ⚙️ **실무 자동화 담당** | 코스 B → 코스 E |
| 💻 **개발자·엔지니어** | 코스 D → 코스 C → 코스 E |

> 이 로드맵은 새 글이 쌓일 때마다 갱신됩니다. 전체 목록은 [카테고리](/categories/)·[태그](/tags/)·[아카이브](/archives/)에서 볼 수 있습니다.
{: .prompt-info }

---

*NEXT X R&D · 지식의 이정표*
