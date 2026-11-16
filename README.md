# Bilal Hakkul Mubin — Portfolio

A static, text-first portfolio built on **pure HTML, CSS, and JavaScript** —
no database, no backend, no build step. It's organized around real project
management experience: a role timeline and detailed case studies.

## Structure

```
index.html
css/
  └─ style.css
js/
  └─ script.js
```

There are no image or PDF folders — this site is intentionally content-only.

## Editing Content

Everything lives in `index.html`. The sections, in order:

| Section (`id`) | What it contains |
|---|---|
| `#hero` | Name, rotating role tagline, summary, and the animated stats card |
| `#about` | Short bio, core competencies, quick facts |
| `#experience` | Interactive timeline — click "View responsibilities" to expand each role |
| `#case-studies` | GorryWell (tabbed, illustrative/fictional use cases) + SMK Sejahtera and YARSI (real projects, shown in full) |
| `#skills` | Skills grouped by category |
| `#background` | Education and organizational leadership |
| `#contact` | Email (with copy-to-clipboard), location, social links |

Look for `<!-- GANTI: ... -->` comments — these mark spots drafted on your
behalf (e.g. lessons-learned narrative, thesis title, social links) that are
worth double-checking against your own recollection before publishing.

### Things you may want to personalize next

- Add your real **LinkedIn** and **GitHub** URLs in the `#contact` section
  (currently `href="#"`).
- Fill in your **undergraduate thesis title** in the SMK Sejahtera case study
  footnote.
- Review the two "Lessons Learned" paragraphs marked with `GANTI` comments —
  they were drafted to match the structure you provided and should reflect
  your own recollection.
- Decide whether to add a phone number. It was intentionally left out of the
  public contact section to reduce spam exposure — add it next to the email
  in `#contact` if you'd prefer it visible.

## Running Locally

Open `index.html` directly in a browser, or serve it with any static server:

```bash
python -m http.server 5500
# or
npx serve .
```

## Publishing via GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**, branch
   `main`, folder `/ (root)`, then save.
4. The site goes live at `https://<username>.github.io/<repo-name>/`.

Every push updates the live site automatically — no build process required.

## Technical Notes

- Fonts: **Bricolage Grotesque** (display) and **Inter** (body) from Google
  Fonts — requires an internet connection to load.
- All animation respects the OS-level **"Reduce Motion"** setting.
- No frameworks or JS libraries — all interaction (tabs, counters, timeline
  fill, reveal-on-scroll, copy-to-clipboard) is vanilla JavaScript in
  `js/script.js`.
