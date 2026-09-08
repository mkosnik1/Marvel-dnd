from pathlib import Path
import argparse
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / "data" / "characters"
INDEX = DIR / "index.json"


def build_registry():
    files = sorted(p for p in DIR.glob("*.json") if p.name != "index.json")
    ids = []
    seen = set()

    for path in files:
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception as exc:
            raise SystemExit(f"Błędny JSON w {path.name}: {exc}")

        cid = data.get("id")
        if not cid:
            raise SystemExit(f"Brak id w {path.name}")
        if path.stem != cid:
            raise SystemExit(
                f"{path.name}: id={cid!r} musi być takie samo jak nazwa pliku {path.stem!r}"
            )
        if cid in seen:
            raise SystemExit(f"Powtórzone id: {cid}")

        seen.add(cid)
        ids.append(cid)

    return {"characters": ids}


def main():
    parser = argparse.ArgumentParser(
        description="Buduje lub sprawdza data/characters/index.json."
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Nie zapisuj pliku; zakończ błędem, jeśli index.json jest nieaktualny.",
    )
    args = parser.parse_args()

    expected = build_registry()

    if args.check:
        if not INDEX.exists():
            print("BŁĄD: brak data/characters/index.json")
            return 1
        try:
            current = json.loads(INDEX.read_text(encoding="utf-8"))
        except Exception as exc:
            print(f"BŁĄD: nie można odczytać index.json: {exc}")
            return 1

        if current != expected:
            print("BŁĄD: data/characters/index.json jest nieaktualny.")
            print("Uruchom: python tools/rebuild_index.py")
            return 1

        print(f"OK: index.json zawiera {len(expected['characters'])} postaci i jest aktualny.")
        return 0

    INDEX.write_text(
        json.dumps(expected, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Zapisano {len(expected['characters'])} postaci do data/characters/index.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
