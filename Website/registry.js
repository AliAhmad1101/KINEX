/* KINEX registry: the ONLY file you edit to add a component.
   To add a component: copy an entry below, give it a new key, name, cat, css, html, on and groups.
   Cards open card.html, Buttons open button.html (see kxPage). For a button entry also set tag:'button' and label.
   cat = category it appears in (one of CATEGORIES), featured:true = also listed under Featured.
   Use a unique class prefix in css so previews never clash with other components. */
const kxSlug=t=>t.toLowerCase().replace(/\W+/g,'-');
const CATEGORIES=['Buttons','Cards','Navigation','Forms','Text Effects','Backgrounds','Loaders'];
const kxVar=(b,k)=>getComputedStyle(b).getPropertyValue(k).trim();
const kxTrack=b=>b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',e.clientX-r.left+'px');b.style.setProperty('--my',e.clientY-r.top+'px')});
const kxPage=id=>({Cards:'card',Buttons:'button','Text Effects':'text',Navigation:'navigation',Forms:'forms',Backgrounds:'backgrounds',Loaders:'loaders'}[COMPONENTS[id].cat]||'card')+'.html?c='+id;
const kxBtn=`.kx-b{--kx-fg:#fff;--kx-radius:999px;--kx-size:1rem;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;position:relative;overflow:hidden;isolation:isolate;padding:.85em 2em;border:0;border-radius:var(--kx-radius);color:var(--kx-fg);font-family:inherit;font-weight:700;font-size:var(--kx-size);line-height:1.2;white-space:nowrap;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .25s cubic-bezier(.2,.9,.3,1),box-shadow .3s,filter .3s}
.kx-b:focus-visible{outline:3px solid currentColor;outline-offset:3px}
.kx-b:disabled{opacity:.5;cursor:not-allowed}
@media(prefers-reduced-motion:reduce){.kx-b,.kx-b *{animation:none!important;transition-duration:.01s!important}}
`;
const CDN='https://cdn.jsdelivr.net/gh/AliAhmad1101/KINEX@main/kinex.js';

/* shared markup for entries that need more than a one-line snippet */
const kxDockLinks='<a href="#" aria-label="Home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 10.6 12 3.4l8.5 7.2"/><path d="M5.6 9.6V20h12.8V9.6"/></svg></a>\n  <a href="#" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4-4"/></svg></a>\n  <a href="#" aria-label="Library"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5"/></svg></a>\n  <a href="#" aria-label="Messages"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7.5 8 5.5 8-5.5"/></svg></a>\n  <a href="#" aria-label="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.1"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6l-1.6 1.6"/></svg></a>';
const kxOtpCells=['1','2','3','4'].map(n=>'<input inputmode="numeric" maxlength="1" autocomplete="one-time-code" aria-label="Digit '+n+'">').join('\n  ');
const kxCheckInner='<input type="checkbox" checked>\n  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1.6" y="1.6" width="20.8" height="20.8" rx="6.4"/><path d="M6.6 12.5 10.2 16 17.6 8.2"/></svg>\n  <span>Remember this device</span>';

/* ═══════════════ kinex.js RUNTIME FUNCTIONS (paste these) ═══════════════
   These are the only four behaviours that need JavaScript. Each one is used
   twice: as `on` so the KINEX studio preview works, and as `kinex` so you can
   copy the very same function into kinex.js's runtime table, keyed by its
   component id (kxHold -> 'hold-btn', kxFlap -> 'flap-text', etc). */
const kxHold=b=>{ /* kinex.js runtime: key 'hold-btn' */
  let timer,back;
  const stop=()=>{clearTimeout(timer);clearTimeout(back)};
  const reset=()=>{b.classList.remove('kx-holding','kx-held');if(b.dataset.kxLabel){b.textContent=b.dataset.kxLabel;delete b.dataset.kxLabel}};
  const start=e=>{
    if(b.disabled||b.classList.contains('kx-held'))return;
    if(e.type==='keydown'&&e.key!==' '&&e.key!=='Enter')return;
    stop();b.classList.remove('kx-held');
    if(!b.dataset.kxLabel)b.dataset.kxLabel=b.textContent;
    b.classList.add('kx-holding');
    timer=setTimeout(()=>{b.classList.remove('kx-holding');b.classList.add('kx-held');b.textContent=b.dataset.done||'Confirmed';back=setTimeout(reset,1400)},(parseFloat(kxVar(b,'--kx-time'))||1.2)*1000)};
  const end=()=>{clearTimeout(timer);if(!b.classList.contains('kx-held'))b.classList.remove('kx-holding')};
  b.addEventListener('pointerdown',start);b.addEventListener('pointerup',end);b.addEventListener('pointerleave',end);b.addEventListener('pointercancel',end);
  b.addEventListener('keydown',start);b.addEventListener('keyup',e=>{(e.key===' '||e.key==='Enter')&&end()});
  b.addEventListener('contextmenu',e=>e.preventDefault())};
const kxFlap=el=>{ /* kinex.js runtime: key 'flap-text' */
  let busy=false;const quiet=matchMedia('(prefers-reduced-motion:reduce)').matches;
  el.addEventListener('pointerenter',()=>{
    if(busy||quiet)return;const txt=el.textContent;if(!txt.trim())return;busy=true;
    const cells=[...txt].map(ch=>{const s=document.createElement('span');s.className='kx-flap';s.textContent=ch;return s});
    el.textContent='';el.append(...cells);
    const gap=Math.max(40,Math.min(90,520/cells.length));
    cells.forEach((c,i)=>setTimeout(()=>{c.classList.add('kx-flip');setTimeout(()=>{c.textContent=txt[i];c.classList.remove('kx-flip')},150)},i*gap));
    setTimeout(()=>{el.textContent=txt;busy=false},cells.length*gap+430)
  });
  el.addEventListener('focus',()=>el.dispatchEvent(new PointerEvent('pointerenter')))};
const kxScramble=el=>{ /* kinex.js runtime: key 'scramble-text' */
  const glyphs='!<>-_\\/[]{}=+*^?#$%&@';let busy=false;const quiet=matchMedia('(prefers-reduced-motion:reduce)').matches;
  el.addEventListener('pointerenter',()=>{
    if(busy||quiet)return;const txt=el.textContent;if(!txt.trim())return;busy=true;
    const n=txt.length,ms=Math.min(900,260+n*30),t0=performance.now();
    const step=now=>{const p=Math.min(1,(now-t0)/ms),lock=Math.floor(p*n*1.7);
      el.textContent=[...txt].map((ch,i)=>ch===' '?' ':(i<lock?ch:glyphs[Math.random()*glyphs.length|0])).join('');
      if(p<1)requestAnimationFrame(step);else{el.textContent=txt;busy=false}};
    requestAnimationFrame(step)
  });
  el.addEventListener('focus',()=>el.dispatchEvent(new PointerEvent('pointerenter')))};
const kxWave=el=>{ /* kinex.js runtime: key 'wave-text' */
  let busy=false;const quiet=matchMedia('(prefers-reduced-motion:reduce)').matches;
  el.addEventListener('pointerenter',()=>{
    if(busy||quiet)return;const txt=el.textContent;if(!txt.trim())return;busy=true;
    const cells=[...txt].map((ch,i)=>{const s=document.createElement('span');s.className='kx-wv';s.textContent=ch;s.style.animationDelay=(i*45)+'ms';return s});
    el.textContent='';el.append(...cells);
    setTimeout(()=>{el.textContent=txt;busy=false},cells.length*45+700)
  });
  el.addEventListener('focus',()=>el.dispatchEvent(new PointerEvent('pointerenter')))};

/* ═════════════════ HOW A COMPONENT GETS INTO kinex.js ═════════════════
   Every entry below is split into the exact pieces kinex.js needs, so you can
   copy them across by hand and the component then works anywhere, for anyone
   who only loads kinex.js:

     css    → paste into the kinex.js stylesheet (the entry's first line is a
              "kinex.js: paste this css" marker). Needed by EVERY component.
     kinex  → paste into the kinex.js runtime/init table, keyed by the entry id.
              Only exists on components that need JS (hold-btn, text effects...).
     html   → the markup a user drops in their page: <TAG data-kinex="id">…</TAG>
              kinex.js finds it with [data-kinex] and wires up that entry's kinex.

   CSS-only components (develop-card, stamp-card, peel-card, keycap-btn,
   sticker-btn, liquid-text, press-text, print-text) have no `kinex` key —
   pasting their css is enough. */

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
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Save changes"}]},{"g":"Color","f":[{"l":"Background","v":"--kx-bg","t":"color","d":"#2563eb"},{"l":"Fill","v":"--kx-fill","t":"color","d":"#60a5fa"},{"l":"Text","v":"--kx-fg","t":"color","d":"#ffffff"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":14,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Duration","v":"--kx-time","t":"range","min":0.5,"max":4,"d":1.6,"u":"s","step":0.1}]}]},

 /* ══════════════════════════ NEW CARDS ══════════════════════════ */
 'develop-card':{name:'Instant Photo',hint:'Hover the print to develop it',desc:'A polaroid that slowly develops from washed-out grey into full colour.',cat:'Cards',featured:true,
  inner:'<div class="kx-dev-win"><!-- your photo or content --></div>\n  <p class="kx-dev-cap">summer, undeveloped</p>',
  /* kinex.js: paste this css into the kinex.js stylesheet (no JS needed) */
  css:`/* kinex.js: paste this css */
.kx-dev{--kx-w:300px;--kx-paper:#f7f3ea;--kx-ink:#2b2620;--kx-time:.9s;position:relative;display:inline-block;vertical-align:top;box-sizing:border-box;width:var(--kx-w);padding:.9rem .9rem 3.2rem;border-radius:5px;background:var(--kx-paper);color:var(--kx-ink);font-family:inherit;box-shadow:0 4px 8px #0002,0 22px 44px #0005;transform:rotate(-2deg);transition:transform .5s cubic-bezier(.2,.9,.3,1),box-shadow .5s;outline:none}
.kx-dev:hover,.kx-dev:focus-visible{transform:rotate(-.4deg) translateY(-7px);box-shadow:0 8px 14px #0002,0 34px 62px #0006}
.kx-dev-win{position:relative;aspect-ratio:1/1;border-radius:2px;overflow:hidden;background:linear-gradient(168deg,#93c5fd,#c084fc 42%,#fdba74 78%,#fca5a5);filter:saturate(.08) brightness(1.4) contrast(.72);transition:filter var(--kx-time) ease,transform var(--kx-time) ease}
.kx-dev:hover .kx-dev-win,.kx-dev:focus-visible .kx-dev-win{filter:none;transform:scale(1.015)}
.kx-dev-win::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:.85;mix-blend-mode:overlay;background:radial-gradient(circle at 28% 18%,#fff8 0 38%,transparent 62%),repeating-linear-gradient(118deg,#0000 0 3px,#0002 3px 4px)}
.kx-dev-cap{margin:.85rem .15rem 0;font:italic 400 .95rem/1.4 Georgia,'Times New Roman',serif;letter-spacing:.01em;color:color-mix(in srgb,var(--kx-ink) 45%,transparent);transition:color var(--kx-time) ease}
.kx-dev:hover .kx-dev-cap,.kx-dev:focus-visible .kx-dev-cap{color:var(--kx-ink)}
@media(prefers-reduced-motion:reduce){.kx-dev,.kx-dev-win,.kx-dev-cap{transition:none}}`,
  html:'<div class="kx-dev" tabindex="0"><div class="kx-dev-win"></div><p class="kx-dev-cap">undeveloped</p></div>',
  groups:[
   {g:'Card',f:[{l:'Paper',v:'--kx-paper',t:'color',d:'#f7f3ea'},{l:'Ink',v:'--kx-ink',t:'color',d:'#2b2620'}]},
   {g:'Size',f:[{l:'Width',v:'--kx-w',t:'range',min:200,max:400,d:300,u:'px'}]},
   {g:'Motion',f:[{l:'Develop',v:'--kx-time',t:'range',min:0.3,max:2.5,d:0.9,u:'s',step:0.1}]}]},

 'stamp-card':{name:'Postage Stamp',hint:'Hover to postmark it',desc:'Perforated stamp edges that lift and get a postmark when you hover.',cat:'Cards',featured:true,
  inner:'<div class="kx-stamp-i"><!-- your content --></div>',
  /* kinex.js: paste this css into the kinex.js stylesheet (no JS needed) */
  css:`/* kinex.js: paste this css */
.kx-stamp{--kx-w:260px;--kx-paper:#fffdf4;--kx-ink:#243a52;--kx-perf:18px;--kx-hole:5.5px;position:relative;display:inline-block;vertical-align:top;box-sizing:border-box;width:var(--kx-w);aspect-ratio:5/7;padding:1.3rem;background:var(--kx-paper);color:var(--kx-ink);font-family:inherit;transform:rotate(-3deg);transition:transform .45s cubic-bezier(.2,.9,.3,1);outline:none;
-webkit-mask:radial-gradient(circle var(--kx-hole) at 50% 0,#0000 96%,#000) 50% 0/var(--kx-perf) 100% repeat-x,radial-gradient(circle var(--kx-hole) at 50% 100%,#0000 96%,#000) 50% 100%/var(--kx-perf) 100% repeat-x,radial-gradient(circle var(--kx-hole) at 0 50%,#0000 96%,#000) 0 50%/100% var(--kx-perf) repeat-y,radial-gradient(circle var(--kx-hole) at 100% 50%,#0000 96%,#000) 100% 50%/100% var(--kx-perf) repeat-y;
-webkit-mask-composite:source-in;
mask:radial-gradient(circle var(--kx-hole) at 50% 0,#0000 96%,#000) 50% 0/var(--kx-perf) 100% repeat-x,radial-gradient(circle var(--kx-hole) at 50% 100%,#0000 96%,#000) 50% 100%/var(--kx-perf) 100% repeat-x,radial-gradient(circle var(--kx-hole) at 0 50%,#0000 96%,#000) 0 50%/100% var(--kx-perf) repeat-y,radial-gradient(circle var(--kx-hole) at 100% 50%,#0000 96%,#000) 100% 50%/100% var(--kx-perf) repeat-y;
mask-composite:intersect}
.kx-stamp:hover,.kx-stamp:focus-visible{transform:rotate(-.8deg) translateY(-6px)}
.kx-stamp-i{position:absolute;inset:.7rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.55rem;border:1px dashed color-mix(in srgb,var(--kx-ink) 40%,transparent)}
.kx-stamp-v{font-weight:800;font-size:1.35rem;line-height:1;letter-spacing:.16em;text-indent:.16em}
.kx-stamp-n{font-weight:700;font-size:.75rem;letter-spacing:.1em;padding:.12em .55em;border:1.5px solid currentColor}
.kx-stamp::before,.kx-stamp::after{content:'';position:absolute;border-radius:50%;pointer-events:none;opacity:0;mix-blend-mode:multiply;transform:rotate(-16deg) scale(1.4);transition:opacity .4s,transform .5s cubic-bezier(.2,1.5,.35,1)}
.kx-stamp::before{right:11%;bottom:18%;width:32%;aspect-ratio:1;border:1px dashed currentColor}
.kx-stamp::after{right:6%;bottom:13%;width:42%;aspect-ratio:1;border:2px solid currentColor;transition-delay:.05s}
.kx-stamp:hover::before,.kx-stamp:hover::after,.kx-stamp:focus-visible::before,.kx-stamp:focus-visible::after{opacity:.55;transform:rotate(-16deg) scale(1)}
@media(prefers-reduced-motion:reduce){.kx-stamp,.kx-stamp::before,.kx-stamp::after{transition:none}}`,
  html:'<div class="kx-stamp" tabindex="0"><div class="kx-stamp-i"><span class="kx-stamp-v">KINEX</span><span class="kx-stamp-n">25</span></div></div>',
  groups:[
   {g:'Stamp',f:[{l:'Paper',v:'--kx-paper',t:'color',d:'#fffdf4'},{l:'Ink',v:'--kx-ink',t:'color',d:'#243a52'}]},
   {g:'Size',f:[{l:'Width',v:'--kx-w',t:'range',min:180,max:340,d:260,u:'px'},{l:'Perforation',v:'--kx-perf',t:'range',min:10,max:28,d:18,u:'px'}]}]},

 'peel-card':{name:'Peel Card',hint:'Hover to peel the corner',desc:'The bottom corner folds up in 3D to reveal a second colour underneath.',cat:'Cards',
  inner:'<!-- your content -->',
  /* kinex.js: paste this css into the kinex.js stylesheet (no JS needed) */
  css:`/* kinex.js: paste this css */
.kx-peel{--kx-w:300px;--kx-bg:#141821;--kx-under:#f97316;--kx-fg:#fff;--kx-radius:18px;--kx-peel:70px;--kx-fold:62deg;position:relative;display:inline-block;vertical-align:top;box-sizing:border-box;width:var(--kx-w);aspect-ratio:5/7;padding:1.6rem;border-radius:var(--kx-radius);background:var(--kx-bg);color:var(--kx-fg);font-family:inherit;overflow:hidden;isolation:isolate;perspective:700px;box-shadow:0 18px 40px #0006;transition:transform .45s cubic-bezier(.2,.9,.3,1),box-shadow .45s;outline:none}
.kx-peel:hover,.kx-peel:focus-visible{transform:translateY(-7px);box-shadow:0 30px 62px #0007}
.kx-peel::before,.kx-peel::after{content:'';position:absolute;right:0;bottom:0;width:calc(var(--kx-peel)*2);height:calc(var(--kx-peel)*2);clip-path:polygon(100% 0,100% 100%,0 100%)}
.kx-peel::before{background:var(--kx-under);z-index:-1}
.kx-peel::after{background:linear-gradient(315deg,color-mix(in srgb,var(--kx-bg) 72%,#fff),var(--kx-bg) 62%);transform-origin:100% 100%;filter:drop-shadow(-4px -4px 8px #0006);transition:transform .55s cubic-bezier(.3,1.2,.4,1)}
.kx-peel:hover::after,.kx-peel:focus-visible::after{transform:rotate3d(1,-1,0,var(--kx-fold))}
@media(prefers-reduced-motion:reduce){.kx-peel,.kx-peel::after{transition:none}}`,
  html:'<div class="kx-peel" tabindex="0"></div>',
  groups:[
   {g:'Card',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#141821'},{l:'Text',v:'--kx-fg',t:'color',d:'#ffffff'},{l:'Underneath',v:'--kx-under',t:'color',d:'#f97316'}]},
   {g:'Fold',f:[{l:'Corner size',v:'--kx-peel',t:'range',min:40,max:120,d:70,u:'px'},{l:'Fold angle',v:'--kx-fold',t:'range',min:20,max:88,d:62,u:'deg'}]},
   {g:'Size',f:[{l:'Width',v:'--kx-w',t:'range',min:200,max:400,d:300,u:'px'},{l:'Corners',v:'--kx-radius',t:'range',min:0,max:40,d:18,u:'px'}]}]},

 /* ══════════════════════════ NEW BUTTONS ══════════════════════════ */
 'keycap-btn':{name:'Keycap',desc:'A mechanical keycap that sinks all the way down when you press it.',cat:'Buttons',featured:true,tag:'button',label:'Press me',inner:'Press me',hint:'Hover and click it',
  /* kinex.js: paste the css below; no JS needed */
  css:kxBtn+`/* kinex.js: paste this css */
.kx-b-keycap{--kx-bg:#e8edf4;--kx-fg:#1c2430;--kx-lip:#b9c4d4;--kx-depth:7px;--kx-radius:12px;background:linear-gradient(180deg,#fff 0%,var(--kx-bg) 72%);color:var(--kx-fg);letter-spacing:.03em;box-shadow:0 var(--kx-depth) 0 var(--kx-lip),0 calc(var(--kx-depth) + 3px) 14px #0008,inset 0 1px 0 #fff;transition:transform .07s linear,box-shadow .07s linear,filter .2s}
.kx-b-keycap:hover{filter:brightness(1.03)}
.kx-b-keycap:active{transform:translateY(var(--kx-depth));box-shadow:0 0 0 var(--kx-lip),0 2px 6px #0009,inset 0 1px 0 #fff}`,
  html:'<button class="kx-b kx-b-keycap">Press me</button>',
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Press me"}]},{"g":"Color","f":[{"l":"Cap","v":"--kx-bg","t":"color","d":"#e8edf4"},{"l":"Text","v":"--kx-fg","t":"color","d":"#1c2430"},{"l":"Rim","v":"--kx-lip","t":"color","d":"#b9c4d4"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":12,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Travel","v":"--kx-depth","t":"range","min":2,"max":14,"d":7,"u":"px","step":1}]}]},

 'hold-btn':{name:'Hold To Confirm',desc:'Only fires once you have held it, with a fill that tracks your press.',cat:'Buttons',tag:'button',label:'Hold to delete',inner:'Hold to delete',hint:'Press and hold it',
  /* kinex.js: paste the css AND the kinex function below */
  css:kxBtn+`/* kinex.js: paste this css */
.kx-b-hold{--kx-bg:#1f2937;--kx-fill:#22c55e;--kx-time:1.2s;--kx-radius:999px;background:var(--kx-bg);touch-action:none;user-select:none;-webkit-user-select:none;transition:color .25s,box-shadow .3s}
.kx-b-hold::before{content:'';position:absolute;inset:0;z-index:-1;background:var(--kx-fill);transform:scaleX(0);transform-origin:left;transition:transform .16s ease-out}
.kx-b-hold.kx-holding::before{transform:scaleX(1);transition:transform var(--kx-time) linear}
.kx-b-hold.kx-held::before{transform:scaleX(1);transition:none}
.kx-b-hold.kx-held{color:#04120a;box-shadow:0 0 0 3px color-mix(in srgb,var(--kx-fill) 40%,transparent)}
.kx-b-hold:hover{filter:brightness(1.08)}`,
  html:'<button class="kx-b kx-b-hold">Hold to delete</button>',
  /* kinex.js: paste the kxHold() function above into the runtime table under the key "hold-btn" */
  on:kxHold,kinex:kxHold,
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Hold to delete"}]},{"g":"Color","f":[{"l":"Background","v":"--kx-bg","t":"color","d":"#1f2937"},{"l":"Fill","v":"--kx-fill","t":"color","d":"#22c55e"},{"l":"Text","v":"--kx-fg","t":"color","d":"#ffffff"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":40,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Hold time","v":"--kx-time","t":"range","min":0.4,"max":3,"d":1.2,"u":"s","step":0.1}]}]},

 'sticker-btn':{name:'Sticker',desc:'A die-cut sticker with a dashed cut line that slaps down when pressed.',cat:'Buttons',tag:'button',label:'Stick it',inner:'Stick it',hint:'Hover and click it',
  /* kinex.js: paste the css below; no JS needed */
  css:kxBtn+`/* kinex.js: paste this css */
.kx-b-sticker{--kx-bg:#fde047;--kx-fg:#181410;--kx-radius:10px;overflow:visible;background:var(--kx-bg);color:var(--kx-fg);border:3px solid var(--kx-fg);box-shadow:5px 5px 0 var(--kx-fg);transform:rotate(-2deg);transition:transform .22s cubic-bezier(.2,1.5,.35,1),box-shadow .22s}
.kx-b-sticker::before{content:'';position:absolute;inset:-11px;border:2px dashed color-mix(in srgb,var(--kx-fg) 38%,transparent);border-radius:calc(var(--kx-radius) + 9px);pointer-events:none}
.kx-b-sticker:hover{transform:rotate(1.5deg) translate(-2px,-3px);box-shadow:8px 9px 0 var(--kx-fg)}
.kx-b-sticker:active{transform:rotate(0) translate(4px,5px);box-shadow:1px 1px 0 var(--kx-fg)}`,
  html:'<button class="kx-b kx-b-sticker">Stick it</button>',
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Stick it"}]},{"g":"Color","f":[{"l":"Sticker","v":"--kx-bg","t":"color","d":"#fde047"},{"l":"Ink","v":"--kx-fg","t":"color","d":"#181410"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":30,"d":10,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]}]},

 /* ═══════════════════════ NEW TEXT EFFECTS ═══════════════════════ */
 'liquid-text':{name:'Liquid Fill',hint:'Hover to fill the outline',desc:'An outlined word that floods with colour from the bottom up.',cat:'Text Effects',featured:true,tag:'span',label:'Liquid',inner:'Liquid',
  /* kinex.js: paste the css below; no JS needed */
  css:`/* kinex.js: paste this css */
.kx-tx-liquid{--kx-size:2.4rem;--kx-line:#f5f5f7;--kx-fill:#30d158;--kx-speed:.72s;display:inline-block;font-family:inherit;font-weight:800;font-size:var(--kx-size);line-height:1.15;letter-spacing:-.02em;color:transparent;-webkit-text-stroke:1.5px var(--kx-line);background:linear-gradient(var(--kx-fill),var(--kx-fill)) no-repeat 0 100%/100% 0;-webkit-background-clip:text;background-clip:text;transition:background-size var(--kx-speed) cubic-bezier(.2,.9,.3,1);cursor:default;outline:none}
.kx-tx-liquid:hover,.kx-tx-liquid:focus-visible{background-size:100% 100%}
@media(prefers-reduced-motion:reduce){.kx-tx-liquid{transition:none}}`,
  html:'<span class="kx-tx-liquid" tabindex="0">Liquid</span>',
  groups:[{"g":"Text","f":[{"l":"Text","t":"text","d":"Liquid"}]},{"g":"Color","f":[{"l":"Outline","v":"--kx-line","t":"color","d":"#f5f5f7"},{"l":"Fill","v":"--kx-fill","t":"color","d":"#30d158"}]},{"g":"Shape","f":[{"l":"Text size","v":"--kx-size","t":"range","min":1,"max":5,"d":2.4,"u":"rem","step":0.1}]},{"g":"Motion","f":[{"l":"Speed","v":"--kx-speed","t":"range","min":.2,"max":2,"d":.72,"u":"s","step":0.02}]}]},

 'press-text':{name:'Letterpress',hint:'Hover to raise the type',desc:'Type pressed into the page that lifts off it when you hover.',cat:'Text Effects',tag:'span',label:'Deep press',inner:'Deep press',
  /* kinex.js: paste the css below; no JS needed */
  css:`/* kinex.js: paste this css */
.kx-tx-press{--kx-size:2.4rem;--kx-fg:#87878f;--kx-hi:#ffffff26;--kx-lo:#000000b3;display:inline-block;font-family:inherit;font-weight:800;font-size:var(--kx-size);line-height:1.15;letter-spacing:.03em;color:var(--kx-fg);text-shadow:0 1px 0 var(--kx-hi),0 -1px 1px var(--kx-lo),0 0 0 #0000;transition:color .35s,text-shadow .35s}
.kx-tx-press:hover,.kx-tx-press:focus-visible{color:#f5f5f7;text-shadow:0 1px 0 #ffffff66,0 6px 14px #000c,0 -1px 0 #000000d9}
@media(prefers-reduced-motion:reduce){.kx-tx-press{transition:none}}`,
  html:'<span class="kx-tx-press" tabindex="0">Deep press</span>',
  groups:[{"g":"Text","f":[{"l":"Text","t":"text","d":"Deep press"}]},{"g":"Color","f":[{"l":"Engraved","v":"--kx-fg","t":"color","d":"#87878f"},{"l":"Highlight","v":"--kx-hi","t":"color","d":"#ffffff26"},{"l":"Shadow","v":"--kx-lo","t":"color","d":"#000000b3"}]},{"g":"Shape","f":[{"l":"Text size","v":"--kx-size","t":"range","min":1,"max":5,"d":2.4,"u":"rem","step":0.1}]}]},

 'print-text':{name:'Offset Print',hint:'Hover to misregister the inks',desc:'Two ink plates that drift apart like a badly aligned print run.',cat:'Text Effects',tag:'span',label:'Misprint',inner:'Misprint',
  /* kinex.js: paste the css below; no JS needed */
  css:`/* kinex.js: paste this css */
.kx-tx-print{--kx-size:2.4rem;--kx-fg:#f5f5f7;--kx-ink-a:#ff2d55;--kx-ink-b:#00d1ff;display:inline-block;font-family:inherit;font-weight:800;font-size:var(--kx-size);line-height:1.15;letter-spacing:-.01em;color:var(--kx-fg);text-shadow:-3px -2px 0 var(--kx-ink-a),3px 2px 0 var(--kx-ink-b);transition:text-shadow .3s cubic-bezier(.2,.9,.3,1);cursor:default;outline:none}
.kx-tx-print:hover,.kx-tx-print:focus-visible{text-shadow:-9px -5px 0 var(--kx-ink-a),9px 5px 0 var(--kx-ink-b)}
@media(prefers-reduced-motion:reduce){.kx-tx-print{transition:none}}`,
  html:'<span class="kx-tx-print" tabindex="0">Misprint</span>',
  groups:[{"g":"Text","f":[{"l":"Text","t":"text","d":"Misprint"}]},{"g":"Color","f":[{"l":"Type","v":"--kx-fg","t":"color","d":"#f5f5f7"},{"l":"Plate A","v":"--kx-ink-a","t":"color","d":"#ff2d55"},{"l":"Plate B","v":"--kx-ink-b","t":"color","d":"#00d1ff"}]},{"g":"Shape","f":[{"l":"Text size","v":"--kx-size","t":"range","min":1,"max":5,"d":2.4,"u":"rem","step":0.1}]}]},

 'flap-text':{name:'Split Flap',hint:'Hover to flip the board',desc:'Departure-board letters flip one after another, then settle.',cat:'Text Effects',tag:'span',label:'Departures',inner:'Departures',
  /* kinex.js: paste the css AND the kinex function below */
  css:`/* kinex.js: paste this css */
.kx-tx-flap{--kx-size:2.1rem;--kx-fg:#f5f5f7;--kx-cell:#ffffff10;display:inline-flex;gap:.08em;white-space:pre;font-family:inherit;font-weight:800;font-size:var(--kx-size);line-height:1;color:var(--kx-fg);perspective:600px;cursor:default;outline:none}
.kx-flap{display:inline-block;padding:.1em .14em;border-radius:5px;background:var(--kx-cell);box-shadow:inset 0 1px 0 #ffffff1a,inset 0 -1px 0 #000000a6;transform-origin:50% 50%;transition:transform .16s ease-in,background .16s}
.kx-flap.kx-flip{transform:rotateX(-88deg);background:#ffffff05}
@media(prefers-reduced-motion:reduce){.kx-flap{transition:none}}`,
  html:'<span class="kx-tx-flap" tabindex="0">Departures</span>',
  /* kinex.js: paste the kxFlap() function above into the runtime table under the key "flap-text" */
  on:kxFlap,kinex:kxFlap,
  groups:[{"g":"Text","f":[{"l":"Text","t":"text","d":"Departures"}]},{"g":"Color","f":[{"l":"Letters","v":"--kx-fg","t":"color","d":"#f5f5f7"},{"l":"Tiles","v":"--kx-cell","t":"color","d":"#ffffff10"}]},{"g":"Shape","f":[{"l":"Text size","v":"--kx-size","t":"range","min":1,"max":4.5,"d":2.1,"u":"rem","step":0.1}]}]},

 'scramble-text':{name:'Scramble',hint:'Hover to decode it',desc:'Letters shuffle through noise and lock in from left to right.',cat:'Text Effects',featured:true,tag:'span',label:'DECRYPTING',inner:'DECRYPTING',
  /* kinex.js: paste the css AND the kinex function below */
  css:`/* kinex.js: paste this css */
.kx-tx-scramble{--kx-size:1.7rem;--kx-fg:#30d158;--kx-cursor:#30d158;display:inline-block;white-space:pre;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-weight:700;font-size:var(--kx-size);line-height:1.3;letter-spacing:.06em;color:var(--kx-fg);cursor:default;outline:none}
.kx-tx-scramble::after{content:'';display:inline-block;width:.5em;height:1em;margin-left:.14em;vertical-align:-.14em;background:var(--kx-cursor);animation:kx-caret 1.05s steps(1) infinite}
@keyframes kx-caret{50%{opacity:0}}`,
  html:'<span class="kx-tx-scramble" tabindex="0">DECRYPTING</span>',
  /* kinex.js: paste the kxScramble() function above into the runtime table under the key "scramble-text" */
  on:kxScramble,kinex:kxScramble,
  groups:[{"g":"Text","f":[{"l":"Text","t":"text","d":"DECRYPTING"}]},{"g":"Color","f":[{"l":"Text","v":"--kx-fg","t":"color","d":"#30d158"},{"l":"Cursor","v":"--kx-cursor","t":"color","d":"#30d158"}]},{"g":"Shape","f":[{"l":"Text size","v":"--kx-size","t":"range","min":1,"max":3.5,"d":1.7,"u":"rem","step":0.1}]}]},

 'wave-text':{name:'Wave Letters',hint:'Hover to send a wave through it',desc:'Each letter springs up and rotates in a fast staggered wave.',cat:'Text Effects',tag:'span',label:'Ripple',inner:'Ripple',
  /* kinex.js: paste the css AND the kinex function below */
  css:`/* kinex.js: paste this css */
.kx-tx-wave{--kx-size:2.4rem;--kx-fg:#f5f5f7;--kx-lift:-.42em;display:inline-block;white-space:pre;font-family:inherit;font-weight:800;font-size:var(--kx-size);line-height:1.2;color:var(--kx-fg);cursor:default;outline:none}
.kx-wv{display:inline-block;animation:kx-wave .62s cubic-bezier(.36,.07,.19,.97) both}
@keyframes kx-wave{0%,100%{transform:none}45%{transform:translateY(var(--kx-lift)) rotate(-7deg)}}
@media(prefers-reduced-motion:reduce){.kx-wv{animation:none}}`,
  html:'<span class="kx-tx-wave" tabindex="0">Ripple</span>',
  /* kinex.js: paste the kxWave() function above into the runtime table under the key "wave-text" */
  on:kxWave,kinex:kxWave,
  groups:[{"g":"Text","f":[{"l":"Text","t":"text","d":"Ripple"}]},{"g":"Color","f":[{"l":"Text","v":"--kx-fg","t":"color","d":"#f5f5f7"}]},{"g":"Shape","f":[{"l":"Text size","v":"--kx-size","t":"range","min":1,"max":5,"d":2.4,"u":"rem","step":0.1}]},{"g":"Motion","f":[{"l":"Lift","v":"--kx-lift","t":"range","min":-0.9,"max":-0.05,"d":-0.42,"u":"em","step":0.01}]}]}
,

 /* ══════════════════════════ NAVIGATION ══════════════════════════ */
 'dock-nav':{name:'Dock Nav',hint:'Glide your cursor along the dock',desc:'A glass dock whose icons swell and rise toward your pointer, macOS style.',cat:'Navigation',featured:true,
  inner:kxDockLinks,
  /* kinex.js: paste the css AND the kinex function below */
  css:`/* kinex.js: paste this css */
.kx-dock{--kx-bg:#121218cc;--kx-fg:#f2f2f6;--kx-accent:#30d158;--kx-size:52px;--kx-radius:24px;display:inline-flex;align-items:flex-end;gap:.5rem;padding:.6rem .7rem;border-radius:var(--kx-radius);background:var(--kx-bg);border:1px solid #ffffff1f;box-shadow:0 20px 44px #00000080,inset 0 1px 0 #ffffff26;backdrop-filter:blur(16px) saturate(140%);-webkit-backdrop-filter:blur(16px) saturate(140%);font-family:inherit}
.kx-dock a{--kx-sc:1;--kx-lift:0px;position:relative;display:grid;place-items:center;width:var(--kx-size);height:var(--kx-size);border-radius:calc(var(--kx-size)*.3);color:var(--kx-fg);background:#ffffff0e;border:1px solid #ffffff14;text-decoration:none;transform-origin:50% 100%;transform:translateY(var(--kx-lift)) scale(var(--kx-sc));transition:transform .28s cubic-bezier(.2,1.5,.35,1),background .25s,color .25s,border-color .25s;outline:none}
.kx-dock a svg{width:46%;height:46%;pointer-events:none}
.kx-dock a::after{content:attr(aria-label);position:absolute;bottom:calc(100% + 12px);left:50%;transform:translate(-50%,5px);padding:.34rem .6rem;border-radius:8px;background:#08080b;color:#eaeaef;border:1px solid #ffffff1f;font:600 .68rem/1.2 system-ui,sans-serif;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s}
.kx-dock a:hover{background:color-mix(in srgb,var(--kx-accent) 20%,#ffffff0e);border-color:color-mix(in srgb,var(--kx-accent) 40%,transparent);color:var(--kx-accent)}
.kx-dock a:hover::after,.kx-dock a:focus-visible::after{opacity:1;transform:translate(-50%,0)}
.kx-dock a:focus-visible{outline:2px solid var(--kx-accent);outline-offset:2px}
.kx-dock a:active{transform:translateY(var(--kx-lift)) scale(calc(var(--kx-sc)*.94))}
@media(prefers-reduced-motion:reduce){.kx-dock a,.kx-dock a::after{transition:none!important}}`,
  html:'<nav class="kx-dock">'+kxDockLinks+'</nav>',
  /* kinex.js: paste the dock function below into the runtime table under the key "dock-nav" */
  on:d=>{const items=[...d.querySelectorAll('a')];
   const move=e=>items.forEach(it=>{const r=it.getBoundingClientRect(),dist=Math.abs(e.clientX-(r.left+r.width/2)),sc=1+Math.max(0,1-dist/130)*.85;
    it.style.setProperty('--kx-sc',sc.toFixed(3));it.style.setProperty('--kx-lift',(-(sc-1)*22).toFixed(1)+'px')});
   const reset=()=>items.forEach(it=>{it.style.removeProperty('--kx-sc');it.style.removeProperty('--kx-lift')});
   d.addEventListener('pointermove',move);d.addEventListener('pointerleave',reset)},
  groups:[
   {g:'Dock',f:[{l:'Glass',v:'--kx-bg',t:'color',d:'#121218'},{l:'Icon',v:'--kx-fg',t:'color',d:'#f2f2f6'},{l:'Accent',v:'--kx-accent',t:'color',d:'#30d158'}]},
   {g:'Size',f:[{l:'Icon size',v:'--kx-size',t:'range',min:36,max:72,d:52,u:'px'},{l:'Corners',v:'--kx-radius',t:'range',min:0,max:40,d:24,u:'px'}]}]},

 'slide-nav':{name:'Slide Nav',hint:'Move across the links',desc:'A pill nav whose inked indicator glides to whichever link you touch.',cat:'Navigation',featured:true,
  inner:'<span class="kx-slide-ink" aria-hidden="true"></span>\n  <a href="#work">Work</a>\n  <a href="#studio" class="is-on">Studio</a>\n  <a href="#writing">Writing</a>\n  <a href="#contact">Contact</a>',
  /* kinex.js: paste the css AND the kinex function below */
  css:`/* kinex.js: paste this css */
.kx-slide{--kx-bg:#0f0f14;--kx-fg:#a3a3ae;--kx-on:#f5f5f7;--kx-accent:#30d158;--kx-radius:999px;position:relative;display:inline-flex;align-items:center;gap:.15rem;padding:.3rem;border-radius:var(--kx-radius);background:var(--kx-bg);border:1px solid #ffffff17;box-shadow:0 14px 32px #00000073,inset 0 1px 0 #ffffff14;font-family:inherit}
.kx-slide-ink{position:absolute;top:.3rem;bottom:.3rem;left:0;width:0;border-radius:999px;background:#ffffff14;box-shadow:inset 0 1px 0 #ffffff24;opacity:0;transition:transform .44s cubic-bezier(.2,.9,.3,1),width .44s cubic-bezier(.2,.9,.3,1),opacity .3s}
.kx-slide.kx-on .kx-slide-ink{opacity:1}
.kx-slide a{position:relative;z-index:1;padding:.62em 1.15em;border-radius:999px;color:var(--kx-fg);font-family:inherit;font-size:.88rem;font-weight:600;line-height:1;white-space:nowrap;text-decoration:none;transition:color .25s;outline:none}
.kx-slide a:hover,.kx-slide a:focus-visible,.kx-slide a.is-on{color:var(--kx-on)}
.kx-slide a.is-on::after{content:'';position:absolute;left:50%;bottom:.12em;width:4px;height:4px;border-radius:50%;background:var(--kx-accent);transform:translateX(-50%)}
.kx-slide a:focus-visible{box-shadow:0 0 0 2px var(--kx-accent)}
@media(prefers-reduced-motion:reduce){.kx-slide-ink{transition:none!important}}`,
  html:'<nav class="kx-slide"><span class="kx-slide-ink" aria-hidden="true"></span><a href="#work">Work</a><a href="#studio" class="is-on">Studio</a><a href="#writing">Writing</a><a href="#contact">Contact</a></nav>',
  /* kinex.js: paste the slide function below into the runtime table under the key "slide-nav" */
  on:n=>{const ink=n.querySelector('.kx-slide-ink'),links=[...n.querySelectorAll('a')];
   const current=()=>n.querySelector('a.is-on')||links[0];
   const put=el=>{if(!el||!ink)return;const r=el.getBoundingClientRect(),b=n.getBoundingClientRect();
    ink.style.width=r.width+'px';ink.style.transform='translateX('+(r.left-b.left)+'px)';n.classList.add('kx-on')};
   requestAnimationFrame(()=>put(current()));
   links.forEach(a=>{a.addEventListener('pointerenter',()=>put(a));a.addEventListener('focus',()=>put(a));
    a.addEventListener('click',()=>{links.forEach(x=>x.classList.toggle('is-on',x===a));put(a)})});
   n.addEventListener('pointerleave',()=>put(current()));
   if(window.ResizeObserver)new ResizeObserver(()=>put(current())).observe(n)},
  groups:[
   {g:'Nav',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#0f0f14'},{l:'Link',v:'--kx-fg',t:'color',d:'#a3a3ae'},{l:'Hover',v:'--kx-on',t:'color',d:'#f5f5f7'},{l:'Accent',v:'--kx-accent',t:'color',d:'#30d158'}]},
   {g:'Shape',f:[{l:'Corners',v:'--kx-radius',t:'range',min:0,max:40,d:40,u:'px'}]}]},

 'scroll-nav':{name:'Scroll Nav',hint:'Scroll the page to hide and reveal it',desc:'A sticky bar that hides on the way down, returns on the way up, and tracks scroll progress.',cat:'Navigation',
  inner:'<b>KINEX<i>.js</i></b>\n  <nav><a href="#work">Work</a><a href="#about">About</a><a href="#pricing">Pricing</a></nav>\n  <a class="kx-cta" href="#start">Start free</a>',
  /* kinex.js: paste the css AND the kinex function below */
  css:`/* kinex.js: paste this css */
.kx-snav{--kx-bg:#0b0b0fcc;--kx-fg:#f5f5f7;--kx-mute:#9a9aa6;--kx-accent:#30d158;--kx-radius:16px;position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:1.3rem;box-sizing:border-box;width:100%;padding:.72rem 1rem;border-radius:var(--kx-radius);background:var(--kx-bg);border:1px solid #ffffff17;box-shadow:0 12px 32px #00000066;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);font-family:inherit;overflow:hidden;transition:transform .45s cubic-bezier(.2,.9,.3,1),opacity .3s}
.kx-snav.kx-hide{transform:translateY(-130%);opacity:.3}
.kx-snav>b{font-family:inherit;font-size:.95rem;font-weight:800;letter-spacing:-.01em;color:var(--kx-fg);white-space:nowrap}
.kx-snav>b i{font-style:normal;color:var(--kx-accent)}
.kx-snav nav{display:flex;gap:.1rem;margin-left:auto}
.kx-snav nav a{padding:.5em .85em;border-radius:9px;color:var(--kx-mute);font-family:inherit;font-size:.85rem;font-weight:600;text-decoration:none;transition:color .2s,background .2s;outline:none}
.kx-snav nav a:hover,.kx-snav nav a:focus-visible{color:var(--kx-fg);background:#ffffff0f}
.kx-snav .kx-cta{padding:.55em 1em;border-radius:9px;background:var(--kx-accent);color:#05130a;font-family:inherit;font-size:.82rem;font-weight:800;text-decoration:none;white-space:nowrap;transition:filter .2s,transform .2s}
.kx-snav .kx-cta:hover{filter:brightness(1.08);transform:translateY(-1px)}
.kx-snav::after{content:'';position:absolute;left:0;bottom:0;height:2px;width:100%;transform:scaleX(var(--kx-p,0));transform-origin:left;background:linear-gradient(90deg,var(--kx-accent),color-mix(in srgb,var(--kx-accent) 20%,transparent))}
@media(prefers-reduced-motion:reduce){.kx-snav{transition:none!important}}
@media(max-width:620px){.kx-snav nav{display:none}}`,
  html:'<div class="kx-snav"><b>KINEX<i>.js</i></b><nav><a href="#work">Work</a><a href="#about">About</a><a href="#pricing">Pricing</a></nav><a class="kx-cta" href="#start">Start free</a></div>',
  /* kinex.js: paste the scroll function below into the runtime table under the key "scroll-nav" */
  on:n=>{let last=window.scrollY||0;
   const onScroll=()=>{const y=window.scrollY||0,doc=document.documentElement,max=Math.max(1,doc.scrollHeight-window.innerHeight);
    n.style.setProperty('--kx-p',Math.min(1,Math.max(0,y/max)).toFixed(3));
    n.classList.toggle('kx-hide',y>last&&y>90);last=y};
   addEventListener('scroll',onScroll,{passive:true});onScroll()},
  groups:[
   {g:'Bar',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#0b0b0f'},{l:'Text',v:'--kx-fg',t:'color',d:'#f5f5f7'},{l:'Links',v:'--kx-mute',t:'color',d:'#9a9aa6'},{l:'Accent',v:'--kx-accent',t:'color',d:'#30d158'}]},
   {g:'Shape',f:[{l:'Corners',v:'--kx-radius',t:'range',min:0,max:30,d:16,u:'px'}]}]},

 /* ══════════════════════════ FORMS ══════════════════════════ */
 'float-field':{name:'Float Label Field',hint:'Click the field and type',desc:'A quiet input whose label lifts into a micro caption as you focus.',cat:'Forms',featured:true,
  inner:'<input type="email" placeholder=" " autocomplete="email">\n  <span>Email address</span>',
  /* kinex.js: paste this css below; no JS needed */
  css:`/* kinex.js: paste this css */
.kx-field{--kx-bg:#0e0e13;--kx-fg:#f2f2f6;--kx-line:#2a2a34;--kx-accent:#30d158;--kx-radius:12px;position:relative;display:block;box-sizing:border-box;width:100%;max-width:330px;font-family:inherit}
.kx-field input{box-sizing:border-box;width:100%;padding:1.42rem 1rem .62rem;border-radius:var(--kx-radius);border:1px solid var(--kx-line);background:var(--kx-bg);color:var(--kx-fg);font-family:inherit;font-size:.95rem;font-weight:500;line-height:1.3;outline:none;transition:border-color .25s,box-shadow .25s}
.kx-field input::placeholder{color:transparent}
.kx-field span{position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:#8b8b96;font-family:inherit;font-size:.92rem;pointer-events:none;transform-origin:left center;transition:top .22s cubic-bezier(.2,.9,.3,1),transform .22s cubic-bezier(.2,.9,.3,1),font-size .22s,color .22s,letter-spacing .22s}
.kx-field input:focus+span,.kx-field input:not(:placeholder-shown)+span{top:.6rem;transform:translateY(0);font-size:.66rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--kx-accent)}
.kx-field input:focus{border-color:color-mix(in srgb,var(--kx-accent) 65%,transparent);box-shadow:0 0 0 4px color-mix(in srgb,var(--kx-accent) 14%,transparent)}
.kx-field::after{content:'';position:absolute;left:1rem;right:1rem;bottom:0;height:1px;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,var(--kx-accent),transparent);transition:transform .5s cubic-bezier(.2,.9,.3,1)}
.kx-field:focus-within::after{transform:scaleX(1)}
@media(prefers-reduced-motion:reduce){.kx-field *,.kx-field::after{transition:none!important}}`,
  html:'<label class="kx-field"><input type="email" placeholder=" " autocomplete="email"><span>Email address</span></label>',
  on:f=>{const input=f.querySelector('input');if(input)f.addEventListener('click',e=>{if(e.target!==input)input.focus()})},
  groups:[
   {g:'Field',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#0e0e13'},{l:'Text',v:'--kx-fg',t:'color',d:'#f2f2f6'},{l:'Border',v:'--kx-line',t:'color',d:'#2a2a34'},{l:'Accent',v:'--kx-accent',t:'color',d:'#30d158'}]},
   {g:'Shape',f:[{l:'Corners',v:'--kx-radius',t:'range',min:0,max:28,d:12,u:'px'}]}]},

 'otp-field':{name:'OTP Input',hint:'Type, paste or backspace through the cells',desc:'Segmented verification code cells that advance, accept a paste and confirm when full.',cat:'Forms',featured:true,
  inner:kxOtpCells,
  /* kinex.js: paste the css AND the kinex function below */
  css:`/* kinex.js: paste this css */
.kx-otp{--kx-bg:#0f0f14;--kx-fg:#f5f5f7;--kx-line:#2b2b35;--kx-accent:#30d158;--kx-radius:12px;--kx-cell:44px;display:inline-flex;gap:.5rem;font-family:inherit}
.kx-otp input{box-sizing:border-box;width:var(--kx-cell);height:calc(var(--kx-cell)*1.18);border-radius:var(--kx-radius);border:1px solid var(--kx-line);background:var(--kx-bg);color:var(--kx-fg);text-align:center;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:1.15rem;font-weight:700;caret-color:var(--kx-accent);outline:none;transition:border-color .2s,box-shadow .2s,transform .2s,background .2s}
.kx-otp input.kx-filled{background:#ffffff0a;border-color:#ffffff33}
.kx-otp input:focus{border-color:var(--kx-accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--kx-accent) 16%,transparent);transform:translateY(-2px)}
.kx-otp.kx-done input{border-color:var(--kx-accent);background:color-mix(in srgb,var(--kx-accent) 10%,#0f0f14);box-shadow:0 0 0 1px var(--kx-accent)}
@media(prefers-reduced-motion:reduce){.kx-otp input{transition:none!important}}`,
  html:'<div class="kx-otp" role="group" aria-label="Verification code">'+kxOtpCells+'</div>',
  /* kinex.js: paste the otp function below into the runtime table under the key "otp-field" */
  on:o=>{const ins=[...o.querySelectorAll('input')];
   ins.forEach((i,idx)=>{
    i.addEventListener('input',()=>{i.value=i.value.replace(/\D/g,'').slice(-1);i.classList.toggle('kx-filled',!!i.value);
     if(i.value&&idx<ins.length-1)ins[idx+1].focus();o.classList.toggle('kx-done',ins.every(x=>x.value))});
    i.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!i.value&&idx>0){const prev=ins[idx-1];
     prev.focus();prev.value='';prev.classList.remove('kx-filled');o.classList.remove('kx-done');e.preventDefault()}});
    i.addEventListener('paste',e=>{e.preventDefault();
     const t=(e.clipboardData.getData('text')||'').replace(/\D/g,'').slice(0,ins.length-idx);
     [...t].forEach((ch,k)=>{const cell=ins[idx+k];if(cell){cell.value=ch;cell.classList.add('kx-filled')}});
     const next=ins.find((x,k)=>k>=idx&&!x.value)||ins[ins.length-1];next.focus();
     o.classList.toggle('kx-done',ins.every(x=>x.value))})})},
  groups:[
   {g:'Cells',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#0f0f14'},{l:'Digit',v:'--kx-fg',t:'color',d:'#f5f5f7'},{l:'Border',v:'--kx-line',t:'color',d:'#2b2b35'},{l:'Accent',v:'--kx-accent',t:'color',d:'#30d158'}]},
   {g:'Shape',f:[{l:'Cell size',v:'--kx-cell',t:'range',min:32,max:64,d:44,u:'px'},{l:'Corners',v:'--kx-radius',t:'range',min:0,max:24,d:12,u:'px'}]}]},

 'morph-check':{name:'Morph Check',hint:'Click the box',desc:'A checkbox that fills, springs and draws its tick with a single stroke.',cat:'Forms',
  inner:kxCheckInner,
  /* kinex.js: paste the css below; no JS needed for the visual */
  css:`/* kinex.js: paste this css */
.kx-check{--kx-fg:#e9e9ee;--kx-accent:#30d158;--kx-size:20px;display:inline-flex;align-items:center;gap:.7rem;font-family:inherit;font-size:.92rem;font-weight:500;line-height:1.4;color:var(--kx-fg);cursor:pointer;user-select:none;-webkit-user-select:none;outline:none}
.kx-check input{position:absolute;opacity:0;width:0;height:0}
.kx-check svg{flex:none;display:block;width:var(--kx-size);height:var(--kx-size);overflow:visible;transition:transform .3s cubic-bezier(.2,1.7,.35,1)}
.kx-check svg rect{fill:#ffffff08;stroke:#4a4a56;stroke-width:1.6;transition:fill .3s cubic-bezier(.2,.9,.3,1),stroke .3s}
.kx-check svg path{fill:none;stroke:#04120a;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:20;stroke-dashoffset:20;transition:stroke-dashoffset .35s cubic-bezier(.6,0,.2,1) .05s}
.kx-check input:checked+svg rect{fill:var(--kx-accent);stroke:var(--kx-accent)}
.kx-check input:checked+svg path{stroke-dashoffset:0}
.kx-check:hover svg rect{stroke:color-mix(in srgb,var(--kx-accent) 70%,#4a4a56)}
.kx-check:active svg{transform:scale(.88)}
.kx-check input:focus-visible+svg{outline:2px solid color-mix(in srgb,var(--kx-accent) 70%,transparent);outline-offset:3px;border-radius:7px}
.kx-check input:focus-visible~span{color:var(--kx-accent)}
@media(prefers-reduced-motion:reduce){.kx-check svg,.kx-check svg rect,.kx-check svg path{transition:none!important}}`,
  html:'<label class="kx-check">'+kxCheckInner+'</label>',
  on:c=>{const box=c.querySelector('input');if(!box)return;
   c.addEventListener('click',e=>{if(e.target!==box){e.preventDefault();box.checked=!box.checked;box.dispatchEvent(new Event('change',{bubbles:true}))}})},
  groups:[
   {g:'Check',f:[{l:'Text',v:'--kx-fg',t:'color',d:'#e9e9ee'},{l:'Accent',v:'--kx-accent',t:'color',d:'#30d158'}]},
   {g:'Shape',f:[{l:'Box size',v:'--kx-size',t:'range',min:14,max:32,d:20,u:'px'}]}]},

 /* ══════════════════════════ BACKGROUNDS ══════════════════════════ */
//  'aurora-bg':{name:'Aurora Mesh',hint:'Let it drift',desc:'Three blurred light bodies slowly drifting over near-black, with a faint scan grain.',cat:'Backgrounds',featured:true,
//   inner:'<i></i>\n  <i></i>\n  <i></i>',
  /* kinex.js: paste the css below; no JS needed */
//   css:`/* kinex.js: paste this css */
// .kx-aurora{--kx-bg:#05060a;--kx-c1:#1d4ed8;--kx-c2:#a855f7;--kx-c3:#06b6d4;--kx-radius:18px;--kx-speed:18s;position:relative;display:block;box-sizing:border-box;width:100%;height:100%;min-height:340px;border-radius:var(--kx-radius);background:var(--kx-bg);overflow:hidden;isolation:isolate}
// .kx-aurora i{position:absolute;display:block;width:62%;aspect-ratio:1;border-radius:50%;filter:blur(54px);opacity:.55;mix-blend-mode:screen;animation:kx-aur-drift var(--kx-speed) ease-in-out infinite alternate}
// .kx-aurora i:nth-child(1){background:var(--kx-c1);top:-20%;left:-14%}
// .kx-aurora i:nth-child(2){background:var(--kx-c2);right:-12%;bottom:-26%;animation-delay:-6s}
// .kx-aurora i:nth-child(3){width:42%;background:var(--kx-c3);top:18%;right:16%;opacity:.42;animation-delay:-11s}
// .kx-aurora::after{content:'';position:absolute;inset:0;pointer-events:none;opacity:.3;mix-blend-mode:overlay;background-image:repeating-linear-gradient(0deg,#0000 0 2px,#00000059 2px 3px)}
// @keyframes kx-aur-drift{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(9%,-7%,0) scale(1.12)}100%{transform:translate3d(-7%,6%,0) scale(.94)}}
// @media(prefers-reduced-motion:reduce){.kx-aurora i{animation:none}}`,
//   html:'<div class="kx-aurora"><i></i><i></i><i></i></div>',
//   groups:[
//    {g:'Base',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#05060a'}]},
//    {g:'Lights',f:[{l:'One',v:'--kx-c1',t:'color',d:'#1d4ed8'},{l:'Two',v:'--kx-c2',t:'color',d:'#a855f7'},{l:'Three',v:'--kx-c3',t:'color',d:'#06b6d4'}]},
//    {g:'Shape',f:[{l:'Corners',v:'--kx-radius',t:'range',min:0,max:40,d:18,u:'px'}]},
//    {g:'Motion',f:[{l:'Drift',v:'--kx-speed',t:'range',min:6,max:40,d:18,u:'s',step:1}]}]},

//  'spot-grid-bg':{name:'Spot Grid',hint:'Move your cursor across it',desc:'A fine dot grid with a soft accent spotlight that follows the pointer.',cat:'Backgrounds',
//   inner:'',
  /* kinex.js: paste the css AND the kinex function below */
//   css:`/* kinex.js: paste this css */
// .kx-spot{--kx-bg:#08080c;--kx-dot:#32323e;--kx-glow:#30d158;--kx-radius:18px;--kx-gap:26px;--kx-dot-size:1.7px;--kx-reach:240px;position:relative;display:block;box-sizing:border-box;width:100%;height:100%;min-height:340px;border-radius:var(--kx-radius);background:var(--kx-bg);overflow:hidden;isolation:isolate}
// .kx-spot::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,var(--kx-dot) var(--kx-dot-size),transparent calc(var(--kx-dot-size) + .6px));background-size:var(--kx-gap) var(--kx-gap);opacity:.75}
// .kx-spot::after{content:'';position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:.8;background:radial-gradient(circle var(--kx-reach) at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--kx-glow) 58%,transparent),transparent 72%)}`,
//   html:'<div class="kx-spot"></div>',
  /* kinex.js: paste the kxTrack behaviour into the runtime table under the key "spot-grid-bg" */
//   on:kxTrack,
//   groups:[
//    {g:'Grid',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#08080c'},{l:'Dot',v:'--kx-dot',t:'color',d:'#32323e'},{l:'Glow',v:'--kx-glow',t:'color',d:'#30d158'}]},
//    {g:'Grid size',f:[{l:'Spacing',v:'--kx-gap',t:'range',min:14,max:48,d:26,u:'px'},{l:'Dot size',v:'--kx-dot-size',t:'range',min:.8,max:4,d:1.7,u:'px',step:.1},{l:'Reach',v:'--kx-reach',t:'range',min:120,max:460,d:240,u:'px'}]},
//    {g:'Shape',f:[{l:'Corners',v:'--kx-radius',t:'range',min:0,max:40,d:18,u:'px'}]}]},

//  'beam-bg':{name:'Light Beams',hint:'Let it sway',desc:'Two coloured beams fanning up from the floor, blurred and slowly swaying.',cat:'Backgrounds',
//   inner:'',
  /* kinex.js: paste the css below; no JS needed */
//   css:`/* kinex.js: paste this css */
// .kx-beam{--kx-bg:#07080d;--kx-c1:#7c3aed;--kx-c2:#22d3ee;--kx-radius:18px;position:relative;display:block;box-sizing:border-box;width:100%;height:100%;min-height:340px;border-radius:var(--kx-radius);background:radial-gradient(120% 90% at 50% 112%,#0e1424,var(--kx-bg) 72%);overflow:hidden;isolation:isolate}
// .kx-beam::before{content:'';position:absolute;inset:-45% -25%;background:conic-gradient(from 198deg at 50% 100%,#0000 0deg,var(--kx-c1) 22deg,#0000 44deg,var(--kx-c2) 64deg,#0000 88deg);filter:blur(30px);opacity:.5;animation:kx-beam-sway 14s ease-in-out infinite alternate;-webkit-mask-image:linear-gradient(to top,#000 24%,transparent 84%);mask-image:linear-gradient(to top,#000 24%,transparent 84%)}
// .kx-beam::after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 118%,color-mix(in srgb,var(--kx-c2) 26%,transparent),transparent 62%)}
// @keyframes kx-beam-sway{from{transform:translateX(-9%) rotate(-3deg)}to{transform:translateX(9%) rotate(3deg)}}
// @media(prefers-reduced-motion:reduce){.kx-beam::before{animation:none}}`,
//   html:'<div class="kx-beam"></div>',
//   groups:[
//    {g:'Scene',f:[{l:'Background',v:'--kx-bg',t:'color',d:'#07080d'}]},
//    {g:'Beams',f:[{l:'Beam A',v:'--kx-c1',t:'color',d:'#7c3aed'},{l:'Beam B',v:'--kx-c2',t:'color',d:'#22d3ee'}]},
//    {g:'Shape',f:[{l:'Corners',v:'--kx-radius',t:'range',min:0,max:40,d:18,u:'px'}]}]},

 /* ══════════════════════════ LOADERS ══════════════════════════ */
 'arc-loader':{name:'Arc',hint:'Pure CSS, always running',desc:'A minimal masked arc that sweeps around with a faint neon bloom.',cat:'Loaders',
  inner:'',
  /* kinex.js: paste the css below; no JS needed */
  css:`/* kinex.js: paste this css */
.kx-arc{--kx-size:54px;--kx-accent:#30d158;--kx-speed:1.05s;display:inline-block;width:var(--kx-size);height:var(--kx-size);border-radius:50%;background:conic-gradient(from 0deg,#0000 0 58%,var(--kx-accent) 96% 100%);-webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 4px),#000 calc(100% - 3.5px));mask:radial-gradient(farthest-side,#0000 calc(100% - 4px),#000 calc(100% - 3.5px));animation:kx-arc-spin var(--kx-speed) cubic-bezier(.55,.15,.45,.85) infinite;filter:drop-shadow(0 0 6px color-mix(in srgb,var(--kx-accent) 45%,transparent))}
@keyframes kx-arc-spin{to{transform:rotate(360deg)}}`,
  html:'<div class="kx-arc" role="status" aria-label="Loading"></div>',
  groups:[
   {g:'Color',f:[{l:'Accent',v:'--kx-accent',t:'color',d:'#30d158'}]},
   {g:'Size',f:[{l:'Size',v:'--kx-size',t:'range',min:28,max:100,d:54,u:'px'}]},
   {g:'Motion',f:[{l:'Speed',v:'--kx-speed',t:'range',min:.5,max:3,d:1.05,u:'s',step:.05}]}]},

 'dots-loader':{name:'Bouncing Dots',hint:'Pure CSS, always running',desc:'Three dots that hop in sequence with a soft fade.',cat:'Loaders',
  inner:'<i></i>\n  <i></i>\n  <i></i>',
  /* kinex.js: paste the css below; no JS needed */
  css:`/* kinex.js: paste this css */
.kx-dots{--kx-size:9px;--kx-gap:.42rem;--kx-accent:#30d158;--kx-speed:1.15s;display:inline-flex;align-items:center;gap:var(--kx-gap)}
.kx-dots i{display:block;width:var(--kx-size);height:var(--kx-size);border-radius:50%;background:var(--kx-accent);animation:kx-dots-b var(--kx-speed) ease-in-out infinite}
.kx-dots i:nth-child(2){animation-delay:.14s}
.kx-dots i:nth-child(3){animation-delay:.28s}
@keyframes kx-dots-b{0%,100%{transform:translateY(0) scale(.84);opacity:.45}42%{transform:translateY(-.5rem) scale(1);opacity:1}}`,
  html:'<div class="kx-dots" role="status" aria-label="Loading"><i></i><i></i><i></i></div>',
  groups:[
   {g:'Color',f:[{l:'Accent',v:'--kx-accent',t:'color',d:'#30d158'}]},
   {g:'Size',f:[{l:'Dot',v:'--kx-size',t:'range',min:4,max:18,d:9,u:'px'},{l:'Gap',v:'--kx-gap',t:'range',min:.1,max:1,d:.42,u:'rem',step:.02}]},
   {g:'Motion',f:[{l:'Speed',v:'--kx-speed',t:'range',min:.5,max:2.5,d:1.15,u:'s',step:.05}]}]},

 'skeleton-loader':{name:'Skeleton',hint:'Pure CSS, always running',desc:'A content placeholder whose surfaces catch a slow diagonal light sweep.',cat:'Loaders',
  inner:'<i class="kx-sk-thumb"></i>\n  <div class="kx-sk-lines"><i></i><i></i><i></i></div>',
  /* kinex.js: paste the css below; no JS needed */
  css:`/* kinex.js: paste this css */
.kx-sk{--kx-bg:#0f0f15;--kx-sh:#1c1c25;--kx-hi:#2a2a37;--kx-radius:16px;--kx-speed:1.5s;display:flex;gap:1rem;box-sizing:border-box;width:100%;max-width:340px;padding:1rem;border-radius:var(--kx-radius);background:var(--kx-bg);border:1px solid #ffffff0f;font-family:inherit}
.kx-sk i{display:block;border-radius:8px;background:linear-gradient(100deg,var(--kx-sh) 28%,var(--kx-hi) 50%,var(--kx-sh) 72%) 0 0/220% 100%;animation:kx-sk-sweep var(--kx-speed) linear infinite}
.kx-sk-thumb{flex:none;width:64px;height:64px;border-radius:14px}
.kx-sk-lines{display:flex;flex:1;flex-direction:column;justify-content:center;gap:.55rem}
.kx-sk-lines i{height:.6rem}
.kx-sk-lines i:nth-child(1){width:60%}
.kx-sk-lines i:nth-child(2){width:100%}
.kx-sk-lines i:nth-child(3){width:76%}
@keyframes kx-sk-sweep{to{background-position:-220% 0}}`,
  html:'<div class="kx-sk" role="status" aria-label="Loading"><i class="kx-sk-thumb"></i><div class="kx-sk-lines"><i></i><i></i><i></i></div></div>',
  groups:[
   {g:'Surface',f:[{l:'Card',v:'--kx-bg',t:'color',d:'#0f0f15'},{l:'Shade',v:'--kx-sh',t:'color',d:'#1c1c25'},{l:'Highlight',v:'--kx-hi',t:'color',d:'#2a2a37'}]},
   {g:'Shape',f:[{l:'Corners',v:'--kx-radius',t:'range',min:0,max:28,d:16,u:'px'}]},
   {g:'Motion',f:[{l:'Speed',v:'--kx-speed',t:'range',min:.6,max:3,d:1.5,u:'s',step:.05}]}]},

 'ripple-loader':{name:'Ripple',hint:'Pure CSS, always running',desc:'Rings expanding from a glowing core, fading as they grow.',cat:'Loaders',
  inner:'<i></i>\n  <i></i>\n  <i></i>',
  /* kinex.js: paste the css below; no JS needed */
  css:`/* kinex.js: paste this css */
.kx-rp{--kx-size:64px;--kx-accent:#30d158;--kx-speed:2.4s;position:relative;display:inline-grid;place-items:center;width:var(--kx-size);height:var(--kx-size)}
.kx-rp i{position:absolute;width:100%;height:100%;border-radius:50%;border:1.5px solid var(--kx-accent);opacity:0;animation:kx-rp-pulse var(--kx-speed) cubic-bezier(.2,.7,.3,1) infinite}
.kx-rp i:nth-child(2){animation-delay:calc(var(--kx-speed)/3)}
.kx-rp i:nth-child(3){animation-delay:calc(var(--kx-speed)/3*2)}
.kx-rp::after{content:'';width:18%;height:18%;border-radius:50%;background:var(--kx-accent);box-shadow:0 0 14px color-mix(in srgb,var(--kx-accent) 65%,transparent)}
@keyframes kx-rp-pulse{0%{transform:scale(.15);opacity:0}28%{opacity:.9}100%{transform:scale(1);opacity:0}}`,
  html:'<div class="kx-rp" role="status" aria-label="Loading"><i></i><i></i><i></i></div>',
  groups:[
   {g:'Color',f:[{l:'Accent',v:'--kx-accent',t:'color',d:'#30d158'}]},
   {g:'Size',f:[{l:'Size',v:'--kx-size',t:'range',min:32,max:110,d:64,u:'px'}]},
   {g:'Motion',f:[{l:'Speed',v:'--kx-speed',t:'range',min:.8,max:5,d:2.4,u:'s',step:.1}]}]}

};
