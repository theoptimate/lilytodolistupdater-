# Public-company map — Math to memory

**Shift:** HBM, tiered memory, CXL, consumer unified-memory silicon, inference boxes.

**Access date:** 2026-09-02. **As-of for market data:** Yahoo Finance `quoteSummary` / `chart` timestamps quoted per name (US cash session close 2026-09-01 20:00 UTC unless noted).

**FX (Yahoo Finance, 2026-09-02 midday UTC):** USD/KRW 1,363.18; USD/JPY 159.609; EUR/USD 1.1582; USD/HKD 7.8425; USD/TWD 31.72; USD/CNY 6.7092. Local-currency market caps converted with these prints only; conversion is arithmetic, not a company disclosure.

**Method rules used here:** no invented tickers, percentages, or quotes. If a datum is not in a filing, exchange print, or named company IR release, it is written **not in the record**. Company statements are labeled as such; sell-side, TrendForce, TechInsights, and compiler sites are labeled **estimate / secondary**. Yahoo EV/sales and EV/EBITDA are **point-in-time**; a 3-year valuation range is **not in the record** from `quoteSummary` (that endpoint does not return a history). Implied-volatility vs 1-year range is **not in the record** from Yahoo `v7/finance/options` (the `impliedVolatility` field on the quote was empty for every US name checked).

**Thesis flag:** HBM manufacturers as equities were excluded from the original thesis because the shortage is already the headline. They are mapped below and scored as **priced-in (4–5)** unless a residual architecture (HBF, CXL pooling, hybrid bonding, non-HBM inference memory) is the minority of the story.

---

## 0. Starter-name verification (listing / exchange / exposure)

All 14 starter names **pass** a Yahoo Finance listing check on 2026-09-02 (`instrumentType: EQUITY`, live `regularMarketPrice`). None dropped.

| Name | Yahoo symbol | Exchange (Yahoo) | Exposure to this shift |
|---|---|---|---|
| SK hynix | 000660.KS | KSE | Direct HBM IDM (company: HBM4 mass shipments 2Q26) |
| Micron | MU | NasdaqGS | Direct HBM IDM (10-K CMBU includes HBM for all data-center customers) |
| Samsung Electronics | 005930.KS | KSE | Direct HBM IDM inside DS/Memory (company: HBM4 deliveries targeted Q1 2026) |
| Kioxia Holdings | 285A.T | Tokyo | NAND / enterprise SSD; HBF R&D with Sandisk; **not an HBM maker** (company IR) |
| Sandisk | SNDK | NasdaqGS | NAND; High Bandwidth Flash announced, samples targeted H2 2026 (company) |
| Rambus | RMBS | NasdaqGS | DDR5 memory-interface chips + HBM/CXL controller IP (10-K) |
| Astera Labs | ALAB | NasdaqGS | PCIe/CXL retimers, Leo CXL memory controllers, fabric switches (10-K) |
| Advantest | 6857.T | Tokyo | Memory + SoC ATE; HBM KGD test is inside Memory Test Systems (company) |
| BE Semiconductor | BESI.AS | Amsterdam | Hybrid bonding + TC Next for HBM4/5 stacking (company AR) |
| ASMPT | 0522.HK | HKSE | TCB tools for HBM4 12H/16H plus logic AP (company AR 2025) |
| Hanmi Semiconductor | 042700.KS | KSE | HBM TC bonders (company earnings commentary) |
| Apple | AAPL | NasdaqGS | Consumer unified-memory SoCs (M-series); **no silicon revenue line** |
| AMD | AMD | NasdaqGS | Instinct GPUs (HBM attach) + client APUs with on-package memory; MI300A unified memory exists as a product family in 10-K product list |
| Qualcomm | QCOM | NasdaqGS | Snapdragon X unified-memory PCs; AI200/AI250 inference silicon with alternative memory architecture (company FY25 deck) |

---

## 1. Layer map — raw input → end buyer

Public names in **bold** are verified Yahoo listings as of 2026-09-02. **No public pure-play** means no listed company whose reported segments are substantially only that layer.

```
Raw input / process chemicals / wafers
  └─ not the focus of this shift. No HBM-specific pure-play.

DRAM bit production (HBM stacks)
  ├─ SK hynix (000660.KS)     HBM share leader (company + secondary share estimates)
  ├─ Samsung Electronics (005930.KS)   Memory Business inside DS conglomerate
  ├─ Micron (MU)               HBM3E/HBM4; CMBU is the filing container
  ├─ Nanya (2408.TW)           conventional DRAM; HBM production not in the record
  ├─ Winbond / CXMT            Winbond not mapped this pass; CXMT private
  └─ NO public pure-play that is HBM-only (all three HBM IDMs also sell DDR/LPDDR/NAND)

HBM base die (logic) foundry
  ├─ Samsung Foundry (inside 005930.KS) — company: 4nm HBM base-die shipments Q4 2025
  ├─ TSMC (2330.TW) — not in starter list; used by SK hynix/Micron (industry, not re-verified here)
  └─ NO public pure-play base-die foundry

Through-silicon via / stack / TC bonding equipment
  ├─ Hanmi Semiconductor (042700.KS)  closest listed HBM-bonder specialist
  ├─ ASMPT (0522.HK)                  TCB for logic + HBM
  ├─ Besi (BESI.AS)                   hybrid bonding + TC Next
  ├─ Kulicke & Soffa (KLIC)           TCB / advanced packaging (listing verified)
  ├─ SEMES                            Samsung affiliate — NOT PUBLIC
  └─ Hybrid bonding for 16H+ HBM: Besi is the listed merchant; high-volume HBM hybrid bonding not yet the revenue majority (company)

Dicing / grind / laser (HBM wafer prep)
  ├─ Disco (6146.T)            listing verified; HBM-specific revenue not in the record
  └─ NO HBM-only public pure-play

Test: ATE + probe cards (KGD, stack, system)
  ├─ Advantest (6857.T)        memory testers ~60% share of memory ATE (company estimate CY2025)
  ├─ Teradyne (TER)            listing verified; memory ATE is not a disclosed HBM line
  ├─ FormFactor (FORM)         DRAM/HBM probe cards (company supplemental)
  └─ NO public pure-play that is HBM-test-only

High-bandwidth flash (HBF / NAND-as-near-memory)
  ├─ Sandisk (SNDK)            HBF inventor of record; samples targeted H2 2026 (company blog)
  ├─ Kioxia (285A.T)           JV partner; NAND/SSD is the current P&L
  └─ NO public HBF pure-play (pre-revenue architecture)

Memory-interface chips (DDR5 RCD / MRCD / MDB / PMIC)
  ├─ Rambus (RMBS)
  ├─ Montage Technology (688008.SS)
  ├─ Renesas / MPS / TI        competitors named in Rambus 10-K; not mapped in full
  └─ This layer is "server DIMM glue" still labeled by original purpose

CXL silicon (controllers, retimers, switches)
  ├─ Astera Labs (ALAB)        Leo CXL controllers + Aries PCIe/CXL retimers
  ├─ Marvell (MRVL)            Structera CXL expanders/switches (XConn acquired)
  ├─ Rambus (RMBS)             CXL controller IP (not a chip P&L line)
  ├─ Montage (688008.SS)       CXL expander controllers (secondary / product pages)
  ├─ Intel (INTC)              CXL on Xeon; listing verified; CXL revenue not in the record as a line
  └─ NO remaining independent CXL-switch pure-play after XConn → Marvell
     CXL.memory module assembly: DRAM IDMs + module houses; SMART Modular etc. not verified this pass

Consumer unified-memory silicon (CPU+GPU+memory in one address space)
  ├─ Apple (AAPL)              M-series unified memory; no silicon segment
  ├─ AMD (AMD)                 Ryzen AI / Strix Halo APUs; MI300A in Data Center product list
  ├─ Qualcomm (QCOM)           Snapdragon X Elite / X2; on-package LPDDR
  ├─ MediaTek (2454.TW)        listing verified; unified-memory PC/SoC mix not in the record as a line
  ├─ NVIDIA (NVDA)             Grace / GB10-class unified memory; HBM customer, not a memory vendor
  └─ NO public pure-play "unified memory company"

Inference-box / rack OEMs
  ├─ Super Micro (SMCI)
  ├─ Dell (DELL)
  ├─ HPE (HPE)
  ├─ Giga-Byte (2376.TW)
  ├─ NVIDIA (NVDA)             DGX as reference design / system
  ├─ Groq, Cerebras, SambaNova, d-Matrix, Tenstorrent — NOT PUBLIC (Cerebras listing not in the record as of this access)
  └─ NO public pure-play inference-box OEM (listed names are server/PC OEMs)

End buyers
  ├─ Hyperscalers (private + listed: AMZN/GOOGL/MSFT/META — not mapped here)
  ├─ NVIDIA / AMD / custom ASIC (Google TPU, Amazon Trainium, Meta MTIA) attaching HBM
  └─ PC / phone / auto OEMs attaching LPDDR / unified-memory SoCs
```

**Priced-in vs residual (one line per layer):**

- HBM stacks: **priced-in.** The shortage is the headline.
- Bonding equipment: **mixed.** Hanmi is the HBM-bonder headline (priced-in). Besi hybrid bonding is residual architecture still a minority of current sales. ASMPT TCB sits inside a SEMI+SMT conglomerate.
- Test: **partially priced-in** at Advantest (AI SoC tester is the bigger story). FormFactor DRAM probes are still labeled "probe cards."
- HBF: **not priced as a P&L** (pre-revenue); the stocks (SNDK, 285A.T) are priced as NAND-cycle + AI-storage, which is a different (also crowded) narrative.
- Memory-interface chips / CXL IP: **residual.** Still described as DDR5 cycle or "connectivity."
- Consumer unified-memory silicon: **not a stock category.** Buried inside AAPL/AMD/QCOM.
- Inference boxes: **priced as GPU servers** (SMCI/DELL), not as a memory-architecture trade.

---

## 2. Company blocks — starter set

Dollar ADV below uses Yahoo `averageDailyVolume10Day` × last price (more current than 3-month average). 3-month ADV is also shown.

### SK hynix Inc. — 000660.KS — KSE (Korea Exchange)

- **Market cap:** ₩1,144.996T (Yahoo `price.marketCap`); **≈ $840B** at USD/KRW 1,363.18. Price ₩1,613,000. As-of **2026-09-02 06:30 UTC** (KST cash close). Source: [Yahoo quoteSummary 000660.KS](https://finance.yahoo.com/quote/000660.KS).
- **EV / EV·sales / EV·EBITDA (Yahoo, same stamp):** EV ₩1,137.296T; EV/S **6.01×**; EV/EBITDA **7.92×**. Own 3-year range: **not in the record**. Peers: MU EV/S 11.5×; Samsung 3.2× (conglomerate).
- **Revenue exposure to this shift:** **not disclosed as HBM % of total.** Company statement (not a segment note): “HBM revenue more than doubled year-on-year” in FY2025, “making a significant contribution” ([SK hynix FY25 release, 2026-01-28](https://news.skhynix.com/en/sk-hynix-announces-fy25-financial-results/); [PR Newswire copy](https://www.prnewswire.com/news-releases/sk-hynix-announces-fy25-financial-results-posts-record-high-results-and-delivers-highest-shareholder-returns-302672384.html)). FY2025 revenue ₩97.1467T, OP ₩47.2063T, OP margin 49% (company, K-IFRS). **Estimate:** HBM is a first-order driver of FY25/1H26 profits; a precise % is **not in the record** of the English IR releases retrieved. Do not use secondary “30% of DRAM” figures as company data.
- **Exposed-segment growth:** HBM revenue **more than doubled YoY in FY2025** (company). Q2 2026 total revenue ₩79.3187T vs ₩22.232T in Q2 2025 (**+257%** company total, not HBM-only) ([2Q26 newsroom, 2026-07-29](https://news.skhynix.com/en/q2-2026-business-results/)). HBM4: “began mass shipments of HBM4 in the second quarter” 2026 (same release).
- **Gross margin, last 3 years:** company discloses **operating** margin, not a GAAP-style gross-margin series in the English releases retrieved. OP margin: FY2024 35%, FY2025 49%, Q2 2026 **76%** (company). Gross-margin %: **not in the record** of those releases.
- **Customer concentration:** top-customer % **not in the record** of English IR. Company: “Long-Term Agreements with around 10 key customers” (2Q26 release). Secondary Bank of America HBM share 61% in 2025 is **not a company figure**.
- **Net cash (latest quarter):** cash and equivalents **₩88T**; total debt **₩18.6T**; net cash **₩69.4T** at end-Q2 2026 (company, 2026-07-29).
- **Founder / Lindy:** not founder-led. Origins Hyundai Electronics (1983) → Hynix → SK Group affiliate. Core business has stayed memory IDM (DRAM + NAND) for four decades. CEO is professional management under SK.
- **Insider ownership:** Yahoo `heldPercentInsiders` **20.21%** (likely SK Inc. / affiliates, not employees). Confirm on DART for a filing-sourced split — **not retrieved this pass**.
- **Next three dated catalysts:** (1) **2026-10-27** Yahoo `earningsDate` (Q3 2026). (2) HBM4 production ramp “second half of the year” 2026 (2Q26 release; window 2026-07 to 2026-12). (3) Yongin Phase 1 cleanroom “early 2027” (2Q26 release).
- **Why this row exists:** largest HBM supplier; the shortage trade the original thesis treated as already priced.
- **Sell-side count:** Yahoo `numberOfAnalystOpinions` **38**; rec `strong_buy`; mean target ₩3,216,025.
- **Keyword frequency:** FY25 and 2Q26 releases are HBM-centric. Two years earlier (2023–24) HBM was already the SK hynix story; frequency is **high and sustained**, not a new discovery. Qualitative only (full call-word counts **not in the record**).
- **Short interest % of float:** **not in the record** (Yahoo short fields empty for .KS).
- **Priced-in score 5/5.** Inputs: (a) company OP margin 76% in a single quarter; (b) 52-week ₩257,750–₩2,987,000; (c) HBM is the headline in every IR sentence; (d) EV/S 6× on hyper-cyclical peak sales is not “cheap” if the cycle mean-reverts; (e) original thesis excluded this name for this reason.
- **Options / LEAPs / IV:** listed options on the Korean name: **not in the record** from Yahoo US optionChain. ADS mentioned by company (NASDAQ) — ADS options **not checked**.
- **Convertibles:** **not in the record** of English 2Q26 release.
- **ADV:** 10-day vol 3.84M × ₩1,613,000 ≈ **₩6.19T/day ≈ $4.5B/day**.
- **PRIMARY:** https://news.skhynix.com/en/q2-2026-business-results/ · https://news.skhynix.com/en/sk-hynix-announces-fy25-financial-results/ · DART 사업보고서 FY2025 cited by company as filed ~2026-03-17 (HTML not fetched this pass). Access 2026-09-02.

---

### Micron Technology, Inc. — MU — NasdaqGS

- **Market cap:** **$1.054T**. Price $933.44. As-of **2026-09-01 20:00 UTC**. Source: Yahoo `quoteSummary` MU. EV **$1.035T**; EV/S **11.46×**; EV/EBITDA **15.17×**. 52-week $117.30–$1,255.00.
- **Revenue exposure:** **Filing-sourced container, not HBM-only.** FY2025 10-K (year ended 2025-08-28, filed 2025-10-03): four segments after Q4’25 reorg. **CMBU** (“memory solutions for large hyperscale cloud customers, **and HBM for all data center customers**”) revenue **$13.52B** in FY2025 vs $3.79B FY2024 vs $1.87B FY2023. FY2025 total revenue **$37.378B** → CMBU = **36.2% of FY2025 revenue** (10-K segment note). CMBU also includes DDR, LPDDR, GDDR — so 36.2% is an **upper bound** for the HBM-containing segment, not HBM. **Company earnings statement (not 10-K line):** “combined revenue from HBM, high-capacity DIMMs, and LP server DRAM reached **$10 billion**” in FY2025, “more than a five-fold increase”; data center **56%** of company revenue with **52%** gross margin; Q4 HBM revenue “nearly **$2 billion**” (FY2025 Q4 earnings deck). $10B / $37.378B = **27%** of FY2025 for that *combined* high-value data-center memory basket. HBM-only FY% : **not in the record**.
  Primary 10-K: https://www.sec.gov/Archives/edgar/data/723125/000072312525000040/202510karscopy.pdf
- **Exposed-segment growth:** CMBU $1.87B → $3.79B → $13.52B (FY23–25, 10-K, restated). Combined HBM+HCDIMM+LP-server **>5×** YoY in FY2025 (company deck).
- **Gross margin (10-K consolidated):** FY2025 **40%** ($14,873 / $37,378); FY2024 **22%**; FY2023 **−9%** (gross *loss*). DRAM mix including HBM is cited as a driver of the 2025 improvement (10-K MD&A).
- **Customer concentration (10-K Note 27):** **one customer 17%** of FY2025 revenue, “primarily included in the CMBU segment.” FY2024: one customer 10%. FY2023: none ≥10%. Q3 FY2026 10-Q (period ended 2026-05-28): one customer **10%** of nine-month revenue, still primarily CMBU (secondary write-up of the 10-Q; confirm on EDGAR).
- **Net cash (company Q3 FY2026 presentation, as of 2026-05-28):** cash+ST investments+LT marketable **$30.128B**; current debt $0.582B + LT debt $5.140B = **$5.722B** total debt; **net cash $24.433B** (company table “Net cash”). Yahoo TTM cash $26.0B / debt $6.4B (different stamp).
- **Founder / Lindy:** founded 1978 (Boise). Not founder-led (CEO Sanjay Mehrotra). Core business has stayed memory IDM (DRAM + NAND) throughout.
- **Insider ownership:** Yahoo **0.24%**. Institutions 80.0%.
- **Catalysts:** (1) **2026-09-30** Yahoo earnings date (FY Q4 2026). (2) HBM4 36GB 12-high samples already at “multiple key customers” in FY2025 10-K; production timing beyond that **not dated in the 10-K excerpt**. (3) Strategic Customer Agreements: 16 signed, typically CY2026–2030, ~20% of DRAM volume / ~⅓ of NAND volume over the period (Q3’26 company deck) — monitor SCA mix vs spot.
- **Why this row exists:** US-listed HBM IDM; CMBU is the cleanest US filing container for the shift; original thesis still treats it as priced-in.
- **Analysts:** **45**; `strong_buy`; mean target $1,513.
- **Keywords:** FY2025 10-K and FY25/FY26 earnings decks are dense in **HBM**. CXL / unified memory: **not prominent** in the 10-K excerpts retrieved. Vs ~2 years earlier (FY2023 10-K era): HBM was a development story, not a $10B run-rate. Qualitative: **step-change in HBM mentions**.
- **Short interest:** **2.66% of float** as of **2026-08-14** (Yahoo `shortPercentOfFloat`). Short ratio 0.7.
- **Priced-in 5/5.** Inputs: $1.05T cap; EV/S 11.5× vs SK hynix 6×; 52-week low $117; HBM is management’s lead sentence; 45 analysts; original thesis exclusion.
- **Options:** listed. Expiries through **2028-12-15**. LEAPs (≥2027-09): 2027-09-17, 2027-12-17, 2028-01-21, 2028-06-16, 2028-12-15. IV vs 1y: **not in the record**.
- **Convertibles:** FY2025 10-K balance sheet shows conventional notes/term loans; outstanding converts **not in the record** of the excerpted notes (company prepaid large conventional debt in FY2026 10-Q).
- **ADV:** 10-day 24.38M × $933.44 ≈ **$22.8B/day**. 3-month avg vol 44.67M.
- **PRIMARY:** https://www.sec.gov/Archives/edgar/data/723125/000072312525000040/202510karscopy.pdf (FY2025 10-K) · Q3 FY2026 10-Q via EDGAR (period 2026-05-28) · https://investors.micron.com/ . Access 2026-09-02.

---

### Samsung Electronics Co., Ltd. — 005930.KS — KSE

- **Market cap:** ₩1,644.924T ≈ **$1.207T**. Price ₩250,500. As-of **2026-09-02 06:30 UTC**. EV ₩1,560.528T; EV/S **3.22×**; EV/EBITDA **6.87×** (conglomerate). 52-week ₩68,800–₩374,500.
- **Revenue exposure:** **HBM % of total: not disclosed.** Company FY2025: consolidated revenue **₩333.6T**, OP ₩43.6T ([Samsung newsroom, 2026-01-29](https://news.samsung.com/global/samsung-electronics-announces-fourth-quarter-and-fy-2025-results)). Q4 2025 DS division revenue **₩44.0T**, OP ₩16.4T, of company Q4 ₩93.8T. Memory Business “all-time high for quarterly revenue and operating profit, driven by expanded sales of **HBM** and other high-value-added products.” FY Memory / FY HBM dollars: **not in the record** of the newsroom release (Samsung historically sometimes gave Memory sales; this release does not). **Estimate:** HBM is material to DS profits but a **minority of group revenue** (phones, display, appliances remain). Secondary Korean press putting FY2025 Memory ~₩104T is **not used as a fact**.
- **Growth:** Q4 DS +33% QoQ (company). HBM4 “on track to begin delivering … this quarter” as of the 2026-01-29 release (i.e. Q1 2026). Foundry: “began shipments of 4nm HBM base-die products” in Q4 2025 (company).
- **Gross margin 3-year:** **not in the record** of the English newsroom release (Samsung reports OP by division, not GM%).
- **Customer concentration:** **not in the record**.
- **Net cash:** Yahoo TTM cash ₩190.0T, debt ₩22.4T → **net cash ~₩168T** (Yahoo, not a dated quarter footnote). Filing-sourced latest-quarter net cash: **not retrieved** from DART this pass.
- **Founder / Lindy:** Lee family control; founded 1969 as electronics (1938 trading house). Memory has been a core pillar since the 1980s; group is still a conglomerate (MX, SDC, VD/DA, Harman).
- **Insiders:** Yahoo **9.69%**.
- **Catalysts:** (1) **2026-10-28** Yahoo earnings. (2) HBM4 volume vs SK hynix qualification — ongoing through 2026 (company aim to “reestablish leadership,” not a dated share print). (3) FY2026 Memory mix of HBM4 / DDR5 / SOCAMM2 / GDDR7 (stated 2026 plan, no date).
- **Why this row exists:** #2/#3 HBM IDM plus HBM base-die foundry; conglomerate wrapper is why EV/S looks cheap vs MU.
- **Analysts:** **36**; `strong_buy`; mean target ₩471,545.
- **Keywords:** Q4’25 release is HBM-heavy in the DS section; group release still leads with phones/AI devices. Vs 2023: HBM was a catch-up narrative. Qualitative: **HBM mentions up**, still not the whole 10-K equivalent.
- **Short % float:** **not in the record** (.KS).
- **Priced-in 4/5.** Inputs: Memory is the profit engine in Q4’25 (DS OP ₩16.4T of group OP ₩20.1T); HBM catch-up is a widely held sell-side debate; 52-week from ₩68,800; EV/S 3.2× reflects MX/SDC ballast, not a hidden HBM stub. Residual architecture angle: HBM base-die foundry + SOCAMM2, still minority.
- **Options / converts / IV:** **not in the record** from Yahoo US chain.
- **ADV:** 10-day 21.58M × ₩250,500 ≈ **₩5.41T/day ≈ $4.0B/day**.
- **PRIMARY:** https://news.samsung.com/global/samsung-electronics-announces-fourth-quarter-and-fy-2025-results · DART 사업보고서 not fetched this pass. Access 2026-09-02.

---

### Kioxia Holdings Corporation — 285A.T — Tokyo

- **Market cap:** ¥27.909T ≈ **$175B**. Price ¥51,000. As-of **2026-09-02 06:30 UTC**. EV ¥27.991T; EV/S **7.44×**; EV/EBITDA **11.82×**. 52-week ¥2,567–¥112,700 (IPO Dec 2024; print is not a 3-year fundamental range).
- **Revenue exposure:** **HBM: none disclosed; company is NAND.** FY ended **2026-03-31** (Japanese FY2025) revenue **¥2,337.628B** vs ¥1,706.460B prior year; gross profit ¥1,012.904B vs ¥569.433B ([Annual Securities Report EN](https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/library/securities/asset/Annual-Securities-Report-FY2025-EN.pdf), filed 2026-06-24). HBF is a development theme with Sandisk; **HBF revenue: not in the record** (pre-commercial). **Estimate:** *this shift* as HBM = **0%** of revenue; as “AI data-center NAND / future HBF” = **majority of the current P&L is NAND**, of which enterprise/cloud is growing (US revenue ¥1,098.832B of ¥2,337.628B).
- **Growth:** revenue **+37%** YoY (¥1,706B → ¥2,338B). Application split table exists in the ASR (Note 21) but the HTML extraction did not yield a usable NAND-vs-SSD mix; **segment mix: see PDF**.
- **Gross margin:** FY2026-03-31 **43.3%** (1,012.9/2,337.6); prior year **33.4%** (569.4/1,706.5). FY2023 comparable: **not in the two-year ASR table**.
- **Customer concentration:** **not in the record** of the extracted ASR notes (US/China/Taiwan geos given; no 10% customer).
- **Net cash:** Yahoo cash ¥795.8B, debt ¥837.8B → **net debt ~¥42B** (Yahoo TTM). ASR also has large sale-and-leaseback borrowings (¥288.340B current+LT related, as of 2026-03-31).
- **Founder / Lindy:** Toshiba Memory spin (2018) of a NAND business dating to Toshiba’s 1980s flash invention. Not founder-led (President Nobuo Hayasaka). Core business has stayed NAND.
- **Insiders:** Yahoo **14.05%** (Bain/Toshiba residual possible; **not verified on EDINET**).
- **Catalysts:** (1) **2026-10-30** Yahoo earnings. (2) JV with Sandisk extended through **2034-12-31**; Sandisk to pay **$1.165B** 2026–2029 ([Kioxia news, 2026-01-30](https://www.kioxia.com/en-jp/about/news/2026/20260130-1.html)). (3) HBF sampling path is Sandisk-dated (H2 2026 samples / early 2027 devices) — Kioxia’s own HBF commercial date **not in the ASR excerpt**.
- **Why this row exists:** listed NAND IDM on the high-bandwidth-flash / AI-SSD side of the memory wall, explicitly **not** competing for HBM wafers (executive commentary in secondary press; treat as non-filing).
- **Analysts:** **16**; `buy`; mean target ¥110,944.
- **Keywords:** ASR is NAND/flash. HBM is discussed as a **competitor’s capacity diversion**, not a product. HBF: development, not a sales line.
- **Short %:** **not in the record** (.T).
- **Priced-in 4/5.** Inputs: 52-week from ¥2,567; EV/S 7.4× on a cyclical NAND peak; AI-SSD shortage is the listing narrative. HBF residual architecture is **not** in the price as revenue (still 0). Score would be 5 if treating NAND-cycle AI storage as the same trade as HBM.
- **Options / LEAPs:** **not in the record** from Yahoo US chain.
- **Convertibles:** **not in the record** of the extracted ASR notes.
- **ADV:** 10-day 35.74M × ¥51,000 ≈ **¥1.82T/day ≈ $11.4B/day**.
- **PRIMARY:** https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/library/securities/asset/Annual-Securities-Report-FY2025-EN.pdf Access 2026-09-02.

---

### Sandisk Corporation — SNDK — NasdaqGS

- **Market cap:** **$225.0B**. Price $1,536.87. As-of **2026-09-01 20:00 UTC**. EV $220.5B; EV/S **10.89×**; EV/EBITDA **17.47×**. 52-week **$50.65–$2,354.39**. Independent listing **2025-02-24** (spin from WDC 2025-02-21) ([10-K](https://investor.sandisk.com/static-files/342a38e2-e204-4f50-ad22-3e3a28e2f6ff), FY ended 2025-06-27, filed 2025-08-21).
- **Revenue exposure:** FY2025 revenue **$7.355B** by end market: Cloud **$0.960B (13%)**, Client $4.127B, Consumer $2.268B (10-K). **HBF revenue: $0 / not in the record as sales.** Cloud +13% of FY2025 is the closest filing proxy for “AI/data-center flash,” and it is still a **minority**. Yahoo TTM revenue $20.25B and GM 71% are **post-FY2025 cycle** prints — do not mix with FY25 10-K without a later 10-Q. **Estimate:** *this shift* as HBF = **pre-revenue**; as AI NAND/eSSD = Cloud was 13% of FY25 and has since grown (TTM implies a different year). Precise current Cloud% : **not in the record** without the latest 10-Q.
- **Growth:** Cloud **+195%** YoY in FY2025 ($325M → $960M, 10-K). Company Q4 FY25 PR: BiCS8 ramp; HBF “creating a new paradigm for AI inference” (CEO quote in last10k header of the 10-K).
- **Gross margin:** FY2025 COGS $5,143M / revenue $7,355M → **GM 30.1%**; FY2024 COGS $5,591 / $6,663 → **GM 16.1%**; FY2023 COGS $5,656 / $6,086 → **GM 7.1%** (10-K).
- **Customer concentration:** FY2025 and FY2024 **no customer ≥10%**; FY2023 one customer **15%** (10-K).
- **Net cash:** Yahoo cash $4.76B, debt $0.20B. 10-K period ended 2025-06-27 is stale vs Yahoo TTM; latest-quarter filing net cash **not fetched** this pass.
- **Founder / Lindy:** new public company 2025; NAND/flash business is the old SanDisk (1988) + WD flash. CEO David Goeckeler (from WD), not Eli Harari. Core business stayed NAND flash through the spin.
- **Insiders:** Yahoo **0.97%**.
- **Catalysts:** (1) **2026-11-06** Yahoo earnings. (2) HBF samples **2H calendar 2026**; first HBF inference devices **early 2027** ([company blog](https://www.sandisk.com/company/newsroom/blogs/2025/scaling-beyond-the-wall-inside-sandisks-high-bandwidth-flash-for-ai)). (3) Kioxia JV extension / $1.165B payments 2026–2029 (joint 2026-01-30 release).
- **Why this row exists:** listed vehicle for High Bandwidth Flash, a NAND-based residual architecture sitting next to HBM; current P&L is still client/consumer NAND.
- **Analysts:** **23**; `buy`; mean target $2,125.
- **Keywords:** FY2025 10-K is Cloud/Client/Consumer NAND. HBF appears in IR/press more than in the FY25 10-K business description excerpt. Vs two years earlier the company did not exist as SNDK. Qualitative: **HBF language is new (2025)**; revenue language is still NAND cycle.
- **Short % float:** **8.24%** as of 2026-08-14 (Yahoo). Short ratio 0.46 (high short count, high volume).
- **Priced-in 5/5 on the NAND-cycle + AI-storage narrative; 2/5 on HBF-as-revenue.** Combined score **4/5** because the stock has already re-rated ~30× off the 52-week low. Inputs: $225B cap on FY25 $7.4B sales is a TTM-cycle multiple; HBF is still samples.
- **Options:** listed through 2028-12-15. LEAPs: 2027-09-17, 2028-01-21, 2028-06-16, 2028-09-15, 2028-12-15. IV: **not in the record**.
- **Convertibles:** **not in the record** of the FY25 10-K excerpts (post-spin capital structure should be re-read in the latest 10-Q).
- **ADV:** 10-day 11.94M × $1,536.87 ≈ **$18.4B/day**.
- **PRIMARY:** https://www.sec.gov/Archives/edgar/data/2023554/000202355425000034/ · https://investor.sandisk.com/static-files/342a38e2-e204-4f50-ad22-3e3a28e2f6ff Access 2026-09-02.

---

### Rambus Inc. — RMBS — NasdaqGS

- **Market cap:** **$9.154B**. Price $84.40. As-of **2026-09-01 20:00 UTC**. EV $8.351B; EV/S **11.04×**; EV/EBITDA **26.39×**. 52-week $72.45–$174.10 (stock is **below** the 52-week midpoint).
- **Revenue exposure (FY2025 10-K, year ended 2025-12-31, filed 2026-02-18):** total revenue **$707.6M**. Mix: **Product (memory interface chips) 49.1% / $347.8M**; royalties remainder; **Contract and other (Silicon IP) 11.4% / $80.5M** ([rmbs-20251231.htm](https://www.sec.gov/Archives/edgar/data/917273/000119312526057101/rmbs-20251231.htm)). Product chips are DDR5 RCD/PMIC/SPD/TS sold to Micron, Samsung, SK hynix and module/cloud customers — **enablers of high-capacity server DRAM, not HBM stacks**. Silicon IP includes HBM controller IP, GDDR, PCIe, **CXL controller IP**. **Filing-sourced HBM+CXL %: not disclosed.** **Estimate:** *this shift* = Product chips (bandwidth/capacity DIMMs) + a slice of Silicon IP. Using Product+IP as an **upper bound** = **60.5%** of FY2025. Using Silicon IP alone as the HBM/CXL-controller slice = **11.4%** (and that 11.4% still includes security IP). Do not pick a fake precise %.
- **Growth:** total revenue $461.1M (2023) → $556.6M (2024) → $707.6M (2025), **+27.1%** YoY. Product **+40.9%** YoY ($246.8M → $347.8M). Contract/IP **−3.8%**.
- **Gross margin:** FY2025 **79.6%**; FY2024 **80.3%**; FY2023 **77.6%** (10-K).
- **Customer concentration:** **top five customers 66%** of FY2025 revenue (62% in 2024 and 2023) (10-K). Individual 10% names table exists in the 10-K (Note); values **not fully extracted** this pass — treat top-five 66% as the filing number.
- **Net cash:** Yahoo cash $825M, debt $22M. 10-K: **no convertible notes outstanding** as of 2025-12-31 and 2024-12-31.
- **Founder / Lindy:** founded **1990** (Farmwald / Horowitz). Not founder-led today. Core business **shifted** from proprietary DRAM/RDRAM licensing toward memory-interface chips + IP — Lindy of *legal licensing* is weaker than Lindy of *interface analog*.
- **Insiders:** Yahoo **0.76%**. Institutions 95.0%.
- **Catalysts:** (1) **2026-10-26** Yahoo earnings. (2) HBM4E controller IP (company product announcements in 2026 — confirm on IR). (3) DDR5 client chipset / MRDIMM (MRCD/MDB) adoption in calendar 2026–27 (roadmap, not a dated order).
- **Why this row exists:** enabling silicon for the memory wall that is still filed as “chips + royalties,” not as an HBM stock.
- **Analysts:** **8** (thin vs MU/ALAB). Rec `none`; mean target $147.50.
- **Keywords:** FY2025 10-K MD&A leads with DDR5 RCD and “HBM4, GDDR7 and PCIe 7.0 digital IP.” CXL is in the product list. Vs FY2023 10-K: Product was already ~49%; HBM/CXL IP mentions have **increased** but the P&L mix moved **toward chips, away from IP** (contract 19% → 11%). Qualitative: **HBM/CXL language up; revenue mix is DDR5 chips.**
- **Short % float:** **6.79%** as of 2026-08-14. Short ratio 2.06.
- **Priced-in 3/5.** Inputs: EV/S 11× is not a forgotten stub; 52-week drawdown from $174 suggests the **HBM-adjacent re-rate already happened and partially reversed**; only 8 analysts; Silicon IP (the HBM/CXL controller story) is **shrinking as a % of sales**; Product chips are a DDR5-cycle commodity with three DRAM customers. Residual architecture (CXL IP, HBM controller IP) is the **minority**.
- **Options:** listed. Few expiries (n=6). Last listed **2028-01-21** (one LEAP-like). IV: **not in the record**.
- **Convertibles:** **none** outstanding (10-K).
- **ADV:** 10-day 1.89M × $84.40 ≈ **$160M/day**.
- **PRIMARY:** https://www.sec.gov/Archives/edgar/data/917273/000119312526057101/rmbs-20251231.htm Access 2026-09-02.

---

### Astera Labs, Inc. — ALAB — NasdaqGS

- **Market cap:** **$48.56B**. Price $279.91. As-of **2026-09-01 20:00 UTC**. EV $47.35B; EV/S **39.40×**; EV/EBITDA **165.9×**. 52-week $97.89–$499.48.
- **Revenue exposure:** FY2025 revenue **$852.5M** (+115% YoY) ([Q4/FY25 PR](https://ir.asteralabs.com/news-releases/news-release-details/astera-labs-reports-fourth-quarter-and-full-year-2025-financial/); [10-K alab-20251231](https://www.sec.gov/Archives/edgar/data/1736297/000173629726000010/alab-20251231.htm)). Products: Aries PCIe/**CXL** retimers and cable modules, Taurus Ethernet SCMs, **Leo CXL Memory Connectivity Controllers**, Scorpio fabric switches. **No product-line revenue split in the 10-K.** **Estimate:** company is an AI-connectivity platform, not a CXL-memory pure-play. Leo is the CXL-memory row; Aries/Scorpio/Taurus are scale-up/scale-out. CXL-memory **as % of revenue: not in the record**. Upper bound for “this shift” if one treats all PCIe/CXL/Ethernet AI connectivity as in-scope: **~100%**. If one treats only Leo CXL memory controllers: **unknown, likely a minority** (management Q2’26 PR, not a 10-K, described strength in “AI fabrics and signal conditioning” — Scorpio ramp).
- **Growth:** FY2025 **+115%** (company). Q4’25 $270.6M, +17% QoQ, +92% YoY.
- **Gross margin:** FY2025 GAAP **75.7%** (PR table also shows 75.6% / 76.2% / 74.0% across the three annual columns in the earnings release). Use: **FY2025 ~75.6–75.7%, FY2024 76.2%, FY2023 74.0%** (company earnings release).
- **Customer concentration (10-K):** **one end customer >70%** of 2025 revenue; **top three ≈86%**.
- **Net cash:** Yahoo cash $1.253B, debt $44M. 10-K: redeemable preferred converted at IPO; **no cash convertible notes** in the excerpts.
- **Founder / Lindy:** founded **2017**; CEO **Jitendra Mohan** is a founder. Core business has stayed high-speed connectivity for cloud/AI (short Lindy, same product thesis).
- **Insiders:** Yahoo **10.32%**.
- **Catalysts:** (1) **2026-11-03** Yahoo earnings. (2) Scorpio X-Series production ramp (Q2’26 PR: Q3 inflection from 320-lane fabric). (3) Leo CXL attach on next Xeon/EPYC platforms — **no dated company volume commitment in the 10-K**.
- **Why this row exists:** merchant CXL memory-controller silicon plus the PCIe/CXL physical layer that makes pooled/tiered memory reachable.
- **Analysts:** **23**; `buy`; mean target $390.
- **Keywords:** 10-K product list is PCIe/CXL/Ethernet/UALink. “CXL” is structural. Vs 2023 (pre-IPO / early CXL): Leo was a roadmap item; 2025 10-K still warns “CXL connectivity solutions … early stages of market adoption.” Qualitative: **CXL mentions high but Scorpio/PCIe is the growth engine language in 2026 PRs.**
- **Short % float:** **6.62%** as of 2026-08-14. Short ratio 1.91.
- **Priced-in 4/5.** Inputs: EV/S 39×, EV/EBITDA 166×; 70%+ one customer; the stock is an AI-connectivity multiple, not a forgotten CXL stub. Residual (Leo memory pooling) is **not** what 39× is paying for — it is paying for Scorpio/Aries. CXL-memory success would be upside inside an already-expensive vehicle.
- **Options:** listed through 2028-12-15. LEAPs: five dated ≥2027-09. IV: **not in the record**.
- **Convertibles:** **none** in the 10-K excerpts.
- **ADV:** 10-day 2.84M × $279.91 ≈ **$795M/day**.
- **PRIMARY:** https://www.sec.gov/Archives/edgar/data/1736297/000173629726000010/alab-20251231.htm Access 2026-09-02.

---

### Advantest Corporation — 6857.T — Tokyo

- **Market cap:** ¥23.503T ≈ **$147B**. Price ¥32,540. As-of **2026-09-02 06:30 UTC**. EV ¥23.861T; EV/S **19.36×**; EV/EBITDA **40.94×**. 52-week ¥10,450–¥38,730.
- **Revenue exposure:** FY2025 (year ended **2026-03-31**) company results note: tester sales for “AI-related high-performance semiconductors” increased YoY; **SoC Test Systems** driven by HPC/AI; **Memory Test Systems** “continued elevated sales for high-performance DRAM” plus NAND ([FY2025 results note](https://www.advantest.com/document/en/investors/ir-library/result/JE_BIZ_260427_note.pdf), 2026-04-27). **HBM % of total revenue: not disclosed.** Company **estimate** (not a segment audit): CY2025 memory tester market ~$2.1B vs SoC ~$6.9B; Advantest memory-tester share “around 60%” (down ~2 ppt). June 2024 CEO interview (Reuters): “HBM makes up roughly **50%** of our memory testing business” — **dated, interview, not FY2025 filing.** **Estimate:** HBM test is a **subset of Memory Test**, which is a **subset of group** now dominated by SoC/AI accelerators. A precise HBM/group % is **not in the record**.
- **Growth:** Yahoo TTM revenue ¥1.232T, revenueGrowth **+39.3%**. FY ended Mar-2025 (prior year) IAR: net sales ¥779.7B (+60.3%). FY2025 (Mar-2026) exact sales: results note says record, exact yen **not extracted as a single headline number** from the bilingual PDF — use TTM with that caveat.
- **Gross margin:** Q4 FY2025 OP margin 46.7%; FY OP margin “over 40%” (results note). Consolidated GM% three-year table: **not in the record** of the results note. Yahoo TTM GM **65.7%**. FY2026 guide: consolidated GM “around **63%**” (company forecast).
- **Customer concentration:** **not in the record** of the results note.
- **Net cash:** Yahoo cash ¥413.1B, debt ¥108.2B.
- **Founder / Lindy:** founded 1954 as Takeda Riken; listed tester specialist for decades. Not founder-led. Core business stayed semiconductor ATE (Lindy strong).
- **Insiders:** Yahoo **0.28%**.
- **Catalysts:** (1) **2026-10-27** Yahoo earnings. (2) CY2026 memory tester market guide $2.2–$2.7B (company, Jan/Apr 2026). (3) Next-gen DRAM (HBM4) test solutions “progressing according to plan” (Apr 2026 note; no date).
- **Why this row exists:** every HBM stack needs KGD and stack test; Advantest is the listed memory-ATE incumbent. Today the P&L is **more AI SoC tester than HBM**.
- **Analysts:** **21**; `buy`; mean target ¥41,362.
- **Keywords:** FY2025 note is “HPC/AI” and “high-performance DRAM,” not a CXL/unified-memory document. HBM as a word is less frequent than in 2024 interviews because SoC AI testers overtook the story. Qualitative: **HBM still present; SoC/AI now louder.**
- **Short %:** **not in the record**.
- **Priced-in 4/5.** Inputs: EV/S 19×; AI tester is a 2024–26 consensus theme; HBM is inside the number but no longer the lead sentence. Residual: HBM4/HBM5 test intensity per stack could still surprise, but 19× does not look like a neglected memory-test stub.
- **Options:** **not in the record** from Yahoo US chain.
- **Convertibles:** **not in the record** of the results note.
- **ADV:** 10-day 8.45M × ¥32,540 ≈ **¥275B/day ≈ $1.7B/day**.
- **PRIMARY:** https://www.advantest.com/document/en/investors/ir-library/result/JE_BIZ_260427_note.pdf Access 2026-09-02.

---

### BE Semiconductor Industries N.V. — BESI.AS — Euronext Amsterdam

- **Market cap:** €15.166B ≈ **$17.6B**. Price €191.60. As-of **2026-09-02 12:41 UTC**. EV €15.136B; EV/S **20.63×**; EV/EBITDA **54.32×**. 52-week €105.40–€328.40.
- **Revenue exposure:** FY2025 revenue **€591.3M**, **−2.7%** vs 2024 ([FY25 results](https://www.besi.com/investor-relations/press-releases/details/be-semiconductor-industries-nv-announces-q4-25-and-full-year-2025-results/); [AR 2025](https://www.besi.com/investor-relations/financial-reports-and-publications/financial-reports/)). Hybrid bonding **revenue: not disclosed**. Company: cumulative hybrid bonding orders **150+ systems**, **18 customers**; six integrated lines at a “leading logic customer”; TC Next at five customers for “logic, memory and photonics.” HBM4 production “anticipated to begin in 2026” with HBM5 later (AR). **Estimate:** hybrid bonding + TC Next for HBM is **optionality / early revenue**, not the FY25 P&L. FY25 was still mainstream die attach + 2.5D OSAT. A precise HBM % is **not in the record**.
- **Growth:** FY2025 revenue −2.7%; orders €685.0M **+16.8%**. Q1 2026 (secondary/Yahoo-news): hybrid bonding unit orders more than doubled sequentially — treat as **company Q1’26 PR if confirmed**; the Globenewswire **Q2/H1 2026** release (2026-07-23) is primary: H1 revenue growth vs H1’25, net cash €164.0M at 2026-06-30.
- **Gross margin:** FY2025 **63.3%** (AR). FY2024 exact GM: **not extracted**. Long-run comment “gross margins increasing from 40% to 63%” is a 2011–2025 span, not a 3-year table.
- **Customer concentration:** **not in the record** of the retrieved AR excerpt.
- **Net cash:** Q2 2026 net cash **€164.0M** (2026-07-23 PR), after conversion of the 2029 converts. Yahoo TTM cash €509M / debt €358M (includes remaining **€350M 4.5% senior notes**).
- **Founder / Lindy:** incorporated **May 1995**, IPO Dec 1995. CEO Richard Blickman has run the firm for decades (not a 2020s founder). Core business stayed assembly equipment; the *technology* inside die attach has moved to hybrid bonding.
- **Insiders:** Yahoo **10.89%**.
- **Catalysts:** (1) **2026-10-22** Yahoo earnings. (2) Hybrid bonding qualification for HBM stacking — company: “2026 is crucial”; volume “2027” (Q4’25 call, secondary transcript). (3) Senior notes remaining on TISE — capital structure, not a product catalyst.
- **Why this row exists:** merchant hybrid-bonding tools are the residual *architecture* for 16H+ HBM if TC bonding runs out of I/O/thermal headroom.
- **Analysts:** **23**; `buy`; mean target €296.57.
- **Keywords:** AR/PRs are hybrid-bonding dense. Vs 2023–24: already the Besi story. Qualitative: **high and sustained**; the market has heard this for years.
- **Short %:** **not in the record** (.AS).
- **Priced-in 4/5.** Inputs: EV/S 20.6× on €734M TTM sales; hybrid bonding has been the equity story since ~2021; FY25 revenue still *down*. The option is priced; the HBM hybrid-bonding *revenue* is not here yet. Residual architecture = yes; “unappreciated” = no.
- **Options:** **not in the record** from Yahoo US chain (EU options may exist).
- **Convertibles:** **€175M 1.875% due 2029 fully converted to equity in Q2 2026** after early redemption announced 2026-05-05 ([Besi PR](https://www.besi.com/investor-relations/press-releases/details/be-semiconductor-industries-nv-announces-early-redemption-of-eur-175-million-senior-unsecured-convertible-bonds-due-2029/)). Outstanding converts at 2026-06-30: **none**. Remaining: **€350M 4.5% senior notes** (not convertible).
- **ADV:** 10-day 435,762 × €191.60 ≈ **€83.5M/day ≈ $97M/day**.
- **PRIMARY:** https://www.besi.com/investor-relations/press-releases/details/be-semiconductor-industries-nv-announces-q4-25-and-full-year-2025-results/ · 2025 Annual Report on https://www.besi.com/investor-relations/financial-reports-and-publications/financial-reports/ Access 2026-09-02.

---

### ASMPT Limited — 0522.HK — HKSE

- **Market cap:** HK$66.012B ≈ **$8.42B**. Price HK$157.40. As-of **2026-09-02 08:08 UTC**. EV HK$65.072B; EV/S **3.97×**; EV/EBITDA **33.15×**. 52-week HK$66.50–HK$244.40.
- **Revenue exposure (Annual Report 2025):** Group continuing-ops review revenue **HK$13.74B (US$1.76B)**, +10.0% YoY; headline “annual revenue HK$14.52B / US$1.86B” also appears (likely including discontinued/NEXX — **use the review figure for mix**). **Advanced Packaging US$532.1M**, **+30.2% YoY**, **30% of 2025 Group revenue** (26% in 2024). TCB “record revenue, approximately **146% YoY**.” TCB serves **both advanced logic and HBM**; HBM-only TCB % of group: **not disclosed**. **Estimate:** AP 30% is filing-sourced; HBM subset of TCB is **<30% of group**. ([AR PDF](https://www.asmpt.com/site/assets/files/84854/e_00522ar-20260405.pdf); [HKEX](https://www.hkexnews.hk/listedco/listconews/sehk/2026/0410/2026041000019.pdf))
- **Growth:** AP +30.2%; TCB +146% (company). SEMI segment +21.8% YoY; SMT “marginally lower.” TCB TAM company estimate **US$760M (2025) → US$1.6B (2028)**, 30% CAGR — **company estimate, not a historical**.
- **Gross margin:** Group adjusted GM **38.3%**, **−172 bps** YoY (AR). Three-year GM table: **not fully extracted**. Yahoo TTM GM 39.1%.
- **Customer concentration:** **not in the record** of the extracted AR pages. Company: TCB for HBM4 12H “first to secure orders from **multiple players**.”
- **Net cash:** **HK$3.28B** at year-end 2025 (AR). Yahoo cash HK$5.88B / debt HK$3.97B (TTM, different netting).
- **Founder / Lindy:** ASM Pacific lineage; not founder-led. Core business stayed semiconductor assembly + SMT; TCB is an intensification of assembly, not a new industry.
- **Insiders:** Yahoo **24.63%** (ASM International / strategic? **not verified** on HKEX substantial-shareholder notice this pass).
- **Catalysts:** (1) **2026-11-03** Yahoo earnings. (2) HBM4 16H: flux TCB “adopted for sampling,” AOR fluxless “under qualification” (AR — 2026 window). (3) SMT Solutions strategic options / NEXX divestment (AR; process ongoing 2026).
- **Why this row exists:** TCB tools that actually sit in HBM4 lines, inside a HK-listed SEMI+SMT conglomerate still described as an assembly/SMT franchise.
- **Analysts:** **18**; `buy`; mean target HK$196.99.
- **Keywords:** 2025 AR is TCB/HBM4 dense in the AP section; group still “SEMI and SMT.” Vs 2023: TCB was smaller. Qualitative: **HBM language up sharply in 2025; mix still 70% not-AP.**
- **Short %:** **not in the record** (.HK).
- **Priced-in 2/5.** Inputs: EV/S **4.0× vs Besi 20.6×** for overlapping TCB/hybrid-bonding TAM; AP is 30% not 100%; HK listing / SMT overlay; TCB +146% is not the equity’s lead multiple. This is the brief’s “enabling tool still labeled by original purpose.”
- **Options / LEAPs / IV:** **not in the record** from Yahoo US chain.
- **Convertibles:** **not in the record** of the extracted AR notes.
- **ADV:** 10-day 2.11M × HK$157.40 ≈ **HK$332M/day ≈ $42M/day**.
- **PRIMARY:** https://www.hkexnews.hk/listedco/listconews/sehk/2026/0410/2026041000019.pdf Access 2026-09-02.

---

### Hanmi Semiconductor Co., Ltd. — 042700.KS — KSE

- **Market cap:** ₩20.251T ≈ **$14.9B**. Price ₩213,500. As-of **2026-09-02 06:30 UTC**. EV ₩20.306T; EV/S **36.83×**; EV/EBITDA **82.60×**. 52-week ₩82,000–₩426,000.
- **Revenue exposure:** FY2025 revenue **₩576.7B**, OP ₩251.4B, OP margin **43.6%** (company, 2026-02-09; English press citing the disclosure). **HBM % of revenue: not in a retrieved DART segment note.** Company attributes record sales to the **TC bonder** business and cites TechInsights **71.2% global HBM TC-bonder share** by 3Q25 revenue (company-cited **secondary**). **Estimate:** HBM TC bonders are the **majority** of the current equity story and likely of sales; a filing-sourced % is **not in the record** this pass.
- **Growth:** FY2025 revenue **+3.2%** vs ₩558.9B in 2024 (Korean-language 사업보고서 tables reproduced in secondary blogs — **confirm on DART**). That is **not** a hyper-growth print: the 2023→2024 jump (+251%) already happened.
- **Gross margin 3-year:** OP margin 21.8% (2023) / 45.7% (2024) / 43.6% (2025) from secondary reproductions of the business report. Filing-sourced GM%: **not retrieved**. Yahoo TTM GM 57.3%.
- **Customer concentration:** **not in the record** as a % . Press: SK hynix and Micron as TC-bonder customers; SEMES serves Samsung internally.
- **Net cash:** Yahoo cash ₩89.6B, debt ₩2.3B (TTM).
- **Founder / Lindy:** founded **1980**; Yahoo insiders **55.82%** (founder/family likely). Core business has stayed semiconductor back-end equipment; the *mix* swung to HBM TC bonders in 2023–25.
- **Insiders:** **55.82%** (Yahoo).
- **Catalysts:** (1) **2026-10-14** Yahoo earnings. (2) “Wide TC Bonder” for HBM5/HBM6 in **2H 2026** (company, Feb 2026). (3) Hybrid bonder for ≥16-high HBM “around 2029” (company; far dated).
- **Why this row exists:** closest listed HBM-bonder specialist.
- **Analysts:** **7**; `hold`; mean target ₩272,143.
- **Keywords:** Korean IR/press is TC-bonder/HBM in every sentence. Vs 2023: that was the breakout year. Qualitative: **fully saturated narrative.**
- **Short %:** **not in the record**.
- **Priced-in 5/5.** Inputs: EV/S 37×; 52-week high ₩426,000; FY25 growth only +3%; the name *is* the HBM-equipment headline in Seoul. Does **not** meet the brief’s unappreciated test.
- **Options / converts:** **not in the record**.
- **ADV:** 10-day 503k × ₩213,500 ≈ **₩107B/day ≈ $79M/day**.
- **PRIMARY:** company FY2025 results disclosure 2026-02-09 (English press: https://en.sedaily.com/finance/2026/02/09/hanmi-semiconductor-posts-record-results-plans-next-gen-hbm-bonder-launch ). **DART 사업보고서 제46기 should be the binding source — HTML not fetched this pass.** Access 2026-09-02.

---

### Apple Inc. — AAPL — NasdaqGS

- **Market cap:** **$4.745T**. Price $325.13. As-of **2026-09-01 20:00 UTC**. EV $4.767T; EV/S **10.21×**; EV/EBITDA **28.38×**. 52-week $225.95–$344.57.
- **Revenue exposure:** FY2025 10-K (year ended 2025-09-27): geographic segments only. Product mix: iPhone $209.6B, Mac **$33.7B**, iPad $28.0B, Wearables $35.7B, Services $109.2B; total **$416.2B** ([aapl-20250927](https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm)). **Unified-memory silicon is not a revenue line.** Mac (the M-series unified-memory vehicle) = **8.1%** of FY2025 sales; even that is hardware ASP, not silicon. **Estimate:** *this shift* as a P&L = **low single-digit to high-single-digit** if one attributes a fraction of Mac/iPad silicon BOM — **not in the record**. Apple is a **buyer** of DRAM/NAND and a **designer** of on-package unified memory, not a memory vendor.
- **Growth:** Mac +12.4% YoY ($29.98B → $33.71B). Group +6%.
- **Gross margin:** FY2025 **46.9%**; FY2024 **46.2%**; FY2023 **44.1%**. Products GM 36.8% / 37.2% / 36.5% (10-K).
- **Customer concentration:** **not applicable** as a supplier; channel concentration **not extracted**.
- **Net cash:** Yahoo cash $62.4B, debt $84.3B → **net debt ~$22B** (Apple typically nets cash against commercial paper/term debt; 10-K net cash figure **not extracted**).
- **Founder / Lindy:** founded 1976; not founder-led (Cook). Devices + services has been the business since the iPhone era; unified memory is an SoC design choice inside that Lindy.
- **Insiders:** Yahoo **1.65%**.
- **Catalysts:** (1) **2026-10-29** Yahoo earnings. (2) Next Mac/iPhone silicon (annual fall cycle). (3) On-device AI memory footprint — **no dated filing commitment**.
- **Why this row exists:** reference buyer/designer of consumer unified memory; **not a way to underwrite the shift**.
- **Analysts:** **39**; `buy`; mean target $324.45 (≈ spot).
- **Keywords:** 10-K does not read as an HBM/CXL document. “Unified memory” is a product-marketing term, not an Item 1 heading. Qualitative: **keyword frequency for this shift is low** in filings.
- **Short % float:** **0.80%** as of 2026-08-14.
- **Priced-in n/a as a memory stock; 1/5 as an HBM/CXL trade** (the market does not pay Apple as a memory-architecture stub). **Not shortlisted** — too little P&L torque.
- **Options:** listed through 2028-12-15. LEAPs: five dated ≥2027-09. IV: **not in the record**.
- **Convertibles:** **not in the record** as a material instrument (Apple’s debt is conventional).
- **ADV:** 10-day 39.83M × $325.13 ≈ **$13.0B/day**.
- **PRIMARY:** https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm Access 2026-09-02.

---

### Advanced Micro Devices, Inc. — AMD — NasdaqGS

- **Market cap:** **$750.3B**. Price $459.61. As-of **2026-09-01 20:00 UTC**. EV $741.5B; EV/S **17.95×**; EV/EBITDA **77.54×**. 52-week $149.22–$584.73.
- **Revenue exposure (FY2025 10-K, year ended 2025-12-27):** Data Center **$16.635B** of **$34.639B** = **48.0%**. Data Center includes Instinct GPUs (HBM attach), EPYC CPUs, NICs, FPGAs — **not HBM-only**. Client $10.640B includes APUs (consumer unified memory). Instinct/HBM GPU % of Data Center: **not disclosed**. **Estimate:** *this shift* (HBM-attached GPUs + unified-memory APUs) is **material and growing** but a precise % is **not in the record**. MI300/MI350 are HBM products; MI300A is unified-memory CPU+GPU (product family listed).
  https://ir.amd.com/financial-information/sec-filings/content/0000002488-26-000018/amd-20251227.htm
- **Growth:** Data Center **+32%** ($12.579B → $16.635B). Client+Gaming +51%. Group +34%.
- **Gross margin:** FY2025 **50%**; FY2024 **49%** (10-K MD&A). FY2023 GM: **not in the retrieved MD&A comparison** (only 2025 vs 2024 shown).
- **Customer concentration:** **no customer ≥10%** of FY2025 or FY2024 revenue. FY2023: one Client/Gaming customer 18% (10-K).
- **Net cash:** YE2025 cash+ST investments **$10.6B**; aggregate principal debt **$3.3B** (10-K MD&A) → **net cash ~$7.3B**. Yahoo TTM cash $13.1B / debt $4.3B.
- **Founder / Lindy:** founded 1969; CEO Lisa Su (not founder). Core x86/GPU business constant; data-center GPU is a 2020s intensification.
- **Insiders:** Yahoo **0.42%**.
- **Catalysts:** (1) **2026-11-03** Yahoo earnings. (2) Instinct annual cadence / Helios rack (previewed in 10-K). (3) Client APU unified-memory attach in Copilot+ PCs through 2026.
- **Why this row exists:** largest listed consumer of HBM after NVDA *and* a unified-memory APU vendor; still not a memory stock.
- **Analysts:** **49**; `strong_buy`; mean target $613.84.
- **Keywords:** 10-K is GPU/EPYC/AI. HBM is implied by Instinct, not a sales line. CXL: **not a lead keyword** in the excerpts. Vs 2023: Instinct was MI300 launch year. Qualitative: **HBM implied, not themed.**
- **Short % float:** **2.46%** as of 2026-08-14.
- **Priced-in 4/5 as an AI-GPU stock; 2/5 as a memory-architecture stub.** The market pays for Instinct vs NVDA, not for MI300A unified memory or CXL. **Not shortlisted** (AI-GPU is the headline).
- **Options:** listed through 2028-12-15. LEAPs: five dated ≥2027-09.
- **Convertibles:** YE2025 debt $3.3B; convert vs cash notes **not extracted** from the 10-K debt note this pass.
- **ADV:** 10-day 15.91M × $459.61 ≈ **$7.3B/day**.
- **PRIMARY:** https://www.sec.gov/Archives/edgar/data/2488/000000248826000018/amd-20251227.htm (IR HTML) Access 2026-09-02.

---

### QUALCOMM Incorporated — QCOM — NasdaqGS

- **Market cap:** **$178.0B**. Price $166.61. As-of **2026-09-01 20:00 UTC**. EV $181.9B; EV/S **4.13×**; EV/EBITDA **15.16×**. 52-week $121.99–$259.92.
- **Revenue exposure (FY2025 10-K, year ended 2025-09-28):** QCT **$38.367B** of group (handsets $27.793B, auto $3.957B, IoT $6.617B). Snapdragon X / AI PC is inside QCT IoT/compute — **not a disclosed line**. Company FY25 deck: AI PC opportunity illustrated as “PC $4B” (TAM-style callout, **not FY25 revenue**). AI200/AI250 data-center inference: announced, **revenue not in the record**. **Estimate:** unified-memory PC silicon + non-HBM inference = **single-digit % of FY25**, possibly low-single-digit. Handsets 72% of QCT. ([10-K PDF](https://s204.q4cdn.com/645488518/files/doc_financials/2025/q4/QCOM-09-28-25-FY2025-10-K-Final.pdf); [FY25 Q4 deck](https://s204.q4cdn.com/645488518/files/doc_financials/2025/q4/FY2025-4th-Quarter-Earnings-Presentation_11-5-25_final.pdf))
- **Growth:** QCT +16% YoY; auto +36%; IoT +22%; handsets +12%. Q1 FY2026 (ended ~Dec 2025): QCT $10.6B; management cited **memory supply/pricing** as a **headwind** to handset builds (Futurum write-up of the print — use company PR to confirm).
- **Gross margin:** FY2025 **55%**; FY2024 **56%** (10-K). FY2023: **not in the retrieved YoY table**.
- **Customer concentration:** 10-K warns of a small number of handset OEMs; **10% customer table not extracted** this pass.
- **Net cash:** Yahoo cash $8.30B, debt $15.27B → **net debt ~$7.0B**.
- **Founder / Lindy:** founded 1985; not founder-led (Cristiano Amon). Core QCT+QTL cellular franchise constant; PC/data-center inference is an adjacency.
- **Insiders:** Yahoo **0.12%**.
- **Catalysts:** (1) **2026-10-29** Yahoo earnings. (2) Snapdragon X2 designs “~150 commercialized through 2026” (FY25 call, 2025-11-05). (3) AI200/AI250 inference cards/racks — annual cadence claimed; **first revenue date not in the 10-K**.
- **Why this row exists:** consumer unified-memory PC SoC plus an explicit **“beyond GPU and HBM”** inference architecture (CEO, FY25 call). That is a residual *architecture* the HBM-IDM complex does not own.
- **Analysts:** **30**; rec `none`; mean target $193.10.
- **Keywords:** FY25 call: Snapdragon X, Oryon, NPU, **and** a direct contrast to “GPU and HBM” for dedicated inference clusters (transcript 2025-11-05/06). Vs FY23 calls: on-device AI present; data-center inference silicon **new**. Qualitative: **unified-memory/PC up; HBM used as a foil, not a product.**
- **Short % float:** **3.48%** as of 2026-08-14.
- **Priced-in 2/5 as this shift; 4/5 as a handset SoC.** EV/S 4.1× vs ALAB 39× / MU 11.5×. The memory-architecture inference story is **not** the equity’s multiple. **Not shortlisted below only because the P&L torque is still unproven (AI250 revenue = not in the record); listed as a watch if a 10-Q ever splits data-center silicon.**
- **Options:** listed through 2028-12-15. LEAPs: four dated ≥2027-09.
- **Convertibles:** **not in the record** of the extracted 10-K notes (Qualcomm typically term/bonds).
- **ADV:** 10-day 10.20M × $166.61 ≈ **$1.70B/day**.
- **PRIMARY:** https://s204.q4cdn.com/645488518/files/doc_financials/2025/q4/QCOM-09-28-25-FY2025-10-K-Final.pdf · https://s204.q4cdn.com/645488518/files/doc_events/2025/Nov/05/Q4FY25-Earnings-Call-Transcript_11-6-25_Final.pdf Access 2026-09-02.

---

## 3. Additional verified public names (not in the starter list)

Listing verified on Yahoo 2026-09-02. Shorter blocks; still no invented %.

### FormFactor, Inc. — FORM — NasdaqGS — HBM/DRAM probe cards

- **Mkt cap $7.45B**, price $95.41, **2026-09-01 20:00 UTC**. EV/S **7.91×**, EV/EBITDA 38.2×. 52-week $28.04–$160.27.
- **Exposure:** FY2025 revenue **$785.0M**; Probe Cards $637.9M; DRAM probe revenue **$247.4M** in FY2025 vs $227.4M FY2024 vs $113.8M FY2023 (company supplemental / earnings; **HBM-only DRAM probe % not disclosed**). DRAM is **~31.5%** of FY2025 if $247.4 / $785. Q4’25 supplemental: SK hynix **22.9%** of FY2025 revenue ([Q4’25 supplemental](https://investors.formfactor.com/static-files/d40f243f-ccb0-489b-b4a8-23f58f90581c)).
- **GM:** FY2025 GAAP **39.3%** vs FY2024 40.3% (earnings PR / 10-K header).
- **Net cash:** Yahoo cash $346M, debt $30M.
- **Founded** 1993 (probe-card lineage via Cascade/etc.); not a 2017 founder story. Insiders 0.76%.
- **Analysts 8**; short **4.93%** of float (2026-08-14). ADV 10-day ~$100M.
- **Options:** listed; LEAP 2028-01-21 only.
- **Convertibles:** **not in the record** this pass.
- **Priced-in 2/5.** Probe cards still labeled as test consumables; DRAM probe is a minority; EV/S 7.9× vs Hanmi 37× / Advantest 19×.
- **PRIMARY:** https://last10k.com/sec-filings/form/0001039399-26-000009.htm (10-K acc. 0001039399-26-000009, filed 2026-02-20) · supplemental URL above. Access 2026-09-02.

### Marvell Technology, Inc. — MRVL — NasdaqGS — CXL expanders/switches

- **Mkt cap $189.1B**, $210.39, EV/S **19.67×**. Custom ASICs + interconnect is the AI multiple. Structera CXL switch sampling **CQ3 2026** ([company PR 2026-03-17](https://www.marvell.com/company/newsroom/marvell-next-gen-cxl-switch-memory-pooling-breaks-ai-memory-wall.html)). **CXL % of revenue: not in the record.** Priced-in **4/5** as custom AI silicon; CXL is residual inside that.
- **Analysts 41**. Short 3.79%. Earnings Yahoo **2026-12-01**. ADV 10-day ~$6.1B.
- **PRIMARY:** company CXL PR above; 10-K not fetched this pass.

### Montage Technology — 688008.SS — Shanghai — DDR5 RCD + CXL controllers

- **Mkt cap ¥235.7B ≈ $35.1B**, ¥193.10, EV/S **36.0×**, EV/EBITDA 97.7×. Listing verified. **Segment split / CXL %: not in the record** this pass (STAR 10-K not fetched). Competitor named in Rambus 10-K. Priced-in **4/5** on the multiple; residual **unknown** without the filing. **PRIMARY:** SSE/STAR filing **not fetched**. Flag: **incomplete**.

### Teradyne, Inc. — TER — NasdaqGS — ATE (SoC + memory)

- **Mkt cap $52.4B**, EV/S **11.7×**. Memory-tester vs Advantest split **not in the record** as HBM %. Complements FormFactor. Priced-in **3/5**. Analysts 15. Short 5.06%. Earnings **2026-10-21**.

### Kulicke and Soffa — KLIC — NasdaqGS — TCB / wire bond

- **Mkt cap $4.08B**, EV/S **3.79×**. TCB tools compete with ASMPT/Besi/Hanmi; **HBM % not in the record**. Options: **no LEAP ≥2027-09** (last 2027-04-16). Analysts **3**. Priced-in **2/5** on valuation, **unknown** on mix.

### Disco Corporation — 6146.T — Tokyo — dicing/grind

- **Mkt cap ¥5.98T ≈ $37.5B**, EV/S **12.7×**, net cash (Yahoo debt 0). HBM-specific sales **not in the record**. Process tool for stacked die. Priced-in **3/5**.

### Super Micro Computer — SMCI — NasdaqGS — inference/GPU boxes

- **Mkt cap $24.1B**, EV/S **0.77×**, GM Yahoo TTM **10.8%**. Short **18.41%** of float. Founder-led (Charles Liang; insiders 12.7%). Inference-box OEM, **not a memory architecture**. Priced-in **3/5** as GPU-server cycle, **1/5** as a memory trade. Earnings **2026-11-03**.

### NVIDIA Corporation — NVDA — NasdaqGS — HBM buyer / unified-memory CPUs / DGX

- **Mkt cap $5.251T**, EV/S **17.22×**. The HBM *demand* node. Not a memory vendor. Mapped only as end-buyer. Priced-in **5/5** as AI compute.

### Intel Corporation — INTC — NasdaqGS — CXL host CPUs

- **Mkt cap $470B**, EV/S **8.51×**. CXL invented in the Intel ecosystem; **CXL revenue not in the record**. Residual host for CXL.mem.

### Nanya Technology — 2408.TW — Taiwan — DRAM, not HBM

- **Mkt cap NT$1.605T ≈ $50.6B**, EV/S **8.82×**, 52-week NT$46.05–NT$569. Conventional DRAM tightness from HBM crowding is the bull case; **HBM production not in the record**. Treat as **cyclical DRAM**, not this shift’s core.

**Not public / no pure-play (confirmed by absence of a Yahoo equity match this pass):** CXMT (China DRAM/HBM), SEMES, Groq, SambaNova, Tenstorrent, d-Matrix. Cerebras: **listing not in the record**.

---

## 4. Shortlist (at most 3) — “unappreciated” under the brief

**Excluded by construction:** SK hynix, Micron, Samsung Memory, Hanmi, Sandisk-as-NAND-cycle, Kioxia-as-NAND-cycle, Advantest-as-AI-SoC-tester, ALAB-as-AI-fabric, Besi-as-hybrid-bonding-option (the option is famous). Those score 4–5 priced-in.

**Selected (3):**

| Rank | Name | Why it fits the brief | Why it is not an HBM IDM |
|---|---|---|---|
| 1 | **ASMPT (0522.HK)** | TCB for HBM4 is inside a SEMI+SMT company still labeled assembly/SMT. AP is **30%** of group (filing). EV/S **4.0× vs Besi 20.6×**. HK listing. | Sells tools, not bits. HBM is a minority of a minority (TCB ⊂ AP ⊂ group). |
| 2 | **FormFactor (FORM)** | Probe cards are an enabling consumable still labeled “test & measurement.” DRAM probes ~**31%** of FY25. SK hynix 23% of FY25. EV/S **7.9× vs Hanmi 37×**. | Does not make HBM; sells the needle that tests the die before the stack. |
| 3 | **Rambus (RMBS)** | DDR5 RCD chips sold to the three DRAM IDMs — “server DIMM glue” still filed as product+royalty. HBM/CXL **controller IP is 11% of sales and shrinking**. 8 analysts. 52-week **drawdown** from $174 to $84. | Not an HBM manufacturer. Interface chips + IP. |

Qualcomm is the on-deck name if AI200/AI250 ever prints a 10-Q line; until then revenue is **not in the record**.

---

## 5. Shortlist deep-dive: bear, base rate, kill criteria

### ASMPT (0522.HK)

**Strongest bear case.** TCB share is lost to Hanmi (HBM) and Besi (hybrid bonding) just as SMT is being shopped. The 146% TCB growth is a 2025 catch-up that mean-reverts when HBM capex pauses. HK$8.4B equity value still has to fund R&D against three better-capitalized tool peers. China OSAT mix is a political haircut. Adjusted GM already **−172 bps** in 2025.

**Reference-class base rate.** **Applied Materials’ SEM / packing-adjacency tools** and **Kulicke & Soffa in prior HBM/TCB cycles**: assembly-tool specialists re-rate on a packaging node, then give back the multiple when the node’s unit growth slows and the next interconnect (here, hybrid bonding) bypasses them. Closer analog than Larrabee: **ASE/SPIL tool vendors around the 2010s TSV hype** — TSV happened, but merchant tool profits were cyclical and share rotated. **Xeon Phi / Larrabee** analog is weaker (those were failed *architectures*); TCB is a real process. The failure mode is **being the flux TCB vendor when the industry jumps to hybrid bonding** — i.e. **Optane-class**: a real product that loses the next node.

**Kill criteria (explicit).**
- **By 2026-12-31:** company reports FY2026 AP revenue **below US$532M** (YoY decline) *and* TCB commentary that HBM4 12H/16H orders slipped to 2027. Source: FY2026 results (historically early March).
- **By 2027-03-31:** Besi or Hanmi disclosed as having taken **both** of the “multiple” HBM4 TCB customers ASMPT claimed in the 2025 AR (company would have to say this — if they stop claiming multi-customer HBM4, treat as lost).
- **Any 2026 quarter:** book-to-bill SEMI **<0.80** for two consecutive quarters (2025 SEMI B/B was 0.93) *and* GM on continuing ops **<36%**.
- **Architecture kill:** a 2026–27 SK hynix or Samsung process-of-record slide that **hybrid bonding, not TCB**, is the HBM4E/HBM5 high-volume path **and** ASMPT has no qualified hybrid bonder PO. Date gate: **Besi’s own “2026 qualification / 2027 volume” window** — if that window hits and ASMPT is absent, kill the TCB-as-HBM thesis (the SMT franchise can still exist).

### FormFactor (FORM)

**Strongest bear case.** DRAM probe cards are a **three-customer** oligopsony. SK hynix at 23% (FY25) / 29.5% (Q1’26 company slides, secondary) means one capex pause is a recession. HBM test intensity could fall as stack yields rise (fewer retests). Foundry & Logic is the other half and is a TSMC/Intel cycle. GM 39% is not Advantest. A “HPC leader” becoming 10% in Q1’26 (NVIDIA 10.2% on those slides) concentrates *both* memory and GPU.

**Reference-class base rate.** **Consumable process tools in a node ramp** (photoresist, CMP pads, probe cards in DDR3/DDR4 ramps): revenue follows wafer starts × intensity, then intensity **falls** as the process matures. Analog: **Optane** is the wrong analog (product death). Better: **3D NAND staircase etch intensity** — a real step-up that then standardized. **Larrabee** analog: none. **Xeon Phi**: none. This is a **tools-on-a-ramp** story.

**Kill criteria.**
- **By 2026-10-28 earnings (Yahoo date):** DRAM probe quarterly revenue **below $60M** (vs Q4’25 $73.3M and Q1’26 $82.9M on company slides) *or* SK hynix **<10%** of a quarter without a matching Samsung/Micron offset.
- **By FY2026 10-K (Feb 2027):** DRAM probe revenue **< $200M** (below FY25 $247M) while HBM industry bits are still growing (if bits grow and FORM DRAM probes fall, share/intensity thesis is dead).
- **Any two consecutive quarters:** GAAP GM **<35%** (FY25 was 39.3%).
- **Customer kill:** 10-K stops listing a ≥10% memory customer **and** South Korea geography reverses the FY25 overtake of the US (MetricDuck reading of the 10-K geo table — confirm in the 10-K).

### Rambus (RMBS)

**Strongest bear case.** Product chips are **DDR5 RCD** sold into a three-IDM market against Montage, Renesas, MPS, TI (10-K competition list). When DDR5 module unit growth slows or IDMs dual-source harder, 49% of revenue is cyclical semiconductor *content*, not a royalty annuity. Silicon IP (the HBM/CXL controller story) **already fell** to 11.4% of sales. 66% top-five concentration. The 52-week collapse from $174 is the market **already voting** that the AI-memory multiple was wrong. Eight analysts means a re-rating needs a print, not a narrative.

**Reference-class base rate.** This *is* a **Larrabee / Rambus RDRAM** analog internally: the company once bet the company on a proprietary memory interface and lost the standard. The **base rate on Rambus-owned interfaces becoming the industry standard is poor**. CXL controller IP vs Astera/Marvell merchant silicon is the new version of that. **Optane analog:** CXL.mem pooling as a *category* could remain a niche (like persistent memory) while DDR5 RCD remains the real P&L. **Xeon Phi analog:** HBM controller IP licensed to custom ASICs that never ship in volume.

**Kill criteria.**
- **By 2026-10-26 earnings:** Product revenue **below $80M** in a quarter (Q4’25 was $96.8M per FY25 PR) *or* company guides Q1 product **below the prior $84–90M** band without a mix offset.
- **By FY2026 10-K (Feb 2027):** Product chips **<40%** of revenue *and* contract/IP still **<12%** — i.e. royalties re-dominate without IP growth (old Rambus).
- **Architecture kill:** JEDEC/CXL Consortium or a major CPU vendor ships CXL.mem **without** a Rambus IP mention **and** Astera/Marvell 10-Ks show CXL controller attach that does not list Rambus as complementary. Date gate: **Intel/AMD 2027 platform** generation.
- **Customer kill:** top-five **>75%** *and* one DRAM IDM **>30%** (not currently disclosed at that granularity — if a 10-K ever shows it, that is the dual-source risk).

---

## 6. Relative-value ratio: dollars per GB/s of memory bandwidth

**Issuer 10-K / 20-F / DART / EDINET series: not in the record.** No HBM manufacturer discloses contract price per GB or per GB/s.

**Defensible published fragments (all secondary or interview; not company contract tables):**

| Source | Date | Claim | Implied $/GB/s (arithmetic on *their* stack specs) |
|---|---|---|---|
| Silicon Analysts compiler table (accessed via search 2026-09-02) | “as of August 2026” | HBM3E ~$300 / 36GB stack, 1.18 TB/s | $300 / 1,180 GB/s ≈ **$0.25 per GB/s per stack**. Also $8.33/GB. **Compiler, not a filing.** |
| Same table | est. | HBM4 ~$550 / 36GB, >2 TB/s | $550 / 2,000 GB/s ≈ **$0.28 per GB/s** if 2 TB/s, **lower if >2 TB/s**. |
| TrendForce via Yonhap/Hankyung (cited by Silicon Analysts) | Jan 2026 | HBM4 contract **$16.67/GB** | Convert to GB/s only with a bandwidth assumption; **not in the record** as $/GB/s. |
| Cantor / Fubon (FMS 2026, via aistockwire 2026-08) | Aug 2026 | SK hynix HBM4 to NVDA **$31–32/GB** vs HBM3E **$17–18/GB**. **Analyst teardown of NVIDIA BOM, not a disclosed contract.** SK hynix “has not confirmed.” | If 36GB × $32 = $1,152/stack and 2.0 TB/s → **~$0.58 per GB/s**. If Micron’s claimed 2.8 TB/s HBM4 (10-K sampling language 2.8 TB/s in secondary; Micron 10-K says samples of HBM4 36GB 12-high, bandwidth figure in 10-K excerpt was not the 2.8 number) — **do not mix**. |
| “Source close to SK hynix” via HTX/TrendForce wrap | 2026 | HBM3E **$12–13/GB**; HBM4 2H26 **$16–19/GB** | Unnamed source. **Not a filing.** |

**Trend.** Secondary prints agree on direction: **$/GB is rising into HBM4**, while **GB/s per stack is also rising**, so **$/GB/s is not a clean down-trend** and may be **flat-to-up** if Cantor’s $31–32/GB is closer to truth than TrendForce’s $16.67/GB. **Cannot be turned into an audited time series.** Company statements (Micron Q4 FY25 deck; SK hynix 2Q26) discuss *revenue* and *margins*, not $/GB/s.

**Sandisk HBF fact sheet** (company marketing, not a price): Gen1 **1.6 TB/s** read, 512GB per 16-die stack, “similar cost” to HBM — **no dollar figure**. Cannot compute $/GB/s from that sheet.

**Bottom line:** **not in the record** as a primary, dated, issuer-sourced ratio. Any model using $0.25–$0.60 per GB/s per HBM stack in 2026 is using **secondary estimates** and should be labeled as such.

---

## 7. Cross-section snapshot (Yahoo 2026-09-02 access)

| Ticker | Price | Mkt cap | EV/S | EV/EBITDA | Analysts | Short % float | 10d $ADV (approx) | Priced-in |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| 000660.KS | ₩1,613,000 | ₩1,145T | 6.01 | 7.92 | 38 | n/a | ~$4.5B | 5 |
| MU | $933.44 | $1.05T | 11.46 | 15.17 | 45 | 2.66% | ~$23B | 5 |
| 005930.KS | ₩250,500 | ₩1,645T | 3.22 | 6.87 | 36 | n/a | ~$4.0B | 4 |
| 285A.T | ¥51,000 | ¥27.9T | 7.44 | 11.82 | 16 | n/a | ~$11B | 4 |
| SNDK | $1,536.87 | $225B | 10.89 | 17.47 | 23 | 8.24% | ~$18B | 4 |
| RMBS | $84.40 | $9.15B | 11.04 | 26.39 | 8 | 6.79% | ~$0.16B | 3 |
| ALAB | $279.91 | $48.6B | 39.40 | 165.9 | 23 | 6.62% | ~$0.80B | 4 |
| 6857.T | ¥32,540 | ¥23.5T | 19.36 | 40.94 | 21 | n/a | ~$1.7B | 4 |
| BESI.AS | €191.60 | €15.2B | 20.63 | 54.32 | 23 | n/a | ~$0.10B | 4 |
| 0522.HK | HK$157.40 | HK$66.0B | 3.97 | 33.15 | 18 | n/a | ~$0.04B | **2** |
| 042700.KS | ₩213,500 | ₩20.3T | 36.83 | 82.60 | 7 | n/a | ~$0.08B | 5 |
| AAPL | $325.13 | $4.75T | 10.21 | 28.38 | 39 | 0.80% | ~$13B | n/a |
| AMD | $459.61 | $750B | 17.95 | 77.54 | 49 | 2.46% | ~$7.3B | 4 |
| QCOM | $166.61 | $178B | 4.13 | 15.16 | 30 | 3.48% | ~$1.7B | 2 (as this shift) |
| FORM | $95.41 | $7.45B | 7.91 | 38.22 | 8 | 4.93% | ~$0.10B | **2** |

Yahoo `recommendationKey` and mean targets are **sell-side consensus snapshots**, not independent valuations.

---

## 8. Gaps to close on a second pass (honest)

- DART HTML for SK hynix / Samsung / Hanmi 사업보고서 (customer %, GM%, HBM if any).
- EDINET full notes for Advantest FY2025 (Mar 2026) sales by Memory vs SoC in yen.
- Micron Q3 FY2026 10-Q full text from EDGAR (this pass used a StockTitan/EvidInvest overlay of that 10-Q).
- FormFactor 10-K body (this pass used supplemental + last10k header).
- Montage 688008.SS annual report (CXL vs RCD mix).
- Historical EV/S 3-year ranges (Yahoo quoteSummary does not provide).
- IV vs 1-year (Yahoo option quote field empty).
- Full earnings-call word counts (qualitative only).
- Cerebras listing status with a primary exchange page.

**Access date for every URL in this file: 2026-09-02.**
