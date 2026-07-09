# ClientHuntrs Website

A single-file, dependency-free website (`index.html`) built to replace the current
Framer site, styled with the same bold/direct sales-brand energy as
thesalesguy.com.au, using ClientHuntrs' own content, testimonials, and contact details.

## What's in this folder
- `index.html` — the whole site (HTML + CSS + JS in one file, no build step needed)
- `CNAME` — tells GitHub Pages which custom domain to serve the site on

## Things to double-check / personalise before going live
- **Email address**: placeholder is `hello@clienthuntrs.com.au` — swap for the real inbox.
- **Booking link**: the "Open Booking Calendar" button and CTA links point to `#`.
  Replace with your real Calendly (or other scheduler) link, or uncomment the
  Calendly embed snippet left as a comment near the booking card in `index.html`.
- **Logo**: currently text-based ("Client**Huntrs**"). Swap in your own logo image if you have one.
- **FAQ answers** for "How soon can I expect results," "Do I need to provide anything,"
  and "How ClientHuntrs is different" were written to match your brand since the
  original site's answers weren't publicly visible — review and adjust the wording.

## Deploying on GitHub Pages

1. Create a new GitHub repository (e.g. `clienthuntrs-site`).
2. Upload `index.html` and `CNAME` to the root of the repo (or `git push` them).
3. In the repo: **Settings → Pages**.
   - Source: "Deploy from a branch"
   - Branch: `main` (or `master`), folder `/ (root)`
   - Save.
4. GitHub will give you a URL like `https://yourusername.github.io/clienthuntrs-site/`.
   Confirm the site loads there first.

## Connecting your domain (clienthuntrs.com.au)

The `CNAME` file is already set to `www.clienthuntrs.com.au`. At your domain
registrar (wherever clienthuntrs.com.au is managed — GoDaddy, Crazy Domains,
VentraIP, etc.), add these DNS records:

**For the `www` subdomain (recommended, matches the CNAME file):**
| Type  | Host / Name | Value                       |
|-------|-------------|------------------------------|
| CNAME | www         | `yourusername.github.io`    |

**For the root/apex domain (`clienthuntrs.com.au` without www)** — so it also
works if someone leaves off "www" — add A records pointing at GitHub Pages' IPs:
| Type | Host / Name | Value           |
|------|-------------|-----------------|
| A    | @           | 185.199.108.153 |
| A    | @           | 185.199.109.153 |
| A    | @           | 185.199.110.153 |
| A    | @           | 185.199.111.153 |

Then in **Settings → Pages → Custom domain**, enter `www.clienthuntrs.com.au`,
save, and tick **Enforce HTTPS** once it becomes available (can take a few
minutes up to ~24 hours for the SSL certificate to issue).

DNS changes can take anywhere from a few minutes to 24–48 hours to propagate
fully, depending on the registrar.

## Notes
- No contact form backend is included, since GitHub Pages only serves static
  files (no server-side code). The Contact section instead links to a phone
  number, email, and a booking-calendar button — swap the booking button for a
  real scheduler link (Calendly, Cal.com, etc.) to keep it fully self-serve.
- All fonts load from Google Fonts via CDN at runtime, so no extra files are needed.
