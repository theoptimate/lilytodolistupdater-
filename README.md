# Seven Years at Half-Staff

A single-page infographic counting the days the U.S. flag flew at half-staff nationwide,
2019–2025, in the style of a Visual Capitalist chart.

`index.html` is self-contained — no build step, no external data fetch. Open it in a
browser, or publish it as-is.

## The data

The dataset lives inline in `index.html`, in the
`<script type="application/json" id="episodes">` block. Every headline number on the
page (year totals, category shares, longest orders, the hero stats) is computed from
that block at render time, so correcting an entry updates the whole graphic.

Each entry is one continuous half-staff period:

```json
{"y":2021,"s":"2021-03-23","e":"2021-03-27","c":"shooting",
 "t":"Boulder, Colorado supermarket shooting","ev":"boulder","approx":true}
```

| Field | Meaning |
|---|---|
| `y` | Calendar year the period falls in (a period spanning New Year is split in two) |
| `s` / `e` | First and last day at half-staff, inclusive, `YYYY-MM-DD` |
| `c` | `figure`, `shooting`, `pandemic`, `attack`, or `annual` |
| `t` | Label shown on hover |
| `ev` | Groups split entries into one event for the "longest orders" ranking |
| `approx` | Optional. End date is inferred, not confirmed against a proclamation |

### Counting rules

- A calendar day counts once, however many orders cover it.
- Where an event order overlaps a standing observance, the event category wins.
- Standing observances (Flag Code, 4 U.S.C. §7): Peace Officers Memorial Day, Memorial
  Day until noon, the National Fallen Firefighters Memorial Service, Patriot Day and
  Pearl Harbor Remembrance Day.
- Governors' state-level orders are excluded — they are far more numerous and would
  swamp the national picture.

### Verification status

Entries carrying `"approx": true` have an inferred end date and are marked `~` in the
tooltip. Before republishing, check the full list against presidential proclamations in
the Federal Register (`federalregister.gov`, document type "Presidential Document").
The list was compiled without access to that archive, so treat it as a working draft.

## Design notes

- Categorical colours are validated for colour-vision-deficiency separation in both
  light and dark mode; the category order in the `CATS` array is part of that
  validation and should not be reshuffled casually.
- The calendar draws contiguous runs rather than 2,557 individual day cells; the hover
  layer resolves the day from pointer position, so every day is reachable.
