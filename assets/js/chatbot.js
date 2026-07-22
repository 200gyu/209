/* NEXT X 기술 블로그 AI 챗봇 위젯
 * 블로그 글을 학습한 RAG 챗봇 UI. 서버리스 엔드포인트(window.NEXTX_CHAT_ENDPOINT)로
 * 질문을 보내고 응답을 렌더링한다. 비밀 키는 서버에만 있으며 여기서는 다루지 않는다. */
(function () {
  'use strict';

  var ENDPOINT = window.NEXTX_CHAT_ENDPOINT;
  if (!ENDPOINT) return;

  var history = []; // {role, content}
  var busy = false;

  // ─── 최소·안전 마크다운 렌더 (HTML 이스케이프 후 링크/굵게만 변환) ───
  function escapeHtml(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function renderMarkdown(text) {
    var html = escapeHtml(text);
    // [텍스트](url) — url은 / 또는 http(s)만 허용
    html = html.replace(/\[([^\]]+)\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g, function (_, t, url) {
      var ext = /^https?:/.test(url);
      return (
        '<a href="' + url + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>'
      );
    });
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  // ─── DOM 구성 ───
  var fab = el('button', null, '💬');
  fab.id = 'nx-chat-fab';
  fab.setAttribute('aria-label', 'NEXT X AI 어시스턴트 열기');

  var panel = el('div');
  panel.id = 'nx-chat-panel';
  panel.innerHTML =
    '<div class="nx-chat-header">' +
    '<div><span class="nx-title">NEXT X 기술 어시스턴트</span>' +
    '<span class="nx-sub">블로그 글을 학습한 AI · 답변은 참고용입니다</span></div>' +
    '<button class="nx-chat-close" aria-label="닫기">&times;</button>' +
    '</div>' +
    '<div class="nx-chat-body" id="nx-chat-body"></div>' +
    '<div class="nx-chat-input">' +
    '<textarea id="nx-chat-text" rows="1" placeholder="예: RAG가 뭐야? 급여 정산 시스템은 어떻게 만들었어?"></textarea>' +
    '<button class="nx-chat-send" id="nx-chat-send">전송</button>' +
    '</div>' +
    '<div class="nx-chat-disclaimer">AI가 블로그 글을 바탕으로 생성한 답변이며 부정확할 수 있습니다.</div>';

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  var body = panel.querySelector('#nx-chat-body');
  var textarea = panel.querySelector('#nx-chat-text');
  var sendBtn = panel.querySelector('#nx-chat-send');
  var closeBtn = panel.querySelector('.nx-chat-close');

  function addMsg(role, text) {
    var wrap = el('div', 'nx-msg ' + (role === 'user' ? 'nx-user' : 'nx-bot'));
    var bubble = el('div', 'nx-bubble', role === 'user' ? escapeHtml(text) : renderMarkdown(text));
    wrap.appendChild(bubble);
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
    return wrap;
  }

  var greeted = false;
  function greet() {
    if (greeted) return;
    greeted = true;
    addMsg(
      'bot',
      '안녕하세요! 넥스트엑스 기술 블로그의 AI 어시스턴트입니다. 블로그에 쌓인 글을 바탕으로 답해드려요. 무엇이 궁금하신가요?'
    );
  }

  function openPanel() {
    panel.classList.add('nx-open');
    greet();
    textarea.focus();
  }
  function closePanel() {
    panel.classList.remove('nx-open');
  }

  fab.addEventListener('click', function () {
    panel.classList.contains('nx-open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);

  textarea.addEventListener('input', function () {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 90) + 'px';
  });
  textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  });
  sendBtn.addEventListener('click', send);

  function send() {
    if (busy) return;
    var msg = textarea.value.trim();
    if (!msg) return;

    addMsg('user', msg);
    history.push({ role: 'user', content: msg });
    textarea.value = '';
    textarea.style.height = 'auto';

    busy = true;
    sendBtn.disabled = true;
    var typing = el('div', 'nx-msg nx-bot nx-typing');
    typing.appendChild(el('div', 'nx-bubble', '답변을 찾는 중…'));
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg, history: history.slice(0, -1) }),
    })
      .then(function (r) {
        return r.json().then(function (data) {
          return { ok: r.ok, data: data };
        });
      })
      .then(function (res) {
        typing.remove();
        if (!res.ok || res.data.error) {
          addMsg('bot', res.data.error || '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          return;
        }
        var answer = res.data.answer || '답변을 생성하지 못했습니다.';
        addMsg('bot', answer);
        history.push({ role: 'assistant', content: answer });
        if (history.length > 12) history = history.slice(-12);
      })
      .catch(function () {
        typing.remove();
        addMsg('bot', '연결에 실패했습니다. 네트워크를 확인하고 다시 시도해 주세요.');
      })
      .finally(function () {
        busy = false;
        sendBtn.disabled = false;
        textarea.focus();
      });
  }
})();
