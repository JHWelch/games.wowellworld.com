# games.wowellworld.com

Simple Vue app for linking to daily games in one place.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Generate PWA Assets

This will generate all proper asset icons for the PWA. The source icon is located at `public/icon.svg`.

```bash
npm run generate-pwa-assets
```

## Build for Production

This site is automatically deployed to GitHub Pages using [GitHub Actions](./.github/workflows/deploy.yml).

It can be manually built to the `dist` directory using

```bash
npm run build
```

## Testing

```bash
npm run test
```

## Linting & Fixing

```sh
npm run lint
```

```sh
npm run fix
```
