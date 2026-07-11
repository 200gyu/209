# 209 — 아이펠 AI 에이전트 1기 블로그

[Jekyll](https://jekyllrb.com/) + [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) 테마로 만든 GitHub Pages 블로그입니다.
아이펠 AI 에이전트 과정 **수업 노트**와 **개인 에이전트 제작기**를 기록합니다.

🔗 **배포 주소:** https://200gyu.github.io/209/

---

## 🚀 최초 1회 설정 (중요)

이 저장소를 push했다면, **GitHub에서 아래를 한 번만** 해주세요. 이걸 안 하면 사이트가 안 열립니다.

1. 저장소 **Settings → Pages** 이동
2. **Build and deployment → Source** 를 **`GitHub Actions`** 로 선택
3. 끝. 이후 `main`에 push할 때마다 `.github/workflows/pages-deploy.yml`가 자동으로 빌드·배포합니다.
4. **Actions** 탭에서 "Build and Deploy"가 초록불이 되면 위 주소에서 확인.

> ⚠️ Source를 "Deploy from a branch"로 두면 안 됩니다. 반드시 **GitHub Actions** 여야 Chirpy 플러그인이 빌드됩니다.

---

## ✍️ 새 글 쓰는 법

`_posts/` 폴더에 **`YYYY-MM-DD-제목.md`** 형식으로 파일을 만들고 아래 머리말(front matter)을 채웁니다.

```markdown
---
title: "[수업노트] 오늘 배운 주제"
date: 2026-07-15 21:00:00 +0900   # 반드시 +0900 (한국 시간)
categories: [수업노트, 프롬프트]     # [대분류, 소분류] 최대 2단계
tags: [프롬프트, llm]                # 소문자 권장, 개수 제한 없음
description: 목록/검색에 보일 한 줄 요약
# pin: true        # 상단 고정하고 싶을 때
# mermaid: true     # 다이어그램 쓸 때
# math: true        # 수식 쓸 때
---

본문을 마크다운으로...
```

- 파일을 만들고 `main`에 push하면 몇 분 뒤 자동 반영됩니다.
- **초안**은 `_drafts/` 폴더에 두면 배포되지 않습니다.

### 카테고리 운영 규칙 (이 블로그의 뼈대)

| 대분류 | 용도 | 소분류 예시 |
|--------|------|-------------|
| `수업노트` | 회차별 수업 개념 정리 | 컴퓨팅 사고, 프롬프트, 에이전트, 배포 |
| `에이전트 제작기` | 개인 프로젝트 진행 기록 | (번호 시리즈 #1, #2 …) |
| `회고` | 주차별 배운 점·막힌 점 | 1주차, 2주차 … |
| `블로그` | 블로그 운영 메타 글 | 운영 |

## 🖼️ 이미지 넣기

`assets/img/` 폴더에 이미지를 두고 본문에서:

```markdown
![설명](/assets/img/example.png)
_이미지 캡션_
```

## ⚙️ 운영 기능 켜기

`_config.yml`은 **값만 채우면 바로 켜지도록 미리 배선**돼 있습니다.

### 💬 댓글 (giscus) — 약 2분

1. 저장소 **Settings → General → Features → `Discussions`** 체크
2. https://github.com/apps/giscus 에서 **giscus 앱을 이 저장소(`200gyu/209`)에 설치**
3. https://giscus.app 접속 → 저장소 `200gyu/209` 입력 → 매핑 `pathname`, 카테고리 `Announcements` 선택
4. 화면 하단에 생성된 **`data-repo-id`** 와 **`data-category-id`** 값 복사
5. `_config.yml`의 `comments.giscus.repo_id` / `category_id` 에 붙여넣고, `comments.provider` 를 `giscus` 로 변경 → push

### 📊 방문자 통계 (GoatCounter, 무료·쿠키 없음) — 약 2분

1. https://www.goatcounter.com 가입 → 사이트 코드(예: `myblog`) 발급
2. `_config.yml`의 `analytics.goatcounter.id` 에 코드 입력
3. `pageviews.provider` 를 `goatcounter` 로 변경 → push

> 위 3단계(계정 생성·앱 설치·저장소 설정)는 소유자만 할 수 있어요. 발급된 값만 알려주면 나머지 배선은 도와드릴 수 있습니다.

### ✅ 이미 켜져 있는 것들 (Chirpy 기본)

- **RSS 구독** (`/209/feed.xml`, 사이드바 RSS 아이콘)
- **공유 버튼** (글 하단) · **목차(TOC)** · **최종 수정일**
- **SEO**(sitemap·메타태그) · **PWA**(설치·오프라인) · **다크/라이트 토글**

## 💻 로컬에서 미리보기 (선택)

푸시 전에 로컬에서 보고 싶다면 (Ruby 필요):

```bash
bundle install
bundle exec jekyll serve
# http://127.0.0.1:4000/209/ 접속
```

> Windows에서는 Ruby+DevKit 설치가 필요합니다. 번거로우면 그냥 push 후 GitHub Actions 빌드 결과로 확인해도 됩니다.

## 🎨 자주 바꾸는 설정 (`_config.yml`)

| 항목 | 설명 |
|------|------|
| `title` / `tagline` | 블로그 제목 / 부제 |
| `avatar` | 사이드바 프로필 이미지 (현재 GitHub 아바타) |
| `theme_mode` | 비우면 라이트/다크 토글, `dark`로 고정 가능 |
| `social` | 이름·이메일·링크 |

## 📁 폴더 구조

```
209/
├── _config.yml              # 사이트 전체 설정
├── _posts/                  # 블로그 글 (여기에 글 추가)
├── _tabs/                   # 사이드바 탭 (about/categories/tags/archives)
├── _plugins/                # 최종수정일 자동 기록 훅
├── assets/img/              # 이미지
├── .github/workflows/       # 자동 빌드·배포 (건드리지 말 것)
├── Gemfile                  # 의존성
└── index.html               # 홈
```

---

_Theme: [jekyll-theme-chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) · License: MIT_
