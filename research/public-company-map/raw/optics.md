# Public-company map: copper → light / co-packaged optics (CPO)

**Research date:** 2026-09-02  
**Access date for all URLs below:** 2026-09-02 unless a filing date is stated.  
**Rule:** no invented tickers, percentages, or quotes. Company statements vs. third-party estimates are labeled. If a datum is not in the sources accessed, it is written **not in the record**.

**Market-data convention:** U.S. and most international quotes are Yahoo Finance **close 2026-09-01** (U.S. markets closed for Labor Day; this is the last full U.S. session before 2026-09-02). Shenzhen and Tokyo closes are 2026-09-02 local session. Yahoo key-statistics (EV, short interest, insider %, ADV) are as published on the same access date; short-interest snapshot date is **2026-08-14** (Yahoo/Morningstar). Yahoo quote-page market cap and key-statistics “Current” market cap sometimes differ by a few percent; **quote-page close market cap is used as the headline figure**.

**FX (for converting Asia names only):** PBOC USD/CNY midpoint **6.7829** on 2026-09-02 ([PBOC/CFETS via China News](https://www.chinanews.com.cn/cj/2026/09-02/10688420.shtml)). USD/JPY **not independently verified from a Fed/BOJ primary print** in this pass; JPY market caps are therefore left in yen, with a rough USD figure only as an unlabeled conversion using ~160 JPY/USD implied by the PBOC JPY/CNY cross of 4.2218 per 100 yen on the same day’s midpoint table. Treat USD figures for TSE names as **approximate**.

---

## 0. Thesis check (CPO share of AI datacenter optics)

**Starter claim to verify:** “CPO is about 0.5% of AI data-center optical modules in 2026, projected toward ~35% by 2030.”

**What is in the record**

- **TrendForce, 15 Jun 2026 (company/research-house statement, not a filing):** CPO **and** NPO markets together “from around US$100 million in 2025 to over $39 billion by 2030.” Pluggable optical transceivers “nearly $26 billion in 2030.” Source: [TrendForce press center](https://www.trendforce.com/presscenter/news/20260615-13098.html).  
  This is a **dollar-market** forecast for CPO+NPO combined, **not** a 2026 unit-share of AI modules.
- **TrendForce, 27 Jul 2026:** NVIDIA has begun shipping next-generation Spectrum-X CPO switches to select partners; Broadcom continues limited shipments of 51.2T Bailly CPO; “official transition of co-packaged optics (CPO) into the mass production phase.” Optical-engine yield, SiPh wafers, and advanced packaging named as bottlenecks. [TrendForce](https://www.trendforce.com/presscenter/news/20260727-13151.html).
- **Secondary chart (TrendForce Mar 2026, as reproduced):** A Dataquest/Facebook post and an IO Fund note (Beth Kindig, 8 May 2026) reproduce a TrendForce chart labeled CPO penetration in AI data centers: **0.55% in 2026F** and **35.74% in 2030F** (alongside 0.05% in 2025). That chart was **not fetched as a primary TrendForce PDF** in this pass. Treat **0.5% / ~35%** as **a third-party estimate attributed to TrendForce March 2026**, not as a company filing number. Sources: [IO Fund](https://io-fund.com/ai-stocks/nvidia-4b-optical-strategy-cpo-ai-data-centers); Dataquest Facebook post of the same chart.

**Distinction:** TrendForce June 2026 dollars (CPO+NPO $100m → $39bn) and the March 2026 **unit penetration** chart (0.55% → 35.74%) are different series. Neither is a 10-K line item.

**NVIDIA company statement (not a share %):** Spectrum-X Ethernet Photonics “now in full production,” “world’s first 200Gb/s SerDes Ethernet switch with co-packaged optics,” first adopters CoreWeave, Lambda, Oracle Cloud Infrastructure. Claims vs pluggables: “5x better power efficiency, 5x longer AI uptime and 1.3x faster time to deploy.” Named supply chain: TSMC (SiPh fab), SPIL (chip-scale packaging/test), TFC (laser modules), Foxconn (system assembly). [NVIDIA Blog, GTC Taipei / COMPUTEX 2026](https://blogs.nvidia.com/blog/nvidia-gtc-taipei-computex-2026-news/). Lumentum is named as laser-chip fabrication in multiple secondary recaps of the same campaign; **Lumentum is not named in the NVIDIA blog excerpt fetched here**—Lumentum’s own 8-K/earnings (below) are the company-side confirmation of CPO laser/ELS work.

---

## 1. Layer map

| Layer | Public names in this file | Role in CPO / copper-to-light | Pure-play? |
| --- | --- | --- | --- |
| **Switch / accelerator vendors** | NVIDIA (NVDA), Broadcom (AVGO), Marvell (MRVL) | Own the ASIC + (increasingly) the CPO switch SKU. NVIDIA Spectrum-X Photonics in production (company). Broadcom Bailly 51.2T CPO in limited shipments (**TrendForce**, not Broadcom 10-Q breakout). Marvell: Celestial AI Photonic Fabric; CPO revenue **guided**, not current. | **No public CPO-switch pure-play.** NVDA/AVGO/MRVL are diversified semis. |
| **Optical engines, lasers, transceivers** | Lumentum (LITE), Coherent (COHR), Innolight (300308.SZ), Eoptolink (300502.SZ), AAOI, Broadcom (EML/VCSEL/CW — **not broken out**), POET, LWLG | Lasers (EML, CW, ELS), SiPh engines, 800G/1.6T pluggables, CPO/NPO lasers. Innolight/Eoptolink are the volume pluggable names. | Innolight/Eoptolink/AAOI are **datacom-module heavy**, not CPO-only. LITE/COHR still mix telecom + industrial. **No public CPO-engine pure-play at scale.** |
| **Photonics foundry + advanced packaging** | TSMC (TSM / 2330.TW); Fabrinet (FN) as optical EMS/packaging | TSMC COUPE (Compact Universal Photonic Engine) in the 2025 annual report and Q2’26 call. SPIL (ASE 3711.TW) named by NVIDIA for CPO packaging — **not a starter name; not profiled in full below**. | **No public SiPh-foundry pure-play.** TSMC COUPE is a rounding error inside foundry+CoWoS. FN is EMS, not a foundry. |
| **Fiber / connectors / fiber management** | Corning (GLW), Sumitomo Electric (5802.T), Furukawa (5801.T), Fujikura (5803.T) | Fiber, cable, FAUs, connectors, “inside the box” photonics MAP (Corning **company 2030 target**, not current revenue). | **No CPO-connector pure-play.** These are fiber/cable conglomerates (GLW also display glass; Japanese names also auto/energy). |
| **Test and measurement** | *Not in starter list.* VIAV and Keysight appear on Yahoo peer strips for LITE/CIEN/COHR. | Optical/electrical test for engines, lasers, CPO yield. | **No public CPO-test pure-play identified in this pass.** Layer marked empty of a dedicated name. |
| **Copper counter-bet (AECs)** | Credo (CRDO); also Astera Labs (ALAB) on Yahoo peers — not in starter list | Active electrical cables / retimers. Credo acquired DustPhotonics (optical) — **company/third-party**; AEC still the cash engine. | CRDO is the listed AEC leader, **not** a CPO name. |
| **Private (note)** | Ayar Labs; Lightmatter; **Celestial AI is no longer private** (Marvell closed acquisition **2 Feb 2026**, SEC EX-99.1) | Optical I/O / photonic fabric / CPO-adjacent. | Private. |

**Cisco / Arista / AMD** CPO switch SKUs: **not in the record** of filings fetched for this file.

---

## 2. Verified public-company blocks

### 2.1 Broadcom Inc. — AVGO — NasdaqGS

- **Listing today:** Nasdaq Global Select, common AVGO (Yahoo quote page 2026-09-02). Founded **1961** (Yahoo company profile; predecessor HP Associates / Avago lineage — Yahoo says “founded 1961”). **Not founder-led** (CEO Hock Tan). Core business is **not** constant: semis + VMware/infrastructure software after 2023.
- **Price / mkt cap:** $369.68 close 2026-09-01; **mkt cap $1.759T**. ADV ~25.4M sh. [Yahoo AVGO](https://finance.yahoo.com/quote/AVGO/).
- **EV / multiples (Yahoo key-statistics, access 2026-09-02):** EV **$1.81T**; EV/sales **23.95x**; EV/EBITDA **42.65x**. Trailing four printed quarters EV/sales range **17.65–30.02**; EV/EBITDA **34.61–55.97** (table dates 4/30/2025–current). [Yahoo AVGO key-statistics](https://finance.yahoo.com/quote/AVGO/key-statistics/).
- **CPO / datacom optics / SiPh as % of total:** **not in the record as a disclosed %.** 10-Q (quarter ended 1 Feb 2026) does not break out lasers, DSPs, or CPO. Semiconductor Solutions vs Infrastructure Software only. **Estimate (reasoning, not a filing %):** optical components sit inside networking/semiconductor; AI semis are the disclosed growth cut (management AI semiconductor comments are earnings-call, not 10-Q line). Do not invent a photonics %.
- **Exposed-segment growth:** AI semiconductor revenue is the disclosed proxy, **not** CPO. Q2 FY26 revenue $22.19B (Yahoo earnings strip). CPO/optics growth rate **not in the record**.
- **Gross margin, 3y:** Yahoo TTM gross profit $57.57B on $75.46B rev ⇒ implied TTM GM ~76%. **Three fiscal-year GAAP GM series not pulled from 10-K in this pass** — **not in the record here**.
- **Customer concentration (filing):** Direct sales to **one distributor = 42%** of net revenue, quarter ended 1 Feb 2026 (29% prior-year quarter). Top five **end customers through all channels ≈ 50%** (40% prior-year quarter). [Broadcom 10-Q filed 11 Mar 2026](https://investors.broadcom.com/static-files/01bb84ad-dd06-4dd2-8681-248cc83ca8be).
- **Net cash / debt:** Cash $19.63B; total debt $64.91B (Yahoo, mrq 3 May 2026) ⇒ **net debt ~$45.3B**.
- **Insider ownership:** 1.95% (Yahoo/Refinitiv). Institutions 80.15%.
- **Short interest:** 56.21M sh, 1.20% of float, ratio 3.03, as of **2026-08-14**.
- **Analysts:** Yahoo 1y target $525.97 (low 215.88 / high 675). **Count of contributing analysts not in the record** on the quote page.
- **Keyword frequency (last 4 earnings calls vs 2y earlier):** **not in the record** (full four-call corpus not fetched). Q4 FY25 call (secondary Chipstrat): Hock Tan on 1.6T DSPs and lasers “going nuts” — **secondary**, not counted.
- **Options / IV / converts / ADV:** ADV 25.4M (Yahoo). Convertibles **not in the record**. IV/LEAPs **not in the record**.
- **Catalysts (dated):**
  1. **2026-09-02** — FY Q3 2026 earnings (Yahoo: today 5pm EDT).
  2. **CPO volume** — TrendForce (27 Jul 2026) says Bailly limited shipments; **next Broadcom-dated CPO unit disclosure not in the record**.
  3. **FY2026 year-end / FY2027 AI-semiconductor guide** — management has discussed AI semiconductor dollars on prior calls; next official update is the 9/2 print.
- **Why this row exists:** Owns the Ethernet switch ASIC and, per TrendForce, a shipping 51.2T CPO switch; also an unreported laser/EML business inside networking.
- **Priced-in score: 5/5.** Inputs: $1.76T cap; EV/S ~24x at high end of 3y printed range; CPO already in the AI-networking narrative; no optical % to underwrite a “hidden CPO” stub.
- **Primary URLs:** [Yahoo AVGO](https://finance.yahoo.com/quote/AVGO/); [10-Q](https://investors.broadcom.com/static-files/01bb84ad-dd06-4dd2-8681-248cc83ca8be); [TrendForce 27 Jul 2026](https://www.trendforce.com/presscenter/news/20260727-13151.html). Access 2026-09-02.

---

### 2.2 Marvell Technology, Inc. — MRVL — NasdaqGS

- **Listing:** NasdaqGS MRVL. Incorporated **1995**. **Not founder-led** (professional CEO). Core business **not** constant (HDD controllers → data-infrastructure semis; Celestial AI 2026).
- **Price / mkt cap:** $210.39 close 2026-09-01; **$189.078B**. ADV ~38.7M. [Yahoo MRVL](https://finance.yahoo.com/quote/MRVL/).
- **EV:** $191.57B; EV/S **20.27x**; EV/EBITDA **40.34x**. Printed EV/S range **8.84–20.27** (1/31/2026–current); was **8.76–11.66** in 2025 prints. [key-statistics](https://finance.yahoo.com/quote/MRVL/key-statistics/).
- **CPO % of total:** **not disclosed as current revenue.** Celestial AI closed **2 Feb 2026** for **$3.5B** (10-Q). **Company guide (not current %):** “initial revenue contributions from Celestial AI to begin in the **second half of fiscal 2028**, … **$500 million annualized run rate** in Q4 FY2028, … **$1 billion** annualized by Q4 FY2029.” [SEC EX-99.1, 2 Feb 2026](https://www.sec.gov/Archives/edgar/data/1835632/000119312526032861/d45933dex991.htm). Vs TTM revenue $9.45B, that $500m run-rate would be ~5% of *today’s* TTM **if** it were now — it is **not**. **Estimate:** CPO is a **rounding error of current revenue**; it is a 2028–29 story.
- **Exposed-segment growth:** Q2 FY27 rev (Yahoo) beat; data center is the disclosed cut on prior quarters (Yahoo community recap of Q1 FY27 data center $1.83B, +27% y/y — **treat as secondary** until 10-Q text is used). TTM rev $9.45B; quarterly growth +36.5% y/y (Yahoo).
- **Gross margin:** Yahoo TTM GP $4.93B / $9.45B ⇒ ~52%. **3y GAAP GM series not pulled from 10-K — not in the record here.**
- **Customer concentration:** **not extracted from 10-Q in this pass** (10-Q fetched is large; named % **not in the record here**). NVIDIA $2.0B Series A convertible preferred (10-Q summaries).
- **Net cash/debt:** Cash $3.93B; debt $5.29B ⇒ **net debt ~$1.36B** (Yahoo, mrq 1 Aug 2026).
- **Insider:** 0.49%. Institutions 82.17%.
- **Short:** 28.39M, 3.79% of float, **2026-08-14**.
- **Analysts:** 1y target $278.89 (low 126 / high 400). **Count not in the record.**
- **Keyword frequency:** **not in the record** as a 4-vs-prior count. Celestial close PR and Q4 FY26 commentary are CPO-heavy **company** text.
- **Options/IV/converts:** NVIDIA **$2.0B Series A convertible preferred** (10-Q). IV **not in the record**. ADV 38.7M.
- **Catalysts:**
  1. **~2026-12-01** (Yahoo est.) — Q3 FY27 earnings.
  2. **2H FY2028** — first Celestial revenue (company).
  3. **Q4 FY2028 / Q4 FY2029** — $500m / $1bn annualized Celestial run-rate checkpoints (company, dated to those fiscal quarters).
- **Why this row exists:** Bought the scale-up photonic fabric (Celestial AI); CPO is guided, not earned.
- **Priced-in score: 4/5.** Inputs: stock +235% 1y; EV/S 20x vs ~9x a year ago in the Yahoo table; CPO dollars still FY28; Google-custom-silicon narrative (news) is what moved the multiple, not CPO revenue.
- **Primary URLs:** [EX-99.1](https://www.sec.gov/Archives/edgar/data/1835632/000119312526032861/d45933dex991.htm); [Yahoo MRVL](https://finance.yahoo.com/quote/MRVL/); [10-Q via StockTitan](https://www.stocktitan.net/sec-filings/MRVL/10-q-marvell-technology-inc-quarterly-earnings-report-f98fc84ed738.html). Access 2026-09-02.

---

### 2.3 NVIDIA Corporation — NVDA — NasdaqGS

- **Listing:** NasdaqGS NVDA. Incorporated **1993**. **Founder-led** (Jensen Huang). Core business **not** constant (PC GPU → data-center AI systems + networking).
- **Price / mkt cap:** $217.44 close 2026-09-01; **$5.251T**. ADV ~137.5M. [Yahoo NVDA](https://finance.yahoo.com/quote/NVDA/).
- **EV:** $5.23T; EV/S **17.52x**; EV/EBITDA **22.69x**. Printed EV/S **17.52–29.53** over the Yahoo table. [key-statistics](https://finance.yahoo.com/quote/NVDA/key-statistics/).
- **CPO % of total:** **not in the record.** Q2 FY27 (ended 26 Jul 2026) revenue **$96.2B**; Data Center **$89B** (Yahoo recap of the print; confirm vs [NVIDIA PR 26 Aug 2026](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027) — title exists on newsroom index). CPO switches are a **networking SKU inside Data Center**, not a reported cut. **Estimate:** CPO revenue is a **rounding error vs $89B data-center**, even if Spectrum-X Photonics is in production (company blog).
- **Equity investments in Lumentum and Coherent — verified, primary:**
  - **Lumentum 8-K, 2 Mar 2026:** NVIDIA bought **2,876,415** shares of **Series A Convertible Preferred** at **$695.31**/sh for **$2,000,000,000** cash. [SEC 8-K](https://www.sec.gov/Archives/edgar/data/1633978/000119312526085412/d41019d8k.htm). Joint PR: multibillion purchase commitment + capacity rights for advanced laser components; non-exclusive. [NVIDIA IR](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Strategic-Partnership-With-Lumentum-to-Develop-State-of-the-Art-Optics-Technology/default.aspx).
  - **Coherent 8-K, 2 Mar 2026:** NVIDIA bought **7,788,161** shares of **common** at **$256.80**/sh for **$2 billion** cash. Collaboration: “access to **five additional Coherent product families related to co-packaged optics**.” [SEC 8-K](https://www.sec.gov/Archives/edgar/data/820318/000119312526084366/d42735d8k.htm); [EX-99.1](https://www.sec.gov/Archives/edgar/data/820318/000119312526084366/d42735dex991.htm).
  - These are **completed** private placements, not rumors.
- **Gross margin:** Yahoo implies TTM GM $226.24B / $302.97B ≈ **75%**. 3y 10-K GM series **not pulled — not in the record here**.
- **Customer concentration:** **not extracted from FY26 10-K in this pass.**
- **Net cash:** Cash $62.47B; debt $38.86B ⇒ **net cash ~$23.6B** (mrq 26 Jul 2026).
- **Insider:** 4.01%. Institutions 71.50%.
- **Short:** 285.96M, 1.23% of float, **2026-08-14**.
- **Analysts:** 1y target $325.99 (high 515). **Count not in the record.**
- **Keyword frequency:** NVIDIA blog/GTC 2026 is CPO-explicit. **Four-call vs 2024 count not in the record.**
- **Options/IV/converts:** ADV 137.5M. NVDA convertibles **not in the record**. IV **not in the record**.
- **Catalysts:**
  1. **2026-11-17** — next earnings (Yahoo).
  2. **2H 2026** — Vera Rubin / Spectrum-X Photonics capacity expansion (TrendForce: H2 2026; NVIDIA: in production now).
  3. **Rubin Ultra NVL576 CPO for rack-to-rack** — Huang comments on copper vs CPO are **secondary** (IO Fund 8 May 2026 quoting Huang). **Primary transcript of that quote not fetched.**
- **Why this row exists:** Designs the CPO switch, pays $4B into laser/optics suppliers, and still does not report CPO as a number.
- **Priced-in score: 5/5.** Inputs: $5.25T; CPO is in the production blog; equity stakes are public; optics is not the valuation driver (GPUs are).
- **Primary URLs:** 8-Ks above; [NVIDIA Spectrum-X Photonics production](https://blogs.nvidia.com/blog/nvidia-gtc-taipei-computex-2026-news/); [Yahoo NVDA](https://finance.yahoo.com/quote/NVDA/). Access 2026-09-02.

---

### 2.4 Taiwan Semiconductor Manufacturing — TSM (ADR) / 2330.TW — NYSE ADR + Taiwan

- **Listing today:** NYSE **TSM** ADR; TWSE **2330**. Incorporated **1987**. **Not founder-led** (Morris Chang retired; C.C. Wei chairman/CEO). Core foundry model **constant** since 1987; advanced packaging/COUPE is an add-on.
- **Price / mkt cap:** TSM ADR $414.00 close 2026-09-01; Yahoo **$2.147T**. 2330.TW ¥2,385, mkt cap **TWD 61.849T** (Yahoo compare strip). ADV ADR ~13.2M. [Yahoo TSM](https://finance.yahoo.com/quote/TSM/).
- **EV (Yahoo, mixed USD):** EV $1.89T; EV/S **13.47x**; EV/EBITDA **17.76x**. Printed EV/S **8.22–14.65**. Note Yahoo “Current” mkt cap on key-stats ($1.97T) disagrees with quote page ($2.147T).
- **CPO / COUPE % of total:** **not in the record.** 2025 annual report lists **TSMC-COUPE™** with CoWoS, InFO, SoIC as advanced packaging/3D. Advanced tech (≥7nm) **74% of 2025 wafer revenue** (TSMC AR 2025) — that is **logic wafers**, not COUPE. Q2 2026 call (Investing.com transcript): C.C. Wei: “We start the production right now, and it will be ramped up… I believe the COUPE will continue to increase the demand, and then will become a very important technology in the next few years.” **Company qualitative; no $.** [TSMC AR 2025](https://investor.tsmc.com/static/annualReports/2025/english/index.html); [Q2’26 transcript](https://www.investing.com/news/transcripts/earnings-call-transcript-tsmc-lifts-2026-outlook-as-ai-demand-stays-hot-in-q2-2026-93CH-4794777).
- **Exposed-segment growth:** Q2’26 revenue ~$40.2B (AlphaSense recap); full-year 2026 growth “slightly above 40%” USD (call recap). **COUPE growth rate not in the record.**
- **Gross margin:** Yahoo TTM GP 2.85T / rev 4.44T TWD ≈ **64%**. 3y 10-K/AR GM series **not tabulated here**.
- **Customer concentration:** **not extracted.** (Apple/NVIDIA historically large; **current 10-K % not in this pass**.)
- **Net cash:** Cash 3.52T TWD; debt 1.07T TWD ⇒ **net cash ~2.45T TWD** (Yahoo mrq 30 Jun 2026).
- **Insider (ADR stats):** 0.01% (Yahoo — ADR/float methodology). Short 30.16M ADR, 0.62% of float, **2026-08-14**.
- **Analysts:** 1y target $552.38. **Count not in the record.**
- **Keyword frequency:** COUPE named on 2026 Q2 call. **4-call vs 2024 count not in the record.**
- **Options/IV:** ADV 13.2M ADR. IV **not in the record**.
- **Catalysts:**
  1. **2026-10-15** — Q3 earnings (Yahoo).
  2. COUPE volume ramp “next few years” (Wei, Q2’26) — **no dated unit guide in the record**.
  3. Arizona packaging fabs (AR 2025: additional U.S. packaging facilities announced 2025).
- **Why this row exists:** NVIDIA named TSMC as Spectrum-X Photonics SiPh fabricator; COUPE is TSMC’s CPO process.
- **Priced-in score: 5/5 for TSMC-the-foundry; 2/5 for COUPE-inside-TSMC.** Inputs: COUPE is not a reported segment; the multiple is HPC/AI wafers + CoWoS.
- **Primary URLs:** [TSMC AR 2025](https://investor.tsmc.com/static/annualReports/2025/english/index.html); [Yahoo TSM](https://finance.yahoo.com/quote/TSM/); NVIDIA blog (TSMC named). Access 2026-09-02.

---

### 2.5 Coherent Corp. — COHR — NYSE

- **Listing:** NYSE COHR. Incorporated **1971** as II-VI; renamed Coherent **Sep 2022**. **Not founder-led** (CEO Jim Anderson). Core **not** constant (II-VI materials → lasers + Finisar datacom + Coherent lasers).
- **Price / mkt cap:** $272.03 close 2026-09-01; **$53.272B**. ADV ~6.08M. 52w $87.15–$440. [Yahoo COHR](https://finance.yahoo.com/quote/COHR/).
- **EV:** $55.96B; EV/S **7.86x**; EV/EBITDA **35.87x**. Printed EV/S **2.95–7.86** (3/31/2025–current) — **re-rated vs 3y low**. [key-statistics](https://finance.yahoo.com/quote/COHR/key-statistics/).
- **CPO / datacom optics % of total — filing:** FY2026 (ended **30 Jun 2026**) revenue **$7,118.2M**. **Datacenter & Communications $5,274.6M (74.1%)**; Industrial $1,843.6M. D&C includes “transceivers, **co-packaged optics**, optical circuit switches…” — **CPO is not a separate $.** YoY D&C **$5,274.6 vs $3,755.2 = +40.5%**. [FY26 Q4 earnings release PDF](https://www.coherent.com/content/dam/coherent/site/en/documents/investors/financial-releases/2026/august-12/earnings-release-fy26-q4.pdf); [10-K](https://www.sec.gov/Archives/edgar/data/820318/000082031826000020/iivi-20260630.htm).  
  **Estimate:** CPO is **inside the 74% D&C bucket and still a minority of that bucket** (transceivers are the volume product on the earnings release). **No precise CPO % in the record.**
- **Gross margin, 3y (GAAP, 10-K):** FY26 **37%** ($2,669M / $7,118M); FY25 **35%**. FY24 **not extracted in the snippet**. Q4 FY26 GAAP GM **38.5%** vs Q4 FY25 **35.7%** (earnings release).
- **Customer concentration (10-K):** One customer **20% / 10% / 10%** of consolidated revenue in FY26 / FY25 / FY24. A second **12%** in FY26. A third **12%** in FY25. “Primarily attributable to Datacenter & Communications.” Names **not disclosed**.
- **Net cash/debt:** 10-K: cash **$1,162M** + time deposits **$825M**; total debt **$3,222M** (30 Jun 2026) ⇒ **net debt ~$1.24B** before classifying deposits. Yahoo cash $1.99B / debt $3.55B.
- **NVIDIA investment:** $2B common at $256.80, 7,788,161 sh, **2 Mar 2026** (8-K above). Five additional CPO-related product families (EX-99.1).
- **Insider:** 4.44%. Institutions 87.56%.
- **Short:** 10.03M, **6.00% of float**, **2026-08-14**.
- **Analysts:** 1y target $415.36; Deutsche Bank **initiated Buy / $400 on 2026-09-01** (Yahoo). **Count not in the record.**
- **Keyword frequency:** 10-K defines CPO in the glossary and lists CPO as a D&C product. Q4 release CEO: “transition from copper to optical connectivity.” **Four-call count vs 2024 not in the record.**
- **Converts/IV:** Convertibles **not flagged in the 10-K debt snippet** (term facilities). IV **not in the record**. ADV 6.08M.
- **Catalysts:**
  1. **2026-11-04** — Q1 FY27 earnings (Yahoo).
  2. Q1 FY27 guide $2.2–$2.4B (Yahoo Scout recap of the print — **confirm vs earnings PDF**).
  3. CPO product-family shipments under the NVIDIA access agreement (8-K) — **no unit date in the 8-K**.
- **Why this row exists:** Lasers + transceivers + named CPO product families; NVIDIA $2B common; D&C already 74% of sales so this is **not** an “old industrial laser” stub anymore.
- **Priced-in score: 4/5.** Inputs: EV/S 7.9 vs 3 a year ago; D&C 74%; CPO still unseparated; multiple still well below LITE.
- **Primary URLs:** 10-K, earnings PDF, 8-K, Yahoo. Access 2026-09-02.

---

### 2.6 Lumentum Holdings Inc. — LITE — NasdaqGS

- **Listing:** NasdaqGS LITE. Incorporated **2015** (JDSU spin). **Not founder-led** (CEO Michael Hurlston). Core **optical/photonic** since spin; mix shifted via Cloud Light (2023) toward transceivers.
- **Price / mkt cap:** $868.95 close 2026-09-01; **$77.945B**. ADV ~5.01M. 52w $130.97–$1,085.68. [Yahoo LITE](https://finance.yahoo.com/quote/LITE/).
- **EV:** $80.99B; EV/S **26.87x**; EV/EBITDA **114.87x**. Printed EV/S **4.27–26.87**. **Extreme re-rate.** [key-statistics](https://finance.yahoo.com/quote/LITE/key-statistics/).
- **CPO / datacom % of total:** Single segment in FY26. FY26 net revenue **$3,014.0M** (+83.2% vs FY25 $1,645.0M). **Components $2,005.6M (66.5%)**; **Systems $1,008.4M (33.5%)**. Cloud transceiver lines in Systems **+>173%**; OCS **>$90M** in FY26. [10-K FY26 ended 27 Jun 2026](https://www.opencapital.sh/filings/0001628280-26-057358) / [StockTitan 10-K](https://www.stocktitan.net/sec-filings/LITE/10-k-lumentum-holdings-inc-files-annual-report-f824191929b3.html).  
  10-K: products include “advanced packaging schemes enabling **co-packaged optics**.”  
  **Q4 FY26 call (11 Aug 2026, company):** lead CPO customer production “on track”; first **ELS module PO** for delivery **2H calendar 2027**; high-volume ultra-high-power lasers for optical scale-up **2H 2027** supporting customer deployments **2028**; NPO “completely additive.” [Roic AI transcript](https://www.roic.ai/quote/LITE/transcripts/2026-year/4-quarter).  
  **Estimate:** **CPO revenue in FY26 is not disclosed and is not the transceiver print**; datacom optics (chips + Cloud Light modules + OCS) is the **majority** of FY26 growth. CPO **as a % of FY26 sales: not in the record; qualitatively pre-revenue / sampling.**
- **Gross margin, 3y (10-K):** FY26 **41.7%**; FY25 **28.0%**; FY24 **18.5%** (10-K comparison table).
- **Customer concentration:** Customer A **26.6%**, Customer B **15.0%** of FY26 net revenue (two customers = **41.6%**). [10-K]
- **Net cash/debt:** Cash+equivalents **$2,043.5M** + ST investments **$694.9M** (27 Jun 2026). Convertible notes outstanding (2026/2028/2029/2032 series) — all in **current** liabilities because conversion tests met. Yahoo: cash $2.74B, debt $1.67B ⇒ **net cash ~$1.07B** (includes NVIDIA $2B preferred cash).
- **NVIDIA:** $2B Series A convertible preferred, 2,876,415 sh @ $695.31, **2 Mar 2026** (8-K).
- **Insider:** 0.61%. Institutions 94.23%.
- **Short:** 7.27M, **8.84% of float**, **2026-08-14**.
- **Analysts:** 1y target $1,148.30; Deutsche Bank initiated Buy / $1,200 on **2026-09-01**. **Count not in the record.**
- **Keyword frequency:** Q4 FY26 transcript: **19** matches for `CPO|co-packaged|silicon photonics|photonic` in the Roic AI file (this pass). **Prior-year four-call corpus not fetched** — cannot complete the 2y-earlier comparison. **Qualitative:** CPO/NPO/ELS were central on 11 Aug 2026; FY24 calls were Cloud Light/telecom-cycle — **not counted**.
- **Converts:** 0.50% 2026, 0.50% 2028, 1.50% 2029, 0.375% 2032 convertibles (10-K). NVIDIA Series A preferred. IV **not in the record**. ADV 5.01M.
- **Catalysts:**
  1. **~2026-11-05** (Yahoo est.) — Q1 FY27 earnings (guide was discussed on Q4 call: first $1B-class quarter language in secondary recaps — **use the 8-K/guide for the number**).
  2. **2H 2027** — ELS module delivery / high-volume CPO lasers (company call).
  3. **2028** — customer CPO scale-up deployments (company call).
- **Why this row exists:** NVIDIA’s laser/ELS partner; Cloud Light transceivers + chips; CPO is **2027–28**, not FY26.
- **Priced-in score: 5/5.** Inputs: EV/S 27x vs 4x in 2025; $2B NVIDIA preferred; CPO in every recent call; FY26 still transceivers/chips/OCS.
- **Primary URLs:** 10-K, 8-K, Q4 transcript, Yahoo. Access 2026-09-02.

---

### 2.7 Ciena Corporation — CIEN — NYSE

- **Listing:** NYSE CIEN. Incorporated **1992**. **Not founder-led.** Core **optical transport / coherent** is constant; cloud/hyperscaler mix has risen (Morningstar on Yahoo — secondary).
- **Price / mkt cap:** $360.33 close 2026-09-01; **$51.006B**. ADV ~2.67M. Earnings **2026-09-03**. [Yahoo CIEN](https://finance.yahoo.com/quote/CIEN/).
- **EV:** $54.56B; EV/S **9.80x**; EV/EBITDA **74.76x**. Printed EV/S **2.45–14.61**. [key-statistics](https://finance.yahoo.com/quote/CIEN/key-statistics/).
- **CPO % of total:** **not in the record.** Business is WaveLogic coherent / packet-optical / DCI. Yahoo/Morningstar: WaveLogic 6 “first to support **1.6 terabits-per-second** capacity” — **coherent 1.6T wavelengths, not CPO engines**. **Estimate:** CPO exposure **≈ 0 of reported revenue**; this name is **scale-across / DCI / metro**, not co-packaged switch optics.
- **Segment growth:** TTM rev $5.57B; Q2 FY26 rev $1.57B, +39.5% y/y (Yahoo).
- **Gross margin 3y:** Yahoo TTM GP $2.4B / $5.57B ≈ **43%**. **3y 10-K GM not pulled.**
- **Customer concentration:** **not extracted from 10-K this pass.**
- **Net cash/debt:** Cash $1.2B; debt $1.58B ⇒ **net debt ~$0.38B** (mrq 2 May 2026).
- **Insider:** 0.58%. Short 2.92M, 3.25% of float, **2026-08-14**.
- **Analysts:** 1y target $557.29. **Count not in the record.**
- **Keyword frequency:** **not in the record.**
- **Options/IV/converts:** ADV 2.67M. Converts/IV **not in the record**.
- **Catalysts:**
  1. **2026-09-03** — Q3 FY26 earnings.
  2. WaveLogic 6 1.6T coherent deployments (company product, not dated here).
  3. FY26 year-end (fiscal year ends ~1 Nov 2026).
- **Why this row exists:** 1.6T **coherent** DCI, often confused with CPO; it is the **wrong layer** unless a filing shows CPO engines (none fetched).
- **Priced-in score: 4/5 as an AI-optics/DCI name; 1/5 as a CPO name.** Inputs: +280% 1y; EV/S 10x vs 2.5x; CPO not in the 10-K language fetched.
- **Primary URLs:** [Yahoo CIEN](https://finance.yahoo.com/quote/CIEN/). 10-K **not fully extracted this pass.** Access 2026-09-02.

---

### 2.8 Corning Incorporated — GLW — NYSE

- **Listing:** NYSE GLW. Founded **1851**. **Not founder-led** (CEO Wendell Weeks). Core **glass + fiber** constant; mix now AI data-center fiber.
- **Price / mkt cap:** $145.56 close 2026-09-01; **$125.129B**. ADV ~13.6M. [Yahoo GLW](https://finance.yahoo.com/quote/GLW/).
- **EV:** $134.99B; EV/S **7.96x**; EV/EBITDA **32.15x**. Printed EV/S **3.81–13.95** (peak 6/30/2026 print 13.95). [key-statistics](https://finance.yahoo.com/quote/GLW/key-statistics/).
- **CPO % of total:** **not in the record as current revenue.** Q2 2026 **company:** Optical Communications sales **$2.07B, +32% y/y**; Enterprise **$1.27B, +65%**; AI-data-center portion of enterprise “nearly doubled.” **New Photonics Market-Access Platform:** management “**$10 billion**” revenue **by 2030** if CPO/NPO bring fiber/FAUs/PM fiber “inside the box.” [Q2 2026 transcript](https://stockanalysis.com/stocks/glw/transcripts/656105-q2-2026/); [investor-update transcript](https://stockanalysis.com/stocks/glw/transcripts/651901-investor-update/). TTM company rev $16.96B. Optical comm run-rate ~$8B if Q2 annualized — **estimate, not a filing FY number**. **CPO/Photonics MAP is a 2030 target, not FY26 sales.**
- **Exposed-segment growth:** Optical Communications **+32% y/y** in Q2 2026 (**company**).
- **Gross margin:** Q2 2026 **company:** GAAP GM **39.6%**, +120 bps y/y. **3y 10-K GM not tabled here.**
- **Customer concentration:** Meta multi-year fiber agreement “up to $6 billion”; Amazon “multi-billion” (Q2 call recaps). **10-K 10% customer names/percents not extracted.**
- **Net cash/debt:** Cash $2.5B; debt $9.38B ⇒ **net debt ~$6.9B** (30 Jun 2026).
- **Insider:** 8.07%. Short 16.8M, 2.21% of float, **2026-08-14**.
- **Analysts:** 1y target $191.40. **Count not in the record.**
- **Keyword frequency:** Q2’26 and investor-update transcripts are CPO/NPO-heavy. **4-vs-2024 count not in the record.**
- **Options/IV/converts:** ADV 13.6M. IV **not in the record**.
- **Catalysts:**
  1. **~2026-10-27** (Yahoo est.) — Q3 earnings.
  2. Photonics MAP customer qualifications (no dated filing).
  3. Springboard checkpoints: **$20B annualized sales by end-2026**, $30B end-2028, $40B end-2030 (**company**).
- **Why this row exists:** Fiber, connectors, FAUs; CPO is **inside-the-box optionality**, not today’s P&L.
- **Priced-in score: 4/5 for AI fiber; 2/5 for CPO engines.** Inputs: Optical comm already the growth engine; $10B/2030 MAP is a slide, not backlog.
- **Primary URLs:** Q2 transcript, investor-update transcript, Yahoo. Access 2026-09-02.

---

### 2.9 Fabrinet — FN — NYSE

- **Listing:** NYSE FN. Incorporated **1999** (Cayman). **Not founder-led** (CEO Seamus Grady). Core **optical EMS / precision manufacturing** constant.
- **Price / mkt cap:** $402.07 close 2026-09-01; **$14.408B**. ADV ~0.99M. 52w $333–$749; **sharp de-rate after Q4 print**. [Yahoo FN](https://finance.yahoo.com/quote/FN/).
- **EV:** $14.64B; EV/S **3.15x**; EV/EBITDA **23.47x**. Printed EV/S **1.97–4.55**. **Cheapest EV/S in the U.S. optics set.** [key-statistics](https://finance.yahoo.com/quote/FN/key-statistics/).
- **CPO % of total:** **not in the record.** FY26 (ended **26 Jun 2026**) recast into **Data Center 47.9%**, Communications Infrastructure **33.3%** (implied), Automotive/industrial/other **18.8%**. Data Center revenue **$2.23B, +40.8%**; Communications Infrastructure **$1.55B, +47.4%**. Total FY26 rev **$4.64B**. [10-K](https://www.sec.gov/Archives/edgar/data/1408710/000140871026000028/fn-20260626.htm). CPO packaging would sit inside Data Center/optical EMS — **no CPO line**.
- **Gross margin, 3y (10-K):** FY26 **12.0%**; FY25 **12.1%**; FY24 **12.4%**. **Flat-to-down EMS margins.**
- **Customer concentration (FY26 10-K, named):** Cisco **19.9%**, NVIDIA **16.3%**, Nokia **10.7%**, Amazon **10.5%**; four customers **57.4%** of revenue (FY25: NVIDIA 27.6% + Cisco 18.2% = two customers).
- **Net cash:** Cash $875M; debt $4.0M ⇒ **net cash ~$871M**.
- **Insider:** 0.35%. Short 1.17M, 4.34% of float, **2026-08-14**.
- **Analysts:** 1y target $734.11. **Count not in the record.**
- **Keyword frequency:** **not in the record.**
- **Options/IV/converts:** Essentially no debt. ADV 0.99M. IV **not in the record**.
- **Catalysts:**
  1. **~2026-11-02** (Yahoo est.) — Q1 FY27 earnings.
  2. Thailand capacity expansion (Q4 call headlines — **transcript not fully counted**).
  3. Any CPO optical-engine assembly win — **not in the record as a dated award**.
- **Why this row exists:** Optical packaging/test EMS; NVIDIA is a named 16% customer; CPO engines need exactly this factory skill; the stock is priced like an EMS, not like LITE.
- **Priced-in score: 2/5.** Inputs: EV/S 3.2x vs LITE 27x / COHR 7.9x; CPO not in the 10-K glossary as a product; post-earnings drawdown.
- **Primary URLs:** [FY26 10-K](https://www.sec.gov/Archives/edgar/data/1408710/000140871026000028/fn-20260626.htm); Yahoo. Access 2026-09-02.

---

### 2.10 Applied Optoelectronics, Inc. — AAOI — NasdaqGM

- **Listing:** NasdaqGM AAOI. Incorporated **1997**. **Founder-led** (Chih-Hsiang (Thompson) Lin — **confirm vs latest 10-K signature; founder status historically yes**). Core **optical modules** constant; CATV vs datacenter mix swings.
- **Price / mkt cap:** $103.39 close 2026-09-01; **$8.778B**. ADV ~11.6M. [Yahoo AAOI](https://finance.yahoo.com/quote/AAOI/).
- **EV:** $8.94B; EV/S **15.01x**; EV/EBITDA **not meaningful** (EBITDA negative). Printed EV/S **5.19–24.35**.
- **CPO % of total:** **not in the record.** FY2025 10-K mix: **CATV 53.8%**, internet data center **42.9%**, telecom 3.0%, FTTH/other 0.3%. [FY2025 10-K](https://www.sec.gov/Archives/edgar/data/1158114/000143774926005875/aaoi20251231_10k.htm). TTM rev $596M. **CPO not a disclosed product.** **Estimate:** CPO **≈ 0 of FY25**; name is 400G/800G/CATV modules.
- **Growth:** Q2’26 rev $191.9M, +86.4% y/y (Yahoo). Still GAAP unprofitable (TTM NI −$57M).
- **Gross margin:** Yahoo TTM GP $172M / $596M ≈ **29%**. Q2 Scout: GM “near 29%.” **3y 10-K GM not tabled.**
- **Customer concentration (FY2025 10-K):** Digicomm **53.1%**; Microsoft **28.8%**; top ten **96.6%**. FY24 Microsoft 43.7%; Oracle 12.4% in 2024.
- **Net cash/debt:** Cash $500M; debt $300M ⇒ **net cash ~$200M** (30 Jun 2026) after equity raises. **$600M ATM** announced ~late Aug 2026 (news; **8-K not fetched**).
- **Insider:** 9.82%. Short **12.77% of float**, **2026-08-14**.
- **Analysts:** 1y target $163.40. **Count not in the record.**
- **Keyword frequency:** **not in the record.**
- **Options/IV/converts:** ADV 11.6M. Converts **not in the record**. IV **not in the record**.
- **Catalysts:**
  1. **~2026-11-05** — earnings.
  2. Datacenter 800G/1.6T qualification vs CATV mix — **no dated 10-Q cut this pass**.
  3. ATM dilution path (capacity vs share count).
- **Why this row exists:** U.S.-listed module vendor; **not a CPO vehicle on FY25 mix**.
- **Priced-in score: 4/5 as a module/AI-optics lottery; 1/5 as CPO.** Inputs: 15x sales on CATV-majority FY25; 13% short; ATM.
- **Primary URLs:** [FY2025 10-K](https://www.sec.gov/Archives/edgar/data/1158114/000143774926005875/aaoi20251231_10k.htm); Yahoo. Access 2026-09-02.

---

### 2.11 Zhongji Innolight Co., Ltd. — 300308.SZ — Shenzhen ChiNext

- **Listing today:** Shenzhen **300308**. Founded **2005**. **Founder/control status not in the record this pass.** Core **optical transceivers** (10G–1.6T) — constant as a module maker after the Zhongji Electrical rename (2017, Yahoo).
- **Price / mkt cap:** **CNY 822.40** close 2026-09-02; **CNY 968.713B** ≈ **$142.8B** at PBOC 6.7829. ADV ~35.0M sh. [Yahoo 300308.SZ](https://finance.yahoo.com/quote/300308.SZ/).
- **EV/multiples:** Yahoo key-stats tables **not loaded** on the quote page. **EV, EV/S, EV/EBITDA 3y range: not in the record from Yahoo this pass.** TTM rev **CNY 65.23B**; NI **CNY 20.45B**; profit margin 31.36% (Yahoo).
- **CPO % of total:** **not in the record.** Product list: 10G–1.6T transceivers including 400G/800G/1.6T. **Estimate:** revenue is **pluggable datacom**, not CPO. CPO would cannibalize or coexist; **no company CPO % fetched**.
- **Growth:** Q1 FY26 rev CNY 19.5B, margin 29.4% (Yahoo earnings strip). TTM vs prior year **not computed here without FY25**.
- **Gross margin 3y:** **not in the record** (Yahoo did not print GM).
- **Customer concentration:** **not in the record** (A-share AR not fetched).
- **Net cash/debt:** Cash CNY 8.93B; D/E 4.07% (Yahoo) ⇒ **net cash likely**, exact net **not computed**.
- **Insider / short / options:** A-share short/options **not in the record** on Yahoo U.S. methodology. Analyst 1y target CNY 1,320.85. HK listing “up to $7B” (Reuters, ~1 mo ago) — **not a closed deal in this pass**.
- **Keyword frequency:** **not in the record** (no English call corpus fetched).
- **Catalysts:**
  1. Next A-share earnings — **date not on Yahoo**.
  2. Possible Hong Kong listing (Reuters) — **undated here**.
  3. Reported U.S. import-ban risk on Chinese optical parts (Reuters/FT ~28d ago) — **policy, not a company date**.
- **Why this row exists:** Volume leader in AI pluggables; CPO is a **threat/adjacent**, not the current P&L.
- **Priced-in score: 5/5 as 800G/1.6T modules; 2/5 as CPO.** Inputs: ~$143B cap on CNY 65B sales (~15x sales at 6.78 FX); module cycle is the narrative.
- **Primary URLs:** Yahoo 300308.SZ. **CN annual report not fetched.** Access 2026-09-02.

---

### 2.12 Eoptolink Technology Inc., Ltd. — 300502.SZ — Shenzhen ChiNext

- **Listing:** Shenzhen **300502**. Founded **2008**. Core **optical modules**.
- **Price / mkt cap:** **CNY 386.70** close 2026-09-02; **CNY 539.159B** ≈ **$79.5B** at 6.7829. ADV ~52.1M. [Yahoo 300502.SZ](https://finance.yahoo.com/quote/300502.SZ/).
- **EV/3y multiples:** **not in the record** (Yahoo tables empty). TTM rev **CNY 35.31B**; NI **CNY 13.12B**; margin 37.15%.
- **CPO %:** **not in the record.** Products include high-speed, silicon optical, coherent, **800G LPO** modules (Yahoo profile). LPO ≠ CPO. **Estimate:** pluggables/LPO, not CPO.
- **Growth:** Q1 FY26 rev CNY 8.34B. Q2 EPS **miss** vs estimate (Yahoo: est. 4.48 vs act. 3.39).
- **GM 3y / customers / net cash detail / insider / short / IV / keyword counts:** **not in the record** this pass.
- **Cash:** CNY 7.24B; D/E 0.10% ⇒ **net cash**.
- **Catalysts:** next earnings **undated on Yahoo**; U.S. optical-parts ban risk (same news cluster as Innolight); 1.6T Gen2 mass production (MarketDesk secondary — **not a company filing**).
- **Why this row exists:** Second China module champion; LPO/1.6T, not CPO.
- **Priced-in score: 5/5 modules; 2/5 CPO.**
- **Primary URLs:** Yahoo 300502.SZ. Access 2026-09-02.

---

### 2.13 Sumitomo Electric Industries — 5802.T — Tokyo

- **Listing:** TSE Prime **5802**. Founded **1897**. **Not founder-led** (professional Japanese management). Core **wire, cable, automotive, infocomm, energy** — **conglomerate, not an optics company**.
- **Price / mkt cap:** **JPY 2,155.50** close 2026-09-02; **JPY 6.724T** (Yahoo) ≈ **$42B** at ~160 JPY/USD (**approx**). ADV ~24.2M. [Yahoo 5802.T](https://finance.yahoo.com/quote/5802.T/).
- **EV/multiples:** Yahoo tables empty. TTM rev **JPY 5.29T**; NI **JPY 400.8B**; margin 7.57%. **EV/S ~1x on local numbers — not computed as Yahoo EV.**
- **CPO / datacom optics % of total:** **not in the record.** Infocommunications is **one of five segments** (Environment & Energy, Infocomm, Automotive, Electronics, Industrial Materials). Automotive/energy dominate a ¥5.3T book. Fiber, fusion splicers, optical devices, **AirMT / non-contact multi-fiber interconnect** appear in the Yahoo profile. **Estimate:** optical/infocomm is a **minority** of total; CPO **not disclosed**.
- **Growth / GM 3y / customers:** **not extracted from Yuho this pass.**
- **Net cash/debt:** Cash JPY 265B; D/E 25.2% ⇒ **net debt** (equity not printed as a single ¥).
- **Insider/short/IV:** **not in the record** (TSE).
- **Analysts:** 1y target JPY 3,619. **Count not in the record.**
- **Keyword frequency:** **not in the record**.
- **Catalysts:** **2026-10-30** earnings; **2026-09-29** ex-div JPY 19; Infocomm/data-center fiber orders — **no CPO date**.
- **Why this row exists:** Fiber + interconnect IP inside a wire/auto giant; CPO fiber-attach is the thesis, not the P&L.
- **Priced-in score: 2/5 as CPO; 3/5 as AI-fiber Japan.** Inputs: 1y +117%; still auto-parts classified by Yahoo; CPO % absent.
- **Primary URLs:** Yahoo 5802.T. **Yuho not fetched.** Access 2026-09-02.

---

### 2.14 Furukawa Electric — 5801.T — Tokyo

- **Listing:** TSE **5801**. Founded **1884**. Conglomerate: Optical Solutions, digital infrastructure, energy, automotive, metals.
- **Price / mkt cap:** **JPY 3,752** close 2026-09-02; **JPY 2.64T** ≈ **$16.5B** approx. ADV ~28.7M. 52w JPY 833–6,241. [Yahoo 5801.T](https://finance.yahoo.com/quote/5801.T/).
- **EV/S 3y:** **not in the record.** TTM rev **JPY 1.38T**; NI **JPY 89.6B**; margin 6.5%.
- **CPO %:** **not in the record.** Optical fiber/components are inside Infrastructure. **Estimate:** optics **minority**; CPO **not disclosed**.
- **Net cash/debt:** Cash JPY 62.6B; D/E **77.56%** ⇒ **net debt**.
- **GM 3y / customers / insider / short / IV / keywords:** **not in the record**.
- **Catalysts:** **2026-11-09** earnings; **2026-09-29** ex-div JPY 11.
- **Why this row exists:** Optical-fiber peer to Corning/Fujikura; copper-to-fiber + FAU, not engines.
- **Priced-in score: 3/5.** Inputs: +341% 1y (Yahoo) — the “old fiber” multiple has already moved; CPO still undescribed.
- **Primary URLs:** Yahoo 5801.T. Access 2026-09-02.

---

### 2.15 Fujikura Ltd. — 5803.T — Tokyo

- **Listing:** TSE **5803**. Founded **1885**. Segments: telecommunication systems, electronics (FPC), automotive harnesses, power, real estate.
- **Price / mkt cap:** **JPY 5,090** close 2026-09-02; **JPY 8.428T** ≈ **$52.7B** approx. ADV ~52.6M. [Yahoo 5803.T](https://finance.yahoo.com/quote/5803.T/). Reuters (older): “century-old Fujikura rides AI data centre boom.”
- **EV/S 3y:** **not in the record.** TTM rev **JPY 1.32T**; NI **JPY 206.3B**; margin **15.67%** (higher than Sumitomo/Furukawa).
- **CPO %:** **not in the record.** Telecom systems = fiber/cable/components. **Estimate:** telecom systems **not 100% of ¥1.32T** (auto + FPC + power + real estate). CPO **not disclosed**.
- **Net cash/debt:** Cash JPY 192B; D/E 18.1% ⇒ **modest net debt or near net cash** (equity not printed).
- **GM 3y / customers / keywords:** **not in the record**.
- **Catalysts:** **~2026-11-06** earnings; **2026-09-29** ex-div JPY 19.
- **Why this row exists:** Densest AI-fiber Japan re-rating in the starter list; still a harness/FPC conglomerate.
- **Priced-in score: 4/5 as AI fiber; 2/5 as CPO.** Inputs: 1y +149%, 5y +5,274% (Yahoo); CPO undescribed.
- **Primary URLs:** Yahoo 5803.T. Access 2026-09-02.

---

### 2.16 Lightwave Logic, Inc. — LWLG — NasdaqCM (speculative)

- **Listing:** NasdaqCM LWLG. Founded **1991** (Third-order Nanotechnologies → Lightwave Logic 2008). **Not meaningfully founder-led in the operating sense today** (professional CEO/CFO; CFO Fred Graffam appointed ~Aug 2026, company PR). Core **electro-optic polymer materials** — constant, **pre-commercial**.
- **Price / mkt cap:** $5.13 close 2026-09-01; **$790.9M**. ADV ~3.86M. [Yahoo LWLG](https://finance.yahoo.com/quote/LWLG/).
- **EV:** $744M; EV/S **2,970x** (Yahoo). TTM rev **$250,250**.
- **CPO %:** **not applicable.** Revenue is material/licensing, not CPO engines. Thesis is polymer modulators **for** SiPh/CPO. **Company revenue is not CPO systems.**
- **GM 3y:** TTM GP ~$248k; operating margin −22,195% (Yahoo). **Not a 3y GM story.**
- **Customers:** **not in the record** as 10% names.
- **Net cash:** Cash $95.9M; debt $2.5M ⇒ **net cash ~$93M**.
- **Insider:** 1.23%. Short **14.95% of float**, ratio 7.23, **2026-08-14**.
- **Analysts:** 1y target **—** (Yahoo). **Count: not in the record / effectively uncovered.**
- **Keyword frequency:** **not in the record**.
- **Options/IV/converts:** ADV 3.86M. IV **not in the record**.
- **Catalysts:** **2026-11-12** earnings; foundry integration (Simply Wall St headlines — **not a dated 8-K here**); any design-win 8-K — **none fetched**.
- **Why this row exists:** Materials lottery ticket on polymer PICs; **not a CPO revenue name**.
- **Priced-in score: 5/5 as a story stock; 1/5 as a business.** Inputs: $791M on $250k sales; 15% short.
- **Primary URLs:** Yahoo LWLG. 10-Q **not extracted**. Access 2026-09-02.

---

### 2.17 POET Technologies Inc. — POET — NasdaqCM (speculative)

- **Listing:** NasdaqCM POET (also historically TSX-V). HQ Toronto. Name from Opel Technologies **2013**. Optical Interposer platform. **Not founder-led in the NVIDIA/Huang sense.**
- **Price / mkt cap:** $7.10 close 2026-09-01; **$1.229B**. ADV ~16.8M. [Yahoo POET](https://finance.yahoo.com/quote/POET/).
- **EV:** $502M (large cash); EV/S **293x**. TTM rev **$1.71M**. Cash **$796M**; debt $7.8M ⇒ **net cash ~$788M**.
- **CPO %:** **not in the record as revenue.** Products: PICs, optical engines, transceivers, light sources; Lumilens collaboration (Yahoo). Q2’26 “revenue up 112% y/y” on a tiny base (company PR via GlobeNewswire, Yahoo). **Estimate:** CPO/engine revenue **immaterial vs cash pile**.
- **GM 3y:** TTM GP = revenue ($1.71M) — Yahoo also shows 100% GM in Scout text. **Not comparable.**
- **Customers:** Lumilens **$50M** initial PO, “potentially” **$500M** (Yahoo Scout — **company/partner language; not an 8-K fetched**). Treat as **company/partner claim**, not recognized revenue.
- **Insider:** 0.07%. Short **15.77% of float**, **2026-08-14**.
- **Analysts:** 1y target $14.75 (Yahoo shows a single Northland action dated **2024-12-02** on the quote page — **stale**). **Current count not in the record.**
- **Keyword frequency:** **not in the record**.
- **Options/IV:** ADV 16.8M. IV **not in the record**.
- **Catalysts:** **~2026-11-12** earnings; 2026 production ramp (CEO comment via Stocktwits/PR — **secondary**); Lumilens conversion of PO to revenue.
- **Why this row exists:** Wafer-level optical interposer aimed at engines; **pre-scale**.
- **Priced-in score: 4/5 as a photonics lottery; 1/5 as CPO cash flow.** Inputs: $1.2B equity / $1.7M sales; 16% short.
- **Primary URLs:** Yahoo POET. Access 2026-09-02.

---

### 2.18 Credo Technology Group Holding Ltd — CRDO — NasdaqGS (copper counter-bet)

- **Listing:** NasdaqGS CRDO. Founded **2008**. Cayman HQ. **Not founder-led as a public-company story** (CEO Bill Brennan). Core **high-speed SerDes / AEC copper** — now adding optics via DustPhotonics.
- **Price / mkt cap:** $206.63 close 2026-09-01; **$38.833B**. ADV ~7.21M. Q1 FY27 call **just printed** (stock −8.65% on the session). [Yahoo CRDO](https://finance.yahoo.com/quote/CRDO/).
- **EV:** $41.09B; EV/S **30.78x**; EV/EBITDA **85.60x**. Printed EV/S **21.21–53.31**.
- **CPO / optics % of total:** **not disclosed as CPO.** FY26 TTM rev **$1.34B**. Yahoo Scout: Q1 FY27 rev **$479M, +115% y/y**; GM **68%**. Historical AEC concentration: Atlas Peak (secondary) cites FY25 top customer **67%**, top 10 **~90%**, and AEC **>95% of the increase** in product sales in Aug/Nov 2025 quarters — **verify in 10-K; treat as secondary until 10-K quote**. DustPhotonics acquisition: **optical engine internalization** (Atlas Peak; **8-K not fetched this pass**). IO Fund (8 May 2026, secondary): Credo “expecting to generate **$500 million** in optical revenue in FY2027” — **not a filing confirmed here**. **Estimate:** today is **AEC/copper**; optics is an **add-on / hedge**, not CPO share.
- **Growth:** TTM +157% q/q growth field on Yahoo is quarterly y/y 157% (Q4 FY26). Copper cycle, not CPO.
- **GM 3y:** Yahoo TTM GP $908M / $1.34B ≈ **68%**. **FY24–26 10-K GM not tabled.**
- **Customer concentration:** **not extracted from 10-K**; secondary sources say extreme hyperscaler concentration.
- **Net cash:** Cash $1.44B; debt $25M ⇒ **net cash ~$1.42B**.
- **Insider:** 9.44%. Short 6.13M, 3.69% of float, **2026-08-14**.
- **Analysts:** 1y target $283.23; Rosenblatt Neutral, PT 215→235 on **2026-09-02**. **Count not in the record.**
- **Keyword frequency:** **not in the record**. AEC vs DustPhotonics will dominate recent calls.
- **Options/IV/converts:** ADV 7.21M. Converts **not in the record**. IV **not in the record**.
- **Catalysts:**
  1. **~2026-11-30** next earnings.
  2. Optical revenue proof vs AEC (FY2027 if the $500m figure is later confirmed in a filing).
  3. 200G/lane AEC reach limits vs CPO (Marvell chart is **secondary**).
- **Why this row exists:** The **copper** side of copper-to-light; optics M&A is the hedge, not the thesis confirmation.
- **Priced-in score: 5/5 as an AEC winner; 3/5 as an optics pivot.** Inputs: 31x sales; print just disappointed on growth rate; CPO is the bear case for AECs.
- **Primary URLs:** Yahoo CRDO. DustPhotonics 8-K **not in the record this pass**. Access 2026-09-02.

---

### 2.19 Private names (not blocks)

| Name | Status as of 2026-09-02 | Note |
| --- | --- | --- |
| **Ayar Labs** | Private | Optical I/O / CPO-adjacent. **No 10-K.** |
| **Lightmatter** | Private | Photonic compute/interconnect. **No 10-K.** |
| **Celestial AI** | **Acquired** | Marvell completed acquisition **2 Feb 2026** ($3.5B consideration per 10-Q; signing PR ~$3.25B upfront + earnout). **No longer a private comparable.** [EX-99.1](https://www.sec.gov/Archives/edgar/data/1835632/000119312526032861/d45933dex991.htm) |

---

## 3. Shortlist (at most 3) — still unappreciated **by definition**

**Screen:** CPO still a minority of revenue **or** the stock is still priced as old telecom/laser/fiber/EMS. **Exclude NVDA/AVGO** (CPO is in the production/AI-networking narrative). **Exclude LITE** (27x sales, NVIDIA preferred, CPO on every call). **Exclude Innolight/Eoptolink** (module cycle is the narrative). **Exclude CRDO** (AEC priced-in). **Exclude LWLG/POET** (not “unappreciated businesses”; they are story stocks).

### Shortlist A — Fabrinet (FN)

**Why unappreciated:** FY26 Data Center is 47.9% of $4.64B, but that is **pluggable EMS**, not a CPO line. EV/S **3.15x** vs LITE 27x / COHR 7.9x / AAOI 15x. Net cash. Named NVIDIA 16.3% / Cisco 19.9%. Optical packaging is exactly where CPO engines get assembled; the 10-K does not market “CPO.” Post-Q4 drawdown from $749 52w high to $402.

### Shortlist B — Sumitomo Electric (5802.T)

**Why unappreciated:** ¥5.29T revenue auto/energy/wire conglomerate; infocomm/fiber is a **segment, not the company**. CPO % **not in the record**. Priced in the **auto-parts** Yahoo industry. Fiber, fusion, AirMT/non-contact multi-fiber are the CPO-attach toolkit. Still ~1x sales on local figures.

### Shortlist C — Corning (GLW) — **CPO slice only**

**Why unappreciated *as CPO* (not as AI fiber):** Optical Communications is already the growth engine and **is** in the price (EV/S 8x, 1y +119%). The **Photonics MAP / inside-the-box CPO-NPO $10B by 2030** is a **company target**, not FY26 revenue. If the row is “CPO engines,” GLW is still selling **fiber and connectivity**; the CPO option is unearned. Included because the definition allows “CPO minority of revenue.”

**Not shortlisted:** COHR (D&C already 74%, NVIDIA $2B, CPO in the 10-K product list — appreciated as AI optics even if CPO $ is unseparated). Fujikura (already the Japan AI-fiber poster child).

---

## 4. Bear case, 2000 analog, kill criteria (shortlist only)

**2000 optical-bubble analog (applies to the whole map, not just the three):** JDS Uniphase, Nortel, Corning fiber, Ciena. Mechanism: capacity ordered on **vendor financing and 3-year demand dreams**; when traffic (then: metro/long-haul DWDM; now: GPU interconnect) grows slower than **module/fiber/laser capex**, inventories glut, ASPs collapse 70–90%, and “strategic” laser/fiber plants become stranded. **Difference vs 2000 (factual, not a prediction):** today’s buyers are hyperscalers with cash, not CLECs with vendor notes — **but** circular NVIDIA equity + purchase commitments (LITE/COHR 8-Ks) rhyme with vendor-financed demand. **Kill the analogy if** hyperscaler capex cuts show up in **named 10% customers** on dated 10-Qs.

### FN — bear, analog, kills

- **Bear:** EMS gross margin stuck ~12%; four customers 57%; CPO engines go to Foxconn/TFC/SPIL (NVIDIA’s **named** CPO chain) and **never** to Fabrinet; Thailand FX/labor; NVIDIA mix already fell 27.6% → 16.3% y/y in FY26 (10-K) — **that mix shift is in the record**.
- **2000 analog:** contract manufacturers that tooled for a DWDM boom and were left with empty lines.
- **Kill criteria (dated):**
  1. **FY27 Q2 10-Q (calendar ~Feb 2027):** Data Center % of revenue **<40%** and sequential Data Center dollars down y/y.
  2. **Any 10-K/10-Q after FY26:** NVIDIA + Cisco combined **<25%** of revenue without a new equivalent hyperscaler (Amazon already 10.5% — watch whether it **replaces** NVIDIA or stacks).
  3. **FY27 year (10-K ~Aug 2027):** GAAP GM **<11%** for two consecutive years (FY25 12.1%, FY26 12.0% already drifting).

### 5802.T — bear, analog, kills

- **Bear:** Automotive cycle dominates; infocomm stays a rounding error; CPO connectors standardize on Corning GlassBridge / Senko / others (TrendForce named those, **not** Sumitomo). Yen/rates crush TSE multiples.
- **2000 analog:** Japanese cable makers that added fiber capacity into the glut.
- **Kill criteria:**
  1. **FY ending Mar 2027 Yuho:** Infocommunications segment profit **down y/y** while Automotive also down (double cyclical).
  2. **By 2026-10-30 earnings:** management **does not** mention data-center/CPO/AI fiber as a growth driver (negative confirmation).
  3. **By 2027-03-31:** no named hyperscaler optical-fiber or interconnect contract in a **company** disclosure (vs Corning’s Meta/Amazon **call** language).

### GLW — bear, analog, kills

- **Bear:** Enterprise fiber is **pluggable data-center build**, not CPO; Photonics MAP $10B/2030 is a slide; display glass cyclicality returns; net debt $6.9B; 2000 **Corning itself** is the analog (fiber plants into a glut).
- **Kill criteria:**
  1. **Q3 2026 (~27 Oct 2026):** Optical Communications **<15%** y/y growth (vs +32% in Q2).
  2. **FY2026 10-K (~Feb 2027):** no Photonics/CPO **revenue** line or quantified backlog; MAP remains “opportunity.”
  3. **End-2026 Springboard:** company **misses** the **$20B annualized sales** run-rate target it set (Q2’26 call).

---

## 5. Relative value: dollars per optical port at 1.6T

**Company filings fetched (LITE 10-K, COHR 10-K, LITE Q4 call):** **no dollar ASP for a 1.6T module or CPO port.** Lumentum Q4 FY26 call: 1.6T transceivers have **“higher ASP”** than 800G; ELS module ASP **“meaningfully higher”** than a set of lasers, with **worse** margins than chips — **direction only, no $.**

**Third-party / non-filing (label as estimates, not record of a 10-K):**

| Source | Date | Claim | Status |
| --- | --- | --- | --- |
| Deep Fundamental Substack | undated in fetch; content discusses 800G/1.6T ramp with Q4 2024 first 1.6T | 1.6T **~$2,000** at first mass production; **~$1,500** “next year”; 800G MM **>$500**, SM **>$700** | **Estimate, not a company filing** |
| IndexBox world optical-module page | accessed 2026-09-02 | 800G DR8 **$500–$1,000** “early 2026”; 400G DR4/FR4 **$150–$300**; 1.6T **no dollar** in the excerpt | Third-party |
| MarketDesk 1.6T note | 26 Feb 2026 | 1.6T ASP “**1.5–2x premium vs 800G**” into H2 2026 | Third-party |
| LightCounting / company 1.6T **dollar** ASP | — | **not in the record** this pass |

**CPO dollars per port:** **not in the record.** NVIDIA claims 4x fewer lasers vs pluggables (blog/secondary recaps) — that is a **bom** claim, not an ASP.

**Trend:** filings say 1.6T ASPs are **higher** than 800G **and** that volume/yields lift transceiver profitability (LITE). **Price-per-bit decline is assumed by every cycle historically; a dated 1.6T ASP series from a primary source was not found.**

---

## 6. NVIDIA equity investments in Lumentum and Coherent — verification

| Target | Instrument | Shares | Price | Cash | Close date | Primary source |
| --- | --- | --- | --- | --- | --- | --- |
| **Lumentum** | Series A Convertible Preferred, $0.001 par | 2,876,415 | $695.31 | **$2,000,000,000** | **2026-03-02** | [LITE 8-K](https://www.sec.gov/Archives/edgar/data/1633978/000119312526085412/d41019d8k.htm) |
| **Coherent** | Common stock, no par | 7,788,161 | $256.80 | **$2 billion** | **2026-03-02** | [COHR 8-K](https://www.sec.gov/Archives/edgar/data/820318/000119312526084366/d42735d8k.htm) |

Both: **Section 4(a)(2)** private placements; **non-exclusive**; NVIDIA **multibillion purchase commitments** and capacity rights (PRs furnished on the 8-Ks). Coherent EX-99.1: **five additional product families related to CPO**. Lumentum PR: lasers/R&D/U.S. fab. **Verified. Not rumors.**

Marvell separately issued **$2.0B Series A convertible preferred to NVIDIA** (10-Q) — **optics-adjacent but not LITE/COHR**.

---

## 7. Cross-section: EV/sales vs 3y printed Yahoo range (U.S. names)

| Ticker | EV/S now | Yahoo table low | Yahoo table high | vs peers (same table window) |
| --- | --- | --- | --- | --- |
| AVGO | 23.95 | 17.65 | 30.02 | Mega-cap semis |
| NVDA | 17.52 | 17.52 | 29.53 | Mega-cap semis |
| TSM | 13.47 | 8.22 | 14.65 | Foundry |
| MRVL | 20.27 | 8.84 | 20.27 | **at high** |
| LITE | 26.87 | 4.27 | 26.87 | **at high; outlier vs COHR** |
| COHR | 7.86 | 2.95 | 7.86 | **at high vs own history; cheap vs LITE** |
| CIEN | 9.80 | 2.45 | 14.61 | Mid |
| GLW | 7.96 | 3.81 | 13.95 | Mid |
| FN | 3.15 | 1.97 | 4.55 | **EMS-like** |
| AAOI | 15.01 | 5.19 | 24.35 | High on losses |
| CRDO | 30.78 | 21.21 | 53.31 | AEC premium |
| LWLG | ~2,970 | — | — | N/M |
| POET | 293 | — | — | N/M |

**Asia EV/S:** **not in the record** from Yahoo key-statistics this pass.

**Analyst count:** Yahoo prints consensus **targets**, not a reliable N. **Exact N not in the record** for any name.

**Options IV / LEAPs:** **not in the record** (no CBOE/Yahoo options chain fetched).

---

## 8. Keyword-frequency note (method)

A rigorous “last 4 earnings calls vs the 4 calls two years earlier” count requires eight transcripts per name. **That corpus was not fully fetched.**

**Sampled:**

- **LITE Q4 FY26 (11 Aug 2026):** 19 hits on `CPO|co-packaged|silicon photonics|photonic` in the Roic AI transcript file.
- **GLW Q2 FY26 + investor update:** CPO/NPO/Photonics MAP are **central** (qualitative).
- **COHR FY26 10-K:** CPO defined and listed as a D&C product (document, not a call count).
- **NVDA:** production blog is CPO-explicit; **call count not in the record**.
- **TSMC Q2 FY26:** COUPE named by C.C. Wei.
- **All others:** **not in the record**.

---

## 9. What this file could not verify (explicit)

- Exact **analyst counts**, **implied volatility**, **LEAPs open interest**, and **CBOE 30-day IV**.
- **1.6T module ASP in dollars** from a 10-K, 20-F, or earnings **number**.
- **CPO as a % of sales** for any issuer (none break it out).
- A-share **annual-report customer %** for Innolight/Eoptolink; **Yuho segment $** for 5801/5802/5803.
- Full **4+4 earnings-call** keyword panel.
- Credo **DustPhotonics 8-K** text; AAOI **$600M ATM 8-K** text.
- NVIDIA **FY26 10-K** customer % and networking-within-data-center cut.
- USD/JPY **primary** fix (JPY names left primarily in yen).

---

## 10. Source log (access 2026-09-02)

**Filings / IR**

- Lumentum 8-K 2026-03-02: https://www.sec.gov/Archives/edgar/data/1633978/000119312526085412/d41019d8k.htm
- Coherent 8-K 2026-03-02: https://www.sec.gov/Archives/edgar/data/820318/000119312526084366/d42735d8k.htm
- Coherent EX-99.1: https://www.sec.gov/Archives/edgar/data/820318/000119312526084366/d42735dex991.htm
- Coherent 10-K FY26: https://www.sec.gov/Archives/edgar/data/820318/000082031826000020/iivi-20260630.htm
- Coherent FY26 Q4 release: https://www.coherent.com/content/dam/coherent/site/en/documents/investors/financial-releases/2026/august-12/earnings-release-fy26-q4.pdf
- Lumentum FY26 10-K (OpenCapital / StockTitan mirrors of EDGAR)
- Fabrinet 10-K FY26: https://www.sec.gov/Archives/edgar/data/1408710/000140871026000028/fn-20260626.htm
- AAOI 10-K FY2025: https://www.sec.gov/Archives/edgar/data/1158114/000143774926005875/aaoi20251231_10k.htm
- Broadcom 10-Q filed 2026-03-11: https://investors.broadcom.com/static-files/01bb84ad-dd06-4dd2-8681-248cc83ca8be
- Marvell EX-99.1 Celestial close: https://www.sec.gov/Archives/edgar/data/1835632/000119312526032861/d45933dex991.htm
- TSMC 2025 AR: https://investor.tsmc.com/static/annualReports/2025/english/index.html
- NVIDIA Lumentum PR: https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Strategic-Partnership-With-Lumentum-to-Develop-State-of-the-Art-Optics-Technology/default.aspx
- NVIDIA Spectrum-X Photonics production: https://blogs.nvidia.com/blog/nvidia-gtc-taipei-computex-2026-news/

**Market data**

- Yahoo Finance quote + key-statistics pages for AVGO, NVDA, MRVL, TSM, COHR, LITE, CIEN, GLW, FN, AAOI, CRDO, LWLG, POET, 300308.SZ, 300502.SZ, 5801.T, 5802.T, 5803.T

**Research-house (estimates, not filings)**

- TrendForce 2026-06-15: https://www.trendforce.com/presscenter/news/20260615-13098.html
- TrendForce 2026-07-27: https://www.trendforce.com/presscenter/news/20260727-13151.html

**FX**

- PBOC USD/CNY 6.7829 on 2026-09-02: https://www.chinanews.com.cn/cj/2026/09-02/10688420.shtml

**Transcripts**

- Lumentum Q4 FY26: https://www.roic.ai/quote/LITE/transcripts/2026-year/4-quarter
- Corning Q2 2026: https://stockanalysis.com/stocks/glw/transcripts/656105-q2-2026/
- TSMC Q2 2026 (Investing.com)

End of file. All percentages and dollars above are either filing/Yahoo/company-call figures with dates, or are explicitly marked **estimate** / **not in the record**.
