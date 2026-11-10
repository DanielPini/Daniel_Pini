# danielpini.com

Personal site of Daniel Pini, full-stack software engineer, and CEO and co-founder of [caedux](https://caedux.com).

Static HTML and CSS, with a small amount of TypeScript. There's no framework and no bundler. It's built with `tsc` and deployed to GitHub Pages by GitHub Actions.

## Pages

| Path | What it is |
|---|---|
| `/` | Overview |
| `/work/` | Ventures, Runway Journal works and client projects |
| `/music/` | Music and culture |
| `/cv/` | Software CV, with PDF |
| `/music/cv/` | Music CV, with PDF |
| `/ndac/` | *Navigating Distance and Closeness*, linked from fable-arts.com. **Don't move or edit it.** |

## Develop

```sh
npm install
npm run dev     # tsc --watch: compiles src/ to assets/js/
```

Then open `index.html` with VS Code's Live Preview or Live Server. The site uses root paths (`/assets/...`), so serve the repository folder as the site root.

```sh
npm run check   # type-check only
npm run build   # compile once
```

## Structure

```
src/main.ts           Work and Music list behaviour, homepage name detail
assets/css/site.css   All styles
assets/fonts/         Instrument Sans (SIL Open Font Licence)
assets/img, video/    Media
assets/*.pdf          CVs, printed from /cv/ and /music/cv/
```

To update a CV PDF, edit the HTML page, then print it to PDF from Chrome (A4, no headers or footers), or run:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --print-to-pdf=assets/daniel-pini-cv.pdf http://localhost:3000/cv/
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`. The workflow:

1. compiles the TypeScript
2. copies only the published files into `_site/`
3. checks that every file in `ndac/` arrived intact
4. deploys to GitHub Pages

GitHub Pages must be set to deploy from **GitHub Actions**.
