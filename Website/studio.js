/* KINEX customizer: one script for every component page. The page's <body data-kind> picks the category. */
(() => {
  const $ = s => document.querySelector(s);
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const kind = document.body.dataset.kind;
  const mates = Object.entries(COMPONENTS).filter(([, c]) => c.cat === kind);
  const [id, C] = mates.find(([k]) => k === new URLSearchParams(location.search).get('c')) || mates[0];
  const F = C.groups.flatMap(g => g.f.map(f => ({ ...f, k: f.v || 'label', u: f.u || '', side: g.side })));
  let S = {}, txt = '';
  document.title = `${C.name} | KINEX.js`;

  document.body.insertAdjacentHTML('afterbegin', `
<header>
  <div class="crumb"><a class="brand" href="index.html"><img src="logo.svg" alt="">KINEX<i>.js</i></a><span>/</span><b>${C.name}</b></div>
  <nav aria-label="Main"><a class="btn" href="index.html">Home</a><button class="btn" onclick="history.back()">Back</button>
    <button class="btn" id="cat" aria-expanded="false"><span>Categories</span><b>+</b></button></nav>
</header>
<main>
  <section class="pre"><div class="stage" id="stage">
    <nav class="tabs" aria-label="${kind}">${mates.map(([k, c]) => `<a href="?c=${k}"${k === id ? ' aria-current="page"' : ''}>${c.name}</a>`).join('')}</nav>
    <div id="slot"></div>
    <label class="pill l">Preview background <input type="color" id="pbg" value="#0b0b0e"></label>
    <span class="pill r">${C.hint || ''}</span>
  </div></section>
  <section class="side">
    <div class="panel"><div class="ph"><h2>Customize</h2><button class="btn" id="reset">Reset</button></div><form class="scroll" id="panel" onsubmit="return false"></form></div>
    <div class="panel"><div class="ph"><h2>Code</h2><button class="btn" id="copy">Copy code</button></div><pre id="code"></pre></div>
  </section>
</main>`);

  // self-contained preview: the component's own css/html/on, updated in place (no kinex.js needed)
  document.head.insertAdjacentHTML('beforeend', `<style>${C.css}</style>`);
  $('#slot').innerHTML = C.html;
  const card = $('#slot').firstElementChild;
  C.on?.(card);

  const ctl = f => f.t === 'range' ? `<input type="range" min="${f.min}" max="${f.max}" step="${f.step || 1}" value="${f.d}" data-k="${f.k}"><em>${f.d}${f.u}</em>`
    : f.t === 'text' ? `<input type="text" value="${esc(f.d)}" placeholder="${esc(f.d)}" data-k="${f.k}">`
    : `<input type="color" value="${f.d}" data-k="${f.k}">`;
  const build = () => $('#panel').innerHTML = C.groups.map(g => `<section class="eng"><h3>${g.g}</h3>${g.f.map(f => {
    f = F.find(x => x.k === (f.v || 'label'));
    return `<label>${f.t === 'text' ? '' : f.l}${ctl(f)}</label>`;
  }).join('')}</section>`).join('');

  const code = () => { // only the component itself: the kinex.js link lives on the homepage
    const st = F.filter(f => f.v && S[f.k]).map(f => `${f.v}:${S[f.k]}${f.u}`), t = C.tag || 'div';
    const open = `<${t} data-kinex="${id}"${st.length ? `\n${' '.repeat(t.length + 2)}style="${st.join(';')}"` : ''}>`;
    txt = C.tag ? `${open}${esc(S.label || C.label)}</${t}>` : `${open}\n  ${C.inner}\n</${t}>`;
    $('#code').innerHTML = esc(txt).replace(/(&lt;!--.*?--&gt;)/g, '<i>$1</i>');
  };
  const render = side => {
    F.filter(f => f.v).forEach(f => card.style.setProperty(f.v, S[f.k] ? S[f.k] + f.u : ''));
    if (C.tag) card.childNodes[0].nodeValue = S.label || C.label;
    if (side != null) card.classList.toggle('kx-flipped', !!side); // card faces: show the one being edited
    code();
  };

  $('#panel').addEventListener('input', e => {
    const i = e.target, f = F.find(x => x.k === i.dataset.k), em = i.parentNode.querySelector('em');
    S[f.k] = i.value;
    if (em) em.textContent = i.value + f.u;
    render(f.side);
  });
  $('#reset').onclick = () => { S = {}; build(); render(C.groups[0].side); };
  $('#pbg').oninput = e => $('#stage').style.setProperty('--pbg', e.target.value);
  $('#copy').onclick = async e => {
    await navigator.clipboard.writeText(txt);
    e.target.textContent = 'Copied';
    setTimeout(() => e.target.textContent = 'Copy code', 1500);
  };

  build(); render(C.groups[0].side);
})();
