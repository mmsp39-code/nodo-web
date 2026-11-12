/* Consentimiento de cookies y carga de Google Analytics.
   Analytics solo se carga si el visitante ha pulsado "Aceptar". Sin respuesta o con "Rechazar", no se carga.
   index.html y blog.html ya traen su propio aviso; el resto de páginas reciben uno desde aquí. */
(function () {
  var ID = 'G-TT2LZB7ZVK', KEY = 'cookie-consent';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function interno() { try { return localStorage.getItem('nb_interno') === '1'; } catch (e) { return false; } }
  var cargado = false;
  function cargarGA() {
    if (cargado || interno()) return;
    cargado = true;
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
  }
  window.nbConsent = function () { return get() === 'accepted'; };
  window.nbTrack = function (nombre, datos) {
    try { if (get() === 'accepted' && window.gtag) window.gtag('event', nombre, datos || {}); } catch (e) {}
  };
  if (get() === 'accepted') cargarGA();

  function enlazarExistente() {
    var a = document.getElementById('cookie-accept');
    if (a) a.addEventListener('click', function () { cargarGA(); });
  }
  function crearAviso() {
    var css = document.createElement('style');
    css.textContent = '#nb-cookies{position:fixed;left:12px;right:12px;bottom:12px;max-width:520px;margin:0 auto;background:#1c1c28;color:#e8e8f0;border:1px solid rgba(255,255,255,.15);border-radius:14px;padding:14px 16px;z-index:2147483000;display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;box-shadow:0 20px 60px rgba(0,0,0,.45);font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}#nb-cookies p{margin:0;flex:1;min-width:200px}#nb-cookies a{color:#a5b4fc}#nb-cookies .nb-cb{display:flex;gap:8px}#nb-cookies button{min-height:40px;padding:8px 16px;border-radius:8px;font:600 14px system-ui,sans-serif;cursor:pointer;border:1px solid rgba(255,255,255,.3);background:transparent;color:#e8e8f0}#nb-cookies button.nb-si{background:#6366f1;border-color:#6366f1;color:#fff}';
    document.head.appendChild(css);
    var d = document.createElement('div');
    d.id = 'nb-cookies'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Aviso de cookies');
    d.innerHTML = '<p>Usamos cookies propias para analizar el tráfico y mejorar tu experiencia. <a href="/#cookies">Más información</a></p><div class="nb-cb"><button type="button" class="nb-no">Rechazar</button><button type="button" class="nb-si">Aceptar</button></div>';
    document.body.appendChild(d);
    d.querySelector('.nb-si').addEventListener('click', function () { set('accepted'); d.remove(); cargarGA(); });
    d.querySelector('.nb-no').addEventListener('click', function () { set('declined'); d.remove(); });
  }
  function init() {
    if (document.getElementById('cookie-banner')) { enlazarExistente(); return; }
    if (!get()) crearAviso();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
