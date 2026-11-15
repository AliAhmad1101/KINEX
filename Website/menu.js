/* KINEX staggered menu (vanilla port of React Bits StaggeredMenu, no GSAP). Needs registry.js and a #cat button. */
(() => {
  const q = new URLSearchParams(location.search).get('c');
  const items = [['Featured', 'featured'], ...CATEGORIES.map(c => [c, kxSlug(c)]), ['All components', 'all']];
  document.head.insertAdjacentHTML('beforeend', `<style>
.sm{position:fixed;inset:60px 0 0;z-index:50;overflow:hidden;pointer-events:none}
.sm.open{pointer-events:auto}
.sm-l,.sm-p{position:absolute;top:0;right:0;bottom:0;width:clamp(280px,38vw,440px);transform:translateX(101%);transition:transform .32s cubic-bezier(.55,0,1,.45)}
.sm.open .sm-l{transform:none;transition:transform .5s cubic-bezier(.23,1,.32,1) calc(var(--i)*70ms)}
.sm-p{display:flex;flex-direction:column;gap:1rem;padding:2rem;overflow-y:auto;background:var(--sf);border-left:1px solid var(--bd)}
.sm.open .sm-p{transform:none;transition:transform .65s cubic-bezier(.23,1,.32,1) .15s}
.sm-p h2{font:700 .8rem var(--sec);letter-spacing:.12em;text-transform:uppercase;color:#a6a6a6}
.sm-p ol{display:flex;flex-direction:column;gap:.3rem;list-style:none;counter-reset:n}
.sm-p li{position:relative;width:fit-content;padding-right:2.8rem;counter-increment:n}
.sm-p li::after{content:counter(n,decimal-leading-zero);position:absolute;top:.2em;right:0;font-size:.8rem;color:var(--ac);opacity:0;transition:opacity .2s}
.sm.open li::after{opacity:1;transition:opacity .6s calc(.4s + var(--i)*.08s)}
.sm-p a{display:block;overflow:hidden;padding-bottom:.08em;font:400 clamp(2rem,5.2vh,3.4rem)/1.1 var(--main);transition:color .25s}
.sm-p a span{display:inline-block;transform:translateY(140%) rotate(10deg);transform-origin:50% 100%;transition:transform 0s .32s}
.sm.open a span{transform:none;transition:transform 1s cubic-bezier(.23,1,.32,1) calc(.3s + var(--i)*.1s)}
.sm-p a:hover,.sm-p a[aria-current]{color:var(--ac)}
@media(max-width:640px){.sm-l,.sm-p{width:100%}}
@media(prefers-reduced-motion){.sm *{transition-duration:.01s!important;transition-delay:0s!important}}
</style>`);
  const sm = document.createElement('div');
  sm.className = 'sm'; sm.inert = true;
  sm.innerHTML = ['#0e3b1b', '#30D158'].map((c, i) => `<div class="sm-l" style="--i:${i};background:${c}"></div>`).join('') +
    `<nav class="sm-p" aria-label="Categories"><h2>Categories</h2><ol>${items.map(([t, s], i) =>
      `<li style="--i:${i}"><a href="category.html?c=${s}"${q === s ? ' aria-current="page"' : ''}><span style="--i:${i}">${t}</span></a></li>`).join('')}</ol></nav>`;
  document.body.append(sm);

  const btn = document.getElementById('cat'), label = btn.querySelector('span');
  const set = v => {
    sm.classList.toggle('open', v); sm.inert = !v;
    btn.classList.toggle('on', v); btn.setAttribute('aria-expanded', v);
    label.textContent = v ? 'Close' : 'Categories';
  };
  btn.onclick = () => set(!sm.classList.contains('open'));
  sm.onclick = e => { if (!e.target.closest('.sm-p')) set(false); }; // click away
  addEventListener('keydown', e => e.key === 'Escape' && set(false));
})();
