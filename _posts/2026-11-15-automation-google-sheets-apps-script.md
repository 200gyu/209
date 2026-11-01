---
title: "[Automation] 구글시트 + Apps Script — 개발자 없이 만드는 자동 알림·일일 리포트"
date: 2026-11-15 10:00:00 +0900
categories: ["Workplace Automation", "오피스 자동화"]
tags: [구글시트, appsscript, 업무자동화, 자동알림, 일일리포트, 노코드, 탐라야행]
description: "구글시트에 Apps Script를 붙여 새 행 알림 메일과 매일 아침 요약 리포트를 자동으로 보내는 방법. 복사해 쓸 수 있는 코드, 트리거 설정, 권한·한도 주의점, 다음 단계 도구까지 정리했습니다."
---

> 🏷️ **[탐라야행_Automation_Solution]** · 주식회사 탐라야행 정식 업무 자동화 솔루션
{: .prompt-tip }

> 이미 팀에서 구글시트를 쓰고 있다면, **새 프로그램을 도입하지 않고도** 자동 알림과 일일 리포트를 만들 수 있습니다. 구글시트에 내장된 **Apps Script**(자바스크립트 기반)를 쓰는 방법입니다. 코드를 처음 만져 보는 분도 따라 할 수 있도록 복사해 쓸 수 있는 예제 두 개를 준비했습니다.
{: .prompt-info }

## Apps Script가 맞는 경우, 아닌 경우

| 맞는 경우 | 맞지 않는 경우 |
|-----------|----------------|
| 데이터가 이미 **구글시트·구글 폼**에 있다 | 데이터가 사내 서버·ERP 등 외부 시스템에 있다 |
| 하루 수십~수백 건 수준의 가벼운 처리 | 대용량 데이터를 오래 처리해야 한다 |
| **메일·캘린더·드라이브** 같은 구글 서비스와 이어 붙이기 | 여러 외부 서비스를 복잡하게 연결해야 한다 |
| 담당자가 시트 안에서 규칙을 직접 고치고 싶다 | 장애 대응·감사 기록이 엄격하게 요구된다 |

## 준비: 스크립트 편집기 열기

1. 자동화할 구글시트를 엽니다.
2. 상단 메뉴 **확장 프로그램 → Apps Script**를 누릅니다.
3. 열린 편집기에 아래 코드를 붙여 넣고 **저장**합니다.
4. 처음 실행할 때 **권한 승인** 창이 뜹니다. 어떤 권한을 요구하는지 읽고, 내 계정으로 승인합니다.

## 예제 1. 새 행이 추가되면 담당자에게 알림 메일

시트 이름이 `접수`이고, 열이 `A: 접수일 / B: 이름 / C: 문의내용 / D: 처리상태`라고 가정합니다.

```javascript
// 시트에서 사람이 값을 수정·추가하면 호출됩니다 (편집 시 트리거로 연결)
function onNewRow(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== "접수") return;       // 다른 시트는 무시
  const row = e.range.getRow();
  if (row === 1) return;                         // 헤더는 무시

  const [date, name, memo, status] = sheet.getRange(row, 1, 1, 4).getValues()[0];
  // 이름·문의내용이 모두 채워졌고 아직 알림을 안 보낸 행만 처리 (칸을 순서대로 입력해도 빈 알림이 나가지 않게)
  if (!name || !memo || status) return;

  MailApp.sendEmail({
    to: "담당자@회사주소.com",
    subject: `[접수 알림] ${name}님 문의`,
    body: `접수일: ${date}\n이름: ${name}\n내용: ${memo}\n\n시트: ${SpreadsheetApp.getActive().getUrl()}`
  });
  sheet.getRange(row, 4).setValue("알림 발송");  // 중복 발송 방지
}
```

**연결 방법**: Apps Script 왼쪽 시계 모양 **트리거** → **트리거 추가** → 함수 `onNewRow` 선택 → 이벤트 소스 **스프레드시트에서**, 이벤트 유형 **수정 시** → 저장.

> 이 트리거는 **사람이 시트를 직접 수정할 때** 동작합니다. 구글 폼 응답이 시트에 쌓이는 경우에는 "수정 시"가 아니라 이벤트 유형 **양식 제출 시** 트리거를 쓰고, 함수의 `e.range` 대신 `e.values`로 값을 읽도록 바꿔야 합니다.
{: .prompt-info }

> `onEdit` 이름의 단순 트리거는 메일 발송 같은 권한이 필요한 작업을 하지 못합니다. 위처럼 **설치형 트리거**로 직접 추가해야 합니다.
{: .prompt-warning }

## 예제 2. 매일 아침 8시 요약 리포트

어제 접수된 건수와 미처리 건수를 매일 아침 메일로 보냅니다.

```javascript
function dailySummary() {
  const sheet = SpreadsheetApp.getActive().getSheetByName("접수");
  // 헤더 제외, 접수일이 날짜 형식인 행만 대상 (빈 칸·문자열 때문에 오류가 나지 않게)
  const rows = sheet.getDataRange().getValues().slice(1).filter(r => r[0] instanceof Date);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const ymd = Utilities.formatDate(yesterday, "Asia/Seoul", "yyyy-MM-dd");

  const received = rows.filter(r =>
    Utilities.formatDate(new Date(r[0]), "Asia/Seoul", "yyyy-MM-dd") === ymd).length;
  const pending = rows.filter(r => !r[3] || r[3] === "대기").length;

  MailApp.sendEmail({
    to: "담당자@회사주소.com",
    subject: `[일일 리포트] ${ymd} 접수 ${received}건 / 미처리 ${pending}건`,
    body: `어제(${ymd}) 접수: ${received}건\n현재 미처리: ${pending}건\n\n${SpreadsheetApp.getActive().getUrl()}`
  });
}

// 최초 한 번 실행해 두면 매일 8시에 자동 실행됩니다
function createDailyTrigger() {
  ScriptApp.newTrigger("dailySummary").timeBased().atHour(8).everyDays(1).create();
}
```

**연결 방법**: `createDailyTrigger`를 편집기에서 **한 번만** 실행하면 매일 오전 8시 전후에 `dailySummary`가 실행됩니다. 시간 기반 트리거는 정확히 8시 정각이 아니라 **지정한 시(8시) 이후 1시간 안의 어느 시점**에 실행됩니다. 정확한 시각이 중요한 업무에는 맞지 않습니다.

## 사고 방지 체크리스트

- **받는 사람 주소를 코드에 하드코딩하지 않기** — 별도 `설정` 시트에 담당자 메일을 적어 두고 코드에서 읽으면, 담당자가 바뀌어도 코드를 고치지 않아도 됩니다.
- **중복 발송 막기** — 예제 1처럼 "발송 완료" 상태를 시트에 남겨 같은 행에 알림이 두 번 가지 않게 합니다.
- **실패를 알아채기** — Apps Script의 실행 기록에서 오류를 확인할 수 있고, 트리거 설정에서 **실패 알림 메일**을 받도록 지정할 수 있습니다.
- **개인정보 주의** — 시트에 고객 연락처가 있다면 시트 공유 범위를 최소로 하고, 알림 메일 본문에는 꼭 필요한 정보만 넣으세요.
- **소유자 계정** — 스크립트는 만든 사람의 권한으로 돌아갑니다. 퇴사·계정 삭제 시 멈출 수 있으니 **공용 운영 계정**으로 만들거나 인수인계 절차를 정해 두세요.

## 한도와 한계

Apps Script에는 **하루 메일 발송 수, 실행 시간, 트리거 개수** 같은 한도가 있고 계정 종류(개인 계정/Workspace)에 따라 다릅니다. 정확한 수치는 구글의 공식 안내를 확인하세요. 한도에 자주 닿거나, 구글 서비스 밖의 시스템과 자주 연결해야 한다면 다음 단계로 넘어갈 때입니다.

| 단계 | 도구 | 언제 |
|------|------|------|
| 1 | 구글시트 + Apps Script | 시트 중심의 가벼운 알림·리포트 |
| 2 | n8n·Make 같은 노코드 도구 | 여러 서비스를 이어야 할 때 ([도구 비교]({% post_url 2026-11-11-automation-n8n-vs-make %})) |
| 3 | 파이썬 등 직접 개발 | 대량 처리·복잡한 규칙 ([파이썬 엑셀 자동화]({% post_url 2026-07-13-automation-python-excel-guide %})) |

시트로 경영 지표를 한눈에 보는 방법은 [구글시트로 경영 대시보드 만들기]({% post_url 2026-07-18-data-google-sheet-dashboard %})를 함께 보세요.

> 우리 시트 업무를 자동화할 수 있는지 **시트 양식 한 장**만 보내 주세요. 코드로 풀지, 노코드로 풀지부터 같이 판단해 드립니다. → [Business Inquiry]({% post_url 2026-07-12-inside-tamna-business-inquiry %})
{: .prompt-info }

---

> 📎 본 글은 **주식회사 탐라야행 기술연구소**의 R&D 자산입니다.
> **함께 읽기** — [⚡ 자동화 대표 사례]({% post_url 2026-07-12-automation-excel-showcase %}) · [📖 블로그 안내]({% post_url 2026-07-12-start-here-reading-guide %}) · [📩 비즈니스 문의]({% post_url 2026-07-12-inside-tamna-business-inquiry %})
{: .prompt-info }
