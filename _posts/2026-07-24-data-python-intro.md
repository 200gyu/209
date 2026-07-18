---
title: "[Data] Python 데이터 처리 입문 — pandas로 엑셀 자동화를 넘어서"
date: 2026-07-24 14:00:00 +0900
categories: ["Data Engineering", "분석·도구"]
tags: [python, pandas, polars, 데이터처리, 엑셀자동화, dataframe, csv, nextx]
description: "왜 데이터 엔지니어에게 Python인가? pandas 기초(DataFrame, 읽기/쓰기, 필터·그룹·병합)부터 Polars 소개, 그리고 수작업 엑셀을 코드로 대체하는 실전 패턴까지."
image:
  path: /assets/img/posts/data-python-intro.png
  alt: "Python 데이터 처리 입문 — pandas로 엑셀 자동화를 넘어서"
mermaid: true
---

> **[NextX_Data_Solution]** · 주식회사 넥스트엑스(NEXT X) 정식 데이터 솔루션
{: .prompt-tip }

> **"엑셀로 충분하지 않나요?"** — 데이터가 1만 행을 넘고, 매월 같은 작업을 반복하고, 사람마다 다른 결과가 나온다면 **코드로 전환할 타이밍**입니다. 이 글에서는 Python과 pandas를 처음 접하는 실무자를 위해, 엑셀에서 코드로 넘어가는 전체 흐름을 다룹니다.
{: .prompt-info }

---

## 1. 왜 Python인가 -- 엑셀의 한계, Python의 강점

### 엑셀이 한계에 부딪히는 순간

엑셀은 소규모 데이터 정리에는 최고의 도구입니다.
하지만 다음 상황이 반복된다면 엑셀만으로는 부족합니다.

| 상황 | 엑셀에서의 문제 | Python이 해결하는 방식 |
|------|-----------------|------------------------|
| 10만 행 이상 데이터 | 느려지고, 100만 행 한계 | 메모리가 허용하는 한 무제한 |
| 매월 반복 작업 | 사람이 매번 클릭·복붙 | 스크립트 한 번 실행으로 끝 |
| 여러 파일 병합 | 수작업 복사-붙여넣기 | `pd.concat()` 한 줄 |
| 결과 재현성 | 누가 했느냐에 따라 다름 | 코드 = 문서 = 동일 결과 |
| 데이터베이스 연동 | 불가능 또는 매우 제한적 | `read_sql()` 한 줄로 연결 |
| 자동 스케줄 실행 | 불가 | cron / Task Scheduler 연동 |

### Python이 데이터 엔지니어의 표준이 된 이유

1. **오픈소스** — 무료이며, 패키지 생태계가 방대합니다.
2. **pandas** — 표 형태 데이터를 다루는 사실상의 표준 라이브러리.
3. **자동화 친화적** — 스크립트를 짜면 매일 같은 시간에 실행할 수 있습니다.
4. **확장성** — 데이터가 커지면 Polars, Spark로 코드 한 줄만 바꿔 전환 가능.
5. **재현성** — 코드가 곧 문서이므로 "누가 해도 같은 결과"가 보장됩니다.

> Python 엑셀 자동화(openpyxl)에 대한 기초는 [Python 엑셀 자동화 가이드]({% post_url 2026-07-13-automation-python-excel-guide %})를 먼저 참고하세요.
{: .prompt-info }

---

## 2. pandas 핵심 개념 -- DataFrame과 Series

pandas에는 두 가지 핵심 자료구조가 있습니다.

| 개념 | 엑셀 대응 | 설명 |
|------|-----------|------|
| **DataFrame** | 시트 전체 (행 + 열) | 2차원 표 형태 데이터 |
| **Series** | 하나의 열 | 1차원 배열 (이름 있는 리스트) |

```python
import pandas as pd

# DataFrame 직접 생성 — 엑셀 시트를 코드로 만드는 것과 같습니다
df = pd.DataFrame({
    "이름": ["김민수", "이수진", "박철호", "정다은"],
    "부서": ["영업", "개발", "영업", "인사"],
    "급여": [3200, 4100, 3500, 3800],
    "입사연도": [2021, 2019, 2022, 2020],
})

print(df)
#     이름  부서    급여  입사연도
# 0  김민수  영업  3200    2021
# 1  이수진  개발  4100    2019
# 2  박철호  영업  3500    2022
# 3  정다은  인사  3800    2020
```

```python
# Series — DataFrame에서 열 하나를 꺼내면 Series가 됩니다
salary_series = df["급여"]
print(type(salary_series))  # <class 'pandas.core.series.Series'>
print(salary_series.mean()) # 3650.0
```

엑셀에서 시트 전체가 DataFrame, 한 열이 Series라고 기억하면 됩니다.

```mermaid
graph LR
    A["엑셀 파일<br/>.xlsx"] -->|"pd.read_excel()"| B["DataFrame"]
    B --> C["Series<br/>(열 단위)"]
    B --> D["필터 · 그룹 · 병합"]
    D --> E["to_excel() / to_csv()"]
```

---

## 3. 데이터 읽기 -- CSV, Excel, JSON, SQL

### 설치

```bash
# pandas 설치 (Excel 지원 포함)
pip install pandas openpyxl xlsxwriter
```

### CSV 읽기

```python
import pandas as pd

# 기본 CSV 읽기
df = pd.read_csv("매출현황.csv", encoding="utf-8-sig")

# 인코딩이 다를 때 (Windows 엑셀에서 저장한 CSV)
df = pd.read_csv("매출현황.csv", encoding="cp949")

# 특정 열만 읽기 (메모리 절약)
df = pd.read_csv("매출현황.csv", usecols=["거래일", "금액", "고객명"])

# 날짜 열을 자동 파싱
df = pd.read_csv("매출현황.csv", parse_dates=["거래일"])
```

### Excel 읽기

```python
# 엑셀 파일 읽기 — 시트 이름 지정 가능
df = pd.read_excel("급여대장_2026_05.xlsx", sheet_name="5월")

# 여러 시트를 한 번에 읽기 (딕셔너리로 반환)
all_sheets = pd.read_excel("급여대장_2026.xlsx", sheet_name=None)
for sheet_name, sheet_df in all_sheets.items():
    print(f"시트: {sheet_name}, 행수: {len(sheet_df)}")

# 특정 범위만 읽기 (A1:D100에 해당)
df = pd.read_excel("급여대장.xlsx", usecols="A:D", nrows=100)
```

### JSON 읽기

```python
# API 응답이나 로그 파일에서 JSON 읽기
df = pd.read_json("api_response.json")

# 중첩(nested) JSON — normalize 사용
import json

with open("nested_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

df = pd.json_normalize(data["results"])
```

### SQL 읽기

```python
import sqlite3

# SQLite 연결 예시
conn = sqlite3.connect("company.db")
df = pd.read_sql("SELECT * FROM employees WHERE dept = '영업'", conn)
conn.close()

# PostgreSQL 연결 예시 (sqlalchemy 필요)
from sqlalchemy import create_engine

engine = create_engine("postgresql://user:pass@localhost:5432/mydb")
df = pd.read_sql("SELECT * FROM sales WHERE year = 2026", engine)
```

> 데이터 읽기 단계에서 인코딩 문제가 가장 흔합니다. Windows 엑셀에서 저장한 CSV는 `cp949` 또는 `euc-kr`, 그 외 대부분은 `utf-8`입니다.
{: .prompt-warning }

| 함수 | 용도 | 필수 라이브러리 |
|------|------|-----------------|
| `read_csv()` | CSV / TSV | (내장) |
| `read_excel()` | .xlsx / .xls | openpyxl |
| `read_json()` | JSON 파일·문자열 | (내장) |
| `read_sql()` | DB 쿼리 결과 | sqlalchemy / DB 드라이버 |
| `read_parquet()` | Parquet (대용량) | pyarrow |

---

## 4. 데이터 탐색 -- 읽은 뒤 가장 먼저 할 일

데이터를 읽은 직후에는 **구조를 파악**해야 합니다.
엑셀에서 눈으로 훑는 것을 코드로 하는 단계입니다.

```python
# 예시 데이터 생성
df = pd.DataFrame({
    "이름": ["김민수", "이수진", "박철호", "정다은", "최유리"],
    "부서": ["영업", "개발", "영업", "인사", "개발"],
    "급여": [3200, 4100, 3500, 3800, 4500],
    "입사일": pd.to_datetime(["2021-03-01", "2019-06-15", "2022-01-10",
                              "2020-09-01", "2018-11-20"]),
    "평가등급": ["B", "A", "B", "A", "S"],
})

# 상위 5행 미리보기 — 엑셀에서 스크롤 없이 첫 줄들만 보는 것
print(df.head())

# 행·열 개수 확인
print(df.shape)   # (5, 5) → 5행 5열

# 열 이름·타입·결측 개수 한눈에 보기
print(df.info())
# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 5 entries, 0 to 4
# Data columns (total 5 columns):
#  #   Column  Non-Null Count  Dtype
# ---  ------  --------------  -----
#  0   이름      5 non-null      object
#  1   부서      5 non-null      object
#  2   급여      5 non-null      int64
#  3   입사일     5 non-null      datetime64[ns]
#  4   평가등급    5 non-null      object

# 수치 열 통계 요약 — 엑셀의 요약 통계를 한 줄로
print(df.describe())
#               급여
# count     5.000000
# mean   3820.000000
# std     502.991027
# min    3200.000000
# 25%    3500.000000
# 50%    3800.000000
# 75%    4100.000000
# max    4500.000000

# 열별 데이터 타입 확인
print(df.dtypes)
```

**탐색 체크리스트**

- [ ] `shape` — 행·열 개수가 예상과 맞는가?
- [ ] `info()` — 결측(Non-Null Count)이 있는 열은?
- [ ] `dtypes` — 숫자여야 하는 열이 `object`(문자열)로 잡혔는가?
- [ ] `describe()` — min/max에 이상치가 보이는가?

> 데이터 품질 점검의 상세 기준은 [데이터 클렌징 실전]({% post_url 2026-07-15-data-cleansing %})을 참고하세요.
{: .prompt-tip }

---

## 5. 필터링 -- 원하는 행만 골라내기

### Boolean Indexing (불리언 인덱싱)

```python
# 급여가 3500 이상인 직원만
high_salary = df[df["급여"] >= 3500]
print(high_salary)

# 영업부이면서 급여 3500 이상 — 조건을 &(AND)로 연결
filtered = df[(df["부서"] == "영업") & (df["급여"] >= 3500)]
print(filtered)

# 개발부이거나 인사부 — 조건을 |(OR)로 연결
dev_or_hr = df[(df["부서"] == "개발") | (df["부서"] == "인사")]
print(dev_or_hr)
```

> 조건을 연결할 때 반드시 **각 조건을 괄호**로 감싸야 합니다. `df[df["부서"] == "영업" & df["급여"] >= 3500]`은 에러가 납니다.
{: .prompt-warning }

### query() 메서드

```python
# SQL의 WHERE절과 유사한 문법
result = df.query("부서 == '영업' and 급여 >= 3500")
print(result)

# 변수를 참조할 때는 @ 접두사
min_salary = 4000
result = df.query("급여 >= @min_salary")
print(result)
```

### isin() -- 여러 값 중 하나에 해당하는지

```python
# 부서가 "영업" 또는 "개발"인 행
target_depts = ["영업", "개발"]
result = df[df["부서"].isin(target_depts)]
print(result)

# 반대: 해당하지 않는 행
result = df[~df["부서"].isin(target_depts)]
print(result)
```

| 방법 | 장점 | 적합한 상황 |
|------|------|-------------|
| Boolean Indexing | 가장 범용적 | 복잡한 조건 조합 |
| `query()` | SQL과 유사해 읽기 쉬움 | 단순 조건, 가독성 우선 |
| `isin()` | 목록 기반 필터에 간결 | "A 또는 B 또는 C" 패턴 |

---

## 6. 집계 -- groupby, agg, pivot_table

### groupby + agg

엑셀의 피벗 테이블을 코드로 구현하는 가장 기본적인 방법입니다.

```python
# 부서별 급여 평균
dept_avg = df.groupby("부서")["급여"].mean()
print(dept_avg)
# 부서
# 개발    4300.0
# 영업    3350.0
# 인사    3800.0

# 부서별 여러 통계를 한 번에
dept_stats = df.groupby("부서")["급여"].agg(["mean", "sum", "count", "max"])
print(dept_stats)
#        mean   sum  count   max
# 부서
# 개발  4300  8600      2  4500
# 영업  3350  6700      2  3500
# 인사  3800  3800      1  3800
```

```python
# 여러 열에 서로 다른 집계 적용
summary = df.groupby("부서").agg(
    평균급여=("급여", "mean"),
    인원수=("이름", "count"),
    최고급여=("급여", "max"),
    최근입사=("입사일", "max"),
)
print(summary)
```

### pivot_table -- 엑셀 피벗과 1:1 대응

```python
# 예시: 부서·평가등급별 급여 평균
pivot = df.pivot_table(
    values="급여",
    index="부서",
    columns="평가등급",
    aggfunc="mean",
    fill_value=0,    # 비어있는 칸은 0으로
)
print(pivot)
# 평가등급     A       B       S
# 부서
# 개발     4100.0     0   4500.0
# 영업        0    3350.0     0
# 인사     3800.0     0       0
```

```python
# 집계 함수를 여러 개 동시에
pivot_multi = df.pivot_table(
    values="급여",
    index="부서",
    aggfunc=["mean", "sum", "count"],
)
print(pivot_multi)
```

```mermaid
graph TD
    A["원본 DataFrame"] --> B["groupby('부서')"]
    B --> C["agg(mean, sum, count)"]
    C --> D["부서별 요약 테이블"]
    A --> E["pivot_table()"]
    E --> F["부서 x 평가등급<br/>교차 집계"]
```

---

## 7. 병합 -- merge와 concat

### merge -- SQL JOIN과 같은 동작

```python
# 직원 테이블
employees = pd.DataFrame({
    "사번": ["E001", "E002", "E003", "E004"],
    "이름": ["김민수", "이수진", "박철호", "정다은"],
    "부서코드": ["D10", "D20", "D10", "D30"],
})

# 부서 마스터 테이블
departments = pd.DataFrame({
    "부서코드": ["D10", "D20", "D30", "D40"],
    "부서명": ["영업부", "개발부", "인사부", "재무부"],
    "부서장": ["최부장", "김팀장", "이과장", "박차장"],
})

# INNER JOIN — 양쪽 모두에 있는 행만
merged = pd.merge(employees, departments, on="부서코드", how="inner")
print(merged)
#    사번   이름 부서코드  부서명   부서장
# 0  E001  김민수   D10  영업부  최부장
# 1  E002  이수진   D20  개발부  김팀장
# 2  E003  박철호   D10  영업부  최부장
# 3  E004  정다은   D30  인사부  이과장

# LEFT JOIN — 왼쪽 테이블 기준 (직원은 모두 유지)
merged_left = pd.merge(employees, departments, on="부서코드", how="left")

# 열 이름이 다를 때
merged = pd.merge(
    employees, departments,
    left_on="부서코드", right_on="부서코드",
    how="left",
)
```

| merge how 옵션 | SQL 대응 | 설명 |
|----------------|----------|------|
| `inner` | INNER JOIN | 양쪽 모두 매칭되는 행만 |
| `left` | LEFT JOIN | 왼쪽 전체 + 오른쪽 매칭 |
| `right` | RIGHT JOIN | 오른쪽 전체 + 왼쪽 매칭 |
| `outer` | FULL OUTER JOIN | 양쪽 전체 (매칭 안 되면 NaN) |

> SQL JOIN에 대한 심화 내용은 [SQL 실전 심화]({% post_url 2026-07-21-data-sql-advanced %})를 참고하세요.
{: .prompt-tip }

### concat -- 같은 구조의 데이터를 위아래로 쌓기

```python
# 5월, 6월 급여 데이터를 위아래로 결합
may_df = pd.read_excel("급여_2026_05.xlsx")
jun_df = pd.read_excel("급여_2026_06.xlsx")

# 위아래로 쌓기 (UNION ALL)
combined = pd.concat([may_df, jun_df], ignore_index=True)
print(f"5월: {len(may_df)}행, 6월: {len(jun_df)}행, 합계: {len(combined)}행")

# 여러 파일을 한꺼번에 합치기
import glob

files = glob.glob("급여_2026_*.xlsx")
dfs = [pd.read_excel(f) for f in files]
all_data = pd.concat(dfs, ignore_index=True)
```

```mermaid
graph LR
    subgraph "merge (좌우 결합)"
        A1["직원 테이블"] --- M["merge()"]
        A2["부서 테이블"] --- M
        M --> R1["결합된 테이블"]
    end
    subgraph "concat (상하 결합)"
        B1["5월 데이터"] --- C["concat()"]
        B2["6월 데이터"] --- C
        C --> R2["전체 데이터"]
    end
```

---

## 8. 데이터 변환 -- apply, map, replace, fillna

### apply -- 열 또는 행에 함수 적용

```python
# 급여에서 세금(3.3%) 공제 후 실수령액 계산
df["실수령액"] = df["급여"].apply(lambda x: int(x * 0.967))
print(df[["이름", "급여", "실수령액"]])
#     이름    급여  실수령액
# 0  김민수  3200    3094
# 1  이수진  4100    3964
# 2  박철호  3500    3384
# 3  정다은  3800    3674
# 4  최유리  4500    4351

# 직접 만든 함수를 적용
def salary_grade(salary):
    """급여 구간별 등급 부여"""
    if salary >= 4500:
        return "상"
    elif salary >= 3500:
        return "중"
    else:
        return "하"

df["급여등급"] = df["급여"].apply(salary_grade)
print(df[["이름", "급여", "급여등급"]])
```

### map -- 값 매핑 (사전 기반 변환)

```python
# 부서 코드를 부서명으로 변환
dept_map = {"영업": "Sales", "개발": "Development", "인사": "HR"}
df["부서영문"] = df["부서"].map(dept_map)
print(df[["이름", "부서", "부서영문"]])

# 평가등급을 점수로 변환
grade_to_score = {"S": 100, "A": 90, "B": 80, "C": 70}
df["평가점수"] = df["평가등급"].map(grade_to_score)
```

### replace -- 특정 값 치환

```python
# 표기 통일: 여러 형태의 부서명을 하나로
df["부서"] = df["부서"].replace({
    "영업부": "영업",
    "영업팀": "영업",
    "Sales": "영업",
})

# 정규식으로 치환 — "(주)", "주식회사" 제거
df["회사명"] = df["회사명"].str.replace(r"(\(주\)|주식회사)\s*", "", regex=True)
```

> 표기 통일과 데이터 정제의 체계적인 방법론은 [데이터 클렌징 실전]({% post_url 2026-07-15-data-cleansing %})과 [엑셀 함수로 5분 정리]({% post_url 2026-07-18-data-excel-cleaning-functions %})를 참고하세요.
{: .prompt-info }

### fillna -- 결측값 처리

```python
# 결측값을 특정 값으로 채우기
df["비고"] = df["비고"].fillna("없음")

# 수치 열은 평균으로 채우기
df["급여"] = df["급여"].fillna(df["급여"].mean())

# 바로 앞 값으로 채우기 (시계열 데이터에 유용)
df["매출"] = df["매출"].ffill()

# 결측값 확인
print(df.isnull().sum())
# 이름      0
# 부서      0
# 급여      0
# 비고      2  ← 결측 2건
```

| 함수 | 용도 | 엑셀 대응 |
|------|------|-----------|
| `apply()` | 사용자 정의 함수 적용 | 수식 열 추가 |
| `map()` | 딕셔너리 기반 값 매핑 | VLOOKUP |
| `replace()` | 특정 값 치환 | 찾기-바꾸기 |
| `fillna()` | 결측값 채우기 | IF(ISBLANK(...)) |
| `str.replace()` | 문자열 패턴 치환 | SUBSTITUTE |
| `astype()` | 데이터 타입 변환 | VALUE(), TEXT() |

---

## 9. 데이터 쓰기 -- to_csv, to_excel, to_sql

처리가 끝난 데이터를 파일이나 데이터베이스로 저장합니다.

### CSV로 저장

```python
# 기본 저장 — 인덱스 제외 (엑셀에서 열기 편하게)
df.to_csv("결과_직원현황.csv", index=False, encoding="utf-8-sig")

# utf-8-sig를 쓰면 엑셀에서 한글이 깨지지 않습니다
# (BOM이 포함되어 엑셀이 인코딩을 자동 감지)
```

### Excel로 저장

```python
# 기본 저장
df.to_excel("결과_직원현황.xlsx", index=False, sheet_name="직원")

# 여러 시트에 나눠 저장
with pd.ExcelWriter("연간보고서.xlsx", engine="xlsxwriter") as writer:
    dept_summary.to_excel(writer, sheet_name="부서별요약")
    monthly_data.to_excel(writer, sheet_name="월별데이터")
    raw_data.to_excel(writer, sheet_name="원본", index=False)

# 기존 엑셀 파일에 시트 추가 (덮어쓰기 아님)
with pd.ExcelWriter("기존파일.xlsx", engine="openpyxl", mode="a") as writer:
    new_data.to_excel(writer, sheet_name="추가시트", index=False)
```

### SQL 데이터베이스에 저장

```python
import sqlite3

conn = sqlite3.connect("company.db")

# 테이블이 없으면 생성, 있으면 교체
df.to_sql("employees", conn, if_exists="replace", index=False)

# 기존 테이블에 데이터 추가
df.to_sql("employees", conn, if_exists="append", index=False)

conn.close()
```

| 함수 | 포맷 | 주요 옵션 |
|------|------|-----------|
| `to_csv()` | CSV | `encoding`, `index`, `sep` |
| `to_excel()` | .xlsx | `sheet_name`, `engine` |
| `to_sql()` | DB 테이블 | `if_exists`, `dtype` |
| `to_parquet()` | Parquet | `compression`, `engine` |
| `to_json()` | JSON | `orient`, `force_ascii` |

> 데이터 파이프라인에서 쓰기 단계(Load)의 설계 원칙은 [데이터 파이프라인이란?]({% post_url 2026-07-12-what-is-data-pipeline %})을 참고하세요.
{: .prompt-tip }

---

## 10. pandas vs Polars -- 대용량 데이터의 새로운 대안

pandas는 강력하지만, **100만 행 이상**이면 속도와 메모리 한계가 느껴집니다.
이때 고려할 대안이 **Polars**입니다.

### Polars란

- **Rust로 작성된** 고속 DataFrame 라이브러리
- Apache Arrow 기반 메모리 모델 (pandas보다 효율적)
- **Lazy evaluation** — 실행 전 최적화 후 한 번에 처리
- 멀티코어 병렬 처리 기본 지원

### 핵심 비교

| 항목 | pandas | Polars |
|------|--------|--------|
| 구현 언어 | C + Python | Rust |
| 메모리 효율 | 보통 | 높음 (Arrow 기반) |
| 멀티코어 | 기본 단일 스레드 | 기본 병렬 |
| Lazy 평가 | 없음 | 있음 (최적화) |
| API 성숙도 | 매우 높음 (10년+) | 빠르게 성장 중 |
| 생태계 | 방대 (호환 라이브러리 다수) | 성장 중 |
| 학습 곡선 | 자료 풍부 | pandas 경험 필요 |
| 대용량 처리 | 100만 행 이상 느려짐 | 1억 행도 쾌적 |

### Polars 코드 맛보기

```python
import polars as pl

# CSV 읽기 — pandas와 거의 동일한 인터페이스
df = pl.read_csv("매출현황.csv")

# 필터링
high_sales = df.filter(pl.col("금액") >= 1000000)

# 그룹 집계
summary = df.group_by("부서").agg([
    pl.col("금액").sum().alias("총매출"),
    pl.col("금액").mean().alias("평균매출"),
    pl.col("거래건수").count().alias("건수"),
])

# Lazy 평가 — 큰 데이터에서 성능 차이가 극적
result = (
    pl.scan_csv("대용량_10GB.csv")    # 파일을 즉시 읽지 않음
    .filter(pl.col("연도") == 2026)    # 조건을 모아둠
    .group_by("부서")                   # 집계를 모아둠
    .agg(pl.col("매출").sum())          # 모아둔 연산을
    .collect()                          # 여기서 한 번에 최적화 후 실행
)
```

### pandas와 Polars 코드 비교

```python
# ── pandas ─────────────────────────────
import pandas as pd

df_pd = pd.read_csv("sales.csv")
result_pd = (
    df_pd[df_pd["year"] == 2026]
    .groupby("dept")["amount"]
    .sum()
    .reset_index()
)

# ── Polars ─────────────────────────────
import polars as pl

result_pl = (
    pl.scan_csv("sales.csv")
    .filter(pl.col("year") == 2026)
    .group_by("dept")
    .agg(pl.col("amount").sum())
    .collect()
)
```

### 언제 무엇을 쓸까

```mermaid
graph TD
    A["데이터 처리 필요"] --> B{"데이터 크기?"}
    B -->|"100만 행 이하"| C["pandas 추천"]
    B -->|"100만 ~ 1억 행"| D["Polars 추천"]
    B -->|"1억 행 이상 / 분산"| E["Spark 추천"]
    C --> F["대부분의 실무에서 충분"]
    D --> G["단일 머신에서 최고 성능"]
    E --> H["클러스터 필요"]
```

> 처음 배운다면 **pandas부터 시작**하세요. 문서·레퍼런스·커뮤니티가 압도적으로 많고, Polars의 API도 pandas를 잘 아는 사람이 빠르게 적응할 수 있도록 설계되어 있습니다.
{: .prompt-info }

---

## 11. 실전 예제 -- "5월/6월 급여 엑셀에서 통합 명부 자동 생성"

넥스트엑스 파트너스 매칭 매니저 업무에서 실제로 발생하는 시나리오입니다.
매월 파트너사별 급여 엑셀을 받아 **통합 명부**를 만드는 작업을, 수작업에서 코드로 전환합니다.

### 시나리오

- 파트너사 3곳에서 매월 급여 엑셀을 받습니다.
- 각 파일의 열 이름과 형식이 조금씩 다릅니다.
- 최종 산출물: 통합 명부 엑셀 + 파트너사별 요약 시트

### 수작업 vs 코드 비교

| 단계 | 수작업 (엑셀) | Python 코드 |
|------|--------------|-------------|
| 파일 열기 | 3개 파일 각각 열기 | `glob` + `read_excel` |
| 열 이름 통일 | 수동으로 열 이름 변경 | `rename()` |
| 데이터 합치기 | 복사-붙여넣기 | `concat()` |
| 중복 확인 | `COUNTIF`로 확인 | `duplicated()` |
| 결측값 처리 | 눈으로 확인 후 수정 | `fillna()` |
| 요약 테이블 | 피벗 테이블 수동 생성 | `groupby().agg()` |
| 결과 저장 | 다른 이름으로 저장 | `to_excel()` |
| **소요 시간** | **약 30~40분** | **약 10초 (최초 작성 후)** |

### 전체 코드

```python
"""
급여 통합 명부 자동 생성 스크립트
- 파트너사별 급여 엑셀을 읽어 통합 명부를 생성합니다.
- 실행: python merge_salary.py
"""
import glob
import pandas as pd
from datetime import datetime

# ── 1단계: 파일 읽기 ──────────────────────
# 폴더에서 급여 엑셀 파일을 모두 찾습니다
files = glob.glob("input/급여_2026_*.xlsx")
print(f"발견된 파일: {len(files)}개")

dfs = []
for filepath in files:
    df = pd.read_excel(filepath)

    # 파일명에서 월 정보 추출 (급여_2026_05.xlsx → "05")
    month = filepath.split("_")[-1].replace(".xlsx", "")
    df["기준월"] = month

    # 파일명에서 파트너사 정보 추출 (있는 경우)
    dfs.append(df)
    print(f"  - {filepath}: {len(df)}행 읽음")

# ── 2단계: 열 이름 통일 ───────────────────
# 파트너사마다 열 이름이 다를 수 있으므로 표준 이름으로 변환
column_map = {
    # 파트너사 A 형식
    "성명": "이름",
    "기본급(만원)": "기본급",
    "수당(만원)": "수당",
    # 파트너사 B 형식
    "직원명": "이름",
    "base_salary": "기본급",
    "allowance": "수당",
    # 파트너사 C 형식
    "name": "이름",
    "salary": "기본급",
    "bonus": "수당",
}

for i, df in enumerate(dfs):
    dfs[i] = df.rename(columns=column_map)

# ── 3단계: 데이터 합치기 ──────────────────
combined = pd.concat(dfs, ignore_index=True)
print(f"\n전체 합산: {len(combined)}행")

# ── 4단계: 데이터 정제 ────────────────────
# 이름 공백 제거
combined["이름"] = combined["이름"].str.strip()

# 결측값 처리 — 수당이 없으면 0으로
combined["수당"] = combined["수당"].fillna(0)

# 총급여 계산
combined["총급여"] = combined["기본급"] + combined["수당"]

# 중복 확인 (같은 월에 같은 이름이 두 번 있으면 경고)
duplicates = combined[combined.duplicated(subset=["이름", "기준월"], keep=False)]
if len(duplicates) > 0:
    print(f"\n[경고] 중복 의심 {len(duplicates)}건:")
    print(duplicates[["이름", "기준월", "파트너사"]])

# ── 5단계: 요약 통계 ─────────────────────
# 파트너사별·월별 요약
summary = combined.groupby(["파트너사", "기준월"]).agg(
    인원수=("이름", "count"),
    총급여합계=("총급여", "sum"),
    평균급여=("총급여", "mean"),
    최고급여=("총급여", "max"),
).reset_index()

# 전체 요약
total_summary = pd.DataFrame({
    "항목": ["전체 인원", "전체 총급여", "전체 평균급여"],
    "값": [
        len(combined),
        combined["총급여"].sum(),
        round(combined["총급여"].mean(), 1),
    ],
})

# ── 6단계: 결과 저장 ─────────────────────
today = datetime.now().strftime("%Y%m%d")
output_path = f"output/통합명부_{today}.xlsx"

with pd.ExcelWriter(output_path, engine="xlsxwriter") as writer:
    # 시트 1: 전체 명부
    combined.to_excel(writer, sheet_name="통합명부", index=False)

    # 시트 2: 파트너사별 요약
    summary.to_excel(writer, sheet_name="파트너사별요약", index=False)

    # 시트 3: 전체 요약
    total_summary.to_excel(writer, sheet_name="전체요약", index=False)

print(f"\n저장 완료: {output_path}")
print(f"  - 통합명부: {len(combined)}행")
print(f"  - 파트너사별요약: {len(summary)}행")
```

### 처리 흐름 다이어그램

```mermaid
graph TD
    A["파트너사 A<br/>급여_2026_05.xlsx"] --> D["glob.glob()로<br/>파일 목록 수집"]
    B["파트너사 B<br/>급여_2026_05.xlsx"] --> D
    C["파트너사 C<br/>급여_2026_05.xlsx"] --> D
    D --> E["read_excel()<br/>+ 열 이름 통일"]
    E --> F["concat()<br/>데이터 합치기"]
    F --> G["정제<br/>strip · fillna · 중복확인"]
    G --> H["groupby().agg()<br/>요약 통계"]
    H --> I["ExcelWriter<br/>멀티시트 저장"]
    I --> J["통합명부_20260724.xlsx"]
```

### 이 코드가 수작업보다 나은 이유

1. **재현 가능** — 누가 돌려도 같은 결과
2. **10초** — 최초 작성 후 매월 실행만 하면 됨
3. **자동 검증** — 중복 감지가 코드에 포함
4. **이력 관리** — 코드를 Git에 넣으면 변경 이력 추적 가능
5. **확장 가능** — 파트너사가 늘어도 `column_map`만 추가

---

## 정리 -- pandas 핵심 명령 치트시트

| 작업 | pandas 코드 | 엑셀 대응 |
|------|------------|-----------|
| 파일 읽기 | `pd.read_csv()` / `pd.read_excel()` | 파일 열기 |
| 미리보기 | `df.head()` | 첫 몇 행 스크롤 |
| 구조 확인 | `df.info()` / `df.shape` | 행·열 개수 세기 |
| 통계 요약 | `df.describe()` | 평균·합계 수식 |
| 필터링 | `df[df["열"] > 값]` | 필터(자동 필터) |
| 정렬 | `df.sort_values("열")` | 정렬 |
| 그룹 집계 | `df.groupby("열").agg()` | 피벗 테이블 |
| 병합(좌우) | `pd.merge(df1, df2)` | VLOOKUP / INDEX-MATCH |
| 결합(상하) | `pd.concat([df1, df2])` | 복사-붙여넣기 |
| 열 변환 | `df["열"].apply(함수)` | 새 열에 수식 |
| 값 치환 | `df["열"].replace()` | 찾기-바꾸기 |
| 결측 처리 | `df.fillna()` | IF(ISBLANK()) |
| 저장 | `df.to_csv()` / `df.to_excel()` | 다른 이름으로 저장 |

---

## 다음 단계

이 글에서 다룬 pandas 기초를 바탕으로, 다음 글들로 실무를 확장할 수 있습니다.

| 방향 | 관련 글 |
|------|---------|
| 데이터 품질 관리 | [데이터 클렌징 실전]({% post_url 2026-07-15-data-cleansing %}) |
| 엑셀 함수로 소규모 정리 | [엑셀 함수로 5분 정리]({% post_url 2026-07-18-data-excel-cleaning-functions %}) |
| 파이프라인 설계 | [데이터 파이프라인이란?]({% post_url 2026-07-12-what-is-data-pipeline %}) |
| 엑셀 자동화 (openpyxl) | [Python 엑셀 자동화 가이드]({% post_url 2026-07-13-automation-python-excel-guide %}) |
| SQL과의 연계 | [SQL 실전 심화]({% post_url 2026-07-21-data-sql-advanced %}) |

> **pandas를 배우면** 엑셀에서 30분 걸리던 반복 작업이 10초로 줄어듭니다. 그리고 그 코드가 문서가 되고, 자산이 됩니다.
{: .prompt-info }

---

*NEXT X R&D · Data Engineering*
