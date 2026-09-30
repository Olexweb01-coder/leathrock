"use client";
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Icon } from './Icons';
import { site } from '@/lib/content';

export default function Hero() {
  const wmRef = useRef<SVGSVGElement>(null);
  const figRef = useRef<HTMLImageElement>(null);
  const ghostRef = useRef<HTMLImageElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const emRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const fit = () => {
      const svg = wmRef.current;
      const t = svg?.querySelector('text');
      if (!svg || !t) return;
      try {
        const b = (t as SVGGraphicsElement).getBBox();
        if (!b.width) return;
        const p = b.height * 0.06;
        svg.setAttribute('viewBox', `${b.x - p} ${b.y - p} ${b.width + p * 2} ${b.height + p * 2}`);
      } catch { /* layout not ready */ }
    };
    const boot = () => { fit(); };
    fit();
    if (document.fonts?.ready) document.fonts.ready.then(boot);
    window.addEventListener('load', boot);
    const safety = window.setTimeout(boot, 1400);
    let rt = 0;
    const onResize = () => { window.clearTimeout(rt); rt = window.setTimeout(fit, 150); };
    window.addEventListener('resize', onResize);

    // Embers: a dense field weighted toward the bottom, so the hollow under him
    // stays alive instead of reading as empty. Transform + opacity only, so the
    // whole field composites on the GPU and costs no layout.
    if (!reduce && emRef.current && !emRef.current.childElementCount) {
      const small = window.innerWidth < 760;
      const n = small ? 46 : 84;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < n; i++) {
        const s = document.createElement('i');
        s.className = 'em';
        // bias travel low: most sparks die in the bottom third, a few climb high
        const climb = Math.pow(Math.random(), 2.1);
        const travel = 12 + climb * (small ? 62 : 80);       // vh
        const near = 1 - climb;                               // low ones read closer
        const size = 1.1 + near * 2.9 + Math.random() * 1.2;
        s.style.cssText =
          `left:${Math.random() * 100}%;width:${size}px;height:${size}px;` +
          `--et:${travel}vh;--ed:${(6 + climb * 13 + Math.random() * 4).toFixed(1)}s;` +
          `--edl:${(-Math.random() * 20).toFixed(1)}s;--edx:${(Math.random() * 46 - 23).toFixed(0)}px;` +
          `--eo:${(0.3 + near * 0.6).toFixed(2)};--eg:${(size * 1.8).toFixed(1)}px;` +
          `--ec:rgba(255,${160 + Math.round(Math.random() * 60)},${80 + Math.round(Math.random() * 70)},.95)`;
        frag.appendChild(s);
      }
      emRef.current.appendChild(frag);
    }

    if (!reduce) {
      let rot = 0, vel = 0.08, last = window.pageYOffset, dy = 0, sweep = -1, wait = 200;
      const onS = () => { const y = window.pageYOffset; dy = y - last; last = y; };
      window.addEventListener('scroll', onS, { passive: true });
      const grad = document.getElementById('wmg');
      // Park the loop when the hero scrolls away: no work while reading the rest of the page.
      let live = true;
      const vis = new IntersectionObserver(
        ([e]) => {
          const was = live; live = e.isIntersecting;
          if (live && !was) raf = requestAnimationFrame(frame);
        },
        { threshold: 0 }
      );
      if (heroRef.current) vis.observe(heroRef.current);

      const frame = () => {
        if (!live) { raf = 0; return; }
        const hero = heroRef.current;
        let p = 0;
        if (hero) {
          const r = hero.getBoundingClientRect();
          p = Math.min(1, Math.max(0, -r.top / (r.height || 1)));
        }
        if (figRef.current) {
          figRef.current.style.opacity = String(1 - p * 0.9);
          figRef.current.style.transform = `translateX(-50%) translateY(${p * 70}px)`;
        }
        if (coreRef.current) {
          coreRef.current.style.transform = `translateY(${-p * 54}px)`;
          coreRef.current.style.opacity = String(Math.max(0, 1 - p * 1.15));
        }
        const target = 0.06 + Math.min(Math.abs(dy) * 0.045, 2.6) * (dy >= 0 ? 1 : -1);
        vel += (target - vel) * 0.07; dy *= 0.88; rot += vel;
        if (ghostRef.current) ghostRef.current.style.transform = `translate(-50%,-50%) rotate(${rot}deg) scale(${1 + p * 0.25})`;
        if (wait > 0) wait--; else { sweep += 0.011; if (sweep > 1) { sweep = -1; wait = 300; } }
        if (grad) grad.setAttribute('gradientTransform', `translate(${sweep.toFixed(3)} 0)`);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
      return () => {
        cancelAnimationFrame(raf);
        vis.disconnect();
        window.removeEventListener('scroll', onS);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('load', boot);
        window.clearTimeout(safety);
      };
    }
    if (figRef.current) figRef.current.style.opacity = '1';
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', boot);
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef as never} aria-labelledby="hero-h">
      <span className="h-bg" aria-hidden="true" />
      <span className="h-rays" aria-hidden="true" />
      <img className="h-ghost" ref={ghostRef} src="/img/mark.webp" width={300} height={194} alt="" aria-hidden="true" />
      <span className="h-floor" aria-hidden="true" />
      <span className="h-hearth" aria-hidden="true" />
      <img className="h-fig" ref={figRef} src="/img/figure.webp" width={700} height={1045}
        alt={site.person + ', founder of Leathrock'} fetchPriority="high" decoding="async" />
      <span className="h-scrim" aria-hidden="true" />
      <span className="embers" ref={emRef} aria-hidden="true" />

      <div className="wrap h-core" ref={coreRef}>
        <span className="tag h-name">{site.person}</span>
        <h1 id="hero-h" className="sr">Leathrock</h1>
        <div className="wm-wrap">
          <svg className="wordmark" ref={wmRef} viewBox="0 0 1000 200" aria-hidden="true">
            <defs>
              <linearGradient id="wmg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#F4EFE6" /><stop offset=".40" stopColor="#F4EFE6" />
                <stop offset=".50" stopColor="#FFFFFF" /><stop offset=".60" stopColor="#F4EFE6" />
                <stop offset="1" stopColor="#F4EFE6" />
              </linearGradient>
            </defs>
            <text x="500" y="150" textAnchor="middle">LEATHROCK</text>
          </svg>
        </div>
        <div className="h-chips">
          <span className="chip"><Icon name="cross" />Faith</span>
          <span className="chip"><Icon name="spark" />Creativity</span>
          <span className="chip"><Icon name="compass" />Leadership</span>
          <span className="chip"><Icon name="book" />Wisdom</span>
        </div>
        <div className="h-acts">
          <Link className="btn solid" href="/branches"><span className="fill" /><span>Enter the world</span><Icon name="arw" /></Link>
          <Link className="btn" href="/about"><span className="fill" /><span>Meet the Chief</span></Link>
        </div>
      </div>
    </section>
  );
}
