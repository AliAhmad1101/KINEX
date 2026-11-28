const kxVar=(b,k)=>getComputedStyle(b).getPropertyValue(k).trim();
const kxBtn=`.kx-b{--kx-fg:#fff;--kx-radius:999px;--kx-size:1rem;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;position:relative;overflow:hidden;isolation:isolate;padding:.85em 2em;border:0;border-radius:var(--kx-radius);color:var(--kx-fg);font-family:inherit;font-weight:700;font-size:var(--kx-size);line-height:1.2;white-space:nowrap;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .25s cubic-bezier(.2,.9,.3,1),box-shadow .3s,filter .3s}
.kx-b:focus-visible{outline:3px solid currentColor;outline-offset:3px}
.kx-b:disabled{opacity:.5;cursor:not-allowed}
@media(prefers-reduced-motion:reduce){.kx-b,.kx-b *{animation:none!important;transition-duration:.01s!important}}
`;
const COMPONENT={
 'magnetic-btn':{name:'Magnetic',desc:'Leans toward your cursor as you approach, then presses down like a key.',cat:'Buttons',tag:'button',label:'Hover me',inner:'Hover me',hint:'Hover and click it',
  css:kxBtn+`.kx-b-magnetic{--kx-bg:#fafafa;--kx-fg:#111;--kx-depth:6px;--kx-pull:.35;--kx-radius:14px;background:var(--kx-bg);transform:translate(var(--tx,0px),var(--ty,0px));box-shadow:0 var(--kx-depth) 0 color-mix(in srgb,var(--kx-bg) 50%,#000),0 calc(var(--kx-depth)*2.5) 24px rgba(0,0,0,.3);transition:transform .2s cubic-bezier(.2,.9,.3,1),box-shadow .15s}
.kx-b-magnetic:hover{filter:brightness(1.06)}
.kx-b-magnetic:active{transform:translate(var(--tx,0px),calc(var(--ty,0px) + var(--kx-depth)));box-shadow:0 0 0 color-mix(in srgb,var(--kx-bg) 50%,#000),0 2px 8px rgba(0,0,0,.3)}`,
  html:'<button class="kx-b kx-b-magnetic">Hover me</button>',
  on:b => { const f = e => { if (!b.isConnected) return removeEventListener('pointermove', f); const r = b.getBoundingClientRect(), dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2, near = Math.hypot(dx, dy) < Math.max(r.width, r.height) / 2 + 60, p = parseFloat(kxVar(b, '--kx-pull')) || .35; b.style.setProperty('--tx', near ? dx * p + 'px' : '0px'); b.style.setProperty('--ty', near ? dy * p + 'px' : '0px') }; addEventListener('pointermove', f) },
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Hover me"}]},{"g":"Color","f":[{"l":"Background","v":"--kx-bg","t":"color","d":"#fafafa"},{"l":"Text","v":"--kx-fg","t":"color","d":"#111111"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":14,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Depth","v":"--kx-depth","t":"range","min":2,"max":12,"d":6,"u":"px","step":1},{"l":"Pull","v":"--kx-pull","t":"range","min":0.1,"max":0.6,"d":0.35,"u":"","step":0.05}]}]}
}
