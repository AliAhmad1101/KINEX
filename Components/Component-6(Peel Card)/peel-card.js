const COMPONENT={
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
}
