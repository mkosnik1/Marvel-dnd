# Marvel D&D 5e — GitHub Pages v5

Fanowski zestaw interaktywnych kart bohaterów Marvela zbudowany jako w pełni statyczna aplikacja.

## Najważniejsze założenie architektury

**Dane i logika są całkowicie rozdzielone.**

- jeden bohater = jeden plik JSON,
- JavaScript zawiera wyłącznie logikę aplikacji,
- wspólne reguły są w osobnym `rules.json`,
- aplikacja nie wymaga backendu ani procesu buildowania,
- GitHub Actions automatycznie przebudowuje indeks postaci, waliduje dane i publikuje stronę na GitHub Pages.

## Struktura repozytorium

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml
├── css/
│   └── styles.css
├── data/
│   ├── character.schema.json
│   ├── rules.json
│   └── characters/
│       ├── index.json
│       ├── cap.json
│       ├── ironman.json
│       ├── thor.json
│       └── ...
├── js/
│   ├── app.js
│   ├── data-loader.js
│   ├── render.js
│   └── state.js
├── tools/
│   ├── rebuild_index.py
│   └── validate.py
├── .gitignore
├── .nojekyll
├── GITHUB_PAGES.md
├── index.html
├── start-server.bat
└── start-server.sh
```

## Edycja bohatera

Przykład: Iron Man znajduje się wyłącznie w:

```text
data/characters/ironman.json
```

Nie musisz edytować plików JS po zmianie jego statystyk, czarów, cech ani zasobów.

## Dodawanie nowej postaci

1. Skopiuj jeden plik z `data/characters/`.
2. Nadaj nowe, unikalne `id`.
3. Nazwij plik dokładnie tak samo jak `id`, np. `spiderwoman.json`.
4. Uzupełnij dane.
5. Lokalnie możesz uruchomić:

```bash
python tools/rebuild_index.py
python tools/validate.py
```

Przy wdrożeniu na GitHub Pages workflow przebudowuje `index.json` automatycznie, więc nowy JSON nie zniknie ze strony tylko dlatego, że zapomniałeś odświeżyć indeks przed pushem.

## Sprawdzanie repozytorium

Sprawdzenie danych:

```bash
python tools/validate.py
```

Sprawdzenie, czy lista bohaterów jest aktualna:

```bash
python tools/rebuild_index.py --check
```

Automatyczna aktualizacja listy:

```bash
python tools/rebuild_index.py
```

## Uruchomienie lokalne

Aplikacja używa `fetch()`, dlatego najlepiej uruchamiać ją przez HTTP zamiast otwierać `index.html` jako `file://`.

Windows:

```text
start-server.bat
```

macOS / Linux:

```bash
./start-server.sh
```

Następnie otwórz:

```text
http://localhost:8000
```

## GitHub Pages

Repozytorium zawiera gotowy workflow `.github/workflows/pages.yml`.
Pełna instrukcja pierwszej publikacji znajduje się w [GITHUB_PAGES.md](GITHUB_PAGES.md).

W skrócie: wrzuć repo na GitHub, wejdź w **Settings → Pages**, ustaw **Source: GitHub Actions** i zrób push do `main`.

## Dane gracza

Liczniki HP/slotów/zasobów używają `localStorage`, więc są zapisywane w konkretnej przeglądarce. Nie są synchronizowane pomiędzy urządzeniami.

## Uwaga prawna

To fanowski, nieoficjalny projekt przeznaczony do prywatnej gry. Nazwy i postacie Marvela należą do ich odpowiednich właścicieli. Projekt nie jest powiązany z Marvel ani Disney.
