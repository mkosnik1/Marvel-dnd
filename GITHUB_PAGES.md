# Publikacja na GitHub Pages

Repozytorium jest przygotowane do automatycznego wdrażania przez GitHub Actions.
Nie trzeba kopiować plików do `docs/` ani utrzymywać osobnej gałęzi `gh-pages`.

## Pierwsze uruchomienie

1. Utwórz nowe repozytorium na GitHubie, np. `marvel-dnd`.
2. Wrzuć **całą zawartość tego katalogu** do głównego katalogu repozytorium.
3. Upewnij się, że domyślna gałąź nazywa się `main`.
4. Wejdź w **Settings → Pages**.
5. W sekcji **Build and deployment → Source** wybierz **GitHub Actions**.
6. Zrób push do `main` albo uruchom workflow ręcznie z zakładki **Actions**.

Workflow `.github/workflows/pages.yml`:
- automatycznie przebudowuje `data/characters/index.json` na podstawie plików bohaterów,
- waliduje wszystkie pliki bohaterów,
- pakuje tylko pliki potrzebne stronie (`index.html`, `css/`, `js/`, `data/`),
- publikuje wynik na GitHub Pages.

## Dodawanie bohatera

1. Dodaj `data/characters/moj-bohater.json`.
2. Pole `id` musi mieć wartość `moj-bohater`.
3. Uruchom lokalnie:

```bash
python tools/rebuild_index.py
python tools/validate.py
```

4. Commit i push.

Jeśli zapomnisz przebudować `index.json` lokalnie, workflow zrobi to automatycznie przed publikacją. `rebuild_index.py --check` nadal przydaje się jako lokalna kontrola przed commitem.

## Lokalny podgląd

Windows:

```text
start-server.bat
```

macOS / Linux:

```bash
./start-server.sh
```

Następnie otwórz `http://localhost:8000`.

## Dlaczego ścieżki działają w repozytorium projektowym?

Aplikacja korzysta ze ścieżek względnych, np. `data/characters/ironman.json`, a nie z `/data/...`.
Dzięki temu działa zarówno pod domeną główną, jak i pod adresem w rodzaju:

```text
https://twoj-login.github.io/marvel-dnd/
```
