# Ahtasham Anjum, portfolio website

Next.js 14 (App Router), React 18, Tailwind CSS and Framer Motion. It exports to a fully static site, so it hosts anywhere for free.

## Notes from testing

- Project pages: the dev server (`npm run dev`) used to return an error on every project page because of a `dynamicParams` setting in `src/app/work/[slug]/page.tsx`. That setting is removed, and all nine project pages load in both dev and the built site.
- Each page of the built site was loaded and hydrated in a simulated browser with no runtime errors, and every project card was clicked through from Home and Work.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # creates the static site in /out
```

## Put it online (free Vercel address)

1. Create a free account at vercel.com.
2. Easiest: install the CLI and run `npx vercel` inside this folder, or push the folder to GitHub and import the repo in Vercel. No settings are needed.
3. After you get your address (for example `your-name.vercel.app`), add an environment variable `NEXT_PUBLIC_SITE_URL` with that address in Vercel (Project, Settings, Environment Variables) and redeploy. This makes the link preview image work when you share the site.

No server is needed. You can also upload the contents of `/out` to Netlify Drop or any static host.

## Update by pushing code (Cloudflare Pages or Netlify)

1. Create a GitHub repository and push this folder to it (`.gitignore` is already set up).
2. In Cloudflare Pages (or Netlify) choose "Connect to Git" and select the repository.
3. Build command: `npm run build`. Output directory: `out`. If the build complains about the Node version, add the environment variable `NODE_VERSION` = `20`.
4. Add `NEXT_PUBLIC_SITE_URL` = your live address (for example `https://your-project.pages.dev`) and redeploy once so the link preview image works.
5. From then on: edit, then `git add . && git commit -m "update" && git push`. The site rebuilds and goes live by itself.

## Turn on the contact form

The form sends email through Web3Forms (free plan, 250 messages a month, no server needed).

1. Go to web3forms.com, enter the email address that should receive messages, and copy the access key they email you. The key is meant to be public.
2. In Cloudflare Pages add the environment variable `NEXT_PUBLIC_WEB3FORMS_KEY` with that key, then redeploy. For local testing put it in a `.env.local` file.
3. Send yourself a test message. Until the key is added, the Contact page says the form is not switched on and shows your email instead, so it never pretends to work.

Spam protection: a hidden honeypot field plus Web3Forms' own spam check. If spam ever becomes a problem, Web3Forms offers a free hCaptcha you can switch on in its dashboard.

## Where things live

| What | Where |
|---|---|
| Project text, labels, captions, screen order | `src/data/projects.ts` |
| Each project's type, challenge, role and outcome text | `src/data/details.ts` |
| Logo files (SVG and PNG, light and dark) | `public/logo*.svg`, rebuild with `python3 scripts/make_logo.py` |
| Bio, experience, skills, tools, contact details | `src/data/site.ts` |
| Colors and fonts | `tailwind.config.ts`, `src/app/globals.css` |
| The hero animation | `src/components/Hero.tsx` |
| Scroll-driven screen walkthroughs | `src/components/ScrollStory.tsx` |
| Résumé PDF | `public/Ahtasham-Anjum-Resume.pdf` (replace the file, keep the name) |

## Replacing images

All images in `public/images` were generated from your original exports by `scripts/prepare_images.py`, which also builds the project covers, hero thumbnails and social preview.

1. Put corrected exports in a folder that mirrors your original zip (same folder and file names).
2. `pip install pillow numpy`
3. `SRC=/path/to/Porfolio_Images npm run images`
4. `npm run build`

Add or remove screens by editing the lists at the top of the script and the matching entries in `src/data/projects.ts`.

## Things to fix in the source designs

- **BUFF and Facebloom** use store listing images that are only 230px wide, so they look soft on high-resolution screens. Screenshots from the live apps on your phone would replace them.
- **Live Session Dashboard**: the original brand logo was replaced with a neutral "Session Lab" mark. The table repeats the same row (Sarah J., P-1024), the side panel shows 55% for 12 of 20 questions (that is 60%), and the table row says question 3/20 while the panel says 12/20.
- **Heraf** screens still show dates from 2021 and 2022 inside the interface. Neutral dates would keep them from dating the work.
- **MoodBites**: the login screen is left out because it shows a real phone number.
- **Facebloom**: screens 2 and 5 are left out because they show celebrity and third-party faces.
- **Résumé PDF** still contains a Behance link and the Wearpik dates. Update it when you update the résumé.
