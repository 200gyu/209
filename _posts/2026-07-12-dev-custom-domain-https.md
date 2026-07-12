---
title: "[Dev] 커스텀 도메인 + HTTPS 연결 — 가비아에서 GitHub Pages로"
date: 2026-07-12 22:30:00 +0900
categories: ["Dev & DevOps"]
tags: [커스텀도메인, dns, githubpages, https, 가비아, cname]
description: "가비아에서 산 도메인(code209.kr)을 GitHub Pages 블로그에 연결하고 HTTPS까지 켠 실제 과정. A레코드·CNAME·baseurl 함정 포함."
image:
  path: /assets/img/posts/dev-domain.png
  alt: "커스텀 도메인 + HTTPS 연결"
---

> `200gyu.github.io/209` → **`code209.kr`**. 실제로 이 블로그에 커스텀 도메인을 붙인 과정을 그대로 정리했습니다.
{: .prompt-info }

## 🗺️ 큰 그림 — 두 군데 작업

1. **도메인 등록기관(가비아)** — DNS로 "이 도메인은 GitHub 서버를 보라" 지정
2. **GitHub / 레포** — 커스텀 도메인 등록 + 사이트 설정 변경

## ① 가비아 DNS — A 레코드 4개

apex 도메인(`code209.kr`)은 GitHub Pages IP로 **A 레코드**를 겁니다.

```text
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

- `www`도 쓰려면: `CNAME  www  <사용자>.github.io.`
- **TTL은 세팅 중 300(5분)** 으로 낮게 → 안정되면 3600으로.

## ② GitHub Pages 설정

- 저장소 **Settings → Pages → Custom domain** 에 `code209.kr` 입력
- 레포 루트에 **`CNAME`** 파일(내용: `code209.kr`) — Actions 배포에선 이 파일이 도메인을 유지
- DNS 체크 통과 후 **Enforce HTTPS** 체크 (인증서는 GitHub이 자동 발급)

## 🕳️ 핵심 함정 — baseurl

> 프로젝트 사이트는 `.../209/`(하위경로)로 열립니다. 커스텀 도메인은 **루트(`code209.kr/`)** 로 열리므로, `_config.yml`의 `baseurl`을 **비워야** CSS·링크가 안 깨집니다.
{: .prompt-warning }

```yaml
url: "https://code209.kr"
baseurl: ""   # 하위경로 배포 시엔 "/209" 였던 것을 비움
```

## ✅ 검증 방법 (개발자 팁)

```bash
# DNS가 GitHub IP로 향하는지 (로컬 캐시 무시)
curl -sSL "https://dns.google/resolve?name=code209.kr&type=A"
# 실제 응답 확인
curl -s -o /dev/null -w "%{http_code}\n" https://code209.kr/
```

- 전파는 보통 몇 분~수십 분. `github.io` 주소는 자동으로 커스텀 도메인으로 **301 리다이렉트**됩니다.
- 인증서 발급까진 최대 1시간. 그 전엔 HTTPS가 잠깐 안 될 수 있어요.

## 🔗 함께 보기

- [블로그 배포기 (Jekyll + Chirpy + Actions)]({% post_url 2026-07-12-dev-deploy-blog-github-pages %})

> **주식회사 넥스트엑스(NEXT X)** — 도메인·인증서·배포까지 매끄럽게. [기술 문의]({% post_url 2026-07-12-inside-nextx-business-inquiry %})
{: .prompt-info }


---

> 📎 본 글은 **주식회사 넥스트엑스(NEXT X) 기술연구소**의 R&D 자산입니다.
> **함께 읽기** — [🛠️ 개발 대표 사례]({% post_url 2026-07-12-dev-deploy-blog-github-pages %}) · [📖 블로그 안내]({% post_url 2026-07-12-start-here-reading-guide %}) · [📩 비즈니스 문의]({% post_url 2026-07-12-inside-nextx-business-inquiry %})
{: .prompt-info }
