from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / "data" / "characters"
INDEX = DIR / "index.json"
RULES = ROOT / "data" / "rules.json"

REQUIRED = {
    "id", "name", "realName", "race", "raceRules", "cls", "subclass",
    "stats", "ac", "speed", "group", "originFeatures",
    "classFeaturesDetailed", "subclassFeaturesDetailed",
    "spellSlotsDetailed", "spellsDetailed", "resources"
}
ABILITIES = {"STR", "DEX", "CON", "INT", "WIS", "CHA"}
ALLOWED_GROUPS = {"Mutanci", "Małe ziemniaczki", "Duże ziemniaczki"}

errors = []

try:
    registry_data = json.loads(INDEX.read_text(encoding="utf-8"))
    registry = registry_data["characters"]
except Exception as exc:
    print(f"BŁĄD: nie można odczytać index.json: {exc}")
    sys.exit(1)

try:
    json.loads(RULES.read_text(encoding="utf-8"))
except Exception as exc:
    errors.append(f"rules.json: błędny JSON: {exc}")

if len(registry) != len(set(registry)):
    errors.append("index.json zawiera powtórzone ID")

for cid in registry:
    path = DIR / f"{cid}.json"
    if not path.exists():
        errors.append(f"Brak pliku: {path.name}")
        continue

    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"{path.name}: błędny JSON: {exc}")
        continue

    if data.get("id") != cid:
        errors.append(f"{path.name}: id={data.get('id')!r}, oczekiwano {cid!r}")

    missing = REQUIRED - set(data)
    if missing:
        errors.append(f"{path.name}: brakuje pól {sorted(missing)}")

    if set(data.get("stats", {})) != ABILITIES:
        errors.append(f"{path.name}: stats muszą zawierać dokładnie {sorted(ABILITIES)}")

    if data.get("group") not in ALLOWED_GROUPS:
        errors.append(
            f"{path.name}: nieznana kategoria {data.get('group')!r}; "
            f"dozwolone: {sorted(ALLOWED_GROUPS)}"
        )

    if not isinstance(data.get("spellsDetailed", []), list):
        errors.append(f"{path.name}: spellsDetailed musi być listą")
    else:
        for i, spell in enumerate(data.get("spellsDetailed", [])):
            if not isinstance(spell, dict):
                errors.append(f"{path.name}: spellsDetailed[{i}] nie jest obiektem")
                continue
            if "name" not in spell or "level" not in spell:
                errors.append(f"{path.name}: spellsDetailed[{i}] wymaga name i level")

    if not isinstance(data.get("resources", []), list):
        errors.append(f"{path.name}: resources musi być listą")

actual = {p.stem for p in DIR.glob("*.json") if p.name != "index.json"}
indexed = set(registry)

extra = actual - indexed
missing_files = indexed - actual
if extra:
    errors.append(f"Pliki nieuwzględnione w index.json: {sorted(extra)}")
if missing_files:
    errors.append(f"ID bez odpowiadającego pliku: {sorted(missing_files)}")

if errors:
    print("BŁĘDY:")
    for error in errors:
        print("-", error)
    sys.exit(1)

print(f"OK: {len(registry)} postaci, wszystkie pliki wyglądają poprawnie.")
