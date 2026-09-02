# Cars to grid — EV-derived batteries as grid asset

**Research date:** 2026-09-02  
**Today:** 2026-09-02  
**Protocol:** Primary filings and named industry statistical releases first. Company statements vs third-party estimates labeled. If a datum was not in a source reviewed for this memo, it is written **not in the record**. No invented tickers, percentages, or quotes.

**Shift:** Stationary / grid battery energy storage (BESS) bought as cheapest firm capacity / reliability per MW, not as climate policy. Cell chemistry is the EV overcapacity spillover (LFP, emerging sodium-ion). Integrators have failed (Powin). Layers: cells; system integrators; inverters/PCS; developers/IPPs; safety/thermal/insurance; interconnection/permitting.

---

## 0. How to read this file

- **Company statement** = 10-K / 10-Q / HK/SZ/KR annual report / company press release filed with a regulator or posted on IR.
- **Estimate / third party** = SEIA/Benchmark, BloombergNEF as reported by trade press, NREL, EIA, SNE Research as cited *inside* a company filing, FINRA short interest via MarketBeat, Yahoo/CNBC last prices.
- **Derived** = arithmetic on filing numbers (e.g. energy GM = 1 − COGS/revenue). Formula shown.
- Market prices: Yahoo Finance chart last close **2026-09-01** (US session); access 2026-09-02. CNBC HTML market-cap fields accessed 2026-09-02. International last prices Yahoo 2026-09-02 (local sessions).

---

## 1. Industry facts verified 2026-09-02

### 1.1 SEIA / Benchmark — US Q2 2026 installs

**Verified.** The 20.2 GWh figure is in the SEIA press release dated **2026-09-01**.

| Datum | Value | Date in source | Source |
|---|---|---|---|
| US storage installed Q2 2026 | **20.2 GWh** | Q2 2026 | SEIA, “Largest Quarter on Record for Energy Storage,” 2026-09-01 |
| H1 2026 installs | 30.8 GWh | H1 2026 | same |
| Utility-scale Q2 | 17.9 GWh (SEIA body); pv magazine USA restates “18 GWh” / “6.7 GW continuous power” | Q2 2026 | SEIA; pv magazine USA 2026-09-01 |
| C&I Q2 | 1.8 GWh (SEIA); pv magazine USA also writes 1,845 **GWh** in one sentence — that unit is internally inconsistent with 1.8 GWh; **treat 1.8 GWh as the SEIA figure** | Q2 2026 | SEIA |
| Residential Q2 | 657 MWh | Q2 2026 | SEIA |
| Arizona / Texas / California Q2 | 6.2 / 3.8 / 3.6 GWh | Q2 2026 | SEIA |
| Utility-scale fleet | 88 GWh → 165 GWh over “first 18 months of the Trump administration” | company/association statement, not an EIA table | SEIA 2026-09-01 |
| 2030 cumulative forecast | 683 GWh, **+11.5%** vs prior forecast | published 2026-09-01 | SEIA / Benchmark ESMO Q3 2026 |
| 2026 calendar installs forecast | **71 GWh**, described as ~20% above 59 GWh in 2025 | 2026-09-01 coverage | pv magazine USA; ESS-News citing same outlook |

Primary URL: https://seia.org/news/largest-quarter-on-record-for-energy-storage/  
Outlook page: https://seia.org/research-resources/energy-storage-market-outlook/  
Access date: 2026-09-02.

SEIA CEO Tim Pawlenty (company/association statement, 2026-09-01): storage is “a powerful reliability tool that strengthens our energy security, meets rising demand and puts downward pressure on electricity bills.” That is the reliability-not-climate frame in the primary release.

### 1.2 EIA — US utility-scale *power* (GW), not GWh

EIA and SEIA are not the same unit. EIA tracks nameplate **MW/GW**.

| Datum | Value | As-of | Source |
|---|---|---|---|
| Operating US utility-scale battery capacity YE 2025 | 43.6 GW | 2025-12-31 | EIA Today in Energy, https://www.eia.gov/todayinenergy/detail.php?id=67925 |
| Added H1 2026 | 8.3 GW → ~52 GW operating | 2026-06 | same |
| Planned 2H 2026 | 14 GW | operator reports to EIA, article ~2026-08 | same |
| Planned **2027** | **26 GW** | operator reports, article ~2026-08 | same |
| Planned 2028 | 14 GW | same | same |
| Planned **2026** (earlier vintage) | **24 GW** (body) / 24.3 GW / 26.3 GW depending on EIA table vintage | EIA Today in Energy 2026-02 (id=67205); ESS-News 2026-02-26 | see §8 kill criteria |

Access date: 2026-09-02. Direct fetch of eia.gov/todayinenergy/detail.php?id=67925 timed out once; figures taken from EIA article text as republished and from the search snippet of the EIA page itself.

### 1.3 Global cell/system volumes (third party, cited *inside* CATL 2025 annual report)

CATL 2025 annual report (English extract, CATL IR PDF dated in URL `202603`):

- SNE Research: global ESS battery shipments **550 GWh in 2025**, +79% YoY. **Company citing SNE, not SNE primary.**
- SNE Research: CATL global ESS battery shipment rank **#1 for five consecutive years (2021–2025)**.
- CATL company statement: ESS battery **sales 121 GWh** in 2025, +29.13% YoY; power-battery sales **541 GWh**.
- CNESA (cited by CATL): China new-type storage **189.5 GWh** installed in 2025, +73% YoY.

URL: https://www.catl.com/en/uploads/1/file/public/202603/20260310105310_46xjbwckvn.pdf  
Access: 2026-09-02.

### 1.4 Cost — $/kWh installed / turnkey, 2022–2026

| Series | 2022–23 | 2024 | 2025 | 2026 | Notes |
|---|---|---|---|---|---|
| **BNEF Energy Storage Systems Cost Survey 2025** (published ~2025-12-10 per Energy-Storage.News) | not in the record of this pass as a 2022 printed number | 2024 restated by BNEF to **$169/kWh** (from $165 printed the year before) | Global turnkey average **$117/kWh**, −31% YoY; 2-hour $124/kWh; 4-hour $110/kWh; China $73; Europe $177; US **$219** | 2026 full-year survey **not in the record** | Equipment/turnkey, 596 submissions. **Third party.** Energy-Storage.News 2025-12; energytech-news.com citing BNEF 2H outlook |
| **BNEF stationary pack** | not in the record here | | **$70/kWh** globally, −45% vs 2024; “cheapest Li-ion segment for first time” (Energy Tech News citing BNEF) | not in the record | Pack ≠ installed |
| **BNEF LCOS** 4-hour | | | **$78/MWh**, −27% YoY, “lowest since BNEF began tracking in 2009” | | Energy Tech News citing BNEF |
| **NREL** Cole/Karmakar-style 2025 update (OSTI 2583471 / NREL/TP-6A40-93281) | prior reports exist (2019–2023); 2023 dashed-line comparison in PDF | Overnight 4-hour **all-in $334/kWh (2024$)** starting point | Mid case **$321/kWh** (2025); low $295; high $350 | Mid **~$309** (table OCR: 2026 mid path ~0.93 × 334) | Bottom-up *planning* cost, not a survey of EPC bids. Completed Jan–Feb 2025; **excludes later tariffs**. https://docs.nrel.gov/docs/fy25osti/93281.pdf |
| **Tesla implied energy ASP (derived, not a grid-only ASP)** | FY2023 energy rev $6,035m / 14.7 GWh deployed = **$411/kWh** | FY2024 $10,086m / 31.4 GWh = **$321/kWh** | FY2025 $12,771m / 46.7 GWh = **$273/kWh** | Q2 2026 $3,139m / 13.5 GWh = **$232/kWh** | **Includes solar + Powerwall + Megapack.** Tesla Q2 2026 10-Q: energy revenue up on Megapack deployments, **offset by lower ASP per Megapack and fewer Powerwalls**. Not a BNEF-comparable turnkey. |
| **Fluence** | FY2023 GAAP GM 6.4% after FY2022 GM **(5.2)%** — the 2022–23 integrator margin collapse | FY2024 GM 12.6% | FY2025 GM 13.1% on **lower $/GWh** Gridstack Pro | Q3 FY2026 GAAP GM **5.1%** | Company: FY2025 revenue down because battery cost deflation cut ASP while GWh volume was “relatively consistent.” |

**Fluence (company statement, FY2025 10-K, filed 2025-11-25):** lithium-ion hardware costs rose in FY2022 then declined FY2023–FY2025 “due in part to manufacturing overcapacity… and softening demand from the EV sector.” BNEF cited *inside* the 10-K (2H 2025 Energy Storage Market Outlook, 2025-10-20): global utility-scale market ex-China **~3,201 GWh** additions 2024–2035.

Gap vs US: BNEF US turnkey **$219/kWh (2025)** vs China **$73/kWh** — ~3×. That is the tariff / FEOC / labor / interconnection wedge, not cell chemistry.

### 1.5 Powin analog (failed integrator)

- **Powin, LLC** Chapter 11, US Bankruptcy Court District of New Jersey, case **3:25-bk-16137**, Judge Michael B. Kaplan.
- Petition: **2026-06-10** docket / Energy-Storage.News **2025-06-11** (filing 9–10 June 2025). Assets and liabilities each **$100–500 million** (Bondoro filing alert).
- Plan confirmed **2025-12-01**. Final decree closing certain cases **2026-07-30**. Liquidating Trust still on docket through Aug 2026.
- Analog content: Oregon WARN (~250 jobs); “in danger of going out of business by 28 July” (state notice, as reported by Energy-Storage.News 2025-06-11). Spun monitoring/services into Powin Project LLC. **Private.** Not a public equity analog for valuation; it is a **working-capital / warranty / supply-chain** analog for Fluence, Wärtsilä storage, Stem, Energy Vault.

URLs: https://www.energy-storage.news/powin-files-for-chapter-11-bankruptcy-protection-and-spins-off-project-services-business/ ; PACER monitors of 3:25-bk-16137. Access 2026-09-02.

---

## 2. Layer map (public vs no pure-play)

| Layer | What is bought | Public names (verified tickers) | Pure-play? | Notes |
|---|---|---|---|---|
| **A. Cells — LFP / NMC / Na-ion** | $/kWh cells and DC blocks | **CATL** 300750.SZ / 3750.HK; **BYD** 1211.HK (and A-share not fetched this pass); **EVE** 300014.SZ; **LGES** 373220.KS; **Samsung SDI** 006400.KS; Tesla LFP Nevada (inside **TSLA**) | No US-listed LFP cell pure-play. CATL/EVE are the closest ESS-weighted cell names. | Dual-use cells. Stationary vs EV **is disclosed** at CATL and EVE; **not** at BYD, LGES (growth only), SDI (Energy Solutions blob). |
| **A2. Sodium-ion** | Na-ion cells/systems | **CATL** (Naxtra; TENER Na-ion BESS — company characterization). BYD mentioned in secondary roundups | **No listed Na-ion pure-play found.** HiNa private (2017). **Natron Energy** ceased US ops **2025-09** (secondary). **AMTE Power** insolvency 2024 (secondary). | Layer has **no public pure-play**. |
| **B. System integrators / OEMs** | Turnkey BESS, PCS-integrated cubes, O&M, EMS | **Fluence FLNC**; **Tesla TSLA** (Megapack); **Sungrow** 300274.SZ; **Wärtsilä WRT1V.HE** (segment being JV’d); **Eos EOSE** (zinc, not Li); **Energy Vault NRGV**; **Stem STEM**; CATL TENER / BYD Blade ESS (inside cell OEMs) | **FLNC** is the liquid US Li-ion integrator pure-play. EOSE is zinc LDES pure-play. NRGV/STEM are small and no longer “the” grid-Li story. | **Powin** (private) failed 2025. Wärtsilä announced **2026-06-15** JV with RCT Solutions and **will discontinue Energy Storage as a reporting segment**. |
| **C. Inverters / PCS / power electronics** | Bidirectional inverters, PCS, microinverters | **Sungrow** 300274.SZ; **Enphase ENPH** (residential IQ Battery + microinverters); Tesla inverters inside Megapack/Powerwall; **SMA / SolarEdge** — **not verified this pass** | No utility-scale PCS pure-play in the US large-cap set. ENPH is **residential**, not MW-scale grid. Sungrow is inverter + ESS. | Utility PCS often captive to integrator (Fluence, Tesla, Sungrow, Wärtsilä). |
| **D. Developers / IPPs** | Tolls, RA, merchant spread, ITC | **NextEra NEE** (NEER 5,177 MW net storage YE2025); **AES AES** (Fluence founder + own fleet); other utilities **not in this starter list** | No storage-only IPP. Storage is a capacity add-on to solar/gas. | Bought as **reliability / firming**, contracted under tolls (NEE 10-K). |
| **E. Safety / thermal / suppression** | Detection, suppression, UL9540A, NFPA 855 | **Firetrace** = **Halma plc** subsidiary (Halma.com/our-companies/firetrace). Yahoo ticker `HALMA.L` returned **not found** this pass; conventional LSE ticker is **HLMA** — **confirm on LSE; not independently printed here.** Other Halma fire names (FirePro, Apollo, etc.) are group companies, not BESS pure-plays. | **No public BESS-safety pure-play.** Firetrace is private opco inside Halma. | Insurance: **no public BESS-specialty insurer** found. Fluence 10-K: G&A insurance cost **+ $7.4m** FY2025. Tesla Q2 2026: “increase in energy warranty-related charges due to vendor cell issue.” |
| **F. Interconnection / permitting / EPC of wires** | Queue, substations, gen-tie | **Quanta PWR** $611.39 close 2026-09-01; **MYR Group MYRG** $286.46. Storage share of revenue **not in the record**. | **No interconnection-software or permitting pure-play** found. PWR/MYRG are diversified specialty contractors. | Fluence 10-K: FERC Order 2023 has **not** cleared the queue; customer interconnection delay is an explicit revenue-timing risk. |

**Layers with no public pure-play:** sodium-ion cells; BESS fire suppression; BESS insurance underwriting; interconnection studies/permitting software; US-domiciled LFP cell manufacturing (Tesla LFP Nevada is captive).

---

## 3. Company dossiers

Price/mkt-cap convention: US names = Yahoo last **2026-09-01** + CNBC `marketCap` field (units millions of USD) accessed **2026-09-02**. EV/sales **derived** = CNBC mkt cap / last FY revenue unless noted. Options IV, LEAPs, ADV 20-day: **not in the record** except single-session Yahoo volume 2026-09-01. Keyword frequency last 4 calls vs 2y earlier: **not independently counted** (transcripts not word-counted this pass).

---

### 3.1 Fluence Energy, Inc. — **FLNC** (Nasdaq GS)

| Field | Record |
|---|---|
| Name / ticker / exchange | Fluence Energy, Inc.; **FLNC**; Nasdaq Global Select. Class A $0.00001. FY ends 30 Sep. |
| Price / mkt cap | **$10.42** close 2026-09-01 (Yahoo). CNBC market cap **$1.923B**. Session volume 4.39m; Yahoo avg volume field **not in the record**. Stockanalysis.com (third party, accessed via search 2026-09-02): shares out **184.60m**, ADV cited **8.72m** on Yahoo quote page snippet. |
| Stationary/grid exposure | **~100% of revenue** is energy storage solutions + O&M + digital (Mosaic/Nispera). **Company statement, FY2025 10-K.** Not EV packs. |
| FY2025 | Revenue **$2,262.8m** (−16.1% vs $2,698.6m FY2024). GAAP GM **13.1%** vs 12.6%. Net loss **$(68.0)m** vs NI $30.4m. Adj. EBITDA **$19.5m** vs $78.1m. Free cash flow **$(160.4)m**. Deployed **6.8 GW**; contracted backlog **9.1 GW**; $ backlog **$5.3bn** remaining performance obligations. Pipeline 128.8 GW (65.1 GW solutions/services). |
| FY2023 (3y GM stack) | Revenue **$2,218.0m**; GAAP GM **6.4%**; FY2022 GM **(5.2)%**. Source: FY2023 10-K / 2023-11 earnings exhibit (SEC 0001868941-23-000081). |
| FY2026 YTD (9 mo to 2026-06-30) | Revenue **$1,590.0m** vs $1,220.9m. Q3 rev **$649.8m** vs $602.5m. GAAP GM Q3 **5.1%** vs 14.8%; 9-mo GM **6.5%** vs 12.5%. Net loss Q3 **$(44.3)m**, 9-mo **$(136.1)m**. Adj. EBITDA Q3 **$(29.3)m**, 9-mo **$(90.8)m**. Backlog **$6.4bn** (record). Orders Q3 **>$1.44bn** vs $508.8m. Data-center awards **~$850m through July 2026** (incl. **$550m** hyperscaler in July — **company statement, not a named customer**). FY2026 guidance cut to rev **$2.9–3.1bn** (mid **$3.0bn**) from $3.2–3.6bn; adj. EBITDA **$(30)m to +$10m** (mid **$(10)m**) from +$40–60m. **$400m** of deliveries slipped to FY2027 (CM ramp: new international CM + US CM construction delay). ARR target **$180m** unchanged. |
| Growth of exposed segment | FY2025 **solutions revenue −$475.7m** on lower $/GWh, volume “relatively consistent” but below plan (Australia contract delay; US tariffs; Arizona CM ramp). Services **+$39.1m**. Q3 FY2026 volume up, ASP/mix/new-platform costs crushed GM. |
| GM trend 3 years | FY2023 **6.4%** → FY2024 **12.6%** → FY2025 **13.1%** → Q3 FY2026 **5.1%**. The 2026 print is a **re-collapse** toward 2023, not a steady climb. |
| Customer concentration | FY2025: **two largest customers ~41%** of revenue; **AES and affiliates ~24%**; AES **13% of $5.3bn backlog**. Related-party revenue **~24%**. **10-K.** |
| Net cash / net debt | **2025-09-30:** cash **$690.8m** vs $448.7m prior year; **$400.0m** 2.25% converts due 2030 (issued Dec 2024, net proceeds $389.4m, capped calls $29.0m, strike **~$21.35**, cap **$28.74**); revolver undrawn, LCs **$194.4m**. **Derived net cash ~$291m** excluding LCs and SCF. **2026-06-30:** cash **$339.3m** + restricted **$25.6m** = **$365.0m** “total cash”; liquidity **$863.0m** (incl. $307.0m revolver availability after $193.0m LCs). Converts still outstanding (risk-factor language in Q3 release). **Derived: cash 365 − 400 converts ≈ net debt ~$35m** before SCF payables. |
| Founder-led / founded / core constant? | **Not founder-led.** Formed as AES–Siemens JV: Fluence Energy, LLC **2017-06-30**, ops **2018-01-01**; Fluence Energy, Inc. **2021-06-21**; IPO **2021-11-01**. CEO Julian Nebreda (Q3 2026 release). Core business **has been grid storage since inception**. “Founders” in the 10-K = AES Grid Stability and Siemens Industry, not a person. |
| Insider / control | **Controlled company.** As of **2025-09-30:** AES Grid Stability **51.50m** LLC / Class B-1 units = **28.5% economics**, **66.6% voting**; Siemens + SPT **51.50m** Class A = **28.5% economics**, **13.3% voting**; QHL **14.67m** Class A = **8.1% / 3.8%**. Continuing Equity Owners **>50%** voting. **2026-05-12 13G/A:** AES beneficially **41,432,781** shares, **22.48%** of a 13d-3 class; group with Siemens/QIA **117,666,665** / **63.9%**. LLC NCI (AES) **27.95%** at 2026-03-31 (Q2 10-Q). Management float insider % **not in the record** (proxy not pulled). |
| Next 3 dated catalysts | 1) **FY2026 year-end 2026-09-30** and earnings (Yahoo snippet “est. 2026-11-23” — **third party**; confirm 8-K). 2) **FY2027 conversion of $2.2bn** of the $6.4bn backlog (company, Q3 2026 call per Yahoo transcript). 3) **Arizona / international CM production run-rate “early FY2027”** (CEO, 2026-08-05 release) plus named hyperscaler $550m award conversion. Shelf S-3 expires **2026-08-11** (already past as of today — **not a future catalyst**). |
| Why this row exists | Liquid US **pure-play integrator**. AES captive + third-party IPPs. Poster child for **ASP deflation, CM ramp, and 2022-style margin collapse repeating in 2026**. Data-center BTM is the new demand claim. |
| EV/sales, EV/EBITDA, analysts | **Derived EV/FY2025 sales ≈ 1.92/2.26 = 0.85x** (equity, not EV). With converts $400m and cash $365m, EV ≈ **$1.96bn**; EV/FY25 sales **0.87x**; EV/FY26E mid $3.0bn **0.65x**. EV/EBITDA: FY2025 adj. EBITDA $19.5m → **~100x**; TTM EBITDA **negative** after 9-mo FY26 −$90.8m → **NM**. Analyst count **21**, consensus **Hold**, mean PT **$16.33** (stockanalysis.com, third party, 2026-09-02 search). |
| Keyword freq | **not independently counted.** |
| Short interest | FINRA settlement **2026-08-14:** **25,445,491** shares short, **13.88% of float** (MarketBeat; +13.9% vs 7/31), days-to-cover **2.7**, ADV used **8.02m**. Stockanalysis also prints **28.60% of float** — **inconsistent third-party float definitions; use the 25.45m share count from FINRA via MarketBeat**. |
| Priced-in score | **4 / 5 as a storage vehicle; 2 / 5 as a quality compounder.** Inputs: (i) 100% storage so the equity *is* the theme; (ii) $6.4bn backlog and $850m data-center awards are visible; (iii) GM 5.1% and guide to −$10m adj. EBITDA midpoint mean 2026 earnings are **not** priced as a boom; (iv) short 14% of float; (v) AES/Siemens still control. The stock can re-rate on FY2027 deliveries without the *existence* of storage demand being the debate. |
| Options / converts / ADV | **$400m 2.25% converts due 2030** (primary). Capped calls as above. LEAP IV **not in the record**. 2026-09-01 volume 4.39m vs ~8m ADV (third party). |
| Primary URLs | FY2025 10-K: https://www.sec.gov/Archives/edgar/data/1868941/000186894125000081/flnc-20250930.htm (filed 2025-11-25). Q3 FY2026 8-K exhibit: https://www.sec.gov/Archives/edgar/data/1868941/000186894126000028/flncq3fy26earningspressrel.htm (2026-08-05). |

---

### 3.2 Tesla, Inc. — **TSLA** (Nasdaq GS)

| Field | Record |
|---|---|
| Name / ticker / exchange | Tesla, Inc.; **TSLA**; Nasdaq. FY ends 31 Dec. |
| Price / mkt cap | **$356.09** close 2026-09-01. CNBC market cap **$1,406.4bn**. Session volume **36.0m**. |
| **Must-split: Energy vs Auto** | **Two reportable segments** (10-K FY2025): (i) automotive (includes services & other); (ii) **energy generation and storage**. Energy = “sales, leasing, and financing of energy generation and storage products, services related to such products and sales of energy generation incentives.” **Megapack vs Powerwall vs solar $ split is not disclosed.** |
| FY2025 energy (10-K / Ex. 99.1) | Energy revenue **$12,771m** (2024 **$10,086m**, 2023 **$6,035m**). Energy COGS **$8,969m**. Energy GP **$3,802m**. Energy GM **29.8%** (2024 **26.2%**, 2023 **18.9%**) — **company 10-K table**. Auto revenue **$82,056m** segment / **$69,526m** “total automotive revenues” in Ex.99.1 (services sit in auto segment in 10-K, in a third line in the shareholder letter). Total company rev **$94,827m**. **Energy = 12,771 / 94,827 = 13.5% of total revenue (derived).** Storage deployed **46.7 GWh** (2024 31.4; 2023 14.7). Megafactory CA **40 GWh**, Shanghai **40 GWh** (letter YE2025); Q2 2026 letter restates Shanghai Megapack **20 GWh** — **company changed the capacity table; do not reconcile without the 10-Q footnote.** |
| 2026 YTD | Q1 energy rev **$2,408m** (−12% YoY); Q2 **$3,139m** (+13%). H1 energy **$5,547m** vs $5,519m. Q2 energy GP **$640m**, GM **derived 640/3,139 = 20.4%** (vs 30.3% in Q2 2025). H1 energy GP **$1,592m**, GM **28.7%**. Q2 2026 letter: “increase in energy warranty-related charges due to vendor cell issue.” Storage deployed Q2 **13.5 GWh** (+41% vs 9.6); Q1 **8.8 GWh**. Megapack 3 / Megablock SOP “this year” at Megafactory Texas; Shanghai Megafactory “record deployments.” SpaceX bought Megapacks: **$318m** revenue in Q2 2026 / **$405m** H1 (related party, 10-Q). |
| Auto vs energy | FY2025 auto letter-line **$69,526m** (−10%); energy **+27%**. Q2 2026 auto **$20,516m** (+23%); energy +13%. Energy is the **faster-growing hardware line** but **not** the P&L that prices TSLA (FSD/Robotaxi/Optimus dominate the letter). |
| GM trend 3 years (energy segment, 10-K) | 2023 **18.9%** → 2024 **26.2%** → 2025 **29.8%** → Q2 2026 **20.4%** (warranty). **Company numbers.** |
| Customer concentration | **2026-06-30:** “no entity represented 10% or more of our total receivables.” Energy **customer % of energy revenue: not in the record.** Related-party SpaceX Megapack as above. |
| Net cash | **2026-06-30:** cash + ST investments **$43,524m**; current debt **$1,418m** + LT debt **$7,924m**; of which **non-recourse $9,059m**, **recourse $2m**. **Derived net cash ≈ $43.5bn − $9.3bn = $34.2bn** (most debt is vehicle/energy product financing). |
| Founder-led / founded | **CEO-led (Elon Musk)**; 10-K: “highly dependent on the services of Elon Musk.” Founded year **not extracted from the 10-K body this pass** (commonly 2003 — **not in the record of pages searched**). Core business: 10-K now frames the company as “AI into the real world” using auto + energy as the installed base. Energy has been a segment for years; **Megapack is constant, the equity story is not.** |
| Insider ownership | **not in the record** of the 10-K pages searched (no 13D % extracted). 2025 CEO Performance Award is in the 10-K risk factors. |
| Next 3 dated catalysts | 1) **Megapack 3 / Megablock volume production 2026** (outlook, Q2 letter 2026-07-22). 2) **Q3 2026 earnings** (cadence: last call 2026-07-22; next typically late Oct — **date not in the record**). 3) **LFP Nevada “early ramp” 7 GWh** and Houston Megafactory commissioning (capacity table 2026-06-30). |
| Why this row exists | Largest Western **vertically integrated** Megapack OEM. Energy is **13.5% of FY2025 sales** and **~22% of FY2025 gross profit** (3,802 / 17,094, derived from letter total GP). The stock is **not** a storage vehicle. |
| EV/sales, EV/EBITDA | Mkt cap $1,406bn / FY2025 sales $94.8bn = **14.8x** (equity/sales). Adj. EBITDA FY2025 **$14,596m** → **~96x**. TTM adj. EBITDA Q2 2026 **$15,322m**. Energy stub EV/sales **cannot be observed**. Analyst count **not in the record** this pass (search snippet “~61” is third party, unverified). |
| Keyword freq | **not independently counted.** Q2 2026 letter discusses Megapack/Megafactory/energy storage at length; auto/AI still dominate page count. |
| Short interest | FINRA **2026-08-14:** **69,196,896** shares, **2.19% of float**, DTC **2.15**, ADV ~32–34m (MarketBeat / shortinteresthistory.com). |
| Priced-in score **as storage** | **1 / 5.** Inputs: energy is 13.5% of sales; multiple is an AI/auto multiple; Megapack 3 is known; Q2 energy GM already rolled over on warranty. **Do not buy TSLA to express grid storage.** |
| Options / converts | Recourse debt **$2m**. Converts: **not in the record** as outstanding. IV **not in the record**. |
| Primary URLs | FY2025 10-K: https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm . FY2025 Ex.99.1: https://www.sec.gov/Archives/edgar/data/1318605/000162828026003837/exhibit991.htm . Q2 2026 10-Q: https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm . Q2 Ex.99.1: https://www.sec.gov/Archives/edgar/data/1318605/000162828026049213/exhibit991.htm . |

**Tesla energy vs auto (filing table, $ millions)**

| Period | Energy rev | Energy GP | Energy GM | Auto-letter rev | Company rev | Energy % sales (derived) |
|---|---|---|---|---|---|---|
| FY2023 | 6,035 | 1,141 | 18.9% | 82,419 | 96,773 | 6.2% |
| FY2024 | 10,086 | 2,640 | 26.2% | 77,070 | 97,690 | 10.3% |
| FY2025 | 12,771 | 3,802 | 29.8% | 69,526 | 94,827 | 13.5% |
| Q2 2026 | 3,139 | 640 | 20.4% | 20,516 | 28,236 | 11.1% |
| H1 2026 | 5,547 | 1,592 | 28.7% | 36,750 | 50,623 | 11.0% |

---

### 3.3 Contemporary Amperex Technology Co., Limited — **300750.SZ / 3750.HK**

| Field | Record |
|---|---|
| Name / ticker / exchange | CATL; **300750** Shenzhen ChiNext (CNY); **3750** HKEX Main Board (HKD), listed **2025-05-20** at HKD 263 (company newswire). |
| Price | **CNY 348.29** (SHZ), **HKD 564.5** (HKG), Yahoo 2026-09-02. USD market cap **third party:** MarketCapWatch **$257.09bn as of 2026-08-30** (4.6bn shares); MarketCapOf **$230.43bn** “as of September 2026.” **Do not treat these as a filing. Range only.** |
| Stationary vs EV | **Disclosed, 2025 annual report (RMB ’000):** EV batteries **316,506,369** = **74.70%** of rev, +25.08% YoY. **ESS batteries 62,439,820 = 14.74%**, +8.99% YoY (2024 ESS was **15.83%** of mix). Total op. rev **RMB 423,702m**, +17.04%. ESS GWh **121**, +29.13%; EV GWh **541**. System-integration shipments “+160%,” “>70 projects” — **company.** |
| ESS GM | **26.71%** (2025) vs **26.84%** (2024). EV GM **23.84%** vs 23.94%. Group GM **26.27%** vs 24.44%. **Filing.** |
| Growth | ESS **revenue** +9% vs **GWh** +29% → **ASP down** (derived). Company: SNE global ESS shipments +79% — CATL undergrew the market in GWh terms (121 vs 550 implied share **22% derived** if SNE is used; company also cites **30.4%** shipment share in 36Kr secondary — **use CATL’s own 121 GWh and SNE 550 GWh; 30.4% is not in the English extract searched**). |
| GM 3y | 2025 and 2024 as above. **2023 ESS GM not extracted this pass.** |
| Customer concentration | **not in the record** of pages searched. |
| Net cash | **not extracted** from the 9k-line PDF this pass. |
| Founder-led | **Yes.** Zeng Yuqun (Robin Zeng), founder **Dec 2011**, Chairman + GM (combined roles; CG Code C.2.1 deviation disclosed). Age 57 in the report. Core: power + ESS batteries from inception; Na-ion added to the portfolio (Naxtra, TENER Stack 9 MWh). |
| Insider ownership | Zeng dividend mention in secondary press **not used**. Filing ownership table **not extracted**. |
| Next 3 dated catalysts | 1) **Na-ion TENER** company timeline in secondary (Munich 2026-06-22 event; China deliveries “Sep 2026”) — **treat as company-event reporting, not audited**. 2) Next earnings: MarketCapWatch “2026-10-20” — **third party**. 3) Overseas factory + TENER Stack ramp (ongoing, no single date in extract). |
| Why this row exists | **Largest ESS cell vendor.** LFP cost curve is CATL’s. Dual-use is explicit. Na-ion is here, not in a pure-play. |
| Multiples / short / options | **not in the record** on US FINRA. Analyst count **not in the record**. |
| Priced-in as storage | **3 / 5.** ESS is 15% of sales, growing slower than EV in RMB; the A-share is still an EV-battery compounder. Storage is **known but not the multiple.** |
| Primary URL | https://www.catl.com/en/uploads/1/file/public/202603/20260310105310_46xjbwckvn.pdf (2025 annual report English). HK listing PR: https://www.newswire.ca/news-releases/catl-announces-listing-on-hkex-to-power-global-zero-carbon-economy-890703077.html |

---

### 3.4 BYD Company Limited — **1211.HK**

| Field | Record |
|---|---|
| Ticker / exchange | **1211.HK** (Yahoo last **HKD 85.25**, 2026-09-02). A-share ticker **not pulled this pass**. |
| Mkt cap | **not in the record** (no CNBC field). |
| Stationary vs EV | **BYD does not separately disclose BESS revenue in the FY2025 annual-report summaries reviewed.** Auto **RMB 648.6bn = 80.7%** of **RMB 804.0bn** total (+3.5% YoY); handset components **19.3%**. **Company (secondary extract of annual report).** ESS $ **not in the record**. |
| Shipments | Third-party (Benchmark Mineral Intelligence via Electrek/Axis Intelligence): **BYD >60 GWh BESS 2025, #1 integrator share 13%**; Tesla 46.7 GWh (matches Tesla letter). **Not a BYD filing.** |
| GM / concentration / net cash / insider / catalysts | **not in the record** of filings fetched. |
| Founder-led | Wang Chuanfu — **not confirmed in a filing this pass**. |
| Why this row exists | Blade LFP + vertical ESS. **Cannot score exposure without a segment line.** Treat as **auto that also ships storage**, not a storage equity. |
| Priced-in as storage | **1 / 5** — storage is a rounding error in the disclosed mix. |

---

### 3.5 EVE Energy Co., Ltd. — **300014.SZ**

| Field | Record |
|---|---|
| Ticker | **300014.SZ**; Yahoo **CNY 51.05** (2026-09-02). Founded **2001**, Huizhou (directory; confirm in SZSE report). |
| Stationary vs EV | **Disclosed (2025 annual report as reported by EnergyTrend 2026-03-30 and BESS Manufacturers extract):** total rev **RMB 61.47bn** (+26.44%). **ESS battery revenue RMB 24.44bn = 39.76% of total**, +28.45% YoY. ESS GWh **71.05**, +40.84%. Power-battery GWh **50.15**, +65.56%. ESS GM **12.28%**, −2.44 ppt YoY. Group GM **16.17%**. Net profit attrib. **RMB 4.134bn**. **Primary SZSE PDF not fetched this pass — figures are from contemporaneous Chinese-report writeups. Flag as secondary pending SZSE file.** |
| Customers | Report names Wärtsilä, ABB, Delta, China Mobile, Southern Power Grid, Wotan Energy. Top five **26.41%** of revenue; largest single customer **not in the snippet**. |
| Why this row exists | **Highest ESS revenue mix of the large cell names that disclose it (≈40% vs CATL 15%).** #2 ESS cell shipper vs CATL on EVTank (third party). |
| Priced-in as storage | **2 / 5** if the A-share still trades as a power-battery name. **This is shortlist candidate #1.** |
| Other template fields | Mkt cap, net cash, founder, 3y GM, converts, short, IV: **not in the record**. |

---

### 3.6 LG Energy Solution — **373220.KS**

| Field | Record |
|---|---|
| Ticker | **373220.KS**; Yahoo **KRW 347,500** (2026-09-02). |
| FY2025 (company PR 2026-01-29) | Consol. rev **KRW 23.7tn**, −7.6%. OP **KRW 1.3tn**, +133.9%, margin **5.7% including NA production incentive**. CFO Chang Sil Lee: “solid growth in ESS sales” as LFP capacity expanded in NA; total rev down on EV. **ESS revenue +40% YoY** (Business Report). EV battery shipments **−10%+**. ESS order backlog **>140 GWh**, +160%+ vs prior year. 46-series backlog **>300 GWh**. **ESS % of total revenue: not disclosed.** |
| 2026 plan (company) | New ESS orders **>90 GWh**; ESS capacity **>60 GWh**, **>80% in North America** (Holland + Lansing + temporary use of Stellantis/Honda JV lines). Mid-teen to 20% consol. rev growth. Capex **−40%+**. Sodium and all-solid-state: “pilot… commercial production” language — **not a 2026 volume guide**. |
| Why this row exists | **Only non-Chinese LFP ESS producer of scale in North America** (company claim). Reallocation of idle EV lines into ESS is the dual-use thesis in one ticker. |
| Priced-in as storage | **2 / 5.** Market still an EV-battery stock; ESS % unknown. 140 GWh backlog is large vs FLNC’s GW-not-GWh backlog. |
| Other fields | GM 3y ESS, customers, net cash, founder (spun from LG Chem 2020 — **year not in PR**), short: **not in the record**. |
| Primary URL | https://news.lgensol.com/company-news/press-releases/4550/ ; Business Report PDF https://www.lgensol.com/upload/file/download/2025_LGES_Business_Report.pdf |

---

### 3.7 Samsung SDI — **006400.KS**

| Field | Record |
|---|---|
| Ticker | **006400.KS**; Yahoo **KRW 538,000**. |
| Stationary vs EV | **ESS not broken out.** Energy Solutions (EV + ESS + small Li-ion) **KRW 12.38tn**, −21.1%, **93.3%** of group; OP **KRW (1.85)tn** vs +218bn FY2024. Group GM **11.0%** vs 18.6%. **BESS Manufacturers extract of FY2025 results — SZ/KR filing not fetched.** |
| Why this row exists | Incumbent ESS cell supplier to integrators. **Cannot size stationary exposure.** |
| Priced-in as storage | **1 / 5.** Loss-making EV battery story. |

---

### 3.8 Sungrow Power Supply — **300274.SZ**

| Field | Record |
|---|---|
| Ticker | **300274.SZ**; Yahoo **CNY 86.40**. |
| Stationary / inverter split | **2025 annual report (EnergyTrend 2026-04-01; BESS Manufacturers citing p.32/34):** total rev **RMB 89.184bn**, +14.55%. NI **RMB 13.461bn**, +21.97%. **ESS revenue RMB 37.287bn = 41.81%**, +49.39%, ESS GM **36.49%** (−0.20 ppt). PV inverter/power-electronics **RMB 31.14bn = 34.91%**. Overseas **60.54%**. ESS shipped **43 GWh** (company). Group GM **31.83%**. |
| Why this row exists | **Inverter + ESS stack.** ESS is now the **largest disclosed revenue pillar**. GM 36% on ESS is a different business than Fluence’s 5–13% integrator GM (Sungrow captures PCS + integration + China cost). |
| Priced-in as storage | **3 / 5** in China (known); **2 / 5** in a US-centric map. **Shortlist candidate #2.** |
| Other template fields | **not in the record** this pass (SZSE full book not fetched). |

---

### 3.9 Wärtsilä Oyj Abp — **WRT1V.HE**

| Field | Record |
|---|---|
| Ticker | **WRT1V.HE**; Yahoo **EUR 28.27**. |
| Storage exposure | **2025:** Energy Storage **net sales EUR 694m = 10.0%** of group **EUR 6,914m**; OP **EUR 23m = 3.3%** margin; order book **EUR 719m**. Organic storage sales **−11%**. Group comparable OP margin **12.0%**. **Company 2025 annual report + 2026-06-15 inside information.** |
| Strategic action | **2026-06-15:** JV for global Energy Storage with **RCT Solutions GmbH**; Energy Storage **ceases as a reporting segment** in Q2 2026; ~480 employees; net assets **<5%** of group. Targets for the segment discontinued. |
| Why this row exists | European integrator analog to Fluence; **tariff/FEOC headwind**; **exiting via JV** rather than doubling down. |
| Priced-in as storage | **1 / 5** going forward — storage is being deconsolidated. |
| Primary URL | https://www.wartsila.com/media/news/15-06-2026-inside-information-wartsila-to-establish-a-joint-venture-for-its-global-energy-storage-business-with-rct-solutions-gmbh-and-discontinue-energy-storage-as-a-separate-reporting-segment-3763438 |

---

### 3.10 Eos Energy Enterprises — **EOSE** (Nasdaq CM)

| Field | Record |
|---|---|
| Ticker | **EOSE**; **$3.04** close 2026-09-01; CNBC mkt cap **$1.107bn**; session volume **13.5m**. |
| Exposure | **100% zinc-based BESS** (Znyth / Z3). Not Li, not EV dual-use. LDES 4–12h positioning. **FY2025 10-K.** |
| FY2025 | Rev **$114.2m** vs **$15.6m** (≈7.3×). COGS **$258.0m**. GP **$(143.8)m**. Two customers **51.5% and 18.8%** of rev (2024: 50.6% and 33.2%). Cash **$568.0m** vs $74.3m. LT debt **$662.5m** + related-party notes **$150.4m** + warrant liabilities **$784m** combined. **Deeply insolvent on book equity** (liabilities $1.76bn vs assets $0.89bn). Backlog ~**$701m** (shareholder letter in AR proof). IRA 45X PTC reduced COGS **$21.3m** in 2025. |
| GM trend | Gross **loss** throughout. Not a 3-year margin expansion story. |
| Why this row exists | US-made non-flammable chemistry; safety/insurance **narrative**. Not LFP. Customer concentration **extreme**. |
| Priced-in | **3 / 5 as a lottery ticket** (mkt cap > FY2025 sales despite negative GP). Not a quality storage compounder. |
| Primary URL | 10-K index 0001628280-26-011961; IR: https://investors.eose.com/news-releases/news-release-details/eos-energy-enterprises-reports-fourth-quarter-and-full-year-2025 |

---

### 3.11 Enphase Energy — **ENPH** (Nasdaq GM)

| Field | Record |
|---|---|
| Ticker | **ENPH**; **$35.54** close 2026-09-01; CNBC mkt cap **$4.696bn**. |
| Exposure | **Residential / small C&I IQ Battery**, not utility BESS. **Single segment.** FY2025 net rev **$1,473.0m** (+11%); GM **46.6%** (2024 47.3%, 2023 from GP $1,058m / $2,291m = **46.2% derived**). IQ Battery shipments **706.1 MWh** vs **521 MWh** (+36%); microinverters **6.4m** units vs 6.5m. One customer **39% / 48% / 40%** of rev (2025/24/23). US **81%** of 2025 rev. LFP cells “exclusively by two vendors located in China.” AMPTC **$238.7m** in 2025 vs $157.5m. |
| Storage % of $ | **not disclosed.** Volume mix shifted toward batteries (company: revenue growth “driven primarily by” +36% battery MWh). **Estimate with reasoning:** batteries are material and growing; **cannot put a % without ASP.** Do not invent. |
| Why this row exists | Behind-the-meter LFP packs + inverters. **Not the 20 GWh utility print.** SEIA residential Q2 was **657 MWh** US — Enphase is in that puddle, not the 17.9 GWh utility ocean. |
| Priced-in as *grid* storage | **1 / 5.** |
| Primary URL | https://www.sec.gov/Archives/edgar/data/1463101/000146310126000030/annualreport2025.pdf (FY2025 10-K, filed 2026-02). |

---

### 3.12 NextEra Energy — **NEE** (NYSE)

| Field | Record |
|---|---|
| Ticker | **NEE**; **$82.93** close 2026-09-01; CNBC mkt cap **$173.0bn**. |
| Storage exposure | **IPP / owner-operator, not OEM.** NEER net generating capacity **37,505 MW** YE2025; **net storage ownership 5,177 MW** in 18 US states + 1 Canadian province; **+1,799 MW** in 2025. Sells “long-term power sales and **battery storage tolling agreements**.” **Storage % of NEE consolidated revenue: not in the record** of pages searched. 5,177 / (37,505 + 5,177) = **12.1% of NEER MW capacity (derived, mixed MW basis).** |
| Why this row exists | **Demand side of the map** — the buyer of Fluence/Tesla/Sungrow kits as **firm capacity**. |
| Priced-in as storage OEM | **n/a.** Priced as regulated utility + renewables IPP. |
| Primary URL | https://www.sec.gov/Archives/edgar/data/753308/000075330826000015/nee-20251231.htm |

---

### 3.13 The AES Corporation — **AES** (NYSE)

| Field | Record |
|---|---|
| Ticker | **AES**; **$14.77** close 2026-09-01; CNBC mkt cap **$10.54bn**. |
| Storage exposure | **(1) Fluence founder / 22.48% 13G economic (May 2026), 66.6% Fluence vote via B-1 at FY2025.** **(2) Related-party customer:** 24% of Fluence FY2025 revenue. **(3) Own generation/storage fleet** — MW **not extracted** from AES 10-K this pass. **AES storage revenue %: not in the record.** |
| Why this row exists | Dual exposure: **captive integrator economics + offtaker**. Fluence mark-to-market is a non-trivial AES asset ($1.92bn × 22% ≈ **$0.43bn derived** vs AES mkt cap $10.5bn ≈ 4%). |
| Priced-in as storage | **2 / 5.** AES trades as a leveraged IPP/utility, not FLNC. |

---

### 3.14 Other public names (thinner files)

**Stem, Inc. (STEM).** Yahoo **$5.49** (2026-09-01), volume **76k** (illiquid vs history). Software/storage services. **Full 10-K not fetched this pass.** Surviving small-cap integrator/software analog post-Powin. **Do not size.**

**Energy Vault (NRGV).** **$3.27** close 2026-09-01. Q2 2026 PR: pivoting to **AI power campuses** (Caterpillar gas + BESS; Crusoe; Japan 850 MW BESS portfolio acquired May 2026). **No longer a gravity-storage story.** Rev Q2 figures in PR HTML not fully parsed. Treat as **developer/EPC hybrid**, not a cell/integrator pure-play.

**Quanta (PWR)** **$611.39**; **MYR Group (MYRG)** **$286.46**. Interconnection/EPC. Storage mix **not in the record**.

**Halma / Firetrace.** Firetrace is a Halma company (halma.com/our-companies/firetrace; firetrace.com: “owned and operated by Halma plc”). BESS is one of several verticals (wind, electrical infrastructure). **BESS % of Halma: not in the record.** No pure-play.

---

## 4. Shortlist — at most 3 *unappreciated* names

**Excluded by construction:** **FLNC** is already a storage equity (score 4/5 priced-in as the theme; the debate is execution/GM, not whether storage exists). **TSLA** Megapack is famous and still a **minority** of sales (13.5%) and of the equity narrative (Robotaxi/FSD).

| Rank | Name | Why unappreciated | What would make it fail | Score vs “storage is the business” |
|---|---|---|---|---|
| **1** | **EVE Energy 300014.SZ** | ESS is **~40% of revenue** and **71 GWh** — closer to a storage cell company than CATL (15% / 121 GWh but EV-dominated). US coverage is thin vs CATL/LGES. GM 12% on ESS is the **ASP-down** reality, not a secret boom. | China ESS policy (mandatory allocation cancelled — CATL 10-K discussion of Document 136); further GM compression; US FEOC blocking EVE cells. | 4/5 storage, 2/5 “already in every US SMID book” |
| **2** | **Sungrow 300274.SZ** | ESS **42% of sales**, **36% ESS GM**, **43 GWh** shipped, inverter attached. Competes with Tesla/Fluence on **kits**, not cells. US investors still file it under “solar inverter.” | EU/US AD/CVD or FEOC on Chinese PCS; GM mean-reversion toward Fluence-like integrator tightness as Western content rules bite. | 4/5 storage mix, 3/5 known in China |
| **3** | **LG Energy Solution 373220.KS** | **Only scaled non-China LFP ESS in North America** (company). 140 GWh ESS backlog; idle EV lines being **reallocated**. If US grid storage is a **reliability procurement** (SEIA/EIA), LGES is the **domestic-content cell** expression, not Fluence’s CM risk. | ESS % of sales never disclosed and stays small; IRA/OBBBA domestic-content rules change; JV partners block line conversion. | 2/5 disclosed mix, 2/5 priced as ESS |

**Not #3:** Tesla energy stub — theoretically 13.5% of a $1.4tn stock is a large notional (~$190bn **derived**), but **you cannot buy the stub**. **AES** is a messy Fluence + IPP bundle. **EOSE** is a zinc option, not LFP-from-EV.

---

## 5. Bear case, analog, kill criteria

### 5.1 Bear case (equipment, not the grid)

1. **ASP deflation > volume.** CATL ESS GWh +29%, RMB +9%. Fluence FY2025: volume flat, revenue −16% on “lower average price per GWh.” Tesla Q2 2026: Megapack deployments up, **ASP per unit down**. BNEF turnkey −31% in 2025. **The grid can boom in GWh while OEM sales and GM fall.**
2. **Integrator working-capital death.** Powin Chapter 11 (Jun 2025). Fluence FCF **−$160m** FY2025; cash **$691m → $339m** in nine months; converts **$400m**. Wärtsilä **JV-ing out** storage after −11% organic sales and 3.3% OP. Stem illiquid.
3. **2022–23 margin analog repeating.** Fluence GAAP GM **(5.2)% FY2022 → 6.4% FY2023 → 13% FY2025 → 5.1% Q3 FY2026**. Tesla energy GM 29.8% FY2025 → **20.4% Q2 2026** on vendor cell warranty. EVE ESS GM **−244 bp**. Sungrow ESS GM only −20 bp — **China cost leaders hold GM; Western integrators do not.**
4. **Policy/tariff/FEOC.** Fluence, Wärtsilä, Enphase, Tesla 10-Ks all flag OBBBA / FEOC / tariffs. Tesla: “current tariff regime will have a relatively larger impact on our energy generation and storage business compared to our automotive business.” US BNEF turnkey **$219/kWh vs China $73**.
5. **Concentration.** Fluence top-2 **41%**, AES **24%**. Eos **51.5% + 18.8%**. Enphase **39%**. Integrators are project businesses.

### 5.2 Analog set

| Analog | Date | Lesson |
|---|---|---|
| Fluence FY2022 GM **(5.2)%** | FY2022 | Battery inflation + commissioning failures. |
| Powin Ch.11 | **2025-06-10** filed | Private integrator with $100–500m assets/liabilities; warranty/services split-off. |
| Wärtsilä storage JV | **2026-06-15** | Scaled European name **exits** rather than scale into US FEOC. |
| Natron Energy shutdown | **2025-09** (secondary) | Na-ion startup funding analog — **no public residual**. |
| Tesla energy warranty Q2 2026 | Q2 2026 | Cell vendor quality hits the **OEM with the best GM**. |

### 5.3 Kill criteria (dated)

User-specified: *“thesis kill: 2027 installs fall short of planned 24 GW.”*

**Map to the record:**

- EIA **February 2026** planned **24 GW** of US utility-scale **battery additions in calendar 2026** (Today in Energy id=67205).
- EIA **August 2026** vintage: operators plan **26 GW in 2027**, 14 GW in 2H 2026, 14 GW in 2028 (id=67925).
- SEIA/Benchmark **2026-09-01:** **71 GWh** US 2026 (all segments); Q2 alone **20.2 GWh / ~6.7 GW**.

**Kill the “storage is the fastest-growing grid asset” *volume* thesis if:**

| Gate | Metric | Source | Date to check | Fail if |
|---|---|---|---|---|
| **K1** | US utility-scale **2026** additions | EIA inventory YE2026 vs 43.6 GW YE2025 | **2027-02 EIA Today in Energy / 860M** | Net adds **< 18 GW** (~75% of the Feb-2026 24 GW plan) |
| **K2** | US **2027** additions | EIA planned **26 GW** (Aug 2026 vintage) | **2028-02** | Adds **< 18 GW** (same 75% haircut). *If using the user’s 24 GW line as the 2027 plan, fail < 18 GW vs 24.* |
| **K3** | SEIA 2026 GWh | 71 GWh forecast | ESMO Q1 2027 | 2026 installs **< 50 GWh** |
| **K4** | Fluence FY2027 deliveries | $2.2bn of backlog “expected to convert in FY27” (Q3 2026 call) | **FY2027 10-K (~Nov 2027)** | FY2027 revenue **< $2.5bn** *and* GAAP GM **< 8%** (re-Powin path) |
| **K5** | Tesla energy | Megapack 3 SOP 2026 | FY2026 10-K (~Jan 2027) | Energy deployments **< 40 GWh** (below FY2025 46.7 — capacity not converting) |
| **K6** | Cost thesis | BNEF next cost survey | ~Dec 2026 | US turnkey **up YoY** *and* China-US gap **widens** (policy, not learning-curve) |

**Do not kill** on FLNC GM alone — that is an integrator kill, not a grid-asset kill. **Do not kill** on TSLA multiple — that is an AI stock.

---

## 6. Relative value — $/kWh and equity multiples

### 6.1 Physical $/kWh (dated)

See §1.4. Working stack for **2025–26 US utility 4-hour:**

- Cell/pack (BNEF stationary 2025): **~$70/kWh** global pack.
- Turnkey equipment US (BNEF 2025): **$219/kWh**.
- NREL overnight all-in 2024$: **$334/kWh** (includes BOS, integrator profit, interconnection-ish bottom-up — **not** the same as BNEF turnkey).
- Tesla blended energy ASP derived **$273/kWh FY2025 → $232/kWh Q2 2026** (solar+Powerwall+Megapack; falling).

**2022–2026 trend:** one-way down except the **2022 cell spike** Fluence documented. 2025 was a **crash year** (−31% BNEF turnkey). 2026 US may **not** follow China ($73) because of FEOC/tariffs — that is the Fluence/Wärtsilä/LGES fork.

### 6.2 Equity (derived, 2026-09-01/02)

| Name | Mkt cap | FY2025 sales | Equity/sales | Storage mix (filing) | Notes |
|---|---|---|---|---|---|
| FLNC | $1.92bn | $2.26bn | **0.85x** | ~100% | Trough GM; $6.4bn backlog |
| TSLA | $1,406bn | $94.8bn | **14.8x** | 13.5% energy $ | Energy GM 30% FY2025 |
| EOSE | $1.11bn | $0.114bn | **9.7x** | 100% zinc | Negative GP |
| ENPH | $4.70bn | $1.47bn | **3.2x** | storage $ mix ND; 706 MWh | Residential |
| NEE | $173bn | **not extracted** | — | 5.2 GW owned | IPP |
| AES | $10.5bn | **not extracted** | — | Fluence stub | |
| CATL | ~$230–257bn (3P) | RMB 424bn | **~4x** at 7.1 CNY/USD **illustrative only** | 14.7% ESS $ | |
| Sungrow | **not in the record** | RMB 89bn | — | 41.8% ESS | |
| EVE | **not in the record** | RMB 61bn | — | 39.8% ESS | |
| LGES | **not in the record** | KRW 23.7tn | — | ESS $ % ND; +40% | |
| WRT1V | **not in the record** | EUR 6.91bn | — | 10% storage, JV exit | |

**Relative-value punchline:** the **only cheap liquid US expression of grid Li-ion kits is FLNC at <1x sales**, and it is cheap because **GM and CM execution are broken**. Cell names with **40% ESS mix (EVE, Sungrow)** are the cleaner *business* mix but sit on SZSE with policy/FEOC basis risk. Tesla energy is **high-quality GM** trapped in a 15x sales auto/AI compounder.

---

## 7. Priced-in scores (1–5) — storage demand already in the price

| Ticker | Score | Inputs (dated) |
|---|---|---|
| FLNC | **4** | 100% mix; $6.4bn backlog; 14% short; GM collapse already in the print |
| TSLA | **1** | 13.5% of sales; AI multiple |
| 300750.SZ | **3** | 15% ESS $; #1 share known |
| 1211.HK | **1** | ESS $ not disclosed |
| 300014.SZ | **2** | 40% ESS $ under-followed in US |
| 373220.KS | **2** | ESS $ % hidden; NA LFP known to specialists |
| 006400.KS | **1** | ESS in a loss blob |
| 300274.SZ | **3** | 42% ESS known in CN, less in US |
| WRT1V.HE | **1** | JV exit |
| EOSE | **3** | Speculative premium on $114m sales |
| ENPH | **1** | Residential cycle, not 20 GWh utility |
| NEE | **2** | 5.2 GW owned, utility multiple |
| AES | **2** | Fluence stub not the stock |

---

## 8. Primary source list (access date **2026-09-02**)

1. SEIA Q2 2026 storage: https://seia.org/news/largest-quarter-on-record-for-energy-storage/
2. SEIA ESMO hub: https://seia.org/research-resources/energy-storage-market-outlook/
3. Fluence FY2025 10-K: https://www.sec.gov/Archives/edgar/data/1868941/000186894125000081/flnc-20250930.htm
4. Fluence Q3 FY2026 Ex.99.1: https://www.sec.gov/Archives/edgar/data/1868941/000186894126000028/flncq3fy26earningspressrel.htm
5. Fluence FY2023 earnings exhibit: https://www.sec.gov/Archives/edgar/data/1868941/000186894123000081/flncq4andfullfy23earningsp.htm
6. Tesla FY2025 10-K: https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm
7. Tesla FY2025 Ex.99.1: https://www.sec.gov/Archives/edgar/data/1318605/000162828026003837/exhibit991.htm
8. Tesla Q1 2026 10-Q: https://www.sec.gov/Archives/edgar/data/1318605/000162828026026673/tsla-20260331.htm
9. Tesla Q2 2026 10-Q: https://www.sec.gov/Archives/edgar/data/1318605/000162828026049270/tsla-20260630.htm
10. Tesla Q2 2026 Ex.99.1: https://www.sec.gov/Archives/edgar/data/1318605/000162828026049213/exhibit991.htm
11. CATL 2025 annual report (EN): https://www.catl.com/en/uploads/1/file/public/202603/20260310105310_46xjbwckvn.pdf
12. LGES 2025 results PR: https://news.lgensol.com/company-news/press-releases/4550/
13. LGES 2025 Business Report: https://www.lgensol.com/upload/file/download/2025_LGES_Business_Report.pdf
14. Enphase FY2025 10-K: https://www.sec.gov/Archives/edgar/data/1463101/000146310126000030/annualreport2025.pdf
15. NextEra FY2025 10-K: https://www.sec.gov/Archives/edgar/data/753308/000075330826000015/nee-20251231.htm
16. Eos FY2025 results: https://investors.eose.com/news-releases/news-release-details/eos-energy-enterprises-reports-fourth-quarter-and-full-year-2025
17. Wärtsilä storage JV: https://www.wartsila.com/media/news/15-06-2026-inside-information-wartsila-to-establish-a-joint-venture-for-its-global-energy-storage-business-with-rct-solutions-gmbh-and-discontinue-energy-storage-as-a-separate-reporting-segment-3763438
18. NREL cost 2025: https://docs.nrel.gov/docs/fy25osti/93281.pdf
19. EIA 2026 planned 24 GW: https://www.eia.gov/todayinenergy/detail.php?id=67205
20. EIA capacity/2027 plan: https://www.eia.gov/todayinenergy/detail.php?id=67925
21. Powin: https://www.energy-storage.news/powin-files-for-chapter-11-bankruptcy-protection-and-spins-off-project-services-business/
22. Firetrace/Halma: https://www.halma.com/our-companies/firetrace
23. AES 13G/A Fluence (May 2026): search SEC 0000950103-26-007353
24. BNEF cost survey as reported: https://www.energy-storage.news/battery-storage-system-prices-continue-to-fall-sharply-bnef-and-ember-reports-find/
25. Market prices: Yahoo Finance v8 chart (2026-09-01 closes); CNBC quote pages (mkt cap fields).

---

## 9. Explicit gaps (not in the record)

- Options implied vol, LEAP open interest, 20-day ADV time series (except 2026-09-01 session volume).
- Earnings-call **keyword counts** (Megapack / BESS / energy storage) last 4 vs 8-quarters-earlier.
- BYD, Samsung SDI, Sungrow, EVE, CATL **USD market caps computed from share count × FX in a filing**.
- BYD **ESS revenue line**.
- LGES **ESS % of revenue** (only +40% growth).
- Tesla **Megapack vs Powerwall vs solar** dollar split; Tesla **insider %**.
- Fluence **DEF 14A** management ownership (control is the AES/Siemens/QIA group).
- Halma **HLMA** last price (Yahoo `HALMA.L` miss).
- Insurance-adjacent **public pure-plays** (none found).
- Interconnection **software** public pure-plays (none found).
- 2026 **BNEF** cost survey (2025 survey is the latest printed).
- EIA HTML for id=67925 (one fetch timeout; used EIA text as syndicated).

---

*End of memo. Access date 2026-09-02. Do not update numbers without a new primary source.*
