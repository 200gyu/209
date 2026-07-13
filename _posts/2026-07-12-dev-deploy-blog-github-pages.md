---
title: "[Dev] 코드 없이 기업 블로그 배포하기 — Jekyll + Chirpy + GitHub Actions"
date: 2026-07-12 22:00:00 +0900
categories: ["Dev & DevOps"]
tags: [jekyll, chirpy, githubpages, githubactions, cicd, 배포]
description: "이 블로그(code209.kr)를 실제로 배포한 방법. Jekyll + Chirpy 테마를 GitHub Actions로 자동 빌드·배포하는 전 과정과 함정."
image:
  path: /assets/img/posts/dev-deploy.png
  alt: "코드 없이 기업 블로그 배포하기"
mermaid: true
---

> 이 글은 **지금 보고 계신 블로그(code209.kr)** 를 실제로 배포한 기록입니다. 서버 한 대 없이, **GitHub만으로** 자동 배포되는 구조를 그대로 공개합니다.
{: .prompt-info }

## 🧱 스택

| 구성 | 역할 |
|------|------|
| **Jekyll** | 마크다운 → 정적 웹사이트 생성기 |
| **Chirpy** | 다크모드·태그·목차·검색 내장 테마 |
| **GitHub Pages** | 무료 정적 호스팅 |
| **GitHub Actions** | push하면 자동 빌드·배포(CI/CD) |

## ⚙️ 자동 배포 흐름

```mermaid
flowchart LR
    P[글 작성 후 git push] --> A[GitHub Actions]
    A --> B[Jekyll 빌드 + 링크 검사]
    B --> D[GitHub Pages 배포]
    D --> L[code209.kr 반영]
```

`_posts/`에 마크다운을 올리고 push하면, 나머지는 **Actions가 알아서** 합니다.

## 🚀 핵심 셋업 3가지

1. **Chirpy 스타터 구조** — `_config.yml`, `Gemfile`, `_posts/`, `_tabs/`, `.github/workflows/pages-deploy.yml`
2. **Pages 소스 = GitHub Actions** — 저장소 Settings → Pages → Source를 `GitHub Actions`로 (브랜치 배포 아님!)
3. **글쓰기 규칙** — 파일명 `YYYY-MM-DD-제목.md` + 머리말(front matter)

```yaml
---
title: "글 제목"
date: 2026-07-12 21:00:00 +0900
categories: ["카테고리"]
tags: [태그]
---
```

## 🕳️ 실무에서 밟은 함정 (경험담)

- **⚠️ 한국시간(KST) '오늘 글'이 사라진다** → UTC 빌드가 미래글로 제외. `_config.yml`에 `future: true`로 해결.
- **⚠️ 프로젝트 사이트 경로 문제** → 하위경로(`/209`) 배포 시 `baseurl` 설정 필수. 커스텀 도메인 붙일 땐 다시 비워야 함.
- **⚠️ 내부 링크 깨짐** → `/posts/...` 하드코딩 대신 `{% raw %}{% post_url %}{% endraw %}`로 걸어야 baseurl 안전.
- **⚠️ PWA 캐시** → 변경이 즉시 안 보이면 강력 새로고침/서비스워커 해제.

> 이런 "안 겪으면 모르는" 지점을 미리 잡는 게 실무 역량입니다.
{: .prompt-tip }

## 🔗 이어지는 솔루션 (카테고리 교차 참고)

- 🛠️ **더 깊이(Dev)** → [커스텀 도메인·HTTPS]({% post_url 2026-07-12-dev-custom-domain-https %}) · [API란?]({% post_url 2026-07-15-dev-what-is-api %}) · [웹훅]({% post_url 2026-07-16-dev-what-is-webhook %})
- 🤖 **무엇을 배포하나(AX)** → [운영 리포트 자동화(대표)]({% post_url 2026-07-12-ax-showcase-report-automation %}) · [사내 RAG 챗봇]({% post_url 2026-07-12-ax-rag-chatbot-guide %})
- ⚡ **자동화 연결(Automation)** → [엑셀 자동화(대표)]({% post_url 2026-07-12-automation-excel-showcase %})
- 📊 **데이터 기반(Data)** → [데이터 파이프라인(대표)]({% post_url 2026-07-12-data-pipeline-showcase %})

## 🔗 다음 편

배포까지 됐다면, 이제 **내 도메인**을 붙일 차례. → [커스텀 도메인 + HTTPS 연결하기]({% post_url 2026-07-12-dev-custom-domain-https %})

> **주식회사 넥스트엑스(NEXT X)** — 작은 것도 제대로 배포하고 운영합니다. [기술 문의]({% post_url 2026-07-12-inside-nextx-business-inquiry %})
{: .prompt-info }


---

> 📎 본 글은 **주식회사 넥스트엑스(NEXT X) 기술연구소**의 R&D 자산입니다.
> **함께 읽기** — [🛠️ 개발 대표 사례]({% post_url 2026-07-12-dev-deploy-blog-github-pages %}) · [📖 블로그 안내]({% post_url 2026-07-12-start-here-reading-guide %}) · [📩 비즈니스 문의]({% post_url 2026-07-12-inside-nextx-business-inquiry %})
{: .prompt-info }
