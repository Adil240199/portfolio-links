# Online Zoo

Static frontend project with two pages:
- main page (`pages/main/index.html`)
- donate page (`pages/donate/index.html`)

## Run locally

1. Open project folder in Cursor.
2. Run in terminal from `online-zoo`:

```bash
py -m http.server 5500
```

3. Open in browser:
- `http://localhost:5500/pages/main/index.html`
- `http://localhost:5500/pages/donate/index.html`

## Project structure

- `pages/main/` - main page HTML/CSS/JS
- `pages/donate/` - donate page HTML/CSS/JS
- `pages/**/assets/` - images and icons

## Recent improvements

- Fixed hover logic bugs and reduced JS duplication in:
  - `pages/main/index.js`
  - `pages/donate/index.js`
- Improved HTML semantics and accessibility:
  - corrected broken closing tags in tablet menu
  - replaced invalid `button > a` patterns with links styled as buttons
  - added burger menu keyboard support (`Enter`, `Space`, `Escape`)
  - added `aria-controls` and `aria-expanded` handling
- Cleaned up content issues:
  - fixed obvious typos in buttons/social alt text/testimonials
  - normalized donate link paths
  - removed duplicate stylesheet include in donate page
