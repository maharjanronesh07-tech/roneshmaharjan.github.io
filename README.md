# Ronesh Maharajan — Portfolio

A responsive, accessible, static portfolio website designed for GitHub Pages.

## Included

- Responsive mobile and desktop layouts
- Dark/light theme toggle (preference saved in the browser)
- About, skills, project cards, education journey, contact section
- Footer social icons generated from `config.js`; only configured social profiles appear
- Email link as a backup contact method
- Formspree contact form integration (deliberately disabled until configured)
- Privacy-safe age display: no birth date is included in the public website files
- Optional Cloudflare Worker that calculates age server-side from a secret environment variable
- Optional semester progress estimate when an actual semester start date is configured
- SEO title/description and Open Graph metadata
- Keyboard focus states, skip link, reduced-motion support, honeypot field
- GitHub Pages `CNAME` and `.nojekyll` files

## 1. Preview locally

You can open `index.html` directly for a quick visual preview. For a more accurate local test, run a local static server from this folder, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 2. Configure your details

Edit `config.js`:

- Update `email` and social profile URLs.
- Add real project repository/demo URLs only after those projects are ready.
- Set `education.semesterStartDate` to the real start date in `YYYY-MM-DD` format to enable an estimated semester progress bar. The estimate uses the configured semester duration; it does not know your college's actual exam/calendar dates.
- Do not add passwords, secret API keys, or private information to `config.js`. Everything in a GitHub Pages repository is public.

The date of birth is intentionally not included in this project. A static page cannot calculate an exact age for every visitor from a private birth date without exposing the date or using a server-side service. To keep the date private, use the optional Worker below.

## 3. Configure the contact form (Formspree)

The contact form will **not send** until a provider endpoint is configured. The email link works as a backup even before that.

1. Go to https://formspree.io/ and create an account.
2. Create a form and set the destination to `maharjanronesh7@gmail.com`.
3. Complete any email verification Formspree requests.
4. Copy the form endpoint. It looks like `https://formspree.io/f/abcdefgh`.
5. In `config.js`, set:

   ```js
   formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
   ```

6. Publish the change, then send a test message from your live site.
7. Confirm the message arrives at the destination inbox and check spam. Form delivery depends on your Formspree configuration, verification, and plan limits.

Do not place a private API key in client-side code. The public form endpoint is intended for browser submissions.

## 4. Optional: calculate age without publishing date of birth

This is optional. Without configuring this service, the page displays “Curious / Always learning” rather than a numeric age. This avoids publishing the birth date in the public repository.

The optional Cloudflare Worker is in `worker/`. It reads `BIRTH_DATE` from a server-side secret and returns only the calculated age.

### Deploy the Worker

1. Create a free Cloudflare account at https://dash.cloudflare.com/.
2. Open **Workers & Pages** and create a Worker.
3. Copy the contents of `worker/src/index.js` into the Worker editor, or deploy the included Worker project using Wrangler (see `worker/README.md`).
4. Set a secret named `BIRTH_DATE` in Worker settings, with value `YYYY-MM-DD` for the correct birth date. This secret stays on the server; do not put it in `config.js` or GitHub.
5. Deploy the Worker and copy its HTTPS URL.
6. Set `ageEndpoint` in `config.js` to the deployed Worker URL, e.g. `https://portfolio-age.your-subdomain.workers.dev/`.
7. Publish the updated `config.js` to GitHub Pages and test it. The browser receives only the age, not the date of birth.

The Worker has a basic origin allowlist. Replace the example origin with your actual GitHub Pages origin and, after custom-domain DNS/HTTPS is ready, your custom-domain origin. A browser allowlist is not an access-control mechanism for secret data, but this endpoint only returns age.

## 5. Publish to GitHub Pages

1. Sign in to GitHub and create a **public** repository named exactly:

   `maharjanronesh07-tech.github.io`

   This is the user-site repository format for your GitHub username. If your actual GitHub username differs, use `YOUR-USERNAME.github.io`.

2. Upload all files and folders in this project to the **repository root**. Do not upload the ZIP file as the only repository content.
3. Commit the files to the `main` branch.
4. Open repository **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select branch `main`, folder `/(root)`, then Save.
7. Wait for the workflow/build to finish. Open `https://maharjanronesh07-tech.github.io/`.
8. If the page fails to load, check the repository name, `index.html` location, and Pages deployment status.

Official guide: https://docs.github.com/en/pages/quickstart

## 6. Connect `Roneshmaharajan.com.np`

### Important nameserver distinction

GitHub Pages usually uses DNS **records** (A/AAAA/CNAME), not GitHub-provided nameservers. The `.np` registration page in your screenshot asks for two nameservers. You need a DNS provider that supplies nameservers and lets you create the GitHub Pages DNS records.

A common approach is Cloudflare DNS, subject to current `.np` registry acceptance and your domain's registration requirements:

1. Create a Cloudflare account and add `Roneshmaharajan.com.np` as a site.
2. Cloudflare will show the exact assigned nameservers. Copy those exact hostnames; never guess them.
3. Enter those hostnames in the `.np` application only if the registry's current instructions allow using them before domain registration/delegation. If the registration workflow requires an already delegated/active domain, follow the registry's stated procedure or ask its support for the supported DNS setup. Do not submit fabricated nameservers.
4. In the DNS provider, configure GitHub Pages records. GitHub currently documents apex A records for `@` as:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   Add any recommended AAAA records only if following GitHub's current documentation. Avoid conflicting A/AAAA/CNAME records.

5. In GitHub repository **Settings → Pages → Custom domain**, enter:

   `Roneshmaharajan.com.np`

   Save it and wait for DNS checks. GitHub may create/update a `CNAME` file in the repository; this project already includes one.
6. Wait for DNS propagation, then enable **Enforce HTTPS** when GitHub makes it available.
7. Test both the apex domain and HTTPS URL.

Official GitHub custom domain guide:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages

Official `.np` registry:
https://register.com.np/

**Do not enter `ns1.github.io` or `ns2.github.io` as nameservers.** GitHub Pages is not a DNS nameserver provider. The exact DNS provider nameservers must come from that provider, and the `.np` registry must accept the setup.

## 7. Keep the site current

- Replace placeholder/illustrative project visuals with genuine screenshots when you have them.
- Add your Instagram/LinkedIn/etc. URLs to `config.js` to show their footer icons.
- Update the education semester and real start date in `config.js` when your academic status changes.
- Keep the public email only if you are comfortable receiving unsolicited messages.
- Never commit secrets, passwords, private API keys, or sensitive personal documents.

## Files

- `index.html` — page structure and content
- `styles.css` — responsive styling and themes
- `script.js` — interactions, contact submission, age endpoint and progress calculation
- `config.js` — editable public configuration
- `CNAME` — custom domain for GitHub Pages
- `worker/` — optional server-side age endpoint
