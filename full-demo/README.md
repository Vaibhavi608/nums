HerLife — Full Vite React Demo

This folder `full-demo` contains a buildable Vite React project that includes a simplified version of your tracker UI.

How it works

- Build happens with Vite. The GitHub Action `deploy-pages.yml` builds `full-demo` and deploys the `dist` directory to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

To run locally (requires Node.js):

```powershell
cd full-demo
npm install
npm run dev
```

To build locally:

```powershell
cd full-demo
npm ci
npm run build
npx vite preview
```

Notes

- This scaffold uses React 18 and Vite. It keeps your original demo intact in the repo root.
- If you'd like, I can add more components from `nums.jsx` into `src/` and wire routing.
