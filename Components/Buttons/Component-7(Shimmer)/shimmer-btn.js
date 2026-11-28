const kxTrack=b=>b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',e.clientX-r.left+'px');b.style.setProperty('--my',e.clientY-r.top+'px')});
const kxBtn=`.kx-b{--kx-fg:#fff;--kx-radius:999px;--kx-size:1rem;display:inline-flex;align-items:center;justify-content:center;gap:.5rem;position:relative;overflow:hidden;isolation:isolate;padding:.85em 2em;border:0;border-radius:var(--kx-radius);color:var(--kx-fg);font-family:inherit;font-weight:700;font-size:var(--kx-size);line-height:1.2;white-space:nowrap;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform .25s cubic-bezier(.2,.9,.3,1),box-shadow .3s,filter .3s}
.kx-b:focus-visible{outline:3px solid currentColor;outline-offset:3px}
.kx-b:disabled{opacity:.5;cursor:not-allowed}
@media(prefers-reduced-motion:reduce){.kx-b,.kx-b *{animation:none!important;transition-duration:.01s!important}}
`;
const COMPONENT={
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
  groups:[{"g":"Label","f":[{"l":"Text","t":"text","d":"Get started"}]},{"g":"Color","f":[{"l":"From","v":"--kx-c1","t":"color","d":"#7c3aed"},{"l":"To","v":"--kx-c2","t":"color","d":"#db2777"},{"l":"Text","v":"--kx-fg","t":"color","d":"#ffffff"}]},{"g":"Shape","f":[{"l":"Radius","v":"--kx-radius","t":"range","min":0,"max":40,"d":40,"u":"px","step":1},{"l":"Text size","v":"--kx-size","t":"range","min":0.8,"max":1.6,"d":1,"u":"rem","step":0.05}]},{"g":"Motion","f":[{"l":"Shimmer speed","v":"--kx-speed","t":"range","min":1,"max":4,"d":2.4,"u":"s","step":0.1}]}]}
}
