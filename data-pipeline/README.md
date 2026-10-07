# data-pipeline — regenerate the website data

Turns the research files in this folder's parent into the JSON used by `gujjify-website/src/data/`.
Run from this folder with Python 3.11+ (standard library only).

```powershell
python parse_programs.py                                   # Extracted_Features_All_Programs.txt -> programs.json + provinces.json
python simplify_geo.py inputs/china_full.json ../gujjify-website/src/data/provinces.json ../gujjify-website/src/data/china-provinces.geo.json
python build_site_data.py                                  # -> site.json, tools.json, meta.json
cd ../gujjify-website; npm run typecheck                    # validates the JSON against src/types/data.ts
```

| Script | Reads | Writes |
|---|---|---|
| `parse_programs.py` | `../Extracted_Features_All_Programs.txt` | `programs.json`, `provinces.json` (prints a QA report) |
| `simplify_geo.py` | `inputs/china_full.json` (DataV GeoAtlas), `provinces.json` | `china-provinces.geo.json` (simplified, English names, programme counts) |
| `build_site_data.py` | `programs.json`, `provinces.json`, `inputs/fx_cny.json`, `../Gujjify_Keyword_Research_Global.csv`, `inputs/old-site-posts/*.html` | `site.json`, `tools.json`, `meta.json` |
| `fee_stats.py` | `programs.json` | prints fee / stipend / requirement statistics |
| `kw_deep.py` | both keyword CSVs | prints tool demand by region and local-language seeds |

Notes
- When new brochures arrive: update `Extracted_Features_All_Programs.txt` (same block format), re-run, check the
  QA report (`missing location`, `no majors`), then push the website repo and **Pull** in AI Studio.
- Curated per-programme facts (language minimums, stipends, age limits, 2025 deadlines, overrides) live in
  dictionaries near the top of `parse_programs.py` — they mirror SECTION 11 of the programmes file.
- `inputs/fx_cny.json` is the offline fallback for exchange rates (2026-10-06); the website fetches live rates.
- Site copy (services, FAQ, legal, SEO, WhatsApp messages) is authored inside `build_site_data.py`.
- University names must never be added back to the data.
