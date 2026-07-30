# Akash S — Portfolio

A single-page, fully responsive portfolio built with plain HTML/CSS/JS (no build step required),
so it deploys anywhere instantly — including Vercel as a static site.

## Structure
```
portfolio/
├── index.html          # All sections: hero, about, skills, experience, projects, certs, achievements, contact
├── css/style.css        # Design tokens, layout, components, responsive rules
├── js/script.js          # Particle canvas, typing effect, counters, skills filter, scroll reveal, form
├── assets/
│   └── Akash_S_Resume.pdf   # Downloadable resume (from your uploaded resume)
└── README.md
```

## Run locally
Just open `index.html` in a browser, or serve it:
```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → Import the repo.
3. Framework preset: **Other** (static site). No build command needed.
4. Deploy.

Or with the CLI:
```bash
npm i -g vercel
vercel
```

## Customize
- **Photo**: replace the placeholder in the About section (`.about-photo-placeholder` in `index.html`) with an `<img>` tag pointing to a real photo in `assets/`.
- **Project screenshots**: replace `.project-shot-placeholder` blocks with real `<img>` screenshots.
- **Colors**: all theme colors live as CSS custom properties at the top of `css/style.css` (`--primary`, `--secondary`, `--accent`, `--bg`).
- **Contact form**: currently a client-side demo (no backend). To make it functional, wire it to a service like Formspree, EmailJS, or your own API endpoint inside `js/script.js`.
- **Resume**: swap `assets/Akash_S_Resume.pdf` with an updated export whenever your resume changes.

## Notes on scope
The original brief called for a Next.js/TypeScript/Framer Motion/Three.js/GSAP stack. This build delivers the
same visual outcome — dark glassmorphic theme, particle hero, scroll-reveal animations, typing effect, animated
counters/metrics, filterable skills grid, accordion project detail, timeline sections — as a dependency-free
static site, so it's zero-config to run and deploy. If you'd like, this can be ported into a Next.js + TypeScript
+ Framer Motion codebase next.
