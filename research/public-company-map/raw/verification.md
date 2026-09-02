# Verification / evaluation / HITL — public-company map (raw)

**Research date:** 2026-09-02  
**Shift:** Producing → verifying. Training-side RL environments are scarce; deployment-side human verification of AI output (clinical, legal, code) is the listed-market adjacency. Environment spend is a **single-digit fraction of compute** in the sources that quantify it (see §4).

**Method rules used here:** no invented tickers, percentages, or quotes. If a datum is not in a record retrieved on 2026-09-02, it is written **not in the record**. Company statements are labelled as such. Sell-side / Yahoo / press figures are labelled as **market-data** or **secondary**. Estimates are labelled **estimate**. Every number is dated.

**Market-data convention:** U.S. last full session is **2026-09-01 close** (Yahoo Finance, accessed 2026-09-02). European/Swiss/Australian quotes are **2026-09-02 session** (Yahoo). Yahoo valuation tables (EV/sales, EV/EBITDA, short interest, ADV, insider %) are **market-data, not filings**. Yahoo near-dated option IVs for INOD displayed 0–50% with $0.00 bid/ask — treated as **unusable**; no CBOE IV surface or LEAP chain was retrieved in usable form.

**Keyword counts:** case-insensitive string counts in fetched filing text on 2026-09-02. The word “evaluation” includes SOX/internal-control uses. These are **not** XBRL tags.

---

## 0. Verification checklist (the five asks)

### 0.1 Scale AI / Meta “49% stake”

**Company / SEC record (primary):**

- **Scale AI press release, 2026-06-12 (company, dated June 12, 2025):** Meta investment “values Scale at **over $29 billion**.” “Following its investment, Meta will hold a **minority** of Scale’s outstanding equity.” Founder Alexandr Wang joins Meta; Jason Droege appointed interim CEO. Scale “remains an independent leader.” URL: https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution (access 2026-09-02).
- **Meta Form 10-Q, period ended 2026-06-30, filed 2025-07-31:** “In **June 2025**, we completed an investment in Scale AI by acquiring a **non-voting minority** of its outstanding equity. Out of the total consideration, **$13.79 billion** was included in non-marketable equity investments accounted for under the measurement alternative method, as we **do not have significant influence** over Scale AI’s operations.” URL: https://www.sec.gov/Archives/edgar/data/1326801/000162828025036791/meta-20250630.htm (access 2026-09-02).
- **Meta Form 10-K, year ended 2025-12-31:** “minority investments in Scale AI for **$13.80 billion**, which was closed during 2025.” “We do not have significant influence over these investees’ operations.” URL: https://www.sec.gov/Archives/edgar/data/1326801/000162828026025534/meta-12312025x10kars.htm (access 2026-09-02).

**Finding:** **“49%” is not in the Meta 10-K, Meta 10-Q, or Scale press release retrieved.** It is **secondary reporting** (AP News, The Information, Bloomberg, as summarized in third-party writeups). Arithmetic 13.79 / 29 ≈ 47.6% is **not** a company-stated ownership percentage. Treat 49% as **unverified in the issuer record**.

### 0.2 TELUS Digital (TIXT) listing status

**Delisted / taken private.** TELUS Corporation completed acquisition of remaining TELUS Digital (TELUS International (Cda) Inc.) shares on **2025-10-31** (company press date October 31, 2025) at **US$4.50 per share**, aggregate consideration **approximately US$539 million**. TELUS owns **100%**. TSX delist expected at close **2025-11-03** (Stockwatch / TSX). NYSE Form 25 filed to remove Subordinate Voting Shares (file number 001-39968). Primary URLs: https://www.sec.gov/Archives/edgar/data/868675/000094787125000940/ss5528748_ex9901.htm ; Nasdaq reprint https://www.nasdaq.com/press-release/telus-completes-privatization-telus-digital-2025-10-31-0 (access 2026-09-02).

**TIXT is not a live public ticker as of 2026-09-02.** Residual AI-data / CX exposure sits inside **TELUS Corporation (TSX: T, NYSE: TU)** — **% of TU revenue from former TIXT / AI data is not in the record retrieved.**

### 0.3 Appen listing and “financial distress”

**Still listed:** ASX **APX**. ABN 60 138 878 298. Appendix 4E and FY25 annual report released **2026-02-25**. H1 FY26 results presented **2026-08-27**.

**Distress:** FY25 statutory **loss** attributable to owners **$(21.818) million** (Appendix 4E, year ended 2025-12-31). Cash **US$59.8 million** at 2025-12-31; **US$44.7 million** at 2026-06-30. FY25 cash from operating activities **US$23.0 million** (annual report highlights). Directors prepared statements **on a going-concern basis** with a 24-month cash-flow forecast; **no going-concern qualification** in the Appendix 4E (“unmodified opinion”). The 2023–24 Google-contract shock is historical; it is **not** the current going-concern finding.

### 0.4 Do TIC firms disclose AI-related revenue?

**Finding: they do not, in the 2025 annual materials retrieved.** AI appears as a **risk factor**, an **internal-efficiency** theme, and (Intertek) a **product launch** (Intertek AI²). **No revenue, organic-growth, or margin line for “AI assurance” or “AI data” is disclosed** by SGS, Bureau Veritas, Intertek, or UL Solutions. That absence is the finding.

### 0.5 GTLB / TEAM / DDOG / DT vs RL environments

**Honest adjacency, not identity.** Code review, test, and observability are **software used by humans and agents that write/run code**. They are **not** RL-environment vendors (Dockerized tasks + graders sold to frontier labs). **Do not treat 100% of DDOG/TEAM/GTLB/DT revenue as “verification.”** None of their 10-Ks retrieved uses the strings “reinforcement learning,” “RLHF,” or “RL environment.” Exposed slice: **not in the record as a % of total**; any allocation is an **estimate** and would be a small, unspecified mix of Duo/agent features, AI-app observability, and CI/CD — not a disclosed segment.

---

## 1. Layer map

### Layer A — Data, evaluation, HITL, RL environments

**Public (thin):**

| Name | Ticker | Role | Purity comment |
|---|---|---|---|
| Innodata | INOD | DDS: data engineering / AI systems; Q2’26 company commentary on agentic RL and computer-use RL environments | Highest-purity **U.S.-listed** name in this set. DDS was **87.8%** of FY25 revenue (computed: 220.9 / 251.7). |
| Appen | APX.AX | “Data for the AI lifecycle”; GenAI **33%** of FY25 revenue (company) | Listed; Global still shrinking, China LLM growing. |
| TELUS Digital | — (was TIXT) | CX + AI data annotation (historical) | **Private** inside TU as of 2025-10-31. |

**Private (the actual RL-environment / expert-data layer — no public pure-play):**

| Name | What the **company or investor-primary** record says | What is **secondary / not in issuer record** |
|---|---|---|
| **Scale AI** | Independent; Meta **non-voting minority**; Meta carrying value **$13.80B** (FY25 10-K); Scale values itself **> $29B** (2025-06-12) | “49%”; $14.3B headline; $2B revenue run-rate — **not in Meta/Scale documents retrieved** |
| **Surge AI** | Forbes company page: human feedback; customers named Google, Meta, Microsoft; founder Edwin Chen | Bootstrapped; 2025 raise talks **not confirmed closed** as of contrary/secondary roundups. Revenue figures **not in an issuer filing**. |
| **Mercor** | Secondary: Series C Oct 2025 **$350M at $10B** (TechCrunch/TFN citing that round); July 2026 **talks** at $20B + Deeptune acquisition | Talks ≠ closed round. Gross vs net revenue split is **secondary**. |
| **Mechanize** | Epoch AI FAQ (2026-09-02 fetch) cites Mechanize estimate **~$2,400 compute spent per RL task**. Secondary: former Epoch researchers; ~$750M valuation (The Information, not fetched as paywalled primary) | Valuation, customer list, revenue: **not in an issuer filing** |
| **Prime Intellect** | Secondary: Environments Hub (Aug 2025); Series A **$130M** (July 2026, Contrary/press). Karpathy / Founders Fund named in secondary | **Not in an SEC filing.** |
| Other names in Epoch AI’s vendor discussion | Mercor, Surge, Handshake, Turing as traditional data providers now also selling RL envs; in-house lab teams | Handshake, Turing: **not researched to filing depth in this note** |

**Parents / investors of the private layer (public):** Meta (META) is the only **SEC-quantified** strategic holder ($13.80B carrying value). Other investors in Scale / Mercor / Prime Intellect are **not in the record as 13D/13G retrieved for this note**.

### Layer B — TIC incumbents (physical-world verification; AI-assurance optionality)

SGS (SGSN.SW), Bureau Veritas (BVI.PA), Intertek (ITRK.L), UL Solutions (ULS). **AI-related revenue: not in the record.** Intertek launched **Intertek AI²** (“world’s first independent, end-to-end AI assurance programme”) in the 2025 strategic report — product, not a disclosed P&L line. UL 10-K: AI in ULTRUS software and as a **disruption risk**.

### Layer C — Owners of verified professional content (legal, tax, news, STM, clinical reference)

Thomson Reuters (TRI / TRI.TO), RELX (REL.L / NYSE: RELX), Wolters Kluwer (WKL.AS). These sell **subscription tools built on proprietary, professionally edited corpora**. That is **adjacent to “verified content,”** not HITL model evaluation. WKL company statement: “Approximately **70%** of our digital revenues are from **AI-powered solutions**” (FY25 full-year report) — that is **product functionality**, not a verification-services P&L. TRI Reuters Q4’25: “higher **generative AI related transactional content licensing** revenue in the Agency business” — **dollars not broken out**. RELX: AI described as a **multi-year growth driver** in the 2025 results release; **no AI revenue %**.

### Layer D — Code review / test / observability software (adjacent)

GitLab (GTLB), Atlassian (TEAM), Datadog (DDOG), Dynatrace (DT). **Not RL-environment vendors.** Possible thin adjacency: GitLab Duo / Duo Agent Platform; Datadog “AI-powered observability”; Atlassian AI usage in Cloud COGS. **% of revenue: not in the record.**

### Layer E — Clinical documentation and review

| Name | Status | Notes |
|---|---|---|
| **Abridge** | **Private** | Named as competitor in Doximity FY26 10-K. WKL: “We expanded our partnership with Abridge for clinical note taking” (FY25 Health). |
| **Nuance / DAX Copilot** | Inside **Microsoft (MSFT)** | Not a separate ticker. |
| **Doximity** | **Public, NYSE: DOCS** | **Scribe** is a disclosed product (ambient AI notes). **Scribe revenue as % of total: not in the record.** Core economics remain **pharma marketing + hiring + workflow**. One customer ≥10% of FY26 revenue. |
| **Wolters Kluwer UpToDate** | Public parent WKL.AS | Clinical Solutions **57%** of Health division; Health organic **+5%** FY25. UpToDate Expert AI launched **Oct 2025** (company). |
| **Tempus, Hinge Health, Waystar, etc.** | Tickers exist (TEM, HNGE, WAY appeared on Yahoo related lists) | **Not verified from filings in this note** as clinical-documentation platforms. **Do not treat as HITL-verification names without a 10-K read.** |

**Empty public layers:** There is **no listed pure-play RL-environment vendor**. There is **no listed pure-play clinical ambient-scribe** (Abridge private; Nuance in MSFT; DOCS Scribe is unquantified). There is **no listed TIC AI-assurance pure-play**.

---

## 2. Company cards — verified public names

### 2.1 Innodata Inc. (INOD) — only U.S. listed high-purity name

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Innodata Inc.; **INOD**; NasdaqGM. CIK 0000903651. |
| **Market cap + date + source** | **$1.879B** at **$54.64** close **2026-09-01** (Yahoo). Shares outstanding **34.38M** (Yahoo; 10-Q cover 34,382,651 as of 2026-08-04 per Stock Titan excerpt). Pre-market 2026-09-02 ~$54.19 — not used for cap. |
| **Revenue exposure** | **Filing-sourced, not an estimate.** FY25 total revenue **$251.7M** (year ended 2025-12-31). DDS **$220.9M** (**87.8%**, computed 220.9/251.7); Synodex **$7.3M**; Agility **$23.5M**. DDS “increased primarily due to higher volume of our **data engineering and AI systems services**” (10-K MD&A). Q2’26 company: “early position in **agentic reinforcement learning**” and “**reinforcement-learning environments for computer-use agentic tasks**” — **qualitative; no $ or %**. Treat DDS as the exposed segment; Synodex (insurance medical records) and Agility (media database) are **not** RL-env. |
| **Growth of exposed segment** | DDS FY25 **+57%** vs FY24 ($220.9M vs $141.1M). Total FY25 **+48%** ($251.7 vs $170.5). Q2’26 revenue **$92.142M**, **+58%** YoY. H1’26 **$182.238M** vs $116.737M. Company **reiterated FY26 revenue growth guidance of 40% or more** (8-K/Ex. 99.1, 2026-08-06) — **company outlook, not a fact**. |
| **Gross margin, 3 years** | **GAAP GM:** FY23 **36%** (GP $31.3M / rev $86.8M, 2023 10-K); FY24 **39%**; FY25 **40%** (2025 10-K). Q2’26 GAAP GM **46%**; Adj. GM **49%** (non-GAAP, company). |
| **Customer concentration** | **Exact 10-K language:** “For the fiscal year ended December 31, 2025, **one customer in our Digital Data Solutions (“DDS”) segment accounted for approximately 58% of the Company’s total revenues**. For the fiscal year ended December 31, 2024, one customer in the DDS segment accounted for approximately **48%** of the Company’s total revenues. **No other customer accounted for 10% or more** of total revenues in either of these periods.” A/R: **63% or $29.2M** due from one customer at 2025-12-31. **Q2’26 company (not 10-K):** largest customer **37%** of Q2 revenue (vs **56%** in Q1’26); a “Big Tech customer” scaled from **17%** to **34%**. FY23: one DDS customer **~10%**. |
| **Net cash / net debt** | YE25 cash **$82.2M** (10-K). 2026-06-30 cash **$240.278M** + ST investments **$10.093M**; company says cash **includes customer prepayments**; **net of prepayments ~$134M**. Advances from customers **$66.962M**. Long-term obligations **$8.944M** + current **$2.255M** (leases/obligations, not a bond). Revolving facility **up to $30M** (Wells Fargo); **drawn amount at 2026-06-30: not broken out as a drawn revolver in the earnings tables**. Yahoo total debt **$3.83M** (mrq) — **market-data**. **Net cash, company-defined: cash $250.4M including ST investments vs immaterial interest-bearing debt.** |
| **Founder-led; founded; core business constant?** | Founded **1988** (10-K). Jack S. Abuhoff: director **since founding 1988**, CEO **since 1997**. Company press release (2026-08-06) calls him “**the Company’s founder and CEO**.” **Not founder-CEO after 2026-09-30:** he becomes Executive Chairman; Rahul Singhal becomes CEO. Core: started as data for information-retrieval; 2016–17 pivot into AI language-model data (10-K). **Business is not constant** — it is a multi-decade BPO that **re-rated into frontier-lab data/eval**. |
| **Insider ownership** | DEF 14A as of **2026-04-15:** Abuhoff **3,240,048** shares beneficially (**9.4%**, includes 1,899,592 options + 140,098 RSUs); all execs+directors **11.8%**. BlackRock **5.7%**. Yahoo “held by insiders **4.85%**” (2026-09-02) — **differs from DEF 14A because Yahoo excludes options; use the proxy for beneficial ownership.** |
| **Next three dated catalysts** | (1) **2026-09-30** CEO transition effective. (2) **Q3 FY26 earnings:** Yahoo/FXEmpire estimate **~2026-11-04 / 2026-11-05** — **estimated date, not a company 8-K confirmation retrieved.** (3) FY26 guidance update if “large potential programs” convert (company, 2026-08-06) — **undated**. |
| **Why this row exists** | Only Nasdaq name whose **disclosed majority of revenue** is data engineering / AI systems for model builders, with **company-stated** (not filing-quantified) work on **RL environments**. 58% customer is the risk, not a rounding error. |
| **EV/sales, EV/EBITDA, analysts, keywords, short** | Yahoo **2026-09-01:** EV/rev **5.34x**; EV/EBITDA **26.60x**; market cap **$1.94B** on the stats table (vs $1.879B on quote — **Yahoo tables disagree slightly**). Revenue analysts **4** (FY26 avg **$359.56M**). Short **4.61M** shares (**13.94% of float**) as of **2026-08-14**; short ratio **3.27**. ADV (3-mo) **1.35M**. **10-K keyword counts:** “AI” **83**; “artificial intelligence” **23**; “evaluation” **54**; “human-in-the-loop” **6**; “reinforcement learning” **0**; “RLHF” **0**; “RL environment” **0**. (RL language is in the **Q2’26 press release**, not the FY25 10-K.) |
| **Priced-in score (1–5)** | **4 / 5.** Inputs: (a) 40%+ growth already in 4-analyst FY26 estimates; (b) 52-week range **$34.23–$125.14** — the AI-data story has been **traded, not ignored**; (c) 13.9% short float prices concentration/customer-loss; (d) still small vs Scale’s **>$29B** private mark, so **relative** undervaluation vs private comps is a **separate** claim. |
| **Options / LEAPs / IV; convertibles; ADV** | Near-dated Yahoo chain (exp **2026-09-04**) showed **$0.00 bid/ask** and placeholder IVs — **not in the record as a usable IV**. LEAP chain: **not retrieved**. Convertibles: **none in 10-K**. ADV **1.35M** (Yahoo 3-mo). |
| **Primary URLs (access 2026-09-02)** | 10-K FY25: https://www.sec.gov/Archives/edgar/data/903651/000110465926020655/inod-20251231x10k.htm ; Q2’26 8-K/Ex.99.1: https://www.sec.gov/Archives/edgar/data/903651/000110465926092010/tm2621499d1_ex99-1.htm ; 2023 10-K: https://www.sec.gov/Archives/edgar/data/903651/000141057824000124/inod-20231231x10k.htm ; Yahoo INOD: https://finance.yahoo.com/quote/INOD/ |

### 2.2 TELUS Digital — was TIXT (NYSE/TSX)

**Not listed as of 2026-09-02.** See §0.2. No live market cap, options, or short interest. Historical TIXT financials are **not restated here**; they are no longer a map row.

### 2.3 Appen Limited (APX.AX)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Appen Limited; **APX.AX**; ASX. Still listed. |
| **Market cap** | **A$311.49M** at **A$1.075** close (Yahoo, ASX session **2026-09-02**). Shares **268.28M**. USD conversion: **not computed here** (FX not locked). |
| **Revenue exposure** | **Filing-sourced.** Company describes itself as “data for the Artificial Intelligence (AI) lifecycle.” FY25 **group operating revenue US$230.8M**. **Generative AI 33% of FY25 revenue**, up from **22%** in FY24; GenAI revenue **+57%** (annual report). Remainder is other AI-data / crowd work — **not split into RL-env vs evaluation vs labeling in the accounts**. Treat **~100% of operating revenue as AI-data lifecycle** by company positioning; **GenAI 33%** is the only **disclosed** mix cut. |
| **Growth of exposed** | FY25 operating revenue **+4.5%** vs FY24. Appen Global **US$127.9M, −21%**; Appen China **US$102.9M, +75%**. H1 FY26 group revenue **US$119.9M, +17.5%** (H1’25 US$102.1M). China H1’26 **US$76.2M, +80.4%**; Global H1’26 **US$43.7M, −26.9%**. **FY26 company guidance:** revenue **US$270–300M**, underlying EBITDA (before FX) margin **~5–10%** (25 Feb 2026). |
| **Gross margin, 3 years** | H1 FY26 group GM (rev less crowd expenses) **36.7%** vs H1 FY25 **37.0%**. FY25 Q4 GM “reaching **45%**” (annual report highlight — **quarter, not full-year GAAP**). Full-year GAAP GM 2023–2025: **not extracted as a clean 3-year GAAP series from the annual report text** → remainder **not in the record** as a comparable 3-year GAAP GM. |
| **Customer concentration** | FY25 **top five customers 74.3% of revenue**, up from **67.3%** in FY24 (annual report). Single largest customer **% : not in the record**. |
| **Net cash / net debt** | Cash **US$59.8M** (2025-12-31); **US$44.7M** (2026-06-30). Yahoo total debt **US$7.43M** (mrq). **Net cash.** Statutory FY25 loss **$(21.818)M**. Going-concern basis, unmodified audit opinion (Appendix 4E). |
| **Founder-led; founded** | Founded **1996** (Appendix 4E). CEO & MD **Ryan Kolln** (FY25 results). **Founder-led: no** (not in the record as founder-CEO). Core business has been AI training data throughout the listed period; mix shifted toward GenAI/China. |
| **Insider ownership** | Yahoo **9.01%** insiders / **5.67%** institutions (2026-09-02). Substantial-holder notices: **not retrieved**. |
| **Catalysts** | (1) FY26 delivery vs **US$270–300M** guidance. (2) Q-level 4C / activity reports (quarterly; next date **not in the record**). (3) Appen Global sequential recovery vs China mix (H2 seasonality — company). |
| **Why this row exists** | Only **other listed** AI-data crowd platform after TIXT’s death; cheap vs INOD; concentration + China + Global decline are the whole story. |
| **EV/sales etc.** | Yahoo: EV **A$259.41M**; EV/rev **0.75x**; EV/EBITDA **10.95x**; P/S **0.89x**. Analysts: Yahoo **2** on FY26 sales (avg **386.48M** — **currency of that estimate is internally inconsistent with company USD guidance; do not use**). Short interest: **not in the record** (ASX). ADV **3.35M** shares (Yahoo 3-mo). **Annual-report keyword counts:** “AI” **214**; “artificial intelligence” **9**; “evaluation” **31**; “reinforcement learning” **2**; “RL environment” **4**; “RLHF” **0**. |
| **Priced-in** | **2 / 5.** Inputs: 0.75x EV/sales; still loss-making; 74% top-5; Global −21%; China 75% growth **is** in the print but **not** in a U.S. multiple. Distress narrative is **stale relative to cash and unmodified audit**. |
| **Options / convertibles** | ASX options/LEAPs: **not in the record**. Convertibles: **not in the record**. |
| **Primary URLs** | FY25 results: https://announcements.asx.com.au/asxpdf/20260225/pdf/06wq7ntr51bhgl.pdf ; Appendix 4E: https://company-announcements.afr.com/asx/apx/9a6281d1-11c8-11f1-ad9a-2e14b29d7b39.pdf ; Annual report: https://company-announcements.afr.com/asx/apx/29a66613-11c9-11f1-aa76-525adc3649ab.pdf ; Q1 FY26 4C: https://announcements.asx.com.au/asxpdf/20260430/pdf/06z15mgxt8dgtk.pdf |

### 2.4 SGS SA (SGSN.SW)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | SGS SA; **SGSN.SW**; SIX Swiss Exchange. |
| **Market cap** | **CHF 18.33B** at **CHF 92.48** (Yahoo, **2026-09-02** session). Shares **197.79M**. |
| **AI / verification exposure** | **TIC incumbent.** FY25 sales **CHF 6,945 million**, organic **+5.6%** (company FY results, Feb 2026). **AI-related revenue %: not in the record.** |
| **Growth of exposed** | N/A (no AI segment). Group organic **+5.6%** FY25. |
| **Gross margin 3yr** | **not in the record** as GAAP GM in the FY results HTML retrieved. Adjusted operating income **CHF 1,108M**, margin **16.0%** FY25 (company, non-GAAP). |
| **Customer concentration** | **not in the record** in the FY results page retrieved. |
| **Net cash / net debt** | Yahoo: cash **CHF 1.3B**, debt **CHF 5.22B** (mrq 2026-06-30) → **net debt**. Company FCF **CHF 841M** FY25. |
| **Founder-led; founded** | Founded **1878** (general knowledge — **year confirmed on company site not re-fetched**; treat as **standard corporate history, not a 2025 filing extract**). Professional management; **not founder-led**. Core TIC **constant**. |
| **Insider** | Yahoo **14.26%**. |
| **Catalysts** | Strategy 27 execution; next results date **not in the record**. |
| **Why this row exists** | Physical-world verification incumbent; **AI-assurance optionality not in the numbers**. |
| **Multiples** | Yahoo EV/rev **3.09x**; EV/EBITDA **14.65x**. Analysts: Yahoo forward P/E **22.83** (count **not on stats page**). Short: **not in the record**. ADV **315.5k**. Keyword frequency in a full SGS integrated report: **not counted** (report not fully fetched as text). |
| **Priced-in** | **1 / 5** for the *verification-of-AI* thesis (market prices a TIC compounder, not an AI-eval vendor). **4 / 5** as a quality TIC. |
| **Options / convertibles** | **not in the record.** |
| **Primary URL** | https://www.sgs.com/en-gb/news/2026/02/2025-full-year-results |

### 2.5 Bureau Veritas SA (BVI.PA)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Bureau Veritas SA; **BVI.PA**; Euronext Paris. |
| **Market cap** | **€12.16B** at **€27.18** (Yahoo, **2026-09-02**). Shares **444.09M**. |
| **AI exposure** | **not in the record** as a revenue line. FY25 revenue **€6,466.4M**, organic **+6.5%**; adj. operating profit **€1,052.9M**, margin **16.3%**; adj. net financial debt **€1,253.3M**; adj. net debt/EBITDA **1.1x** (31 Dec 2025). H1’26 revenue **€3,258.4M**, organic **+5.0%**. |
| **GM 3yr** | **not in the record** as GAAP GM. Adj. operating margin FY25 **16.3%** vs FY24 **16.0%**. |
| **Concentration** | **not in the record.** |
| **Net debt** | Adj. net financial debt **€1,253.3M** at 2025-12-31 (company). Yahoo mrq cash **€942.1M**, debt **€3.04B**. |
| **Founder-led** | **No.** CEO Hinda Gharbi (FY25 release). TIC core **constant**. |
| **Insider** | Yahoo **0.72%**. |
| **Catalysts** | LEAP \| 28 strategy; **€200M** buyback announced with FY25; H2’26 / FY26 results dates **not in the record**. |
| **Why this row** | Same TIC-optionality logic as SGS. |
| **Multiples** | Yahoo EV/rev **2.18x**; EV/EBITDA **11.83x**. ADV **934.6k**. Short **not in the record**. |
| **Priced-in** | **1 / 5** on AI-verification thesis. |
| **Primary URLs** | https://cdn1-middle-east.bureauveritas.com/sites/g/files/zypfnx316/files/media/document/BV_Press_Release_FY_2025_Results.pdf ; H1’26: https://cdn3-group.bureauveritas.com/sites/g/files/zypfnx196/files/media/document/Bureau_Veritas_H1_2026_Results_Presentation.pdf |

### 2.6 Intertek Group plc (ITRK.L)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Intertek Group plc; **ITRK.L**; LSE. Price **5,850 pence** (Yahoo, **2026-09-02**). Market cap **£8.97B** (Yahoo; pence quoting). |
| **AI exposure** | **Intertek AI²** launched (2025 strategic report): “independent, end-to-end AI assurance programme” covering ideation through deployment. **Revenue from AI²: not in the record.** Group FY25 revenue **£3,431.6M**, +**1.1%** actual / +**4.3%** constant; LFL +**0.7%** actual. Adj. operating profit **£619.6M**, margin **18.1%**. Mix: Testing **45%**, Inspection **24%**, Assurance **22%**, Certification **9%**. |
| **GM 3yr** | Statutory operating margin FY25 **15.8%**; adj. **18.1%** vs FY24 adj. **17.4%**. GAAP “gross margin” as U.S. software firms report it: **not in the record**. |
| **Concentration** | **not in the record** as a % of group. “400,000 clients” (strategic report language). |
| **Net debt** | Yahoo cash **£438.6M**, debt **£1.9B** (mrq). |
| **Founder-led** | **No.** TIC core **constant**. |
| **Insider** | Yahoo **3.58%**. |
| **Catalysts** | FY26 mid-single-digit LFL guidance (company); AI² commercial traction — **undated / unquantified**. |
| **Why this row** | Only TIC in this set with a **named AI-assurance product**. Still **zero disclosed revenue**. |
| **Multiples** | Yahoo EV/rev **2.96x**; EV/EBITDA **13.38x**. ADV **1.59M**. Short **not in the record**. Keyword counts in strategic report text: “AI” **15**; “artificial intelligence” **2**; “evaluation” **1**; RL terms **0**. |
| **Priced-in** | **2 / 5** on AI² (product exists; numbers do not). |
| **Primary URL** | https://w3-sandbox.intertek.com/siteassets/investors/2026/ara/intertek-strategic-report-2025.pdf *(host path as fetched; confirm against intertek.com IR if the sandbox URL 404s)* |

### 2.7 UL Solutions Inc. (ULS)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | UL Solutions Inc.; **ULS**; NYSE. CIK 0001901440. IPO 2024. |
| **Market cap** | **$15.05B** at **$73.46** close **2026-09-01** (Yahoo). Implied shares **201.56M** (dual-class). Class A outstanding **77.81M**. |
| **AI exposure** | **not in the record as revenue.** FY25 revenue **$3,053M** (vs $2,870M FY24, $2,678M FY23). 10-K: AI inside **ULTRUS™** software; AI is also a **disruption risk**. Software/advisory is a segment (Software & Advisory revenue change **+$15M / +4.0%** FY25 in the excerpted tables) — **that is not “AI revenue.”** |
| **Growth** | Group FY25 **+$183M / +6.4%** (computed 3053/2870−1). 2026 outlook: mid-single-digit CC organic (earnings release). |
| **GM 3yr** | Cost of revenue **50.5%** of rev FY25, **51.5%** FY24, **$1,394M** COR on **$2,678M** FY23 → GM **49.5% / 48.5% / 47.9%** (computed from 10-K). Adj. EBITDA margin **25.9% / 22.9% / 21.0%** (FY25/24/23). |
| **Concentration** | 10-K: cash/AR “large number of customers in diverse industries”; **no 10% customer named in the excerpts retrieved.** |
| **Net cash / net debt** | YE25 cash **$295M** + ST investments **$8M**; total debt **$494M** (10-K). **Net debt ~$191M** (computed). Q2’26 Yahoo: cash **$434M**, debt **$476M**. |
| **Founder-led; founded** | Underwriters’ Laboratories heritage **1894**; public **2024**. CEO Jennifer Scanlon. **Not founder-led.** Core testing/certification **constant**. |
| **Insider** | Yahoo **1.23%** of listed class; **economic vs vote: dual-class — full control % not in the Yahoo field.** |
| **Catalysts** | Q3’26 print (Yahoo estimates exist; **date not company-confirmed in this note**); dividend **$0.58** forward, payable **2026-09-10**; 2026 organic-growth outlook. |
| **Why this row** | U.S.-listed TIC; AI-product certification is a **plausible** adjacency (data-center equipment, batteries, functional safety) still **unquantified**. |
| **Multiples** | Yahoo EV/rev **4.80x**; EV/EBITDA **16.03x**. FY26 revenue analysts **12** (avg **$3.21B**). Short **5.3M** (**7.70% of float**) as of **2026-08-14**; ratio **5.31**. ADV **996k**. **10-K keywords:** “AI” **20**; “artificial intelligence” **6**; “evaluation” **11**; RL terms **0**. |
| **Priced-in** | **2 / 5** on AI-verification; **4 / 5** as a TIC compounder (25.9% adj. EBITDA margin is priced). |
| **Convertibles** | YE25 long-term debt **$491M** (credit facility, not a convert in the 10-K debt note retrieved). |
| **Primary URLs** | 10-K: https://www.sec.gov/Archives/edgar/data/1901440/000190144026000005/uls-20251231.htm ; earnings: https://ir.ul.com/news/news-details/2026/UL-Solutions-Inc--Reports-Strong-Fourth-Quarter-and-Full-Year-2025-Results-Announces-2026-Growth-Outlook-and-Increases-Quarterly-Dividend/default.aspx |

### 2.8 Thomson Reuters Corp. (TRI)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Thomson Reuters Corporation; **TRI** NasdaqGS / **TRI.TO**. CIK 0001075124. |
| **Market cap** | **$46.31B** at **$106.35** close **2026-09-01** (Yahoo). Shares **433.22M**. Float **125.6M** (dual-class / Woodbridge). |
| **AI / verified-content exposure** | **Filing/earnings-sourced, not a clean %.** FY25 total revenue **$7,476M**, organic **+7%**. “Big 3” (Legal, Corporates, Tax/Audit/Accounting) **$6,157M = 82.4%** of total (computed 6157/7476) — **professional tools on proprietary content**. Reuters segment **$853M** (11.4%); Q4 Reuters growth driven in part by “**generative AI related transactional content licensing** in the Agency business” — **$ of that licensing: not in the record**. Do **not** treat 82% Big 3 as “AI verification.” It is **verified professional content + workflow software**, some of it now AI-featured (Westlaw, CoCounsel). |
| **Growth of exposed** | Big 3 organic **+9%** FY25. Reuters organic **+1%** FY25 (so AI licensing did **not** transform the full-year Reuters line). FY26 outlook: organic **~7.5–8.0%**, adj. EBITDA margin **+~100 bps** from **39.2%**. |
| **GM 3yr** | Yahoo GP ttm **$3.11B** on ttm rev **$7.83B** — **not used as 3-year GAAP GM**. Adj. EBITDA margin FY25 **39.2%** vs FY24 **38.2%**. 2023 comparable: **not extracted in this note**. |
| **Concentration** | **not in the record** as a 10% customer. Insider/Woodbridge **71.07%** (Yahoo) is **ownership**, not customer. |
| **Net debt** | Yahoo cash **$693M**, debt **$3.2B** (mrq 2026-06-30). |
| **Founder-led** | **No.** CEO Steve Hasker. Reuters/Thomson content franchise **constant**; products now AI-wrapped. |
| **Insider** | Yahoo **71.07%** (controlling shareholder). |
| **Catalysts** | Dividend **2026-09-10**; FY26 organic 7.5–8.0% delivery; next earnings date **not company-confirmed here**. |
| **Why this row** | Legal/tax “ground truth” content is the **deployment-side** analog to training-side labels. Agency licensing is the **only** TRI line explicitly tied to gen-AI **buyers**. |
| **Multiples** | Yahoo EV/rev **6.25x**; EV/EBITDA **14.62x**. Short **13.22M** (**2.94% of shares**) as of **2026-08-14**. ADV **2.05M**. FY25 earnings-release keyword counts (not the 40-F): “AI” **3**; “artificial intelligence” **1**. Full 40-F (132 MB) **not keyword-counted**. |
| **Priced-in** | **3 / 5.** 52-week **−40.08%** (Yahoo) — AI-legal narrative **de-rated**; content moat still in the multiple (6x sales). |
| **Convertibles** | **not in the record** from the earnings release. |
| **Primary URL** | https://investors.thomsonreuters.com/news-releases/news-release-details/thomson-reuters-reports-fourth-quarter-and-full-year-2025 |

### 2.9 RELX PLC (REL.L / NYSE: RELX)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | RELX PLC; **REL.L** (LSE, **2,592p**) and **RELX** (NYSE, **$35.70** close 2026-09-01). |
| **Market cap** | NYSE Yahoo **$63.01B** (ADR/share-count convention — **use with care vs LSE**). |
| **AI / verified-content** | FY25 revenue **£9,590M** (2024 **£9,434M**); **underlying +7%** (2025 results). CEO: AI “a key driver of our business for well over a decade.” **AI revenue %: not in the record.** Legal, STM, Risk, Exhibitions remain the segments. LexisNexis Risk: AI-related **product** acquisitions (e.g. document authentication) — **not a mix %**. |
| **Growth** | Underlying **+7%** FY25. |
| **GM 3yr** | Yahoo GP ttm **$6.46B** / rev **$9.72B** (USD ttm) — **not a 3-year IFRS GM series**. |
| **Concentration** | **not in the record.** |
| **Net debt** | Yahoo cash **$220M**, debt **$8.91B** (USD, mrq). High reported D/E is **structural** (buybacks / intangibles), not a distress signal by itself. |
| **Founder-led** | **No.** Information/analytics franchise **constant**. |
| **Insider** | Yahoo NYSE line **0.00%** (ADR; **not meaningful**). |
| **Catalysts** | Dividend **2026-09-15** (Yahoo NYSE); 2026 outlook “another year of strong growth” (company). |
| **Why this row** | STM + legal **verified corpora** (Elsevier, LexisNexis). Same layer as TRI/WKL. |
| **Multiples** | Yahoo EV/rev **5.68x**; EV/EBITDA **14.45x**. Short (NYSE) **6.0M** (**0.34% of float**) as of **2026-08-14**. ADV **2.55M** ADRs. Annual-report keyword counts: “AI” **102**; “artificial intelligence” **27**; “evaluation” **40**; RL terms **0**. |
| **Priced-in** | **3 / 5** as an AI-content compounder (the market already pays for analytics mix). **1 / 5** as an RL-env substitute. |
| **Primary URLs** | https://www.relx.com/media/press-releases/year-2026/relx-2025-results ; annual report https://www.relx.com/~/media/Files/R/RELX-Group/documents/reports/annual-reports/relx-2025-annual-report.pdf ; 20-F https://www.relx.com/~/media/Files/R/RELX-Group/documents/reports/20f/relx-form-20f-2025.pdf |

### 2.10 Wolters Kluwer N.V. (WKL.AS)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Wolters Kluwer N.V.; **WKL.AS**; Euronext Amsterdam. Also ADR WTKWY. |
| **Market cap** | **€15.78B** at **€67.20** (Yahoo, **2026-09-02**, market open). Shares **222.7M**. 52-week **−33.16%**. |
| **AI / verified-content** | FY25 revenue **€6,125M**, organic **+6%**. **Expert solutions 59%** of total, organic **+7%**. Company: “Approximately **70%** of our **digital** revenues are from **AI-powered solutions** today” — **company statement; not an IFRS line; not “verification services.”** Health Clinical Solutions **57%** of Health, organic **+7%**; UpToDate Expert AI launched **Oct 2025**; **Abridge partnership** expanded. |
| **Growth of “exposed”** | Expert solutions **+7%** organic. Cloud software **+15%** organic, **21%** of total rev. |
| **GM 3yr** | **not in the record** as GAAP GM. Adj. operating profit trajectory: company guides continued margin increase into 2026. |
| **Concentration** | **not in the record.** |
| **Net debt** | Yahoo cash **€1.49B**, debt **€5.55B**. |
| **Founder-led** | **No.** Nancy McKinstry, **retiring CEO** (FY25 full-year report). Franchise **constant**. |
| **Insider** | Yahoo **0.24%**. |
| **Catalysts** | CEO succession (McKinstry retiring — **successor effective date not extracted**); product-development spend rising to **12–13% of revenue in 2026** (company); dividend ex-date **2026-09-01** already printed. |
| **Why this row** | Clinical + legal **verified content**; only Big-3 content owner with a **disclosed Abridge** clinical-note partnership. |
| **Multiples** | Yahoo EV/rev **3.23x**; EV/EBITDA **8.80x** — **de-rated vs TRI/RELX**. ADV **1.14M**. Short **not in the record**. Full-year report keywords: “AI” **32**; RL terms **0**. |
| **Priced-in** | **2 / 5** on AI-content (the de-rating may already be the story). |
| **Primary URL** | https://assets.contenthub.wolterskluwer.com/api/public/content/3118646-2026-02-25-wolters-kluwer-2025-full-year-results-7391945524?v=2c966da9+en |

### 2.11 GitLab Inc. (GTLB)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | GitLab Inc.; **GTLB**; NasdaqGS. CIK 0001653482. FYE Jan 31. |
| **Market cap** | **$7.86B** at **$45.09** close **2026-09-01**. **Pre-market 2026-09-02 ~$56.40 (+25%)** after Q2 FY27 earnings — **do not mix close cap with pre-market price.** |
| **Exposure** | **Adjacent, not verification.** FY26 (ended 2026-01-31) revenue **$955.224M** (+26% vs $759.249M). Gross profit **$834.481M**; GAAP GM **87% / 89% / 90%** (FY26/25/24). **% of revenue from code review, Duo, or test: not in the record.** Duo Agent Platform named as a “new multi-year growth driver” (FY26 earnings commentary via 10-K wrapper) — **not a segment**. **Do not book 100% as verification.** |
| **Growth** | FY26 **+26%**. Q2 FY27 (ended 2026-07-31) revenue **$286.3M, +21%** YoY (company, 2026-09-01). FY27 guide **$1.129–$1.133B**. |
| **Concentration** | **No 10% customer language found** in the 10-K excerpts searched. |
| **Net cash** | 2026-01-31 cash + ST investments **$1,259.9M**. **No convertible notes** in the 10-K liquidity section retrieved. Yahoo TTM debt “—” . |
| **Founder-led** | Co-founder **Sytse Sijbrandij** resigned as CEO **December 2024**; now **Executive Chair**. CEO signing the 10-K: **William Staples**. **Not founder-CEO.** Dual-class; Sijbrandij 10b5-1 plan (Dec 2025) for ~**1.394M** Class A (from B conversion). |
| **Insider** | Yahoo **3.51%**. |
| **Catalysts** | (1) **Already printed 2026-09-01:** Q2 FY27. (2) Q3 FY27 guide **$281–283M**. (3) CAO Simon Mundy resignation **effective 2026-09-16**. |
| **Why this row** | DevSecOps **code review/CI** is how humans (and agents) verify software — **not** an RL gym. |
| **Multiples** | Yahoo EV/rev **6.57x**; EV/EBITDA **negative** (GAAP). FY27 revenue analysts **26**. Short **15.43M** (**9.25% of float**) as of **2026-08-14**. ADV **4.9M**. **10-K keywords:** “AI” **49**; “artificial intelligence” **5**; “evaluation” **11**; RL terms **0**. |
| **Priced-in** | **3 / 5** as a DevSecOps compounder; **1 / 5** as an RL-env proxy. Pre-market +25% is **earnings**, not a new verification thesis. |
| **Convertibles** | **None in 10-K.** |
| **Primary URLs** | 10-K: https://www.sec.gov/Archives/edgar/data/1653482/000162828026018731/gtlb-20260131.htm ; Q2 FY27: company 8-K 2026-09-01 |

### 2.12 Atlassian Corporation (TEAM)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Atlassian Corporation; **TEAM**; NasdaqGS. FYE Jun 30. |
| **Market cap** | **$47.34B** at **$187.03** close **2026-09-01**. Class A **159.3M** + convertible Class B **94.1M** (10-K as of 2026-06-30). |
| **Exposure** | **Adjacent.** FY26 revenue **$6,572.3M** (+26% vs $5,215.3M; FY24 $4,358.6M). GAAP GM **85% / 83%** (FY26/25); FY24 GP **$3,555.1M**. Cloud vs Data Center mix disclosed; **AI-feature revenue: not in the record.** Company expects GM to “decline slightly” in FY27 from Cloud mix and “**AI usage**” in COGS. **Do not treat Jira/Confluence as verification.** |
| **Growth** | FY26 **+26%**; >**90%** of FY26 revenue from accounts existing on or before 2026-06-30. |
| **Concentration** | **No 10% customer** in excerpts. |
| **Net cash / debt** | Cash **$1.2B** (2026-06-30). **$1.0B senior notes** issued **2024-05-15**: **$500M 5.250% due 2029** and **$500M 5.500% due 2034** — **not convertible** (8-K). Yahoo total debt **$1.23B**. **Approximately net cash ~0** at the Yahoo totals. |
| **Founder-led** | **Yes.** CEO **Michael Cannon-Brookes** (CODM); co-founder **Scott Farquhar**. Class B **~86% of voting power**. Founded **Sydney, 2002**. Core (issue tracking / collaboration) **constant**; Cloud mix shifted. |
| **Insider** | Yahoo **0.94%** of Class A — **severely understates** dual-class control. |
| **Catalysts** | FY27 Cloud mix / GM guide; Q1 FY27 print date **not confirmed here**. |
| **Why this row** | Workflow software where **humans review work**. Not an eval lab. |
| **Multiples** | Yahoo EV/rev **7.20x**; EV/EBITDA **223x** (GAAP noise). FY27 revenue analysts **32**. Short **11.75M** (**7.41% of float**) as of **2026-08-14**. ADV **4.63M**. **10-K keywords:** “AI” **70**; “artificial intelligence” **1**; RL terms **0**. |
| **Priced-in** | **4 / 5** as a software compounder; **1 / 5** as verification. |
| **Primary URL** | https://www.sec.gov/Archives/edgar/data/1650372/000165037226000036/team-20260630.htm |

### 2.13 Datadog, Inc. (DDOG)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Datadog, Inc.; **DDOG**; NasdaqGS. |
| **Market cap** | **$80.38B** at **$223.84** close **2026-09-01**. |
| **Exposure** | **Observability of production systems, including AI apps — not RL environments.** FY25 revenue **$3,427.2M** (+28% vs $2,684.3M; FY23 $2,128.4M). GAAP GM **80% / 81% / 81%** (FY25/24/23). Single segment: “observability and security platform for cloud applications.” **AI-monitoring revenue %: not in the record.** |
| **Growth** | FY25 **+28%**. TTM Yahoo rev **$3.97B**; Q2’26 YoY **+35.6%** (Yahoo). |
| **Concentration** | **No country other than U.S. ≥10% of revenue**; **10% customer: not found in excerpts.** |
| **Net cash** | YE25 cash **$401.3M** + marketable securities **$4,073.5M**. **$1.0B 0.00% Convertible Senior Notes due 2029** issued Dec 2024 (net proceeds ~$979.1M); prior 2025 Notes repaid. |
| **Founder-led** | **Yes.** Co-founder CEO **Olivier Pomel**; co-founder CTO **Alexis Lê-Quôc**. Founded **2010** (offer-letter era). Core observability **constant**, surface area expanded (security, AI). |
| **Insider** | Yahoo **0.62%** of Class A; dual-class **not fully in that field**. |
| **Catalysts** | Q3’26 (Yahoo estimates; date **not confirmed**); convert 2029 capped-call dynamics. |
| **Why this row** | If agents write code, **someone watches the agents in prod**. That is **ops**, not **training-time verification**. |
| **Multiples** | Yahoo EV/rev **19.33x**; EV/EBITDA **272x**. FY26 revenue analysts **43** (avg **$4.47B**). Short **9.25M** (**3.18% of float**) as of **2026-08-14**. ADV **4.78M**. **10-K keywords:** “AI” **16**; “artificial intelligence” **5**; RL terms **0**. |
| **Priced-in** | **5 / 5** as an AI-infra software winner (19x sales). **1 / 5** as HITL verification. |
| **Primary URL** | https://www.sec.gov/Archives/edgar/data/1561550/000162828026008819/ddog-20251231.htm |

### 2.14 Dynatrace, Inc. (DT)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Dynatrace, Inc.; **DT**; NYSE. FYE Mar 31. |
| **Market cap** | **$15.28B** at **$52.86** close **2026-09-01**. |
| **Exposure** | **Observability, same caveat as DDOG.** FY26 revenue **$2,018.4M** (+19% vs $1,698.7M; FY24 $1,430.5M). GAAP GM **82% / 81% / 81%**. Subscription **96%** of FY26. **AI %: not in the record.** |
| **Growth** | FY26 **+19%**. Q1 FY27 (ended 2026-06-30) Yahoo YoY **+16.2%**. |
| **Concentration** | **No end-customer ≥10%** of revenue FY24–FY26. **One channel partner 10%** of FY26 and FY25 revenue. |
| **Net cash** | 2026-03-31 cash **$1,097.2M** + marketable securities **$126.8M**; **$399.0M** undrawn credit facility. Yahoo mrq debt **$159.3M** (leases). **Net cash.** |
| **Founder-led** | **No (CEO).** CEO **Rick McConnell** (employment agreement). Founder **Bernd Greifeneder** is **EVP, CTO**. |
| **Insider** | Yahoo **0.58%**. |
| **Catalysts** | Q2 FY27 (Sep 2026 quarter); no dated company event retrieved beyond the calendar. |
| **Why this row** | Smaller-cap observability; **not** an eval lab. |
| **Multiples** | Yahoo EV/rev **6.84x**; EV/EBITDA **48.0x**. FY27 revenue analysts **27**. Short **9.2M** (**3.60% of float**) as of **2026-08-14**. ADV **5.89M**. **10-K keywords:** “AI” **60**; “artificial intelligence” **4**; RL terms **0**. |
| **Priced-in** | **3 / 5** as observability; **1 / 5** as verification. |
| **Primary URL** | https://www.sec.gov/Archives/edgar/data/1773383/000177338326000019/dt-20260331.htm |

### 2.15 Doximity, Inc. (DOCS) — clinical documentation (partial)

| Field | Record |
|---|---|
| **Name / ticker / exchange** | Doximity, Inc.; **DOCS**; NYSE. FYE Mar 31. CIK 0001516513. |
| **Market cap** | **$4.76B** at **$26.35** close **2026-09-01**. 52-week **−60.85%**. |
| **Exposure** | **Scribe** is a HIPAA-compliant ambient AI documentation product. **Clinical AI Suite** (Ask + Scribe + Dialer) adopted after privacy/AI governance review at “**more than 140**” U.S. health systems (company). **Scribe / Workflow as % of revenue: not in the record.** FY26 revenue **$644.863M** (FY25 $570.399M, FY24 $475.422M). Business model: **Marketing, Hiring, Workflow**. Competitors named: **Abridge**, OpenAI, Anthropic. |
| **Growth** | FY26 **+13%** (644.9/570.4−1). Yahoo ttm **$655.6M**, Q1 FY27 YoY **+7.3%**. |
| **GM 3yr** | GAAP GM **89% / 90% / 89%** (FY26/25/24) from 10-K percentage table. |
| **Concentration** | “**one customer accounted for 10% or more of total revenue** for the fiscal year ended March 31, 2026” (10-K). Identity **not in the record**. |
| **Net cash** | 2026-03-31 cash **$219.2M** + marketable securities **$529.4M**. Yahoo mrq cash **$687.8M**, debt **$9.67M**. **Net cash.** |
| **Founder-led** | Incorporated **Apr 2010** as 3MD Communications. Dual-class: Class B holders **~79% of voting power** as of 2026-03-31. Jeff Tangney named as large affiliated holder in risk factors. **Founder-CEO status: not quoted from the 10-K business section in the excerpts** (Tangney is clearly a control person). |
| **Insider** | Yahoo **2.82%** of Class A — **understates** dual-class. |
| **Catalysts** | FY27 growth is guided only via **20 analysts** (avg rev **$676.3M**, **+4.9%**) — **slow**. Next earnings date **not confirmed**. OpenEvidence litigation / competitive (secondary press, not used as a number). |
| **Why this row** | Only **listed** ambient-scribe **product** found. Economics are still **pharma ads**. **Not a verification pure-play.** |
| **Multiples** | Yahoo EV/rev **6.23x**; EV/EBITDA **19.45x**. Short **18.43M** (**14.79% of float**) as of **2026-08-14**. ADV **4.69M**. **10-K keywords:** “AI” **85**; “artificial intelligence” **8**; RL terms **0**. |
| **Priced-in** | **3 / 5** as a healthcare internet name that **lost** the AI-scribe premium (price −61%). Scribe mix **cannot** be underwritten from the 10-K. |
| **Convertibles** | **not in the record.** |
| **Primary URL** | https://www.sec.gov/Archives/edgar/data/1516513/000151651326000034/annualreporttoshareholder-.pdf |

---

## 3. Shortlist — at most three unappreciated names

**Rule:** “Unappreciated” = the **verification / HITL / RL-env** thesis is **not** the multiple. Max three.

1. **Appen (APX.AX)** — Only remaining **listed** AI-data platform besides INOD. EV/sales **0.75x**. China LLM **+75%** FY25; GenAI **33%** of revenue and **+57%**. Global still **−21%**. Cash **US$45–60M**, unmodified going-concern opinion. Distressed **narrative** is ahead of the **current** cash statement. Top-5 **74%** is the kill-switch. **Priced-in 2/5.**

2. **Innodata (INOD)** — Only U.S. name with **filing-sourced** majority exposure (DDS **88%** of FY25; one customer **58%**). Q2’26 company claims diversification (37% / 34%) and **RL-environment** work — **qualitative**. Stock has already been a 2024–26 AI-data vehicle (high $125); **not undiscovered**. Short **14%** of float. Include because **private comps (Scale >$29B, Surge/Mercor secondary marks in the tens of billions) dwarf a ~$1.9B listing** — that gap is the unappreciated **relative-value** claim, not “nobody knows INOD.” **Priced-in 4/5 on the name, 2/5 vs private marks.**

3. **UL Solutions (ULS)** — If “verification” migrates from **labels** to **assurance of deployed systems** (models, data-center gear, functional safety), ULS is the **U.S. listed TIC**. **AI revenue: not in the record** — that is why it is unappreciated **for this thesis**. Do not pay 4.8x sales for an AI story the 10-K does not tell. **Priced-in 2/5 on AI, 4/5 as TIC.**

**Explicitly not shortlisted:** DDOG/TEAM/GTLB/DT (wrong layer, rich multiples); TRI/RELX/WKL (content moats, AI already in the pitch deck); DOCS (Scribe unquantified, ads are the P&L); TIXT (gone).

---

## 4. Bear case, analog, kill criteria

**Bear case (training-side data/eval names: INOD, APX):**

- **Customer concentration is the business.** INOD FY25 **58% / 48%** one customer; Appen top-5 **74%**. A single lab insourcing, switching to Surge/Mercor/Scale, or pausing a program **is** the income statement.
- **Project / at-will work.** INOD 10-K: DDS is “primarily at-will”; volumes “may not materialize.”
- **Mix shift to China (Appen)** is a **jurisdiction and customer-quality** risk, not just a growth rate.
- **Gross margin is labor.** INOD GAAP GM **36→40%** over three years is **not** software. Off-the-shelf datasets (INOD Q2’26) can lift GM; they can also be **copied**.
- **Private competition is better capitalized.** Meta’s **$13.8B** carrying value in Scale is larger than INOD’s **entire** market cap. Surge/Mercor (secondary) are competing for the same lab wallets.

**Bear case (content / TIC / software adjacencies):**

- Paying DDOG 19x sales for “verification” is a **category error**.
- TIC AI² / ULTRUS is **brochureware** until it is a mix %.
- Professional-content AI (CoCounsel, UpToDate Expert AI, Lexis) can **compress** professional headcount **without** raising RELX/TRI/WKL revenue at the same rate (price/value capture is the open question). TRI −40% YTD is the market **already** arguing that.

**Analog:**

- **Training-side:** Scale/Surge/Mercor are the **private** analog; INOD/Appen are the **listed residual**. Analog is **staffing + process + QA**, not SaaS. Historical analog is **Appen 2018–21** (hyperscaler crowd data) — including the **2022–24 bust** when Google/project mix broke.
- **Deployment-side content:** ratings agencies / exchanges / Westlaw: **trust in the corpus**.
- **TIC:** SGS/BV/ITRK **100+ year** analog for “third-party stamp”; AI² is trying to port that stamp onto models.

**Kill criteria (thesis kill stated by the user):**

> **Models self-verify well enough that the human-verifier premium collapses.**

Operationalize:

1. **Frontier labs disclose** a **decline** in human-data / RL-env **opex** while capability scores still rise (primary: lab 10-Ks, Epoch compute-vs-data splits). Epoch already has OpenAI **~$1B data vs $8.3B R&D compute in 2025** — if data **falls** while compute **rises**, the layer shrinks.
2. **INOD largest-customer %** falls because **volume** falls, not because a second customer grew (the Q2’26 58%→37% print is **mix**, and the company still “forecast[s] it to grow year-over-year”).
3. **Appen GenAI share** stalls while Global stays negative.
4. **Unit price** per verified task (Epoch interview range **$200–$2,000**) **deflates** toward crowd rates (**cents**) without volume offset.
5. **Inter-annotator / grader agreement** becomes irrelevant because **automated verifiers** (unit tests, formal methods, LLM-as-judge **without** human gold) dominate lab RFPs — visible if vendors’ **expert** mix is disclosed and shrinks. **Not in public filings today.**

**Non-kill:** models using **more** RL compute. Epoch: environment spend can grow **and** remain a **fraction of compute**. Growth of the layer is compatible with **still being small**.

---

## 5. Relative-value unit: $ per verified task / per environment

**Company-disclosed price lists (Scale, Surge, Appen, INOD, Mercor): not in the record.**

**Epoch AI (primary research essay, accessed 2026-09-02)** — interviews with 18 people; **not** a company’s price sheet:

- Source: https://epoch.ai/gradient-updates/state-of-rl-envs  
- **Contract sizes:** “often **six to seven figures per quarter**”; one neolab researcher: **$300k–$500k** range, “varies a lot depending on the number of tasks.”
- **Tasks:** “**$200–$2,000**” mostly; “**$20k per task** would be rare but possible” (complex software-engineering).
- **UI gyms:** SemiAnalysis (cited by Epoch) **~$20k** per website replica; one interviewee **~$300k** for high-fidelity Slack-class replicas.
- **Exclusivity:** two founders: exclusive deals **~4–5×** non-exclusive.
- **Mechanize (cited by Epoch):** **~$2,400 of compute spent per task** during RL training — **compute**, not vendor price.
- **The Information (cited by Epoch, Sept 2025):** Anthropic had discussed spending **over $1 billion** on RL environments over the following year. **That is The Information, not Anthropic’s 10-K.**
- **Compute comparison (Epoch):** OpenAI R&D compute **2026 projected ~$19B**; even a **$1B** env budget is a **single-digit fraction**.

**Epoch, “Can AI companies become profitable?” (access 2026-09-02):** OpenAI **2025** spend **~$1 billion on data** (human experts **and** RL environments) vs **$8.3 billion** R&D AI compute. URL: https://epoch.ai/gradient-updates/can-ai-companies-become-profitable

**The Information:** paywalled; **not fetched**. Use only via Epoch’s citation, labelled secondary.

**Third-party blogs** quoting $0.10–$0.50 per label or $50–$120 expert RLHF: **not issuer-primary; not used as facts.**

**Implied public-market unit (estimate, labelled):** INOD TTM Yahoo revenue **$317M** / **not in the record** how many tasks. **Do not invent a $ per task from INOD.** Appen FY25 **US$230.8M** similarly **cannot** be divided into tasks from the accounts.

---

## 6. Cross-check table (public names, 2026-09-02)

| Ticker | Listed? | Mkt cap (source date) | AI/eval/HITL/RL as % of rev | GM trend (GAAP unless noted) | Top customer | Net cash/(debt) | Founder-CEO? | Priced-in (thesis) |
|---|---|---|---|---|---|---|---|---|
| INOD | Yes, Nasdaq | $1.88B (2026-09-01) | DDS **88%** FY25 (filing); RL-env **unquantified** | 36%→39%→40% (FY23–25) | **~58%** FY25 | Net cash | Founder → Exec Chair 2026-09-30 | 4 |
| TIXT | **No** (privatized 2025-10-31) | n/a | n/a | n/a | n/a | n/a | n/a | n/a |
| APX.AX | Yes, ASX | A$0.31B (2026-09-02) | AI-data **~100%** by positioning; GenAI **33%** FY25 | H1’26 **36.7%** (crowd GM) | Top-5 **74.3%** | Net cash | No | 2 |
| SGSN.SW | Yes, SIX | CHF 18.3B (2026-09-02) | **not in the record** | Adj. OI **16.0%** FY25 | not in the record | Net debt | No | 1 |
| BVI.PA | Yes, EPA | €12.2B (2026-09-02) | **not in the record** | Adj. OM **16.3%** FY25 | not in the record | Net debt | No | 1 |
| ITRK.L | Yes, LSE | £9.0B (2026-09-02) | AI² **unquantified** | Adj. OM **18.1%** FY25 | not in the record | Net debt | No | 2 |
| ULS | Yes, NYSE | $15.1B (2026-09-01) | **not in the record** | GM **47.9%→48.5%→49.5%** | no 10% named | Small net debt | No | 2 |
| TRI | Yes, Nasdaq | $46.3B (2026-09-01) | Big 3 **82%** content/tools; Agency AI $ **not in the record** | Adj. EBITDA **39.2%** FY25 | not in the record | Net debt | No | 3 |
| RELX | Yes, NYSE/LSE | $63.0B NYSE (2026-09-01) | **not in the record** | not extracted 3yr GAAP | not in the record | Net debt | No | 3 |
| WKL.AS | Yes, AMS | €15.8B (2026-09-02) | Expert sol. **59%**; “70% of **digital** rev AI-powered” (**company**) | not extracted 3yr GAAP | not in the record | Net debt | No | 2 |
| GTLB | Yes, Nasdaq | $7.9B close / ~$9.5B pm (2026-09-01/02) | **not in the record** (adjacent) | 90%→89%→87% | no 10% found | Net cash | No (ex-CEO chair) | 1 |
| TEAM | Yes, Nasdaq | $47.3B (2026-09-01) | **not in the record** (adjacent) | 83%→85% FY25–26 | no 10% found | ~net cash | Yes | 1 |
| DDOG | Yes, Nasdaq | $80.4B (2026-09-01) | **not in the record** (adjacent) | 81%→81%→80% | no 10% found | Net cash + **$1B 2029 convert** | Yes | 1 |
| DT | Yes, NYSE | $15.3B (2026-09-01) | **not in the record** (adjacent) | 81%→81%→82% | 0 end-customer 10%; 1 partner 10% | Net cash | No | 1 |
| DOCS | Yes, NYSE | $4.8B (2026-09-01) | Scribe **% not in the record** | 89%→90%→89% | **≥10%** one customer FY26 | Net cash | Dual-class control | 3 |

---

## 7. What this layer is, in one paragraph

The **economic** verification stack that the shift describes — scarce **RL environments**, expert HITL, clinical/legal **human sign-off** — is **mostly private** (Scale, Surge, Mercor, Mechanize, Prime Intellect, Abridge) or **captive** (Nuance/MSFT, lab in-house). The **listed** map is a **residual**: Innodata and Appen on the training-data side (high concentration, labor GM); TIC majors with **zero** disclosed AI mix; content majors selling **AI-featured** professional systems; and software majors whose **entire** revenue is the wrong unit. Environment spend as a **single-digit fraction of compute** is **supported** by Epoch’s OpenAI **~$1B data vs $8.3B R&D compute (2025)** and the Anthropic **$1B env** rumor vs **~$19B** projected OpenAI compute (2026). That fraction can **rise** without creating a large public-equity universe.

---

## 8. Items left “not in the record” (explicit)

- Scale **49%** in an issuer filing  
- INOD / Appen / Scale / Surge **list prices** per task  
- TIC **AI revenue**  
- DDOG/TEAM/GTLB/DT **% of revenue** from code-review / test / AI-observability  
- DOCS **Scribe revenue**  
- Usable **IV / LEAP** surfaces (Yahoo chain unusable)  
- Appen **single largest customer %**  
- SGS/BV/ITRK **GAAP 3-year gross margin** in the documents fully extracted  
- Mercor / Mechanize / Prime Intellect **audited revenue**  
- The Information **full article** (paywall)

**Access date for all URLs in this file: 2026-09-02.**
