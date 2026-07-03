# GTA VI Map

**GTA VI Map** — pre-launch interactive map for **Grand Theft Auto VI** — a community location guide for Leonida, inspired by [RDO Map](https://jeanropke.github.io/RDOMap/).

Live site: `https://<your-username>.github.io/GTAVIMap/`

Currently in **countdown mode** until November 19, 2026. The UI shell is live; official map tiles and location data will be added at release.

## GitHub Pages setup

1. Create a GitHub repo named **`GTAVIMap`** (name must match `base` in `vite.config.js`).
2. Push this project to the `main` branch.
3. In the repo go to **Settings → Pages → Build and deployment** and set source to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes automatically on every push to `main`.

If you use a different repo name, update `base` in `vite.config.js` to `/<your-repo-name>/`.

## Local build (optional)

```bash
npm install
npm run build
```

Static output is in `dist/`.

## Roadmap

- [x] GTA VI campaign-themed placeholder UI
- [x] Countdown to release
- [x] Interactive map shell (pan/zoom, sidebar categories)
- [x] GitHub Pages deployment
- [ ] Official map tiles at launch
- [ ] Collectibles, missions, and location markers
- [ ] User pins and settings (RDO Map parity)

---

*Fan project. Not affiliated with Rockstar Games or Take-Two Interactive.*