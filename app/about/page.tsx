import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { PageHead } from '@/components/Bits';
import { about, site, branches } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About the Chief',
  description: 'Oluwatimilehin Joshua Adedara, the visionary behind the Leathrock brand.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <>
      <PageHead eyebrow="The Chief" title={about.heading} lead={site.bio} crumbs={[['About', '']]} />
      <section className="band-sm">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.85fr) minmax(0,1.15fr)', gap: 'clamp(24px,4vw,56px)', alignItems: 'start' }}>
          <div style={{ borderRadius: '999px 999px 16px 16px', overflow: 'hidden', aspectRatio: '3/4', border: '1px solid rgba(224,104,44,.3)', position: 'sticky', top: 100 }}>
            <img src="/img/hangout.webp" alt="Leathrock speaking at an Activators' Hangout" loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%' }} />
          </div>
          <div>
            {about.lines.map((l, i) => (
              <p key={i} style={{ fontSize: 17.5, marginBottom: 18 }}>{l}</p>
            ))}
            <img src="/img/sig.webp" alt="Signature of Oluwatimilehin Joshua" loading="lazy"
              style={{ width: 'min(215px,58%)', margin: '18px 0 26px', opacity: 0.85 }} />
            <div className="cards">
              {about.pillars.map((p) => (
                <div className="card" key={p.title}>
                  <Icon name={p.icon} />
                  <h4 className="dsp h4">{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="band-sm" style={{ background: '#0C0602' }}>
        <div className="wrap">
          <span className="eyebrow">Where to next</span>
          <h2 className="dsp h2" style={{ marginBottom: 26 }}>The branches</h2>
          <div className="grid g3">
            {branches.map((b) => (
              <Link key={b.slug} className="tile" href={`/branches/${b.slug}`} style={{ ['--tc' as string]: b.color }}>
                <img className="art" src={b.image} alt="" loading="lazy" aria-hidden="true" />
                <span className="veil" aria-hidden="true" /><span className="glow" aria-hidden="true" />
                <span className="badge"><Icon name={b.icon} />{b.kind}</span>
                <h3 className="dsp h3">{b.name}</h3>
                <p>{b.short}</p>
                <span className="go">Explore <Icon name="arw" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
