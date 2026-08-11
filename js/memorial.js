/* Memorial experience: static-site friendly data, support and pending moderation. */
const MEMORIAL_FALLBACK = {
  siteName: 'Little Star Wish',
  deceased: {
    name: 'His Name',
    dates: '',
    photo: '',
    biography: 'This space is prepared for the story of a beloved husband, father, brother and friend. His name, photograph, dates and memories can be added here when the family is ready.',
    quote: ''
  },
  family: {
    sisterName: 'the family',
    introduction: 'We invite family and friends to join us in remembering a life deeply loved, and to surround the family with prayer, kindness and practical support during this difficult time.'
  },
  support: {
    bank: 'First Bank',
    accountName: 'Ifeoma Sandra Okeke',
    accountNumber: '3087652436',
    whatsapp: '2348138985308',
    quickAmounts: [10000, 25000, 50000, 100000]
  },
  registryUrl: 'https://mylittlestarwish.com/',
  approvedMessages: []
};

const PENDING_MESSAGES_KEY = 'little-star-wish-memorial-pending-v1';
let memorialConfig = MEMORIAL_FALLBACK;
let selectedAmount = '';

async function loadMemorial() {
  try {
    const response = await fetch('data/memorial.json');
    if (!response.ok) throw new Error('Memorial data unavailable');
    memorialConfig = await response.json();
  } catch {
    memorialConfig = MEMORIAL_FALLBACK;
  }

  renderContent(memorialConfig);
  initSupport(memorialConfig.support);
  initMessageForm();
  renderMessages(memorialConfig.approvedMessages || []);
}

function renderContent(config) {
  const { deceased, family, support } = config;
  setText('memorialName', deceased.name);
  setText('heroIntroduction', family.introduction);
  setText('biography', deceased.biography);
  setText('bankName', support.bank);
  setText('accountName', support.accountName);
  setText('accountNumber', support.accountNumber);

  const dates = document.getElementById('memorialDates');
  if (dates && deceased.dates) {
    dates.hidden = false;
    dates.textContent = deceased.dates;
  }

  const quote = document.getElementById('memorialQuote');
  if (quote && deceased.quote) {
    quote.hidden = false;
    quote.textContent = `“${deceased.quote}”`;
  }

  const photo = document.getElementById('memorialPhoto');
  const placeholder = document.getElementById('portraitPlaceholder');
  if (photo && placeholder && deceased.photo) {
    photo.src = deceased.photo;
    photo.alt = `A photograph of ${deceased.name}`;
    photo.hidden = false;
    placeholder.hidden = true;
  }

  const registryLink = document.querySelector('.registry-link a');
  if (registryLink) registryLink.href = config.registryUrl || '/';
  document.title = `Remembering ${deceased.name} | ${config.siteName || 'Little Star Wish'}`;
}

function initSupport(support) {
  const amountGrid = document.getElementById('amountGrid');
  const customAmount = document.getElementById('customAmount');
  if (!amountGrid) return;

  amountGrid.innerHTML = (support.quickAmounts || []).map(amount => `
    <button class="amount-button" type="button" data-amount="${amount}" aria-pressed="false">${formatNaira(amount)}</button>
  `).join('');

  amountGrid.addEventListener('click', event => {
    const button = event.target.closest('[data-amount]');
    if (!button) return;
    selectedAmount = button.dataset.amount;
    amountGrid.querySelectorAll('[data-amount]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    if (customAmount) customAmount.value = '';
    updateSupportLink(support);
  });

  customAmount?.addEventListener('input', () => {
    selectedAmount = customAmount.value;
    amountGrid.querySelectorAll('[data-amount]').forEach(item => item.setAttribute('aria-pressed', 'false'));
    updateSupportLink(support);
  });

  document.getElementById('copyAccount')?.addEventListener('click', () => copyAccount(support.accountNumber));
  updateSupportLink(support);
}

function updateSupportLink(support) {
  const link = document.getElementById('supportWhatsApp');
  if (!link) return;
  const amountText = selectedAmount && Number(selectedAmount) > 0 ? ` Amount: ${formatNaira(selectedAmount)}.` : '';
  const message = `Hello, I’ve sent a condolence gift to support the family 💛${amountText}`;
  link.href = `https://wa.me/${support.whatsapp}?text=${encodeURIComponent(message)}`;
}

function initMessageForm() {
  const form = document.getElementById('messageForm');
  const message = document.getElementById('condolenceMessage');
  const counter = document.getElementById('characterCount');
  if (!form) return;

  message?.addEventListener('input', () => {
    if (counter) counter.textContent = `${message.value.length} / 1000`;
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('senderName')?.value.trim() || '';
    const location = document.getElementById('senderLocation')?.value.trim() || '';
    const text = message?.value.trim() || '';
    const status = document.getElementById('formStatus');
    if (!name || !text) {
      setStatus(status, 'Please add your name and a message before submitting.', true);
      return;
    }

    const pending = readPendingMessages();
    const duplicate = pending.some(item => item.name === name && item.message === text);
    if (duplicate) {
      setStatus(status, 'This message is already saved on this device for moderation.', false);
      return;
    }

    pending.push({ name, location, message: text, submittedAt: new Date().toISOString(), status: 'pending' });
    localStorage.setItem(PENDING_MESSAGES_KEY, JSON.stringify(pending));
    form.reset();
    if (counter) counter.textContent = '0 / 1000';
    setStatus(status, 'Thank you. Your message has been saved for the family and is pending moderation.', false);
  });

  document.getElementById('exportMessages')?.addEventListener('click', exportPendingMessages);
}

function renderMessages(messages) {
  const list = document.getElementById('messageList');
  if (!list) return;
  if (!messages.length) {
    list.innerHTML = '<p class="empty-wall">Messages of love will appear here when the family has approved them.</p>';
    return;
  }
  list.innerHTML = messages.map(item => `
    <article class="message-card">
      <p>${escapeHTML(item.message)}</p>
      <footer>— ${escapeHTML(item.name)}${item.location ? `, ${escapeHTML(item.location)}` : ''}</footer>
    </article>
  `).join('');
}

function readPendingMessages() {
  try { return JSON.parse(localStorage.getItem(PENDING_MESSAGES_KEY) || '[]'); } catch { return []; }
}

function exportPendingMessages() {
  const messages = readPendingMessages();
  const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'memorial-pending-messages.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

async function copyAccount(accountNumber) {
  try {
    await navigator.clipboard.writeText(accountNumber);
    setStatus(document.getElementById('formStatus'), 'Account number copied.', false);
  } catch {
    setStatus(document.getElementById('formStatus'), `Account number: ${accountNumber}`, false);
  }
}

function formatNaira(value) { return `₦${Number(value).toLocaleString('en-NG')}`; }
function setText(id, value) { const element = document.getElementById(id); if (element) element.textContent = value || ''; }
function setStatus(element, text, isError) { if (!element) return; element.textContent = text; element.classList.toggle('is-error', isError); }
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }

document.addEventListener('DOMContentLoaded', loadMemorial);
