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
    id: 1,
    name: "Ergonomic Baby Carrier",
    description: "A structured, ergonomic carrier designed to support baby's hips and spine from the newborn stage through toddlerhood. Suitable from 3.5 kg to 20 kg, with multiple carry positions and lumbar support for the wearer.",
    category: "Travel & Comfort",
    status: "available",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a635,000 \u2013 \u20a655,000"
  },
  {
    id: 2,
    name: "Convertible Cot Bed",
    description: "Grows with baby from newborn to toddler. Includes a firm, breathable mattress, teething rail guards, and multiple adjustable base positions for safe co-sleeping and independent sleeping stages.",
    category: "Nursery",
    status: "gifted",
    image: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a6120,000 \u2013 \u20a6180,000"
  },
  {
    id: 3,
    name: "Muslin Swaddle Packs (\u00d72)",
    description: "Breathable, 100% organic cotton swaddles in soft neutral tones. Gentle on newborn skin and beautifully versatile \u2014 use as a wrap, feeding cover, pram blanket, or play mat.",
    category: "Clothing & Linen",
    status: "available",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a618,000 \u2013 \u20a628,000"
  },
  {
    id: 4,
    name: "Baby Monitor with Camera",
    description: "HD video monitor with night vision, two-way audio, and a built-in room temperature sensor. Alerts you the moment baby stirs \u2014 giving you peace of mind in every room of the house.",
    category: "Nursery",
    status: "available",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a665,000 \u2013 \u20a695,000"
  },
  {
    id: 5,
    name: "Newborn Starter Clothing Set (\u00d73)",
    description: "A curated collection of onesies, sleepsuits, and hats for the first three months \u2014 soft, practical, and neutral. Made from 100% Pima cotton and sized for real newborns.",
    category: "Clothing & Linen",
    status: "gifted",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a622,000 \u2013 \u20a635,000"
  },
  {
    id: 6,
    name: "Baby Bathtub with Sling",
    description: "Ergonomic tub with a removable newborn sling insert and a non-slip base. Designed for safe, calm, and comfortable bath time from day one \u2014 no second pair of hands required.",
    category: "Bath & Care",
    status: "available",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a615,000 \u2013 \u20a625,000"
  },
  {
    id: 7,
    name: "Organic Baby Skincare Kit (\u00d72)",
    description: "Gentle, fragrance-free lotion, wash, and body oil \u2014 dermatologist tested and safe for sensitive newborn skin. Formulated without parabens, sulphates, or harsh preservatives.",
    category: "Bath & Care",
    status: "available",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a612,000 \u2013 \u20a620,000"
  },
  {
    id: 8,
    name: "Lightweight Travel Stroller",
    description: "Compact stroller with full newborn recline, UPF 50+ canopy, and an easy one-hand fold. A world-class design that makes every outing \u2014 market run or airport terminal \u2014 feel effortless.",
    category: "Travel & Comfort",
    status: "available",
    image: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a6180,000 \u2013 \u20a6280,000"
  },
  {
    id: 9,
    name: "White Noise Sound Machine",
    description: "A compact bedside machine with 20 calming sound profiles \u2014 rain, ocean, white noise, and gentle lullabies \u2014 to help baby fall asleep faster and sleep more soundly through the night.",
    category: "Nursery",
    status: "gifted",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a628,000 \u2013 \u20a645,000"
  },
  {
    id: 10,
    name: "Diaper Bag Backpack",
    description: "An elegant, unisex backpack with 12 organised pockets, insulated bottle holders, a wipeable changing mat, and universal stroller clips. Looks like a premium bag \u2014 works like a command centre.",
    category: "Travel & Comfort",
    status: "available",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    priceRange: "\u20a635,000 \u2013 \u20a655,000"
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

    // Truncate description for card — full text shown in dialog
    const shortDesc = item.description.length > 90
      ? item.description.slice(0, 90).trimEnd() + '\u2026'
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
        <span class="card__category">${escapeHTML(item.category)}</span>
        <h3 class="card__name">${escapeHTML(item.name)}</h3>
        <p class="card__desc">${escapeHTML(shortDesc)}</p>
        ${metaRow}
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
  setDialogText('dialogPrice', item.priceRange || '');

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
  let text = `Hello! I've sent a gift for Baby Okeke \u{1F49B}\n\nGift: ${item.name}`;
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
   INIT — wire everything up once the DOM is ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadRegistry();
  initNav();
  initScrollReveal();
  initItemDialog();
});
