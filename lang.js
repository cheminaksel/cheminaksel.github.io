/* ──────────────────────────────────────────────
   Bascule de langue FR / EN (partagé sur tout le site)
   - Le texte FR reste dans le HTML par défaut.
   - Chaque élément traduit porte un attribut data-en="..."
   - Le choix est mémorisé dans localStorage et appliqué
     automatiquement sur toutes les pages.
─────────────────────────────────────────────── */
(function () {
  const STORE = 'ak_lang';
  const getLang = () => localStorage.getItem(STORE) || 'fr';
  const setLang = (l) => localStorage.setItem(STORE, l);

  function apply(l) {
    document.querySelectorAll('[data-en]').forEach((el) => {
      if (el.dataset.fr === undefined) el.dataset.fr = el.innerHTML;
      el.innerHTML = (l === 'en') ? el.getAttribute('data-en') : el.dataset.fr;
    });
    document.documentElement.lang = l;
    document.querySelectorAll('.lang-toggle').forEach((b) => {
      b.textContent = (l === 'en') ? 'FR' : 'EN';
      b.setAttribute('aria-label', (l === 'en') ? 'Passer en français' : 'Switch to English');
    });
  }

  function injectStyle() {
    const css =
      '.lang-toggle{display:inline-flex;align-items:center;gap:.4rem;cursor:pointer;' +
      'font-family:"Syne Mono",monospace;font-size:.68rem;font-weight:700;letter-spacing:.18em;' +
      'text-transform:uppercase;color:#F2E8D5;background:#E8521A;' +
      'border:1px solid #E8521A;border-radius:2rem;padding:.5rem 1rem;line-height:1;' +
      'box-shadow:0 0 0 0 rgba(232,82,26,.5);animation:langPulse 2.6s ease-in-out infinite;' +
      'transition:background .25s,color .25s,transform .25s,box-shadow .25s;}' +
      '.lang-toggle::before{content:"\\1F310";font-size:.85rem;line-height:1;}' +
      '.lang-toggle:hover{background:#C8E63C;border-color:#C8E63C;color:#0E0D0B;' +
      'transform:translateY(-2px) scale(1.04);animation:none;box-shadow:0 8px 22px rgba(200,230,60,.35);}' +
      '@keyframes langPulse{0%,100%{box-shadow:0 0 0 0 rgba(232,82,26,.45);}' +
      '50%{box-shadow:0 0 0 7px rgba(232,82,26,0);}}';
    const s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  function init() {
    injectStyle();
    apply(getLang());
    document.querySelectorAll('.lang-toggle').forEach((b) => {
      b.addEventListener('click', () => {
        const next = (getLang() === 'en') ? 'fr' : 'en';
        setLang(next);
        apply(next);
      });
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
