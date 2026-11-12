/* Medición de contactos en Google Analytics.
   Envía eventos solo si Analytics está cargado (y no si la visita está marcada como interna).
   Eventos: click_whatsapp, click_telefono, chat_mensaje (1 vez por visita). generate_lead se envía desde el formulario de index.html. */
(function () {
  function ev(nombre, datos) {
    if (window.nbTrack) window.nbTrack(nombre, datos);
  }
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('wa.me/') !== -1) ev('click_whatsapp', { pagina: location.pathname });
    else if (h.indexOf('tel:') === 0) ev('click_telefono', { pagina: location.pathname });
  }, true);
})();
