# Studio Vibhor Sogani — Index Page

React + Vite + Tailwind CSS v4 + GSAP.

## Setup
```
npm install
npm run dev
```

## What's included
- Loading screen: liquid-bronze drip animation that resolves into the "Sogani" wordmark, then hands off into the header logo (GSAP timeline in `src/components/Loader.jsx`).
- Header with the 6 nav items you listed (Home, About, Installation Arts, News, Media, Contact) — plain in-page anchors (`#about`, `#installations`, etc.), no router since this is index-only for now. Swap to react-router-dom later when you add real routes.
- Hero / carousel with autoplay + manual dots.
- About, Installations (asymmetric gallery grid), Process (materials/process strip), News + Media, Newsletter, Contact, and a large `sogani.design` banner footer.
- Two button variants in `src/components/Buttons.jsx`: `PrimaryButton` (solid bronze, wipes to ink on hover) and `GhostButton` (outline, fills bronze on hover). Reused everywhere.

## Design tokens (src/index.css)
- Colors: ink `#0b0a08`, surface `#15130e` / `#1d1a13`, bronze `#b08d57`, bronze-light `#d9c8a8`, ember `#8a3b2b`, parchment `#efe7d8`, mute `#9c9484`.
- Type: Fraunces (display) + Inter (body), loaded via Google Fonts in `index.css`.
- Placeholder images are from picsum.photos (seeded, so they're stable) — swap for real studio photography in each component.

## Next steps (as you build the other pages)
- Add react-router-dom, replace the `#anchor` hrefs in `Header.jsx` with real routes.
- Move the loader's logo hand-off so it also plays on route change if you want it site-wide, not just first load.
