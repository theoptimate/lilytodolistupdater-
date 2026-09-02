# Public-company map — 2026-09-02

Calibration notes for the BET-LEDGER. **Not investment advice.** No buy, sell, or size recommendations.

## Deliverables

| File | What it is |
|---|---|
| `public-company-map-2026-09-02.html` | Source for the PDF (flowing prose, one section per shift). |
| `public-company-map-2026-09-02.pdf` | Print of the HTML. |
| `public-company-map-2026-09-02.csv` | One row per company (Steps B/C/F). Empty cells mean not in the record. |
| `build_csv.py` | Regenerates the CSV from the overlay plus `raw/us_quotes_2026-09-02.json`. |
| `raw/` | Working notes and captured Nasdaq/SEC snapshots. |

## Regenerate

```bash
# CSV
python3 build_csv.py

# PDF (Chrome/Chromium headless)
google-chrome --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=public-company-map-2026-09-02.pdf \
  file://$PWD/public-company-map-2026-09-02.html
```

US tape: Nasdaq quote API, morning of 2026-09-02 (pre-open). Yahoo `v7/quote` was blocked from this environment. International multiples labeled Yahoo where used. Access date on every row: 2026-09-02 unless a filing date is given.

SEC companyfacts XBRL dumps (`raw/sec/*_facts.json`, ~121 MB) were fetched for the run and are **not** committed. Latest 10-K/10-Q URLs are in `raw/sec/filings_index.json`.
