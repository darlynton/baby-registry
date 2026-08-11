# Memorial experience

The memorial page is available at `memorial.html`. The host-routing snippet in `index.html` sends `remember.mylittlestarwish.com` to that page while the existing registry remains at the root domain.

## Content configuration

Edit `data/memorial.json` to change the deceased person's `name`, `dates`, `photo`, `biography`, `quote`, family introduction, bank details, quick support amounts, and registry URL. The page includes a safe fallback object in `js/memorial.js` so it still works when opened directly with `file://` and the JSON fetch is blocked.

Add the deceased person's photograph under `img/` and set `deceased.photo` to its relative path. The default empty value intentionally shows a quiet placeholder rather than stock funeral imagery.

## Support and messages

Support is manual bank transfer only. The WhatsApp link is generated in the browser and includes an optional selected amount. No payment gateway or secret is used.

Because GitHub Pages is static, condolence submissions are stored as `pending` records in browser `localStorage`; they are not publicly published automatically. On the device used to receive submissions, use **Export pending messages** to download a JSON file, review/moderate it, and copy approved records into `approvedMessages` in `data/memorial.json` before publishing.

## Subdomain deployment

Keep `CNAME` set to `mylittlestarwish.com` so the existing registry is not displaced. Configure the DNS/hosting layer for `remember.mylittlestarwish.com` to serve the same repository output, or deploy the same static files to a second Pages target for that subdomain. Once the request reaches this output, host routing sends the memorial hostname to `memorial.html`.

If the chosen GitHub Pages setup cannot serve both custom hostnames from one site, use a static redirect/proxy at the subdomain or a second Pages site; do not replace the root registry domain.
