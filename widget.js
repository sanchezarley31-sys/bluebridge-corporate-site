/*!
 * Blue Bridge AI Chat Widget v1.0
 * Embed on any website: <script src="widget.js" data-api-key="..." data-agent="support"></script>
 */
(function () {
  'use strict';

  const script = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  const cfg = {
    apiKey:   script.getAttribute('data-api-key')   || '',
    agent:    script.getAttribute('data-agent')      || 'support',
    color:    script.getAttribute('data-color')      || '#0052FF',
    position: script.getAttribute('data-position')   || 'right',
    name:     script.getAttribute('data-name')       || 'AI Assistant',
    avatar:   script.getAttribute('data-avatar')     || '',
    welcome:  script.getAttribute('data-welcome')    || '¡Hola! ¿En qué puedo ayudarte hoy?',
    language: script.getAttribute('data-language')   || 'es',
    apiUrl:   script.getAttribute('data-api-url')    || 'https://bluebridge.es/api/v1/public/agents/chat',
    theme:    script.getAttribute('data-theme')      || 'dark',
  };

  const SESSION_KEY = 'bb_widget_session_' + (cfg.apiKey || 'demo');
  let sessionId = sessionStorage.getItem(SESSION_KEY) || ('sess_' + Math.random().toString(36).slice(2));
  sessionStorage.setItem(SESSION_KEY, sessionId);

  // ── CSS ──────────────────────────────────────────────────────────────────
  const css = `
    #bb-widget-btn {
      position: fixed;
      ${cfg.position === 'left' ? 'left: 24px' : 'right: 24px'};
      bottom: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${cfg.color};
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 24px rgba(0,82,255,0.45);
      z-index: 2147483646;
      transition: transform .2s, box-shadow .2s;
    }
    #bb-widget-btn:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(0,82,255,0.55); }
    #bb-widget-btn svg { width:28px; height:28px; fill:white; transition: opacity .2s; }
    #bb-widget-badge {
      position: absolute;
      top: -3px; right: -3px;
      background: #ef4444;
      color: white;
      font-size: 10px;
      font-weight: 700;
      border-radius: 10px;
      padding: 2px 6px;
      font-family: sans-serif;
      display: none;
    }

    #bb-widget-panel {
      position: fixed;
      ${cfg.position === 'left' ? 'left: 16px' : 'right: 16px'};
      bottom: 96px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 560px;
      max-height: calc(100vh - 120px);
      background: #0c1120;
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,.6);
      display: flex;
      flex-direction: column;
      z-index: 2147483645;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      overflow: hidden;
      transform: scale(.92) translateY(16px);
      opacity: 0;
      pointer-events: none;
      transition: transform .25s cubic-bezier(.34,1.56,.64,1), opacity .2s;
    }
    #bb-widget-panel.bb-open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* Header */
    #bb-header {
      background: linear-gradient(135deg, ${cfg.color} 0%, #003acc 100%);
      padding: 16px 18px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    #bb-avatar {
      width: 42px; height: 42px;
      border-radius: 50%;
      background: rgba(255,255,255,.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; font-weight: 700; color: white;
      flex-shrink: 0;
      overflow: hidden;
    }
    #bb-avatar img { width: 100%; height: 100%; object-fit: cover; }
    #bb-header-info { flex: 1; min-width: 0; }
    #bb-agent-name { color: white; font-weight: 700; font-size: 15px; margin: 0; }
    #bb-status {
      display: flex; align-items: center; gap: 5px;
      color: rgba(255,255,255,.8); font-size: 12px; margin-top: 2px;
    }
    #bb-status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #22c55e; display: inline-block;
      animation: bb-pulse 2s infinite;
    }
    @keyframes bb-pulse {
      0%,100% { opacity:1; } 50% { opacity:.5; }
    }
    #bb-close {
      background: rgba(255,255,255,.15); border: none;
      width: 32px; height: 32px; border-radius: 50%;
      color: white; font-size: 18px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .15s;
    }
    #bb-close:hover { background: rgba(255,255,255,.28); }

    /* Messages */
    #bb-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,.1) transparent;
    }
    #bb-messages::-webkit-scrollbar { width: 4px; }
    #bb-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }

    .bb-msg { display: flex; gap: 8px; max-width: 100%; }
    .bb-msg.bb-user { flex-direction: row-reverse; }
    .bb-bubble {
      max-width: 78%;
      padding: 10px 14px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
    }
    .bb-bot .bb-bubble {
      background: #1a2540;
      color: #e2e8f0;
      border-radius: 18px 18px 18px 4px;
      border: 1px solid rgba(255,255,255,.07);
    }
    .bb-user .bb-bubble {
      background: ${cfg.color};
      color: white;
      border-radius: 18px 18px 4px 18px;
    }
    .bb-msg-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      background: ${cfg.color}33;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; color: ${cfg.color};
      flex-shrink: 0; margin-top: 2px;
    }

    /* Typing indicator */
    #bb-typing {
      display: none;
      align-items: center;
      gap: 8px;
      padding: 0 4px;
    }
    #bb-typing.bb-show { display: flex; }
    .bb-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: rgba(255,255,255,.35);
      animation: bb-bounce .9s infinite;
    }
    .bb-dot:nth-child(2) { animation-delay: .15s; }
    .bb-dot:nth-child(3) { animation-delay: .3s; }
    @keyframes bb-bounce {
      0%,60%,100% { transform: translateY(0); }
      30% { transform: translateY(-6px); background: ${cfg.color}; }
    }

    /* Quick replies */
    #bb-quick { padding: 0 16px 8px; display: flex; flex-wrap: wrap; gap: 6px; flex-shrink: 0; }
    .bb-quick-btn {
      background: rgba(0,82,255,.12);
      border: 1px solid ${cfg.color}44;
      color: ${cfg.color};
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
      transition: background .15s;
      white-space: nowrap;
    }
    .bb-quick-btn:hover { background: ${cfg.color}22; }

    /* Input */
    #bb-input-row {
      padding: 12px 16px;
      border-top: 1px solid rgba(255,255,255,.07);
      display: flex;
      gap: 8px;
      align-items: flex-end;
      flex-shrink: 0;
      background: #0c1120;
    }
    #bb-input {
      flex: 1;
      background: #1a2540;
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 12px;
      color: #e2e8f0;
      font-size: 14px;
      padding: 10px 14px;
      resize: none;
      outline: none;
      min-height: 40px;
      max-height: 100px;
      font-family: inherit;
      line-height: 1.4;
      transition: border-color .15s;
    }
    #bb-input::placeholder { color: rgba(255,255,255,.3); }
    #bb-input:focus { border-color: ${cfg.color}; }
    #bb-send {
      width: 40px; height: 40px; border-radius: 10px;
      background: ${cfg.color};
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: background .15s, transform .1s;
    }
    #bb-send:hover { background: #003acc; transform: scale(1.05); }
    #bb-send:disabled { background: #334; cursor: not-allowed; transform: none; }
    #bb-send svg { width:18px; height:18px; fill:white; }

    /* Powered by */
    #bb-footer {
      text-align: center;
      padding: 6px;
      font-size: 10px;
      color: rgba(255,255,255,.2);
      flex-shrink: 0;
    }
    #bb-footer a { color: ${cfg.color}; text-decoration: none; }

    @media (max-width: 420px) {
      #bb-widget-panel { width: calc(100vw - 16px); ${cfg.position === 'left' ? 'left:8px' : 'right:8px'}; bottom: 90px; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── HTML ─────────────────────────────────────────────────────────────────
  const initials = cfg.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();

  const btn = document.createElement('button');
  btn.id = 'bb-widget-btn';
  btn.setAttribute('aria-label', 'Open chat');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.2L4 17.2V4H20V16Z"/>
    </svg>
    <span id="bb-widget-badge"></span>
  `;

  const QUICK_REPLIES = {
    support:   ['Tengo un problema', 'Hablar con humano', 'Estado de mi pedido'],
    sales:     ['Ver precios', 'Solicitar demo', 'Contactar ventas'],
    booking:   ['Hacer una cita', 'Cancelar reserva', 'Ver disponibilidad'],
    marketing: ['Ver campañas', 'Solicitar propuesta', 'Ver reportes'],
    hr:        ['Información de vacantes', 'Estado de solicitud', 'Contactar RRHH'],
    analytics: ['Ver métricas', 'Exportar reporte', 'Configurar dashboard'],
  };

  const panel = document.createElement('div');
  panel.id = 'bb-widget-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Chat con ' + cfg.name);
  panel.innerHTML = `
    <div id="bb-header">
      <div id="bb-avatar">
        ${cfg.avatar ? `<img src="${cfg.avatar}" alt="${cfg.name}" />` : initials}
      </div>
      <div id="bb-header-info">
        <p id="bb-agent-name">${cfg.name}</p>
        <div id="bb-status"><span id="bb-status-dot"></span>En línea ahora</div>
      </div>
      <button id="bb-close" aria-label="Cerrar chat">✕</button>
    </div>

    <div id="bb-messages" role="log" aria-live="polite"></div>

    <div id="bb-typing">
      <div class="bb-dot"></div>
      <div class="bb-dot"></div>
      <div class="bb-dot"></div>
    </div>

    <div id="bb-quick">
      ${(QUICK_REPLIES[cfg.agent] || QUICK_REPLIES.support).map(q =>
        `<button class="bb-quick-btn">${q}</button>`
      ).join('')}
    </div>

    <div id="bb-input-row">
      <textarea id="bb-input" placeholder="Escribe un mensaje..." rows="1" aria-label="Mensaje"></textarea>
      <button id="bb-send" aria-label="Enviar" disabled>
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div id="bb-footer">Powered by <a href="https://bluebridge.es" target="_blank">Blue Bridge AI</a></div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  // ── State ─────────────────────────────────────────────────────────────────
  let isOpen = false;
  let isTyping = false;
  let unread = 0;
  const messagesEl = panel.querySelector('#bb-messages');
  const inputEl    = panel.querySelector('#bb-input');
  const sendEl     = panel.querySelector('#bb-send');
  const typingEl   = panel.querySelector('#bb-typing');
  const badgeEl    = btn.querySelector('#bb-widget-badge');
  const closeEl    = panel.querySelector('#bb-close');

  // ── Helpers ───────────────────────────────────────────────────────────────
  function addMessage(text, role) {
    const div = document.createElement('div');
    div.className = `bb-msg bb-${role === 'user' ? 'user' : 'bot'}`;
    if (role !== 'user') {
      div.innerHTML = `
        <div class="bb-msg-avatar">${initials}</div>
        <div class="bb-bubble">${text.replace(/\n/g, '<br>')}</div>
      `;
    } else {
      div.innerHTML = `<div class="bb-bubble">${text.replace(/\n/g, '<br>')}</div>`;
    }
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    if (role !== 'user' && !isOpen) {
      unread++;
      badgeEl.textContent = unread;
      badgeEl.style.display = 'block';
    }
    return div;
  }

  function setTyping(show) {
    isTyping = show;
    typingEl.classList.toggle('bb-show', show);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function togglePanel() {
    isOpen = !isOpen;
    panel.classList.toggle('bb-open', isOpen);
    btn.innerHTML = isOpen
      ? `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"/></svg>`
      : `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.2L4 17.2V4H20V16Z" fill="white"/></svg><span id="bb-widget-badge" style="display:none"></span>`;
    if (isOpen) {
      unread = 0;
      const b = btn.querySelector('#bb-widget-badge');
      if (b) b.style.display = 'none';
      setTimeout(() => inputEl.focus(), 300);
    }
  }

  // ── API call ──────────────────────────────────────────────────────────────
  async function sendMessage(text) {
    if (!text.trim() || isTyping) return;
    addMessage(text, 'user');
    inputEl.value = '';
    inputEl.style.height = 'auto';
    sendEl.disabled = true;

    // Hide quick replies after first message
    panel.querySelector('#bb-quick').style.display = 'none';

    setTyping(true);

    try {
      const res = await fetch(cfg.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key:    cfg.apiKey,
          agent_type: cfg.agent,
          message:    text,
          session_id: sessionId,
          language:   cfg.language,
        }),
      });

      if (!res.ok) throw new Error('API error ' + res.status);
      const data = await res.json();
      setTyping(false);
      addMessage(data.response || 'No response', 'bot');
    } catch (err) {
      setTyping(false);
      // Fallback demo response when API not available
      const fallbacks = {
        support:   '¡Gracias por contactarnos! Un agente revisará tu consulta pronto. ¿Puedes darnos más detalles?',
        sales:     'Gracias por tu interés. Nuestro equipo de ventas se pondrá en contacto contigo en menos de 24 horas.',
        booking:   'Perfecto. ¿Qué fecha y hora te vendría mejor para tu cita?',
        marketing: '¡Excelente! Podemos crear una campaña personalizada para tu negocio. ¿Cuál es tu objetivo principal?',
        hr:        'Gracias por contactar a Recursos Humanos. ¿En qué podemos ayudarte hoy?',
        analytics: 'Entendido. Puedo preparar ese reporte para ti. ¿Qué período de tiempo te interesa?',
      };
      addMessage(fallbacks[cfg.agent] || fallbacks.support, 'bot');
    }
  }

  // ── Events ────────────────────────────────────────────────────────────────
  btn.addEventListener('click', togglePanel);
  closeEl.addEventListener('click', togglePanel);

  inputEl.addEventListener('input', function () {
    sendEl.disabled = !this.value.trim();
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });

  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!sendEl.disabled) sendMessage(this.value.trim());
    }
  });

  sendEl.addEventListener('click', function () {
    sendMessage(inputEl.value.trim());
  });

  panel.querySelectorAll('.bb-quick-btn').forEach(function (qBtn) {
    qBtn.addEventListener('click', function () {
      sendMessage(this.textContent);
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (isOpen && !panel.contains(e.target) && !btn.contains(e.target)) {
      togglePanel();
    }
  });

  // ── Init: welcome message ─────────────────────────────────────────────────
  setTimeout(function () {
    addMessage(cfg.welcome, 'bot');
  }, 800);

})();
