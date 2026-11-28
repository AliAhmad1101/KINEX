const COMPONENT={
 'develop-card':{name:'Instant Photo',hint:'Hover the print to develop it',desc:'A polaroid that slowly develops from washed-out grey into full colour.',cat:'Cards',featured:true,
  inner:'<div class="kx-dev-win"><!-- your photo or content --></div>\n  <p class="kx-dev-cap">summer, undeveloped</p>',
 
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
   {g:'Motion',f:[{l:'Develop',v:'--kx-time',t:'range',min:0.3,max:2.5,d:0.9,u:'s',step:0.1}]}]}
}
