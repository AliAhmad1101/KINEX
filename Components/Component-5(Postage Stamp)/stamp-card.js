const COMPONENT={
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
   {g:'Size',f:[{l:'Width',v:'--kx-w',t:'range',min:180,max:340,d:260,u:'px'},{l:'Perforation',v:'--kx-perf',t:'range',min:10,max:28,d:18,u:'px'}]}]}
}
