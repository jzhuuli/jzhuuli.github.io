// ─────────────────────────────────────────
// js/main.js — navigation & interactions
// ─────────────────────────────────────────

/**
 * Show a section by id and update the active nav link.
 * Called by nav link onclick handlers.
 */
function show(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('nav-' + id).classList.add('active');
  return false; // prevent anchor jump
}

/**
 * Contact form submission handler.
 * Replace the body of this function to wire up a real backend
 * (e.g. Formspree, EmailJS, or your own API endpoint).
 */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');

  // TODO: send form data to your backend here
  // const data = new FormData(e.target);

  btn.textContent = 'Message sent ✓';
  btn.style.background = '#15803d';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Send message →';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

// ── Project modal ──
function openProject(id) {
  const p = PROJECTS[id];
  if (!p) return;

  document.getElementById('modal-eyebrow').textContent = p.eyebrow;
  document.getElementById('modal-title').textContent   = p.title;
  document.getElementById('modal-body').innerHTML      = p.body;

  const tagsEl = document.getElementById('modal-tags');
  tagsEl.innerHTML = p.tags
    .map(t => `<span class="project-tag">${t}</span>`)
    .join('');

  const footerEl = document.getElementById('modal-footer');
  footerEl.innerHTML = p.github && p.github !== 'YOUR_GITHUB_URL'
    ? `<a href="${p.github}" target="_blank" class="modal-btn">GitHub →</a>`
    : '';

  document.getElementById('project-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProject() {
  document.getElementById('project-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeOnOverlay(e) {
  if (e.target.id === 'project-modal') closeProject();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProject();
});