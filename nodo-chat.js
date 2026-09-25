/* NodoBots · Asistente IA flotante
   Se carga con: <script src="/nodo-chat.js" defer></script>
   El "cerebro" está en Make (escenario "NodoBots - Asistente web"). */
(function () {
  if (window.__nodoChat) return; window.__nodoChat = true;

  var WEBHOOK = 'https://hook.eu2.make.com/fftlsklfxwg3huwoqb26vhgi113mwdfj';
  var WHATSAPP = 'https://wa.me/34620502131?text=Hola%2C%20vengo%20de%20la%20web%20de%20NodoBots';
  var LOGO = '/img/nodobots-asistente.png';
  var SALUDO = '¡Hola! 👋 Soy el asistente de IA de NodoBots. ¿Te puedo ayudar en algo?';
  var BASE = (document.currentScript && document.currentScript.src) ? document.currentScript.src.replace(/nodo-chat\.js.*$/, '') : '/';
  LOGO = BASE + 'img/nodobots-asistente.png';

  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }

  var css = '' +
  '#nb-root{--nb-bg:#12121a;--nb-bg2:#1c1c28;--nb-v:#7c6df0;--nb-c:#38bdf8;--nb-t:#f0f0f5;--nb-m:#a1a1b5;font-family:"Plus Jakarta Sans",system-ui,sans-serif;position:fixed;right:20px;bottom:20px;z-index:9990;transition:bottom .3s}' +
  '#nb-bot{position:relative;width:74px;height:74px;border-radius:50%;border:0;padding:0;cursor:pointer;background:radial-gradient(circle at 35% 30%,#23233a,#0b0b12);box-shadow:0 8px 28px rgba(124,109,240,.45),0 0 0 2px rgba(56,189,248,.35);display:flex;align-items:center;justify-content:center;transform:translateX(160px);opacity:0}' +
  '#nb-bot img{width:62px;height:62px;pointer-events:none}' +
  '#nb-bot.nb-in{animation:nb-walk 1.6s cubic-bezier(.3,.7,.4,1) forwards}' +
  '#nb-bot.nb-idle{opacity:1;transform:none;animation:nb-hop 1s ease-in-out}' +
  '#nb-bot:focus-visible{outline:3px solid var(--nb-c);outline-offset:3px}' +
  '#nb-bot::after{content:"";position:absolute;top:4px;right:4px;width:13px;height:13px;border-radius:50%;background:#22c55e;border:2px solid #0b0b12}' +
  '@keyframes nb-walk{0%{transform:translateX(160px) rotate(0);opacity:0}15%{opacity:1}' +
  '25%{transform:translateX(110px) translateY(-14px) rotate(-8deg)}40%{transform:translateX(70px) translateY(0) rotate(0)}' +
  '55%{transform:translateX(35px) translateY(-12px) rotate(-6deg)}70%{transform:translateX(8px) translateY(0) rotate(0)}' +
  '85%{transform:translateX(0) translateY(-6px) rotate(4deg)}100%{transform:none;opacity:1}}' +
  '@keyframes nb-hop{0%,100%{transform:none}30%{transform:translateY(-10px) rotate(-5deg)}55%{transform:translateY(0) scale(1.06,.94)}75%{transform:translateY(-3px)}}' +
  '#nb-tip{position:absolute;right:0;bottom:88px;width:250px;background:var(--nb-bg2);color:var(--nb-t);border:1px solid rgba(124,109,240,.4);border-radius:16px 16px 4px 16px;padding:14px 34px 14px 16px;font-size:14.5px;line-height:1.45;box-shadow:0 10px 30px rgba(0,0,0,.45);cursor:pointer;opacity:0;transform:translateY(8px) scale(.96);transition:opacity .35s,transform .35s;pointer-events:none}' +
  '#nb-tip.nb-show{opacity:1;transform:none;pointer-events:auto}' +
  '#nb-tip button{position:absolute;top:6px;right:6px;width:26px;height:26px;border:0;border-radius:50%;background:transparent;color:var(--nb-m);font-size:18px;cursor:pointer;line-height:1}' +
  '#nb-tip button:hover{background:rgba(255,255,255,.08);color:var(--nb-t)}' +
  '#nb-panel{position:absolute;right:0;bottom:88px;width:370px;height:520px;max-height:calc(100vh - 130px);background:var(--nb-bg);border:1px solid rgba(124,109,240,.35);border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.6);display:none;flex-direction:column;overflow:hidden}' +
  '#nb-panel.nb-open{display:flex;animation:nb-pop .25s ease-out}' +
  '@keyframes nb-pop{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}' +
  '#nb-head{display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(135deg,rgba(124,109,240,.25),rgba(56,189,248,.15));border-bottom:1px solid rgba(255,255,255,.07)}' +
  '#nb-head img{width:40px;height:40px;border-radius:50%;background:#0b0b12}' +
  '#nb-head b{display:block;color:var(--nb-t);font-size:15px}' +
  '#nb-head span{color:#4ade80;font-size:12px}' +
  '#nb-close{margin-left:auto;width:34px;height:34px;border:0;border-radius:50%;background:rgba(255,255,255,.06);color:var(--nb-t);font-size:20px;cursor:pointer}' +
  '#nb-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}' +
  '.nb-m{max-width:85%;padding:10px 13px;border-radius:14px;font-size:14.5px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}' +
  '.nb-a{align-self:flex-start;background:var(--nb-bg2);color:var(--nb-t);border-bottom-left-radius:4px}' +
  '.nb-u{align-self:flex-end;background:linear-gradient(135deg,var(--nb-v),#5b8def);color:#fff;border-bottom-right-radius:4px}' +
  '.nb-dots{display:inline-flex;gap:4px}.nb-dots i{width:7px;height:7px;border-radius:50%;background:var(--nb-m);animation:nb-b 1.2s infinite}' +
  '.nb-dots i:nth-child(2){animation-delay:.15s}.nb-dots i:nth-child(3){animation-delay:.3s}' +
  '@keyframes nb-b{0%,60%,100%{opacity:.3;transform:none}30%{opacity:1;transform:translateY(-4px)}}' +
  '.nb-m a{color:var(--nb-c)}' +
  '#nb-form{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,.07)}' +
  '#nb-in{flex:1;background:var(--nb-bg2);border:1px solid rgba(255,255,255,.1);border-radius:12px;color:var(--nb-t);padding:10px 12px;font:inherit;font-size:15px;outline:none}' +
  '#nb-in:focus{border-color:var(--nb-v)}' +
  '#nb-send{border:0;border-radius:12px;padding:0 16px;background:linear-gradient(135deg,var(--nb-v),var(--nb-c));color:#fff;font-weight:700;cursor:pointer;font:inherit;font-weight:700}' +
  '#nb-send:disabled{opacity:.5;cursor:default}' +
  '#nb-legal{font-size:11px;color:var(--nb-m);text-align:center;padding:0 12px 9px}' +
  '@media (max-width:480px){#nb-root{right:14px;bottom:14px}#nb-panel{position:fixed;left:8px;right:8px;bottom:96px;width:auto;height:auto;top:76px;max-height:none}#nb-tip{width:220px}}' +
  '@media (prefers-reduced-motion:reduce){#nb-bot.nb-in,#nb-bot.nb-idle{animation:none;opacity:1;transform:none}}';

  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var root = document.createElement('div'); root.id = 'nb-root';
  root.innerHTML =
    '<div id="nb-panel" role="dialog" aria-label="Chat con el asistente de NodoBots">' +
      '<div id="nb-head"><img src="' + LOGO + '" alt=""><div><b>Asistente IA de NodoBots</b><span>● En línea</span></div>' +
      '<button id="nb-close" aria-label="Cerrar chat">×</button></div>' +
      '<div id="nb-msgs" aria-live="polite"></div>' +
      '<form id="nb-form"><input id="nb-in" type="text" placeholder="Escribe tu mensaje…" autocomplete="off" maxlength="600" aria-label="Tu mensaje">' +
      '<button id="nb-send" type="submit">Enviar</button></form>' +
      '<div id="nb-legal">Asistente automático con IA. Tus datos solo se usan para contactarte.</div>' +
    '</div>' +
    '<div id="nb-tip" role="status"><span></span><button aria-label="Cerrar mensaje">×</button></div>' +
    '<button id="nb-bot" aria-label="Abrir chat con el asistente de NodoBots"><img src="' + LOGO + '" alt=""></button>';
  document.body.appendChild(root);

  var bot = root.querySelector('#nb-bot'), tip = root.querySelector('#nb-tip'), panel = root.querySelector('#nb-panel');
  var msgs = root.querySelector('#nb-msgs'), form = root.querySelector('#nb-form'), inp = root.querySelector('#nb-in'), send = root.querySelector('#nb-send');
  tip.querySelector('span').textContent = SALUDO;

  var historial = []; // {q:'V'|'A', t:'...'}
  var abierto = false, ocupado = false;

  function burbuja(texto, quien) {
    var d = document.createElement('div'); d.className = 'nb-m ' + (quien === 'V' ? 'nb-u' : 'nb-a');
    d.textContent = texto; msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight; return d;
  }

  function abrir() {
    abierto = true; tip.classList.remove('nb-show'); ss('nb-tip-off', '1');
    panel.classList.add('nb-open');
    if (!historial.length) { historial.push({ q: 'A', t: SALUDO }); burbuja(SALUDO, 'A'); }
    setTimeout(function () { inp.focus(); }, 50);
  }
  function cerrar() { abierto = false; panel.classList.remove('nb-open'); bot.focus(); }

  bot.addEventListener('click', function () { abierto ? cerrar() : abrir(); });
  root.querySelector('#nb-close').addEventListener('click', cerrar);
  tip.addEventListener('click', function (e) { if (e.target.tagName === 'BUTTON') { tip.classList.remove('nb-show'); ss('nb-tip-off', '1'); e.stopPropagation(); } else abrir(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && abierto) cerrar(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var txt = inp.value.trim(); if (!txt || ocupado) return;
    inp.value = ''; burbuja(txt, 'V');
    var conv = historial.slice(-14).map(function (h) { return h.q + ': ' + h.t; }).join('\n');
    historial.push({ q: 'V', t: txt });
    ocupado = true; send.disabled = true;
    var esp = burbuja('', 'A'); esp.innerHTML = '<span class="nb-dots"><i></i><i></i><i></i></span>';
    var body = new URLSearchParams({ conversacion: conv, mensaje: txt, pagina: location.pathname });
    var ctrl = window.AbortController ? new AbortController() : null;
    var to = setTimeout(function () { if (ctrl) ctrl.abort(); }, 30000);
    fetch(WEBHOOK, { method: 'POST', body: body, signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (t) {
        t = (t || '').trim(); if (!t || t === 'Accepted') throw new Error('vacío');
        esp.textContent = t; historial.push({ q: 'A', t: t });
      })
      .catch(function () {
        esp.innerHTML = 'Ahora mismo no puedo responder 😕. Escríbenos por <a href="' + WHATSAPP + '" target="_blank" rel="noopener">WhatsApp</a> y te atendemos enseguida.';
      })
      .then(function () { clearTimeout(to); ocupado = false; send.disabled = false; msgs.scrollTop = msgs.scrollHeight; inp.focus(); });
  });

  // No tapar el banner de cookies mientras está visible
  function ajustar() {
    var cb = document.getElementById('cookie-banner');
    var vis = cb && cb.offsetParent !== null && getComputedStyle(cb).display !== 'none' && getComputedStyle(cb).visibility !== 'hidden';
    root.style.bottom = vis ? (cb.offsetHeight + 36) + 'px' : '';
  }
  setInterval(ajustar, 800); ajustar();

  // Entrada "andando" y saludo
  setTimeout(function () {
    bot.classList.add('nb-in');
    setTimeout(function () {
      bot.classList.remove('nb-in'); bot.style.opacity = '1'; bot.style.transform = 'none';
      if (!ss('nb-tip-off') && !abierto) tip.classList.add('nb-show');
    }, 1650);
  }, 2500);

  // Pequeño salto de vez en cuando mientras nadie lo usa
  setInterval(function () {
    if (abierto || document.hidden) return;
    bot.classList.remove('nb-idle'); void bot.offsetWidth; bot.classList.add('nb-idle');
  }, 9000);
})();
