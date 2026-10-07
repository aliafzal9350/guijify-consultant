import csv, collections, os

from pathlib import Path
BASE = str(Path(__file__).resolve().parent.parent)
with open(os.path.join(BASE, "Gujjify_Keyword_Research_Global.csv"), encoding="utf-8-sig") as f:
    g = list(csv.DictReader(f))
with open(os.path.join(BASE, "Gujjify_Keyword_Research_Autocomplete.csv"), encoding="utf-8-sig") as f:
    a = list(csv.DictReader(f))

TOP3 = ["Cost calculator", "University finder / agency no.", "Eligibility checker"]

print("MARKETS (38):", ", ".join(f"{m}({n})" for m, n in collections.Counter(r["market"] for r in g).most_common()))

print("\nTOOL x REGION (keyword counts)")
regions = [r for r, _ in collections.Counter(x["region"] for x in g).most_common()]
tools = [t for t, _ in collections.Counter(x["maps_to_tool"] for x in g).most_common() if t]
print(f"{'tool':<32}" + "".join(f"{r[:10]:>11}" for r in regions))
for t in tools:
    c = collections.Counter(x["region"] for x in g if x["maps_to_tool"] == t)
    print(f"{t:<32}" + "".join(f"{c[r]:>11}" for r in regions))

print("\nMARKETS COVERED per tool:")
for t in tools:
    print(f"  {t:<32} {len(set(x['market'] for x in g if x['maps_to_tool'] == t))} markets")

for t in TOP3:
    rows = [x for x in g if x["maps_to_tool"] == t]
    print(f"\n=== {t}: seeds ->", dict(collections.Counter(x["seed_query"] for x in rows).most_common(8)))
    # most repeated keywords across markets = strongest global demand
    kc = collections.Counter(x["keyword"] for x in rows)
    print("   keywords appearing in the most markets:")
    for k, n in kc.most_common(25):
        print(f"     {n:3d} markets  {k}")

print("\n=== LOCAL-LANGUAGE rows (source = autocomplete local language)")
loc = [x for x in g if x["source"] == "autocomplete local language"]
by = collections.defaultdict(list)
for x in loc:
    by[(x["market"], x["seed_query"])].append(x["keyword"])
for (m, s), ks in sorted(by.items()):
    print(f"  {m:3} seed '{s}': {len(ks)} e.g. {ks[:3]}")

print("\n=== AUTOCOMPLETE (PK): intent x tool")
for t, n in collections.Counter(x["maps_to_tool_or_page"] for x in a).most_common():
    ints = collections.Counter(x["intent"] for x in a if x["maps_to_tool_or_page"] == t).most_common(3)
    print(f"  {n:4d}  {t or '(page/blog)':<34} {ints}")
print("\n  PK cost-calculator keywords sample:", [x["keyword"] for x in a if x["maps_to_tool_or_page"].startswith("Cost")][:25])
print("\n  PK eligibility keywords sample:", [x["keyword"] for x in a if x["maps_to_tool_or_page"] == "Eligibility checker"][:25])
print("\n  PK finder keywords sample:", [x["keyword"] for x in a if x["maps_to_tool_or_page"].startswith("University")][:25])
