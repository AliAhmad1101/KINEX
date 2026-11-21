/* KINEX buttons: shimmer-btn, magnetic-btn, ripple-btn, neon-btn, confetti-btn, progress-btn,
   keycap-btn, hold-btn, sticker-btn */
(() => {
  document.head.prepend(Object.assign(document.createElement('style'), { id: 'kx-btn-css', textContent: `
.kx-b{--kx-fg:#fff;--kx-radius:999px;--kx-size:1rem;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;position:relative;overflow:hidden;isolation:isolate;padding:.85em 2em;border:0;border-radius:var(--kx-radius);color:var(--kx-fg);font-family:inherit;font-weight:700;font-size:var(--kx-size);line-height:1.2;white-space:nowrap;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .25s cubic-bezier(.2,.9,.3,1),box-shadow .3s,filter .3s}
.kx-b:focus-visible{outline:3px solid currentColor;outline-offset:3px}
.kx-b:disabled{opacity:.5;cursor:not-allowed}
@media(prefers-reduced-motion:reduce){.kx-b,.kx-b *{animation:none!important;transition-duration:.01s!important}}
.kx-b-shimmer{--kx-c1:#7c3aed;--kx-c2:#db2777;--kx-speed:2.4s;background:linear-gradient(135deg,var(--kx-c1),var(--kx-c2));box-shadow:0 6px 22px color-mix(in srgb,var(--kx-c1) 45%,transparent)}
.kx-b-shimmer::before,.kx-b-shimmer::after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none}
.kx-b-shimmer::before{background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.45) 50%,transparent 70%) -150% 0/60% 100% no-repeat;animation:kx-shim var(--kx-speed) linear infinite}
.kx-b-shimmer::after{opacity:0;transition:opacity .3s;background:radial-gradient(circle 70px at var(--mx,50%) var(--my,50%),rgba(255,255,255,.35),transparent)}
.kx-b-shimmer:hover{transform:translateY(-3px);box-shadow:0 12px 30px color-mix(in srgb,var(--kx-c1) 60%,transparent)}
.kx-b-shimmer:hover::after{opacity:1}
.kx-b-shimmer:active{transform:scale(.97)}
@keyframes kx-shim{to{background-position:250% 0}}
.kx-b-magnetic{--kx-bg:#fafafa;--kx-fg:#111;--kx-depth:6px;--kx-pull:.35;--kx-radius:14px;background:var(--kx-bg);transform:translate(var(--tx,0px),var(--ty,0px));box-shadow:0 var(--kx-depth) 0 color-mix(in srgb,var(--kx-bg) 50%,#000),0 calc(var(--kx-depth)*2.5) 24px rgba(0,0,0,.3);transition:transform .2s cubic-bezier(.2,.9,.3,1),box-shadow .15s}
.kx-b-magnetic:hover{filter:brightness(1.06)}
.kx-b-magnetic:active{transform:translate(var(--tx,0px),calc(var(--ty,0px) + var(--kx-depth)));box-shadow:0 0 0 color-mix(in srgb,var(--kx-bg) 50%,#000),0 2px 8px rgba(0,0,0,.3)}
.kx-b-ripple{--kx-bg:#e11d48;--kx-ripple:#ffffff;--kx-radius:14px;background:var(--kx-bg);box-shadow:0 6px 20px color-mix(in srgb,var(--kx-bg) 40%,transparent)}
.kx-b-ripple:hover{transform:translateY(-2px);box-shadow:0 12px 28px color-mix(in srgb,var(--kx-bg) 55%,transparent)}
.kx-b-ripple:active{transform:scale(.97)}
.kx-rip{position:absolute;z-index:-1;border-radius:50%;pointer-events:none;background:var(--kx-ripple);transform:translate(-50%,-50%) scale(0);animation:kx-rip .7s ease-out forwards}
@keyframes kx-rip{from{opacity:.55}to{opacity:0;transform:translate(-50%,-50%) scale(1)}}
.kx-b-neon{--kx-neon:#22d3ee;--kx-glow:28px;background:transparent;color:var(--kx-neon);box-shadow:inset 0 0 0 2px var(--kx-neon);transition:transform .25s cubic-bezier(.2,.9,.3,1),box-shadow .3s}
.kx-b-neon::before{content:'';position:absolute;inset:0;z-index:-1;opacity:0;transition:opacity .3s;background:radial-gradient(circle 90px at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--kx-neon) 45%,transparent),transparent 70%)}
.kx-b-neon:hover{transform:scale(1.04);box-shadow:inset 0 0 0 2px var(--kx-neon),inset 0 0 calc(var(--kx-glow)/2) color-mix(in srgb,var(--kx-neon) 35%,transparent),0 0 var(--kx-glow) color-mix(in srgb,var(--kx-neon) 65%,transparent)}
.kx-b-neon:hover::before{opacity:1}
.kx-b-neon:active{transform:scale(.97)}
.kx-ping{animation:kx-ping .6s ease-out}
@keyframes kx-ping{from{outline:2px solid var(--kx-neon);outline-offset:0}to{outline:2px solid transparent;outline-offset:18px}}
.kx-b-confetti{--kx-bg:#f59e0b;--kx-fg:#1f1300;--kx-p1:#ef4444;--kx-p2:#3b82f6;--kx-count:22;--kx-radius:14px;overflow:visible;background:var(--kx-bg);box-shadow:0 6px 0 color-mix(in srgb,var(--kx-bg) 55%,#000)}
.kx-b-confetti:hover{transform:translateY(-3px) rotate(-1.5deg)}
.kx-b-confetti:active{transform:translateY(5px);box-shadow:0 1px 0 color-mix(in srgb,var(--kx-bg) 55%,#000)}
.kx-cf{position:absolute;z-index:5;width:7px;height:11px;border-radius:2px;pointer-events:none}
.kx-b-progress{--kx-bg:#2563eb;--kx-fill:#60a5fa;--kx-time:1.6s;--kx-radius:14px;background:var(--kx-bg);box-shadow:0 6px 20px color-mix(in srgb,var(--kx-bg) 40%,transparent)}
.kx-b-progress::before{content:'';position:absolute;inset:0;z-index:-1;background:var(--kx-fill);transform:scaleX(0);transform-origin:left}
.kx-b-progress.kx-run::before{transform:none;transition:transform var(--kx-time) cubic-bezier(.4,0,.2,1)}
.kx-b-progress.kx-done::before{background:#22c55e}
.kx-b-progress:hover{transform:translateY(-2px)}
.kx-b-progress.kx-run{pointer-events:none}
.kx-b-keycap{--kx-bg:#e8edf4;--kx-fg:#1c2430;--kx-lip:#b9c4d4;--kx-depth:7px;--kx-radius:12px;background:linear-gradient(180deg,#fff 0%,var(--kx-bg) 72%);color:var(--kx-fg);letter-spacing:.03em;box-shadow:0 var(--kx-depth) 0 var(--kx-lip),0 calc(var(--kx-depth) + 3px) 14px #0008,inset 0 1px 0 #fff;transition:transform .07s linear,box-shadow .07s linear,filter .2s}
.kx-b-keycap:hover{filter:brightness(1.03)}
.kx-b-keycap:active{transform:translateY(var(--kx-depth));box-shadow:0 0 0 var(--kx-lip),0 2px 6px #0009,inset 0 1px 0 #fff}
.kx-b-hold{--kx-bg:#1f2937;--kx-fill:#22c55e;--kx-time:1.2s;--kx-radius:999px;background:var(--kx-bg);touch-action:none;user-select:none;-webkit-user-select:none;transition:color .25s,box-shadow .3s}
.kx-b-hold::before{content:'';position:absolute;inset:0;z-index:-1;background:var(--kx-fill);transform:scaleX(0);transform-origin:left;transition:transform .16s ease-out}
.kx-b-hold.kx-holding::before{transform:scaleX(1);transition:transform var(--kx-time) linear}
.kx-b-hold.kx-held::before{transform:scaleX(1);transition:none}
.kx-b-hold.kx-held{color:#04120a;box-shadow:0 0 0 3px color-mix(in srgb,var(--kx-fill) 40%,transparent)}
.kx-b-hold:hover{filter:brightness(1.08)}
.kx-b-sticker{--kx-bg:#fde047;--kx-fg:#181410;--kx-radius:10px;overflow:visible;background:var(--kx-bg);color:var(--kx-fg);border:3px solid var(--kx-fg);box-shadow:5px 5px 0 var(--kx-fg);transform:rotate(-2deg);transition:transform .22s cubic-bezier(.2,1.5,.35,1),box-shadow .22s}
.kx-b-sticker::before{content:'';position:absolute;inset:-11px;border:2px dashed color-mix(in srgb,var(--kx-fg) 38%,transparent);border-radius:calc(var(--kx-radius) + 9px);pointer-events:none}
.kx-b-sticker:hover{transform:rotate(1.5deg) translate(-2px,-3px);box-shadow:8px 9px 0 var(--kx-fg)}
.kx-b-sticker:active{transform:rotate(0) translate(4px,5px);box-shadow:1px 1px 0 var(--kx-fg)}` }));
  const kxVar=(b,k)=>getComputedStyle(b).getPropertyValue(k).trim();
  const kxTrack=b=>b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',e.clientX-r.left+'px');b.style.setProperty('--my',e.clientY-r.top+'px')});
  const ON = {
    shimmer: b => kxTrack(b),
    magnetic: b => { const f = e => { if (!b.isConnected) return removeEventListener('pointermove', f); const r = b.getBoundingClientRect(), dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2, near = Math.hypot(dx, dy) < Math.max(r.width, r.height) / 2 + 60, p = parseFloat(kxVar(b, '--kx-pull')) || .35; b.style.setProperty('--tx', near ? dx * p + 'px' : '0px'); b.style.setProperty('--ty', near ? dy * p + 'px' : '0px') }; addEventListener('pointermove', f) },
    ripple: b => b.addEventListener('click', e => { const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2, s = document.createElement('span'); s.className = 'kx-rip'; s.style.cssText = `width:${d}px;height:${d}px;left:${e.detail ? e.clientX - r.left : r.width / 2}px;top:${e.detail ? e.clientY - r.top : r.height / 2}px`; b.append(s); s.onanimationend = () => s.remove() }),
    neon: b => { kxTrack(b); b.addEventListener('click', () => { b.classList.remove('kx-ping'); void b.offsetWidth; b.classList.add('kx-ping') }) },
    confetti: b => b.addEventListener('click', e => { const r = b.getBoundingClientRect(), n = +kxVar(b, '--kx-count') || 22, x = e.detail ? e.clientX - r.left : r.width / 2, y = e.detail ? e.clientY - r.top : r.height / 2, cols = [kxVar(b, '--kx-p1'), kxVar(b, '--kx-p2'), kxVar(b, '--kx-bg'), '#fff']; for (let i = 0; i < n; i++) { const s = document.createElement('i'), a = Math.random() * 6.283, d = 50 + Math.random() * 70; s.className = 'kx-cf'; s.style.cssText = `left:${x}px;top:${y}px;background:${cols[i % 4]}`; b.append(s); s.animate([{ transform: 'translate(-50%,-50%) rotate(0)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d + 30}px)) rotate(${Math.random() * 720}deg)`, opacity: 0 }], { duration: 600 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => s.remove() } }),
    progress: b => b.addEventListener('click', () => { if (b.classList.contains('kx-run')) return; const t = (parseFloat(kxVar(b, '--kx-time')) || 1.6) * 1000, html = b.innerHTML; b.classList.add('kx-run'); b.textContent = b.dataset.loading || 'Loading\u2026'; setTimeout(() => { b.classList.add('kx-done'); b.textContent = b.dataset.done || 'Done \u2713' }, t); setTimeout(() => { b.classList.remove('kx-run', 'kx-done'); b.innerHTML = html }, t + 1300) }),
    keycap: () => {}, // pure CSS: the class swap below is all it needs
    hold: b => {
      let timer, back;
      const stop = () => { clearTimeout(timer); clearTimeout(back) };
      const reset = () => { b.classList.remove('kx-holding', 'kx-held'); if (b.dataset.kxLabel) { b.textContent = b.dataset.kxLabel; delete b.dataset.kxLabel } };
      const start = e => {
        if (b.disabled || b.classList.contains('kx-held')) return;
        if (e.type === 'keydown' && e.key !== ' ' && e.key !== 'Enter') return;
        stop(); b.classList.remove('kx-held');
        if (!b.dataset.kxLabel) b.dataset.kxLabel = b.textContent;
        b.classList.add('kx-holding');
        timer = setTimeout(() => { b.classList.remove('kx-holding'); b.classList.add('kx-held'); b.textContent = b.dataset.done || 'Confirmed'; back = setTimeout(reset, 1400) }, (parseFloat(kxVar(b, '--kx-time')) || 1.2) * 1000)
      };
      const end = () => { clearTimeout(timer); if (!b.classList.contains('kx-held')) b.classList.remove('kx-holding') };
      b.addEventListener('pointerdown', start); b.addEventListener('pointerup', end); b.addEventListener('pointerleave', end); b.addEventListener('pointercancel', end);
      b.addEventListener('keydown', start); b.addEventListener('keyup', e => { (e.key === ' ' || e.key === 'Enter') && end() });
      b.addEventListener('contextmenu', e => e.preventDefault())
    },
    sticker: () => {} // pure CSS
  };
  const init = () => document.querySelectorAll('[data-kinex$="-btn"]:not([data-kx-ready])').forEach(b => {
    const n = b.dataset.kinex.slice(0, -4);
    if (!ON[n]) return;
    b.dataset.kxReady = '1';
    b.classList.add('kx-b', 'kx-b-' + n);
    ON[n](b);
  });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  new MutationObserver(init).observe(document.documentElement, { childList: true, subtree: true });
})();
