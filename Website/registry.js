/* KINEX registry: the ONLY file you edit to add a component.
   To add a component: copy an entry below, give it a new key, name, cat, css, html, on and groups.
   Cards open card.html, Buttons open button.html (see kxPage). For a button entry also set tag:'button' and label.
   cat = category it appears in (one of CATEGORIES), featured:true = also listed under Featured.
   Use a unique class prefix in css so previews never clash with other components. */
const kxSlug=t=>t.toLowerCase().replace(/\W+/g,'-');
const CATEGORIES=['Buttons','Cards','Navigation','Forms','Text Effects','Backgrounds','Loaders'];
const kxVar=(b,k)=>getComputedStyle(b).getPropertyValue(k).trim();
const kxTrack=b=>b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',e.clientX-r.left+'px');b.style.setProperty('--my',e.clientY-r.top+'px')});
const kxPage=id=>({Cards:'card',Buttons:'button'}[COMPONENTS[id].cat]||'card')+'.html?c='+id;
const kxBtn=`.kx-b{--kx-fg:#fff;--kx-radius:999px;--kx-size:1rem;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;position:relative;overflow:hidden;isolation:isolate;padding:.85em 2em;border:0;border-radius:var(--kx-radius);color:var(--kx-fg);font-family:inherit;font-weight:700;font-size:var(--kx-size);line-height:1.2;white-space:nowrap;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .25s cubic-bezier(.2,.9,.3,1),box-shadow .3s,filter .3s}
.kx-b:focus-visible{outline:3px solid currentColor;outline-offset:3px}
.kx-b:disabled{opacity:.5;cursor:not-allowed}
@media(prefers-reduced-motion:reduce){.kx-b,.kx-b *{animation:none!important;transition-duration:.01s!important}}
`;
const CDN='https://cdn.jsdelivr.net/gh/YOUR_USER/kinex@1.0.0/kinex.js';

/* ADD NEW COMPONENTS HERE. One entry each, no other change needed. The preview is self-contained (no kinex.js needed).
   inner = markup users fill in, css/html = what the preview shows (same as kinex.js builds), on = preview interaction,
   v = CSS variable, t = color | range, d = default, side = face shown while editing (0 front, 1 back) */
const COMPONENTS={
 'flip-card':{name:'Flip Card',hint:'Hover to zoom, click to flip',desc:'Zooms on hover, flips on click to reveal a second side.',cat:'Cards',featured:true,
  inner:'<div data-front><!-- your front content --></div>\n  <div data-back><!-- your back content --></div>',
  css:`.kx-card{--kx-w:200px;--kx-radius:20px;--kx-front-bg:linear-gradient(160deg,#ff8a5b,#e83e8c);--kx-front-fg:#fff;--kx-back-bg:#fffaf5;--kx-back-fg:#1c1c24;display:inline-block;width:var(--kx-w);aspect-ratio:5/7;perspective:1200px;cursor:pointer;outline:none;transition:transform .35s cubic-bezier(.2,.9,.3,1)}
.kx-card:hover{transform:scale(1.06)}
.kx-card:focus-visible{outline:3px solid #fff8;outline-offset:6px;border-radius:var(--kx-radius)}
.kx-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .8s cubic-bezier(.4,.2,.2,1)}
.kx-flipped .kx-inner{transform:rotateY(180deg)}
.kx-face{position:absolute;inset:0;border-radius:var(--kx-radius);overflow:hidden;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 14px 34px rgba(0,0,0,.18);transition:box-shadow .35s}
.kx-card:hover .kx-face{box-shadow:0 26px 54px rgba(0,0,0,.28)}
.kx-front{background:var(--kx-front-bg);color:var(--kx-front-fg)}
.kx-front::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 85% 12%,rgba(255,255,255,.28),transparent 45%)}
.kx-back{background:var(--kx-back-bg);color:var(--kx-back-fg);transform:rotateY(180deg)}`,
  html:'<div class="kx-card" tabindex="0"><div class="kx-inner"><div class="kx-face kx-front"></div><div class="kx-face kx-back"></div></div></div>',
  on:c=>{c.onclick=()=>c.classList.toggle('kx-flipped');c.onkeydown=e=>e.key==='Enter'&&c.click()},
  groups:[
   {g:'Front',side:0,f:[{l:'Background',v:'--kx-front-bg',t:'color',d:'#e83e8c'},{l:'Text',v:'--kx-front-fg',t:'color',d:'#ffffff'}]},
   {g:'Back',side:1,f:[{l:'Background',v:'--kx-back-bg',t:'color',d:'#fffaf5'},{l:'Text',v:'--kx-back-fg',t:'color',d:'#1c1c24'}]},
   {g:'Size',f:[{l:'Width',v:'--kx-w',t:'range',min:160,max:400,d:200,u:'px'},{l:'Corners',v:'--kx-radius',t:'range',min:0,max:40,d:20,u:'px'}]}]},
 'tilt-card':{name:'Tilt Card',hint:'Move your cursor over the card',desc:'Leans toward your cursor in 3D with a moving glare.',cat:'Cards',
  inner:'<!-- your content -->',
  css:`.kx-tilt{--kx-w:300px;--kx-radius:20px;--kx-bg:#1b1b24;--kx-fg:#fff;--kx-tilt:14;--kx-glare:rgba(255,255,255,.35);position:relative;display:inline-block;vertical-align:top;box-sizing:border-box;width:var(--kx-w);aspect-ratio:5/7;padding:1.6rem;border-radius:var(--kx-radius);background:var(--kx-bg);color:var(--kx-fg);font-family:inherit;box-shadow:0 14px 34px rgba(0,0,0,.25);transform-style:preserve-3d;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(var(--s,1));transition:transform .5s cubic-bezier(.2,.9,.3,1),box-shadow .4s}
.kx-tilt.kx-on{transition:transform .08s linear,box-shadow .4s;box-shadow:0 30px 60px rgba(0,0,0,.4)}
.kx-tilt>*{transform:translateZ(30px)}
.kx-tilt::after{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .4s;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),var(--kx-glare),transparent 55%)}
.kx-tilt.kx-on::after{opacity:1}
@media(prefers-reduced-motion:reduce){.kx-tilt{transition:none!important}}`,
  html:'<div class="kx-tilt"></div>',
  on:c=>{const s=(k,v)=>c.style.setProperty(k,v);
   c.onpointermove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height,m=parseFloat(getComputedStyle(c).getPropertyValue('--kx-tilt'))||14;
    c.classList.add('kx-on');s('--ry',(x-.5)*2*m+'deg');s('--rx',(.5-y)*2*m+'deg');s('--gx',x*100+'%');s('--gy',y*100+'%');s('--s',1.04)};
   c.onpointerleave=()=>{c.classList.remove('kx-on');['--rx','--ry','--s'].forEach(p=>c.style.removeProperty(p))}},
  groups:[
   {g:'Card',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#1b1b24'},{l:'Text',v:'--kx-fg',t:'color',d:'#ffffff'}]},
   {g:'Motion',f:[{l:'Tilt angle',v:'--kx-tilt',t:'range',min:2,max:30,d:14,u:''}]},
   {g:'Size',f:[{l:'Width',v:'--kx-w',t:'range',min:200,max:400,d:300,u:'px'},{l:'Corners',v:'--kx-radius',t:'range',min:0,max:40,d:20,u:'px'}]}]},
 'holo-card':{name:'Holo Card',hint:'Hover to see the foil follow you',desc:'A rainbow foil shimmer that drifts and follows the pointer.',cat:'Cards',featured:true,
  inner:'<!-- your content -->',
  css:`.kx-holo{--kx-w:300px;--kx-radius:20px;--kx-bg:#12121a;--kx-fg:#fff;position:relative;display:inline-block;vertical-align:top;box-sizing:border-box;width:var(--kx-w);aspect-ratio:5/7;padding:1.6rem;border-radius:var(--kx-radius);background:var(--kx-bg);color:var(--kx-fg);font-family:inherit;overflow:hidden;isolation:isolate;box-shadow:0 14px 34px rgba(0,0,0,.3);transition:transform .4s cubic-bezier(.2,.9,.3,1),box-shadow .4s}
.kx-holo:hover{transform:translateY(-8px);box-shadow:0 28px 50px rgba(0,0,0,.45)}
.kx-holo::before,.kx-holo::after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;mix-blend-mode:screen}
.kx-holo::before{background:linear-gradient(115deg,transparent 25%,#ff00aa77 38%,#00e5ff77 50%,#ffe60077 62%,transparent 75%) var(--hx,0%) 0/260% 100% no-repeat;animation:kx-shine 3.5s ease-in-out infinite alternate}
.kx-holo.kx-on::before{animation:none}
.kx-holo::after{opacity:0;transition:opacity .4s;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.25),transparent 50%)}
.kx-holo.kx-on::after{opacity:1}
@keyframes kx-shine{from{background-position:0 0}to{background-position:100% 0}}
@media(prefers-reduced-motion:reduce){.kx-holo::before{animation:none}}`,
  html:'<div class="kx-holo"></div>',
  on:c=>{c.onpointermove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    c.classList.add('kx-on');c.style.setProperty('--hx',(1-x)*60+20+'%');c.style.setProperty('--gx',x*100+'%');c.style.setProperty('--gy',y*100+'%')};
   c.onpointerleave=()=>c.classList.remove('kx-on')},
  groups:[
   {g:'Card',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#12121a'},{l:'Text',v:'--kx-fg',t:'color',d:'#ffffff'}]},
   {g:'Size',f:[{l:'Width',v:'--kx-w',t:'range',min:200,max:400,d:300,u:'px'},{l:'Corners',v:'--kx-radius',t:'range',min:0,max:40,d:20,u:'px'}]}]},
 'shimmer-btn':{name:'Shimmer',desc:'A light sweep loops across it and a spotlight follows your cursor.',cat:'Buttons',featured:true,tag:'button',label:'Get started',inner:'Get started',hint:'Hover and click it',
  css:kxBtn+`.kx-b-shimmer{--kx-c1:#7c3aed;--kx-c2:#db2777;--kx-speed:2.4s;background:linear-gradient(135deg,var(--kx-c1),var(--kx-c2));box-shadow:0 6px 22px color-mix(in srgb,var(--kx-c1) 45%,transparent)}
.kx-b-shimmer::before,.kx-b-shimmer::after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none}
.kx-b-shimmer::before{background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.45) 50%,transparent 70%) -150% 0/60% 100% no-repeat;animation:kx-shim var(--kx-speed) linear infinite}
.kx-b-shimmer::after{opacity:0;transition:opacity .3s;background:radial-gradient(circle 70px at var(--mx,50%) var(--my,50%),rgba(255,255,255,.35),transparent)}
.kx-b-shimmer:hover{transform:translateY(-3px);box-shadow:0 12px 30px color-mix(in srgb,var(--kx-c1) 60%,transparent)}
.kx-b-shimmer:hover::after{opacity:1}
.kx-b-shimmer:active{transform:scale(.97)}
@keyframes kx-shim{to{background-position:250% 0}}`,
  html:'<button class="kx-b kx-b-shimmer">Get started</button>',
  on:b => kxTrack(b),
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Get started"}]},{"g":"Color","f":[{"l":"From","v":"--kx-c1","t":"color","d":"#7c3aed"},{"l":"To","v":"--kx-c2","t":"color","d":"#db2777"},{"l":"Text","v":"--kx-fg","t":"color","d":"#ffffff"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":40,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Shimmer speed","v":"--kx-speed","t":"range","min":1,"max":4,"d":2.4,"u":"s","step":0.1}]}]},
 'magnetic-btn':{name:'Magnetic',desc:'Leans toward your cursor as you approach, then presses down like a key.',cat:'Buttons',tag:'button',label:'Hover me',inner:'Hover me',hint:'Hover and click it',
  css:kxBtn+`.kx-b-magnetic{--kx-bg:#fafafa;--kx-fg:#111;--kx-depth:6px;--kx-pull:.35;--kx-radius:14px;background:var(--kx-bg);transform:translate(var(--tx,0px),var(--ty,0px));box-shadow:0 var(--kx-depth) 0 color-mix(in srgb,var(--kx-bg) 50%,#000),0 calc(var(--kx-depth)*2.5) 24px rgba(0,0,0,.3);transition:transform .2s cubic-bezier(.2,.9,.3,1),box-shadow .15s}
.kx-b-magnetic:hover{filter:brightness(1.06)}
.kx-b-magnetic:active{transform:translate(var(--tx,0px),calc(var(--ty,0px) + var(--kx-depth)));box-shadow:0 0 0 color-mix(in srgb,var(--kx-bg) 50%,#000),0 2px 8px rgba(0,0,0,.3)}`,
  html:'<button class="kx-b kx-b-magnetic">Hover me</button>',
  on:b => { const f = e => { if (!b.isConnected) return removeEventListener('pointermove', f); const r = b.getBoundingClientRect(), dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2, near = Math.hypot(dx, dy) < Math.max(r.width, r.height) / 2 + 60, p = parseFloat(kxVar(b, '--kx-pull')) || .35; b.style.setProperty('--tx', near ? dx * p + 'px' : '0px'); b.style.setProperty('--ty', near ? dy * p + 'px' : '0px') }; addEventListener('pointermove', f) },
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Hover me"}]},{"g":"Color","f":[{"l":"Background","v":"--kx-bg","t":"color","d":"#fafafa"},{"l":"Text","v":"--kx-fg","t":"color","d":"#111111"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":14,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Depth","v":"--kx-depth","t":"range","min":2,"max":12,"d":6,"u":"px","step":1},{"l":"Pull","v":"--kx-pull","t":"range","min":0.1,"max":0.6,"d":0.35,"u":"","step":0.05}]}]},
 'ripple-btn':{name:'Ripple',desc:'A ripple spreads from the exact point you click or tap.',cat:'Buttons',tag:'button',label:'Click me',inner:'Click me',hint:'Hover and click it',
  css:kxBtn+`.kx-b-ripple{--kx-bg:#e11d48;--kx-ripple:#ffffff;--kx-radius:14px;background:var(--kx-bg);box-shadow:0 6px 20px color-mix(in srgb,var(--kx-bg) 40%,transparent)}
.kx-b-ripple:hover{transform:translateY(-2px);box-shadow:0 12px 28px color-mix(in srgb,var(--kx-bg) 55%,transparent)}
.kx-b-ripple:active{transform:scale(.97)}
.kx-rip{position:absolute;z-index:-1;border-radius:50%;pointer-events:none;background:var(--kx-ripple);transform:translate(-50%,-50%) scale(0);animation:kx-rip .7s ease-out forwards}
@keyframes kx-rip{from{opacity:.55}to{opacity:0;transform:translate(-50%,-50%) scale(1)}}`,
  html:'<button class="kx-b kx-b-ripple">Click me</button>',
  on:b => b.addEventListener('click', e => { const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2, s = document.createElement('span'); s.className = 'kx-rip'; s.style.cssText = `width:${d}px;height:${d}px;left:${e.detail ? e.clientX - r.left : r.width / 2}px;top:${e.detail ? e.clientY - r.top : r.height / 2}px`; b.append(s); s.onanimationend = () => s.remove() }),
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Click me"}]},{"g":"Color","f":[{"l":"Background","v":"--kx-bg","t":"color","d":"#e11d48"},{"l":"Ripple","v":"--kx-ripple","t":"color","d":"#ffffff"},{"l":"Text","v":"--kx-fg","t":"color","d":"#ffffff"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":14,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]}]},
 'neon-btn':{name:'Neon Glow',desc:'An outline that lights up under your cursor and pulses when pressed.',cat:'Buttons',tag:'button',label:'Glow up',inner:'Glow up',hint:'Hover and click it',
  css:kxBtn+`.kx-b-neon{--kx-neon:#22d3ee;--kx-glow:28px;background:transparent;color:var(--kx-neon);box-shadow:inset 0 0 0 2px var(--kx-neon);transition:transform .25s cubic-bezier(.2,.9,.3,1),box-shadow .3s}
.kx-b-neon::before{content:'';position:absolute;inset:0;z-index:-1;opacity:0;transition:opacity .3s;background:radial-gradient(circle 90px at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--kx-neon) 45%,transparent),transparent 70%)}
.kx-b-neon:hover{transform:scale(1.04);box-shadow:inset 0 0 0 2px var(--kx-neon),inset 0 0 calc(var(--kx-glow)/2) color-mix(in srgb,var(--kx-neon) 35%,transparent),0 0 var(--kx-glow) color-mix(in srgb,var(--kx-neon) 65%,transparent)}
.kx-b-neon:hover::before{opacity:1}
.kx-b-neon:active{transform:scale(.97)}
.kx-ping{animation:kx-ping .6s ease-out}
@keyframes kx-ping{from{outline:2px solid var(--kx-neon);outline-offset:0}to{outline:2px solid transparent;outline-offset:18px}}`,
  html:'<button class="kx-b kx-b-neon">Glow up</button>',
  on:b => { kxTrack(b); b.addEventListener('click', () => { b.classList.remove('kx-ping'); void b.offsetWidth; b.classList.add('kx-ping') }) },
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Glow up"}]},{"g":"Color","f":[{"l":"Neon","v":"--kx-neon","t":"color","d":"#22d3ee"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":40,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Glow size","v":"--kx-glow","t":"range","min":10,"max":60,"d":28,"u":"px","step":1}]}]},
 'confetti-btn':{name:'Confetti',desc:'Pops a burst of confetti from wherever you click.',cat:'Buttons',tag:'button',label:'Celebrate',inner:'Celebrate',hint:'Hover and click it',
  css:kxBtn+`.kx-b-confetti{--kx-bg:#f59e0b;--kx-fg:#1f1300;--kx-p1:#ef4444;--kx-p2:#3b82f6;--kx-count:22;--kx-radius:14px;overflow:visible;background:var(--kx-bg);box-shadow:0 6px 0 color-mix(in srgb,var(--kx-bg) 55%,#000)}
.kx-b-confetti:hover{transform:translateY(-3px) rotate(-1.5deg)}
.kx-b-confetti:active{transform:translateY(5px);box-shadow:0 1px 0 color-mix(in srgb,var(--kx-bg) 55%,#000)}
.kx-cf{position:absolute;z-index:5;width:7px;height:11px;border-radius:2px;pointer-events:none}`,
  html:'<button class="kx-b kx-b-confetti">Celebrate</button>',
  on:b => b.addEventListener('click', e => { const r = b.getBoundingClientRect(), n = +kxVar(b, '--kx-count') || 22, x = e.detail ? e.clientX - r.left : r.width / 2, y = e.detail ? e.clientY - r.top : r.height / 2, cols = [kxVar(b, '--kx-p1'), kxVar(b, '--kx-p2'), kxVar(b, '--kx-bg'), '#fff']; for (let i = 0; i < n; i++) { const s = document.createElement('i'), a = Math.random() * 6.283, d = 50 + Math.random() * 70; s.className = 'kx-cf'; s.style.cssText = `left:${x}px;top:${y}px;background:${cols[i % 4]}`; b.append(s); s.animate([{ transform: 'translate(-50%,-50%) rotate(0)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d + 30}px)) rotate(${Math.random() * 720}deg)`, opacity: 0 }], { duration: 600 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => s.remove() } }),
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Celebrate"}]},{"g":"Color","f":[{"l":"Background","v":"--kx-bg","t":"color","d":"#f59e0b"},{"l":"Text","v":"--kx-fg","t":"color","d":"#1f1300"},{"l":"Burst A","v":"--kx-p1","t":"color","d":"#ef4444"},{"l":"Burst B","v":"--kx-p2","t":"color","d":"#3b82f6"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":14,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Particles","v":"--kx-count","t":"range","min":8,"max":40,"d":22,"u":"","step":1}]}]},
 'progress-btn':{name:'Progress',desc:'Fills like a progress bar on click, then confirms with a check.',cat:'Buttons',tag:'button',label:'Save changes',inner:'Save changes',hint:'Hover and click it',
  css:kxBtn+`.kx-b-progress{--kx-bg:#2563eb;--kx-fill:#60a5fa;--kx-time:1.6s;--kx-radius:14px;background:var(--kx-bg);box-shadow:0 6px 20px color-mix(in srgb,var(--kx-bg) 40%,transparent)}
.kx-b-progress::before{content:'';position:absolute;inset:0;z-index:-1;background:var(--kx-fill);transform:scaleX(0);transform-origin:left}
.kx-b-progress.kx-run::before{transform:none;transition:transform var(--kx-time) cubic-bezier(.4,0,.2,1)}
.kx-b-progress.kx-done::before{background:#22c55e}
.kx-b-progress:hover{transform:translateY(-2px)}
.kx-b-progress.kx-run{pointer-events:none}`,
  html:'<button class="kx-b kx-b-progress">Save changes</button>',
  on:b => b.addEventListener('click', () => { if (b.classList.contains('kx-run')) return; const t = (parseFloat(kxVar(b, '--kx-time')) || 1.6) * 1000, html = b.innerHTML; b.classList.add('kx-run'); b.textContent = b.dataset.loading || 'Loading\u2026'; setTimeout(() => { b.classList.add('kx-done'); b.textContent = b.dataset.done || 'Done \u2713' }, t); setTimeout(() => { b.classList.remove('kx-run', 'kx-done'); b.innerHTML = html }, t + 1300) }),
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Save changes"}]},{"g":"Color","f":[{"l":"Background","v":"--kx-bg","t":"color","d":"#2563eb"},{"l":"Fill","v":"--kx-fill","t":"color","d":"#60a5fa"},{"l":"Text","v":"--kx-fg","t":"color","d":"#ffffff"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":14,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Duration","v":"--kx-time","t":"range","min":0.5,"max":4,"d":1.6,"u":"s","step":0.1}]}]}
};
