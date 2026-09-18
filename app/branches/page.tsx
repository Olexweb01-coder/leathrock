import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { PageHead } from '@/components/Bits';
import { branches } from '@/lib/content';

export const metadata: Metadata = {
  title: 'The branches',
  description: 'LeathCity, Leathroom and the Leathrock events \u2014 pick the one you want.',
  alternates: { canonical: '/branches' },
};

export default function Branches() {
  return (
    <>
      <PageHead eyebrow="The branches" title="One root. Pick your way in."
        lead="LeathCity is the community. Leathroom is the depth. Events are where it all meets in person. Open any one to see what it is and how to join."
        crumbs={[['Branches', '']]} />
      <section className="band-sm">
        <div className="wrap" style={{ display: 'grid', gap: 18 }}>
          {branches.map((b) => (
            <article key={b.slug} style={{
              display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', border: '1px solid var(--hair)',
              borderRadius: 16, overflow: 'hidden', background: 'rgba(255,255,255,.02)',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.9fr) minmax(0,1.4fr)', gap: 0 }} className="branch-row">
                <div style={{ position: 'relative', minHeight: 230 }}>
                  <img src={b.image} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                  <span aria-hidden="true" style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg,transparent,rgba(10,5,1,.9)), radial-gradient(60% 60% at 30% 70%, ${b.color}33, transparent 70%)` }} />
                  <span className="badge" style={{ position: 'absolute', top: 16, left: 16, ['--tc' as string]: b.color }}>
                    <Icon name={b.icon} />{b.kind}
                  </span>
                </div>
                <div style={{ padding: 'clamp(20px,3vw,32px)' }}>
                  <h2 className="dsp h2" style={{ color: b.color, marginBottom: 6 }}>{b.name}</h2>
                  <p className="tag" style={{ marginBottom: 12 }}>{b.tagline}</p>
                  <p style={{ maxWidth: '54ch' }}>{b.intro}</p>
                  <Link className="btn" href={`/branches/${b.slug}`} style={{ ['--accent' as string]: b.color }}>
                    <span className="fill" /><span>More about {b.name}</span><Icon name="arw" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
