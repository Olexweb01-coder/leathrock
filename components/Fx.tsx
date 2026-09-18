"use client";
import { useEffect } from 'react';

/** Scroll progress bar. Written with transform + rAF so it never triggers layout. */
export default function Fx() {
  useEffect(() => {
    const bar = document.getElementById('prog');
    if (!bar) return;
    let ticking = false;
    const paint = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? window.pageYOffset / h : 0})`;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    paint();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="prog" id="prog" aria-hidden="true" />;
}
