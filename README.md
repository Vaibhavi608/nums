How to publish this static React demo to GitHub Pages

This repository contains a single static HTML page (`index.html`) that inlines a small React app using CDN versions of React and Babel.

Why this works without installing React/Vite

- `index.html` loads React and ReactDOM from a CDN (unpkg). No local npm install required.
- Babel standalone transpiles JSX in the browser at runtime (via `<script type="text/babel">`).
- Tailwind is loaded via CDN for the demo styles.

Important limitations

- In-browser Babel is slow and meant only for demos and prototypes. Not for production.
- Large files or many components will increase page load times.
- Using CDN-hosted libraries requires internet access.

Steps to publish on GitHub Pages

1. Create a new repository on GitHub (or use an existing one). Name it as you like.
2. Commit and push the contents of this `nums` folder (ensure `index.html` is at the repo root).

   # Example (PowerShell)

   cd path\to\nums
   git init
   git add .
   git commit -m "Initial static demo"
   git branch -M main
   git remote add origin https://github.com/<your-user>/<your-repo>.git
   git push -u origin main

3. On GitHub, go to Settings → Pages (or Settings → Code and automation → Pages). Set the source to the `main` branch and root folder (`/`). Save.
4. GitHub will build/serve the static files. After a minute or two, your site will be available at `https://<your-user>.github.io/<your-repo>/`.

Quick local test

- Open `index.html` in a browser directly (double-click). Some browsers may block local storage for file:// pages. Recommended: Serve locally with a tiny static server (not required):

  # Python 3

  python -m http.server 8000

Then open: http://localhost:8000

Next steps and suggestions

- If you later want a faster, production-ready build, consider using Vite or Create React App and deploy the built `dist`/`build` folder to GitHub Pages.
- To remove Babel-in-browser, precompile your JSX into plain JS and reference it with a normal `<script>` tag.

If you'd like, I can:

- Create a clean, smaller `index.html` that only includes a single component.
- Add a tiny `deploy` script or GitHub Action to auto-deploy to Pages.
