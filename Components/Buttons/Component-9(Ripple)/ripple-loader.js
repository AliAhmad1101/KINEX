/* KINEX.js component — Ripple (id: ripple-loader)
   Rings expanding from a glowing core, fading as they grow.
   Load kinex.js from the CDN and use: <div data-kinex="ripple-loader">
   This is the registry entry: css + markup + groups, and on() when the component needs JS. */
const COMPONENT={
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
}
