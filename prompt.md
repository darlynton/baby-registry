COMPLETE AI BUILD PROMPT

ROLE & CONTEXT
You are a senior front-end engineer and UX-focused product designer.
You will build a premium baby registry microsite for a family in Nigeria.
The site must feel elegant, emotional, and modern, not playful or childish.
This is a static website with no backend, designed to be hosted on GitHub Pages.
All logic must run client-side.
Payments are manual bank transfers only — no Paystack, no Flutterwave.

⸻

🎯 OBJECTIVE

Build a fully functional, polished baby registry website using HTML, CSS, and JavaScript (or a lightweight framework if helpful).

The output must be:
	•	Complete
	•	Error-free
	•	Ready to deploy on GitHub Pages
	•	Mobile-first
	•	Cleanly structured
	•	Easy to edit manually

⸻

🧱 TECH CONSTRAINTS (STRICT)
	•	No backend
	•	No server-side code
	•	No build tools required to run (Vite/Parcel allowed only if output is plain static files)
	•	Must work by opening index.html
	•	All data must be stored in JSON or JS objects
	•	No external paid services

⸻

📁 REQUIRED FILE STRUCTURE

index.html
│
├─ Hero / Welcome
├─ Parents’ note
├─ Registry (cards + categories)
├─ Contribution (bank details)
├─ Messages for Baby
└─ Thank you / Footer

DESIGN & UX REQUIREMENTS

Design direction:
	•	Elegant
	•	Calm
	•	Premium
	•	Neutral colour palette (cream, beige, sage, muted grey)
	•	No bright colours
	•	No cartoon icons

Typography:
	•	Serif font for headings (e.g. Playfair Display / Libre Baskerville)
	•	Clean sans-serif for body text (e.g. Inter / Source Sans)
	•	Proper typographic scale

UX:
	•	Mobile-first
	•	Large tap targets
	•	Sticky primary CTA (“Send a Gift”)
	•	Smooth, subtle animations (CSS only)
	•	Accessible contrast and semantic HTML

⸻

🏠 HOME PAGE CONTENT

Include:
	•	Baby name (placeholder)
	•	Due date (placeholder)
	•	Short emotional welcome message
	•	CTA buttons:
	•	“View Registry”
	•	“Send a Gift”
	•	Optional photo gallery section (placeholder images)
	•	Parents’ note section

⸻

🎁 REGISTRY  (CRITICAL)

Registry items must:
	•	Load dynamically from data/registry.json
	•	Be grouped by category
	•	Display:
	•	Name
	•	Short description
	•	Status badge: Available / Gifted
	•	Have no visible prices
	•	Allow manual status updates via JSON
	•	Be visually card-based and elegant

No checkout. No reservation system.

⸻

💸 CONTRIBUTION SECTION

Must include:
	•	Nigerian bank transfer section
	•	Clearly formatted account details:
	•	Bank name
	•	Account name
	•	Account number
	•	Copy-to-clipboard button
	•	WhatsApp deep link with pre-filled message:
“Hello, I’ve sent a gift for the baby 💛”

Tone must feel tasteful, not transactional.

⸻

💌 MESSAGES FOR BABY

Implement one of the following:
	•	WhatsApp message link with prefilled message
OR
	•	Embedded Google Form placeholder (no backend)

Include:
	•	Explanation text
	•	CTA button
	•	Instructions for parents to later export messages


JAVASCRIPT REQUIREMENTS

JavaScript must:
	•	Load and render registry items from JSON
	•	Handle category filtering
	•	Handle copy-to-clipboard
	•	Handle simple UI interactions
	•	Fail gracefully if JS is disabled

registry.json SAMPLE DATA

You must include realistic placeholder data:
	•	6–10 items
	•	Multiple categories
	•	Mixed statuses

CODE QUALITY REQUIREMENTS
	•	Clean, commented code
	•	No console errors
	•	No unused variables
	•	No broken links
	•	Semantic HTML
	•	CSS organised by section
	•	JS modular and readable

⸻

🚀 DEPLOYMENT READINESS

The final output must:
	•	Run immediately on GitHub Pages
	•	Require zero configuration
	•	Be editable by a non-developer by updating JSON and text

⸻

🛑 ABSOLUTE DONTs
	•	No emojis overload
	•	No Bootstrap defaults
	•	No lorem ipsum
	•	No payment gateways
	•	No unnecessary libraries
	•	No “TODO” comments

⸻

📦 FINAL OUTPUT FORMAT

Return:
	1.	Full code for every file
	2.	In clearly separated code blocks
	3.	In correct file order
	4.	With short inline comments where needed
	5.	No explanations outside the code unless critical

⸻

Build this as if it will be shared with extended family and friends.
It should feel intentional, loving, and premium — not like a side project.