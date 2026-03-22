/* =============================================================
   BABY REGISTRY — main.js
   Modules:
     1. Registry Loader      — fetch + render items from JSON
     2. Category Filters     — filter tabs for registry grid
     3. Progress Bar         — gifted vs available counter
     4. Copy to Clipboard    — account number copy with feedback
     5. Sticky CTA           — show/hide floating button on scroll
     6. Navigation           — glass effect on scroll
     7. Scroll Reveal        — IntersectionObserver fade-in
     8. Item Dialog          — detail modal + gift/bank panel
   =============================================================

   NOTE: When opening via file:// protocol locally, the JSON
   fetch will fail due to browser CORS restrictions. The site
   will gracefully fall back to the embedded REGISTRY_FALLBACK
   data below. Deploy to GitHub Pages (or any static host) for
   full JSON-driven behaviour.
   ============================================================= */


/* ============================================================
   FALLBACK DATA
   Mirrors data/registry.json — used when fetch is unavailable.
   Edit registry.json for production; this serves as a safety net.
   ============================================================ */
const REGISTRY_FALLBACK = [
  {
    id: 2,
    name: "Baby Body Care",
    description: "Gentle skincare essentials formulated to care for baby's delicate skin.",
    category: "Diapering & Care",
    status: "available",
    image: "img/baby-body-care.jpg",
    priceRange: "\u20a650,000"
  },
  {
    id: 5,
    name: "Ingenuity Changing Pad",
    description: "A cushioned, wipe-clean changing pad designed to make diaper changes safer and more comfortable.",
    category: "Diapering & Care",
    status: "available",
    image: "img/changing-pad.jpg",
    priceRange: "\u20a680,000"
  },
  {
    id: 6,
    name: "Tummy Play Mat",
    description: "A padded play mat that supports tummy time and early physical development through safe, supervised play.",
    category: "Clothing & Play",
    status: "available",
    image: "img/tummy-playmat.jpg",
    priceRange: "\u20a6100,000"
  },
  {
    id: 7,
    name: "Baby Monitor",
    description: "A reliable monitor that allows parents to keep an eye and ear on baby while they sleep or rest.",
    category: "Travel & Safety",
    status: "available",
    image: "img/baby-monitor.jpg",
    priceRange: "\u20a6150,000"
  },
  {
    id: 8,
    name: "Tommee Tippee Baby Feeding Bottles & Teats",
    description: "A set of baby-safe bottles and teats designed for comfortable feeding and easy cleaning.",
    category: "Feeding",
    status: "available",
    image: "img/feeding-bottles.jpg",
    priceRange: "\u20a650,000"
  },
  {
    id: 9,
    name: "Diaper Genie / Bin",
    description: "A sealed diaper disposal bin that helps control odours and keeps the nursery clean and hygienic.",
    category: "Diapering & Care",
    status: "gifted",
    image: "img/diaper-genie.jpg",
    priceRange: "\u20a646,000"
  },
  {
    id: 10,
    name: "Ergo Baby Carrier",
    description: "An ergonomic baby carrier designed to support healthy hip positioning while keeping baby close and comfortable.",
    category: "Travel & Safety",
    status: "available",
    image: "img/baby-carrier.jpg",
    priceRange: "\u20a655,000"
  },
  {
    id: 11,
    name: "Skip Hop Diaper Bag",
    description: "A spacious and practical bag designed to carry all baby essentials when travelling or heading out.",
    category: "Travel & Safety",
    status: "gifted",
    image: "img/diaper-bag.jpg",
    priceRange: "\u20a685,000"
  },
  {
    id: 12,
    name: "Toimoys 3-in-1 Bath Set",
    description: "A coordinated bath set designed to support safe and comfortable bathing for baby.",
    category: "Diapering & Care",
    status: "gifted",
    image: "img/bath-set.jpg",
    priceRange: "\u20a6160,000"
  },
  {
    id: 13,
    name: "Tommee Tippee Bottle Sterilizer & Dryer",
    description: "A sterilizing and drying system that helps keep feeding bottles clean and ready for use.",
    category: "Feeding",
    status: "gifted",
    image: "img/bottle-sterilizer.jpg",
    priceRange: "\u20a6120,000"
  },
  {
    id: 4,
    name: "Tommee Tippee Bottle Warmer",
    description: "A convenient bottle warmer designed to gently heat milk and feeds to a suitable temperature.",
    category: "Feeding",
    status: "gifted",
    image: "img/bottle-warmer.jpg",
    priceRange: "\u20a662,000"
  },
  {
    id: 15,
    name: "Insulated Bottle Pouch",
    description: "An insulated bag designed to keep bottles, milk, or snacks cool when travelling.",
    category: "Feeding",
    status: "gifted",
    image: "img/insulated-cooler-bag.jpg",
    priceRange: "\u20a630,000"
  },
  {
    id: 16,
    name: "Kidilo Baby High Chair (Black)",
    description: "A supportive high chair designed to keep baby secure and comfortable during feeding times.",
    category: "Feeding",
    status: "gifted",
    image: "img/high-chair.jpg",
    priceRange: "\u20a6150,000"
  },
  {
    id: 17,
    name: "Diaper Caddie",
    description: "A portable organiser for diapers, wipes, and other changing essentials, keeping everything within reach.",
    category: "Diapering & Care",
    status: "available",
    image: "img/diaper-caddie.jpg",
    priceRange: "\u20a640,000"
  },
  {
    id: 19,
    name: "Wearable Breast Pump (Pair)",
    description: "A hands-free wearable breast pump designed to support convenient and discreet milk expression.",
    category: "Mum Care",
    status: "available",
    image: "img/wearable-breast-pump.jpg",
    priceRange: "\u20a6150,000"
  },
  {
    id: 20,
    name: "Baby Bodysuits / Overalls / Vests",
    description: "Soft everyday clothing essentials designed for comfort, easy changing, and all-day wear.",
    category: "Clothing & Play",
    status: "available",
    image: "img/baby-bodysuits.jpg",
    priceRange: "\u20a650,000"
  },
  {
    id: 21,
    name: "Muslin Squares / Flannels / Towels / Blankets",
    description: "Multi-purpose fabric essentials useful for feeding, cleaning, bathing, and everyday care.",
    category: "Diapering & Care",
    status: "available",
    image: "img/towel-flannel.jpg",
    priceRange: "\u20a650,000"
  },
  {
    id: 22,
    name: "Safety 1st Baby Care Essentials",
    description: "A set of basic health and grooming items designed to support baby's daily hygiene and care.",
    category: "Diapering & Care",
    status: "gifted",
    image: "img/baby-care-essentials.jpg",
    priceRange: "\u20a650,000"
  },
  {
    id: 14,
    name: "Kidilo Baby Bassinet",
    description: "A compact bedside bassinet that allows baby to sleep close to parents while maintaining a safe, separate space.",
    category: "Sleep & Nursery",
    status: "gifted",
    image: "img/kidilo-bassinet.jpg",
    priceRange: "\u20a6280,000"
  },
  {
    id: 24,
    name: "Milk Storage Bags",
    description: "Leak-proof storage bags designed for safely storing expressed breast milk.",
    category: "Feeding",
    status: "available",
    image: "img/milk-storage-bags.jpg",
    priceRange: "\u20a630,000"
  },
  {
    id: 26,
    name: "Bedside Storage Rack",
    description: "A movable storage unit designed to organise baby essentials around the home.",
    category: "Sleep & Nursery",
    status: "gifted",
    image: "img/storage-trolley.jpg",
    priceRange: "\u20a630,000"
  },
  {
    id: 27,
    name: "Stanley 1L Bottle (To-Go Bottle)",
    description: "A large insulated bottle designed to help parents stay hydrated throughout the day.",
    category: "Mum Care",
    status: "available",
    image: "img/stanley-bottle.jpg",
    priceRange: "\u20a690,500"
  },
  {
    id: 29,
    name: "Mom All in One Essential Care Bag",
    description: "Everyday essentials selected to support mum's comfort and wellbeing during the postpartum period.",
    category: "Mum Care",
    status: "available",
    image: "img/mom-essentials.jpg",
    priceRange: "\u20a6350,000"
  },
  {
    id: 1,
    name: "Kidilo 360 Free Wheeling Car Seat",
    description: "A certified infant car seat designed to keep baby safe and properly supported during car journeys from the earliest days.",
    category: "Travel & Safety",
    status: "gifted",
    image: "img/car-seat.jpg",
    priceRange: "\u20a6230,000"
  },
  {
    id: 30,
    name: "Bottle Dryer Rack",
    description: "A compact drying rack designed to hygienically air-dry baby bottles, teats, and small feeding accessories after washing.",
    category: "Feeding",
    status: "available",
    image: "img/bottle-dryer-rack.jpg",
    priceRange: "\u20a635,000"
  },
  {
    id: 33,
    name: "Burp & Wash Cloths",
    description: "Soft, absorbent cloths for burping and gentle cleaning during and after feeding time.",
    category: "Diapering & Care",
    status: "available",
    image: "img/Burp & wash clothes.jpg",
    priceRange: "\u20a615,000"
  },
  {
    id: 34,
    name: "Postpartum Belly Wrap",
    description: "A supportive postpartum belly wrap designed to provide gentle compression and everyday comfort during recovery after birth.",
    category: "Mum Care",
    status: "available",
    image: "img/postpartum-belly-wrap.jpeg",
    priceRange: "\u20a630,000"
  },
  {
    id: 35,
    name: "Water Wipes",
    description: "The world\u2019s purest baby wipes, made with 99.9% water and a drop of fruit extract \u2014 gentle enough for newborn skin.",
    category: "Diapering & Care",
    status: "available",
    image: "img/Water wipes .jpg",
    priceRange: "\u20a630,000 \u2013 \u20a675,000",
    variants: [
      { label: "240 Sheets (4 Packs)", price: "\u20a630,000" },
      { label: "720 Sheets (12 Packs)", price: "\u20a675,000" }
    ]
  },
  {
    id: 36,
    name: "Huggies Pure Baby Wipes",
    description: "Soft, gentle wipes made with 99% pure water \u2014 suitable for sensitive newborn skin from day one.",
    category: "Diapering & Care",
    status: "available",
    image: "img/Huggies wipe .jpg",
    priceRange: "\u20a630,000"
  },
  {
    id: 37,
    name: "Huggies Little Snugglers Diaper",
    description: "Premium diapers with a gentle absorb liner that provides up to 12 hours of protection for baby\u2019s delicate skin.",
    category: "Diapering & Care",
    status: "available",
    image: "img/Huggies diaper .jpg",
    priceRange: "\u20a625,000 \u2013 \u20a6100,000",
    variants: [
      { label: "33 Count", price: "\u20a625,000" },
      { label: "66 Count", price: "\u20a645,000" },
      { label: "96 Count", price: "\u20a660,000" },
      { label: "192 Count", price: "\u20a6100,000" }
    ]
  },
  {
    id: 38,
    name: "Softcare Premium Baby Diaper",
    description: "High-quality baby diapers designed for all-day comfort, dryness, and reliable leak protection.",
    category: "Diapering & Care",
    status: "available",
    image: "img/Softcare diaper .jpg",
    priceRange: "\u20a615,000 \u2013 \u20a630,000",
    variants: [
      { label: "50 Pieces", price: "\u20a615,000" },
      { label: "96 Pieces", price: "\u20a625,000" },
      { label: "105 Pieces", price: "\u20a630,000" }
    ]
  },
  {
    id: 39,
    name: "Oriamo Smart Humidifier / Air Purifier",
    description: "A smart humidifier and air purifier designed to maintain healthy air quality and optimal humidity in baby\u2019s nursery.",
    category: "Sleep & Nursery",
    status: "available",
    image: "img/Humidifier .jpg",
    priceRange: "\u20a689,000"
  }
];


/* ============================================================
   1. REGISTRY LOADER



   ============================================================ */

/**
 * Module-level reference so openItemModal() can look up any item
 * by id without re-fetching.
 */
let ALL_ITEMS = [];

/**
 * Entry point: attempts to fetch registry.json; falls back to
 * embedded data if the request fails (e.g. file:// protocol).
 */
async function loadRegistry() {
  const grid = document.getElementById('registryGrid');
  const filtersEl = document.getElementById('registryFilters');
  if (!grid || !filtersEl) return;

  let items;

  try {
    const response = await fetch('data/registry.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    items = await response.json();
  } catch {
    // Silently fall back — no console noise for expected local-file scenario
    items = REGISTRY_FALLBACK;
  }

  // Store globally for modal lookups
  ALL_ITEMS = items;

  const categories = deriveCategories(items);
  renderFilters(filtersEl, categories, items, grid);
  renderCards(grid, items);
  renderProgress(items);
}

/**
 * Returns a deduplicated list of categories, with 'all' prepended.
 */
function deriveCategories(items) {
  const unique = [...new Set(items.map(item => item.category))];
  return ['all', ...unique];
}


/* ============================================================
   2. CATEGORY FILTERS
   ============================================================ */

/**
 * Builds filter buttons and wires up click delegation.
 */
function renderFilters(container, categories, items, grid) {
  container.innerHTML = '';

  categories.forEach((cat, index) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (index === 0 ? ' is-active' : '');
    btn.dataset.category = cat;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    btn.textContent = cat === 'all' ? 'All Items' : cat;
    container.appendChild(btn);
  });

  // Single delegated listener on the container
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active state
    container.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    // Filter and re-render
    const selected = btn.dataset.category;
    const filtered = selected === 'all'
      ? items
      : items.filter(item => item.category === selected);

    renderCards(grid, filtered);
  });
}


/* ============================================================
   3. CARD RENDERING & PROGRESS
   ============================================================ */

/**
 * Renders registry item cards into the grid element.
 * Cards include a cover image, quantity badge, price range, and
 * a click handler that opens the item detail dialog.
 */
function renderCards(grid, items) {
  if (!items.length) {
    grid.innerHTML = '<p class="registry__message">No items in this category.</p>';
    return;
  }

  grid.innerHTML = items.map((item, i) => {
    const isGifted    = item.status === 'gifted';
    const statusLabel = isGifted ? 'Gifted' : 'Available';
    const statusClass = isGifted ? 'card__status--gifted' : 'card__status--available';
    const cardClass   = isGifted ? 'registry-card is-gifted' : 'registry-card';

    // Cover image — fall back to a category-toned surface colour if missing
    const imgHTML = item.image
      ? `<div class="card__image-wrap">
           <img
             src="${escapeAttr(item.image)}"
             alt="${escapeAttr(item.name)}"
             loading="lazy"
             width="800" height="500"
           />
         </div>`
      : '';


    // Short description for list card — full text shown in dialog
    const shortDesc = item.description.length > 65
      ? item.description.slice(0, 65).trimEnd() + '\u2026'
      : item.description;

    // Price range badge
    const priceBadge = item.priceRange
      ? `<span class="card__meta-badge card__meta-badge--price">${escapeHTML(item.priceRange)}</span>`
      : '';

    // Combined inline row: price badge + status badge
    const metaRow = `<div class="card__meta">
        ${priceBadge}<span class="card__status ${statusClass}" aria-live="polite">${statusLabel}</span>
      </div>`;

    // Hover label only on available items
    const hoverCta = !isGifted
      ? `<div class="card__hover-cta" aria-hidden="true">
           <span class="card__hover-label">View Details</span>
         </div>`
      : '';

    return `
      <article
        class="${cardClass}"
        style="animation-delay: ${i * 0.055}s"
        aria-label="${escapeAttr(item.name)}, ${statusLabel}. Click to view details."
        tabindex="0"
        role="button"
        data-item-id="${item.id}"
        onclick="openItemModal(${item.id})"
        onkeydown="if(event.key==='Enter'||event.key===' '){openItemModal(${item.id})}"
      >
        ${imgHTML}
        <div class="card__body">
          <span class="card__category">${escapeHTML(item.category)}</span>
          <h3 class="card__name">${escapeHTML(item.name)}</h3>
          <p class="card__desc">${escapeHTML(shortDesc)}</p>
          ${metaRow}
        </div>
        ${hoverCta}
      </article>
    `.trim();
  }).join('');
}

/**
 * Updates the gifted progress bar and label.
 */
function renderProgress(items) {
  const fill  = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  if (!fill || !label) return;

  const gifted = items.filter(i => i.status === 'gifted').length;
  const total  = items.length;
  const pct    = total > 0 ? Math.round((gifted / total) * 100) : 0;

  fill.style.width = pct + '%';
  fill.setAttribute('aria-valuenow', pct);
  label.textContent = `${gifted} of ${total} gifted`;
}


/* ============================================================
   4. COPY TO CLIPBOARD
   ============================================================ */

/**
 * Reads the account number from the DOM and copies it.
 * Exposed on window so the inline onclick attribute works.
 */
window.copyAccountNumber = function copyAccountNumber() {
  const numEl  = document.getElementById('accountNumber');
  const btn    = document.getElementById('copyBtn');
  const label  = document.getElementById('copyLabel');
  if (!numEl || !btn) return;

  const text = numEl.textContent.trim();

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showCopied(btn, label))
      .catch(() => fallbackCopy(text, btn, label));
  } else {
    fallbackCopy(text, btn, label);
  }
};

/**
 * execCommand fallback for non-HTTPS or older browsers.
 */
function fallbackCopy(text, btn, label) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showCopied(btn, label);
  } catch {
    // If all else fails, silently do nothing — no console error
  } finally {
    document.body.removeChild(ta);
  }
}

/**
 * Shows a "Copied!" confirmation state on the copy button.
 */
function showCopied(btn, label) {
  btn.classList.add('is-copied');
  if (label) label.textContent = 'Copied!';

  setTimeout(() => {
    btn.classList.remove('is-copied');
    if (label) label.textContent = 'Copy';
  }, 2500);
}

/**
 * Copy function wired to the dialog's copy button.
 * Exposed on window to match the inline onclick attribute.
 */
window.copyDialogAccountNumber = function copyDialogAccountNumber() {
  const numEl = document.getElementById('dialogAccountNumber');
  const btn   = document.getElementById('dialogCopyBtn');
  const label = document.getElementById('dialogCopyLabel');
  if (!numEl || !btn) return;
  const text = numEl.textContent.trim();
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showCopied(btn, label))
      .catch(() => fallbackCopy(text, btn, label));
  } else {
    fallbackCopy(text, btn, label);
  }
};


/* ============================================================
   5. NAVIGATION SCROLL EFFECT (was §6, sticky CTA removed)
   ============================================================ */

/**
 * Adds glass/frosted background to the nav once the user scrolls.
 */
function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


/* ============================================================
   7. SCROLL REVEAL
   ============================================================ */

/**
 * Fades in elements that carry the `.reveal` class as they
 * enter the viewport. Falls back gracefully if IntersectionObserver
 * is unsupported — simply makes all elements visible immediately.
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}


/* ============================================================
   UTILITIES
   ============================================================ */

/** Escapes a string for safe insertion as HTML text content. */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Escapes a string for safe use in an HTML attribute. */
function escapeAttr(str) {
  return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}


/* ============================================================
   8. ITEM DIALOG
   ============================================================ */

/**
 * Opens the item detail dialog for the given item id.
 * Populates the detail panel and resets to the detail view.
 * Exposed on window so inline onclick attributes on cards work.
 */
window.openItemModal = function openItemModal(id) {
  const item = ALL_ITEMS.find(i => i.id === id);
  if (!item) return;

  const dialog = document.getElementById('itemDialog');
  if (!dialog) return;

  const isGifted = item.status === 'gifted';

  // ── Populate detail panel ──
  const img = document.getElementById('dialogImage');
  if (img) {
    img.src = item.image || '';
    img.alt = item.name;
  }

  // Image-overlay status badge
  const badge = document.getElementById('dialogImageBadge');
  if (badge) {
    badge.textContent = isGifted ? 'Gifted' : 'Available';
    badge.className = 'dialog__image-badge ' +
      (isGifted ? 'dialog__image-badge--gifted' : 'dialog__image-badge--available');
  }

  setDialogText('dialogCategory', item.category);
  setDialogText('dialogItemName', item.name);
  setDialogText('dialogDesc',     item.description);

  // ── Variant selector ──
  const variantArea = document.getElementById('dialogVariantArea');
  if (variantArea) {
    if (item.variants && item.variants.length > 0) {
      variantArea.innerHTML = `
        <label for="dialogVariantSelect" class="dialog__variant-label">Select an option</label>
        <select id="dialogVariantSelect" class="dialog__variant-select">
          ${item.variants.map((v, i) =>
            `<option value="${i}">${escapeHTML(v.label)} \u2014 ${escapeHTML(v.price)}</option>`
          ).join('')}
        </select>
      `.trim();
      variantArea.hidden = false;

      // Set initial price to first variant
      setDialogText('dialogPrice', item.variants[0].price);

      // Update price on selection change
      const select = document.getElementById('dialogVariantSelect');
      select.addEventListener('change', () => {
        const variant = item.variants[parseInt(select.value, 10)];
        if (variant) setDialogText('dialogPrice', variant.price);
        // Also refresh WhatsApp URL if bank panel is active
        updateGiftWhatsAppUrl();
      });
    } else {
      variantArea.innerHTML = '';
      variantArea.hidden = true;
      setDialogText('dialogPrice', item.priceRange || '');
    }
  } else {
    setDialogText('dialogPrice', item.priceRange || '');
  }

  // ── CTA area: gift button or gifted message ──
  const ctaArea = document.getElementById('dialogCtaArea');
  if (ctaArea) {
    if (isGifted) {
      ctaArea.innerHTML = `
        <div class="dialog__gifted-note" role="status">
          This item has already been gifted with love. Thank you.
        </div>
      `.trim();
    } else {
      ctaArea.innerHTML = `
        <button
          class="btn btn--primary"
          type="button"
          onclick="showGiftPanel(${item.id})"
          aria-label="Gift ${escapeAttr(item.name)}"
        >
          Gift this item
        </button>
      `.trim();
    }
  }

  // ── Reset to detail panel (in case bank panel was open) ──
  showDialogPanel('detail');

  // ── Open the dialog ──
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    // Polyfill for browsers without native <dialog> support
    dialog.setAttribute('open', '');
  }

  // Prevent body scroll while dialog is open
  document.body.style.overflow = 'hidden';

  // Trap focus inside dialog
  trapFocus(dialog);
};

/**
 * Switches the dialog from detail panel to the bank/gift panel.
 * Stores the item id on the panel element so the live URL builder
 * can always reference the correct item when fields change.
 * Exposed on window for inline onclick in the rendered CTA.
 */
window.showGiftPanel = function showGiftPanel(id) {
  const item = ALL_ITEMS.find(i => i.id === id);
  if (!item) return;

  // Store item id on the panel so updateGiftWhatsAppUrl() can read it
  const bankPanel = document.getElementById('dialogPanelBank');
  if (bankPanel) bankPanel.dataset.itemId = String(id);

  // Set item name in bank panel header
  setDialogText('dialogBankItemName', item.name);

  // Clear message composer fields
  const nameInput = document.getElementById('dialogSenderName');
  const msgInput  = document.getElementById('dialogBabyMessage');
  const charCount = document.getElementById('dialogCharCount');
  if (nameInput) nameInput.value = '';
  if (msgInput)  msgInput.value  = '';
  if (charCount) charCount.textContent = '0 / 300';

  // Reset dialog copy button state
  const copyBtn   = document.getElementById('dialogCopyBtn');
  const copyLabel = document.getElementById('dialogCopyLabel');
  if (copyBtn)   copyBtn.classList.remove('is-copied');
  if (copyLabel) copyLabel.textContent = 'Copy';

  // Build initial WhatsApp URL (no message/name yet)
  updateGiftWhatsAppUrl();

  showDialogPanel('bank');
};

/**
 * Builds and sets the WhatsApp href on #dialogWhatsApp using the
 * current item id, sender name, and baby message.
 * Called on showGiftPanel and on every input/textarea keystroke.
 */
function updateGiftWhatsAppUrl() {
  const bankPanel  = document.getElementById('dialogPanelBank');
  const waLink     = document.getElementById('dialogWhatsApp');
  const waBtnLabel = document.getElementById('dialogWaBtnLabel');
  if (!bankPanel || !waLink) return;

  const itemId = parseInt(bankPanel.dataset.itemId || '0', 10);
  const item   = ALL_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const waPhone = '2348138985308';
  const name    = (document.getElementById('dialogSenderName')?.value || '').trim();
  const message = (document.getElementById('dialogBabyMessage')?.value || '').trim();

  // Compose the WhatsApp message
  let giftLabel = item.name;
  // Include selected variant if applicable
  const variantSelect = document.getElementById('dialogVariantSelect');
  if (variantSelect && item.variants && item.variants.length > 0) {
    const variant = item.variants[parseInt(variantSelect.value, 10)];
    if (variant) giftLabel += ` (${variant.label} \u2014 ${variant.price})`;
  }

  let text = `Hello! I've sent a gift for Baby Okeke \u{1F49B}\n\nGift: ${giftLabel}`;
  if (name)    text += `\nFrom: ${name}`;
  if (message) text += `\n\nA message for Baby:\n\u201C${message}\u201D`;

  waLink.href = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;

  // Update button label based on whether a message was written
  if (waBtnLabel) {
    waBtnLabel.textContent = message
      ? 'Send gift \u0026 message'
      : "Let us know you've sent";
  }
}

/**
 * Closes the dialog and restores body scroll.
 * Exposed on window — also called by the close button's onclick.
 */
window.closeItemModal = function closeItemModal() {
  const dialog = document.getElementById('itemDialog');
  if (!dialog) return;

  if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }

  document.body.style.overflow = '';
};

/**
 * Toggles which inner panel (detail | bank) is visible.
 */
function showDialogPanel(which) {
  const detailPanel = document.getElementById('dialogPanelDetail');
  const bankPanel   = document.getElementById('dialogPanelBank');
  if (!detailPanel || !bankPanel) return;

  if (which === 'bank') {
    detailPanel.hidden = true;
    bankPanel.hidden   = false;
    // Scroll bank panel to top
    bankPanel.scrollTop = 0;
  } else {
    detailPanel.hidden = false;
    bankPanel.hidden   = true;
    // Scroll detail panel to top
    detailPanel.scrollTop = 0;
  }
}

/**
 * Helper: set text content of an element by id.
 */
function setDialogText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text || '';
}

/**
 * Simple focus trap: keeps Tab/Shift+Tab cycling inside the dialog.
 */
function trapFocus(dialog) {
  const focusable = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;

  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  // Focus the close button on open
  first.focus();

  // Remove any previous listener before adding a new one
  dialog._trapHandler && dialog.removeEventListener('keydown', dialog._trapHandler);

  dialog._trapHandler = function (e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };
  dialog.addEventListener('keydown', dialog._trapHandler);
}

/**
 * Initialises the dialog's close button, back button,
 * backdrop click-to-close, Escape key, and live message composer.
 */
function initItemDialog() {
  const dialog     = document.getElementById('itemDialog');
  const closeBtn   = document.getElementById('dialogClose');
  const backBtn    = document.getElementById('dialogBack');
  if (!dialog) return;

  // Close button
  closeBtn && closeBtn.addEventListener('click', closeItemModal);

  // Back button (bank panel → detail panel)
  backBtn && backBtn.addEventListener('click', () => showDialogPanel('detail'));

  // Click outside the panel content closes the dialog
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeItemModal();
  });

  // Escape key
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeItemModal();
  });

  // ── Message composer: live URL rebuild on every keystroke ──
  const nameInput = document.getElementById('dialogSenderName');
  const msgInput  = document.getElementById('dialogBabyMessage');
  const charCount = document.getElementById('dialogCharCount');

  nameInput && nameInput.addEventListener('input', updateGiftWhatsAppUrl);

  msgInput && msgInput.addEventListener('input', () => {
    // Update character counter
    if (charCount) {
      const len = msgInput.value.length;
      charCount.textContent = `${len} / 300`;
      charCount.classList.toggle('is-near-limit', len >= 240);
    }
    updateGiftWhatsAppUrl();
  });
}


/* ============================================================
   9. LIGHTBOX — full-size gallery image viewer
   ============================================================ */
function initLightbox() {
  const overlay   = document.getElementById('lightbox');
  const imgEl     = document.getElementById('lightboxImg');
  const closeBtn  = document.getElementById('lightboxClose');
  const prevBtn   = document.getElementById('lightboxPrev');
  const nextBtn   = document.getElementById('lightboxNext');

  if (!overlay || !imgEl) return;

  const images = Array.from(document.querySelectorAll('[data-lightbox]'));
  let current  = 0;
  let closing  = false;

  function show(index) {
    current = (index + images.length) % images.length;
    imgEl.style.opacity = '0';
    imgEl.src = images[current].src;
    imgEl.alt = images[current].alt;
    imgEl.onload = () => { imgEl.style.opacity = '1'; };
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    if (closing) return;
    closing = true;
    overlay.hidden = true;
    document.body.style.overflow = '';
    // Restore focus to the image that opened the lightbox
    images[current].focus();
    setTimeout(() => { closing = false; }, 300);
  }

  images.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.setAttribute('tabindex', '0');
    img.addEventListener('click',   () => show(i));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(i); } });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click',  () => show(current - 1));
  nextBtn.addEventListener('click',  () => show(current + 1));

  // Click on backdrop closes
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (overlay.hidden) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Hide nav arrows when only one image
  if (images.length <= 1) {
    prevBtn.hidden = true;
    nextBtn.hidden = true;
  }
}


/* ============================================================
   INIT — wire everything up once the DOM is ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadRegistry();
  initNav();
  initScrollReveal();
  initItemDialog();
  initLightbox();
});
