/* NodoBots · Navegación móvil accesible
   Se carga con: <script src="/nodo-nav.js" defer></script>
   - Páginas con botón de menú (#hamburger): indica si está abierto (aria-expanded),
     cierra al pulsar un enlace y con la tecla Escape.
   - Artículos del blog (sin botón de menú): en móvil añade un botón que despliega los enlaces. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var b = document.getElementById('hamburger'), m = document.getElementById('mobile-menu');
    if (b && m) {
      b.setAttribute('aria-controls', 'mobile-menu');
      var sync = function () { b.setAttribute('aria-expanded', m.classList.contains('open') ? 'true' : 'false'); };
      sync();
      new MutationObserver(sync).observe(m, { attributes: true, attributeFilter: ['class'] });
      m.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) m.classList.remove('open'); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && m.classList.contains('open')) { m.classList.remove('open'); b.focus(); }
      });
      return;
    }

    var nav = document.querySelector('body > nav');
    var links = nav && nav.querySelector('.nav-links');
    var inner = nav && nav.querySelector('.nav-inner');
    if (!links || !inner) return;
    links.id = links.id || 'nb-nav-links';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nb-navbtn';
    btn.setAttribute('aria-label', 'Menú');
    btn.setAttribute('aria-controls', links.id);
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    inner.appendChild(btn);
    function set(open) {
      nav.classList.toggle('nb-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () { set(!nav.classList.contains('nb-open')); });
    links.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nb-open')) { set(false); btn.focus(); }
    });
  });
})();
