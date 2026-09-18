"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './Icons';
import HomeLink from './HomeLink';
import { site } from '@/lib/content';

const MENU = [
  { n: '01', icon: 'cross', t: 'About', d: 'The Chief behind the brand', href: '/about', c: '#E0682C' },
  { n: '02', icon: 'door', t: 'Branches', d: 'Where everything connects', href: '/branches', c: '#E0682C' },
  { n: '03', icon: 'people', t: 'LeathCity', d: 'The community', href: '/branches/leathcity', c: '#FF2E9E' },
  { n: '04', icon: 'flame', t: 'Leathroom', d: 'Depth over noise', href: '/branches/leathroom', c: '#F5C518' },
  { n: '05', icon: 'stage', t: 'Events', d: 'El-Preneur and gatherings', href: '/branches/events', c: '#FFA23A' },
  { n: '06', icon: 'audio', t: 'Courses', d: 'TLNAC \u00b7 Women Leadership', href: '/courses', c: '#E2A05A' },
  { n: '07', icon: 'chat', t: 'Voices', d: 'What Activators say', href: '/voices', c: '#5CE8A0' },
  { n: '08', icon: 'target', t: 'Contact', d: 'Start the conversation', href: '/contact', c: '#E0682C' },
];

const TOP = [
  { t: 'About', href: '/about' },
  { t: 'Branches', href: '/branches' },
  { t: 'Courses', href: '/courses' },
  { t: 'Voices', href: '/voices' },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const s = () => setSolid(window.pageYOffset > 60);
    s();
    window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open]);

  const active = (h: string) => (path === h || (h !== '/' && path.startsWith(h)) ? 'page' : undefined);

  return (
    <>
      <header className={'nav' + (solid ? ' on' : '')}>
        <div className="nav-in">
          <HomeLink className="brandmark">
            <img src="/img/mark.webp" alt="" width={42} height={27} fetchPriority="high" />
            <b>LEATHROCK</b>
          </HomeLink>
          <nav className="nav-links" aria-label="Primary">
            {TOP.map((l) => (
              <Link key={l.href} href={l.href} aria-current={active(l.href)}>{l.t}</Link>
            ))}
          </nav>
          <Link className="btn solid sm nav-cta" href="/contact">
            <span className="fill" /><span>Contact</span>
          </Link>
          <button className="burger" aria-expanded={open} aria-controls="drawer"
            aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            <i /><i /><i />
          </button>
        </div>
      </header>

      <div id="drawer" className={'drawer' + (open ? ' open' : '')} aria-hidden={!open}>
        <span className="aura" aria-hidden="true" />
        <div className="mnu-top">
          <span className="tag">Where to?</span>
          <button className="mnu-close" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <Icon name="x" /><span>Close</span>
          </button>
        </div>
        <nav className="mnu" aria-label="All pages">
          {MENU.map((m, i) => (
            <Link key={m.href} className="mrow" href={m.href}
              style={{ ['--mc' as string]: m.c, transitionDelay: open ? `${0.09 + i * 0.045}s` : '0s' }}
              tabIndex={open ? 0 : -1}>
              <span className="swipe" aria-hidden="true" />
              <span className="n">{m.n}</span>
              <Icon name={m.icon} />
              <span><span className="t">{m.t}</span><span className="d">{m.d}</span></span>
              <Icon name="arw" className="ico go" />
            </Link>
          ))}
        </nav>
        <div className="mnu-foot">
          <span className="tag">{site.tagline}</span>
          <HomeLink>
            <img src="/img/mark.webp" alt="" width={26} height={17} style={{ width: 26, opacity: 0.6 }} />
          </HomeLink>
        </div>
      </div>
    </>
  );
}
