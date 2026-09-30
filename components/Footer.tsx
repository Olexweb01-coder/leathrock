"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeLink from './HomeLink';
import { site } from '@/lib/content';

const COLS = [
  { h: 'The world', links: [['About', '/about'], ['Branches', '/branches'], ['LeathCity', '/branches/leathcity']] },
  { h: 'Go deeper', links: [['Leathroom', '/branches/leathroom'], ['Events', '/branches/events'], ['Courses', '/courses']] },
  { h: 'Connect', links: [['Voices', '/voices'], ['Contact', '/contact'], ['Home', '/']] },
];

const year = new Date().getFullYear();

export default function Footer() {
  const path = usePathname();
  const goHome = () => {
    if (path === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
    else requestAnimationFrame(() => window.scrollTo(0, 0));
  };
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div>
            <HomeLink className="brandmark" style={{ marginBottom: 12 }}>
              <img src="/img/mark.webp" alt="" width={38} height={25} style={{ width: 38 }} />
              <b>LEATHROCK</b>
            </HomeLink>
            <p style={{ fontSize: 13.5, maxWidth: '30ch' }}>Faith, creativity, leadership and wisdom.</p>
            <p style={{ fontSize: 13, marginTop: 10 }}>
              <a href={`tel:${site.phoneRaw}`}>{site.phone}</a><br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <div className="ft-cols">
            {COLS.map((c) => (
              <div key={c.h}>
                <h5>{c.h}</h5>
                <ul>
                  {c.links.map(([t, h]) => (
                    <li key={h}><Link href={h} onClick={h === '/' ? goHome : undefined}>{t}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="ft-btm">
          <span>&copy; {year} Leathrock</span>
          <span className="tag">{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
