import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { PageHead } from '@/components/Bits';
import { voices } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Voices',
  description: 'Real messages from Activators inside the Leathrock community.',
  alternates: { canonical: '/voices' },
};

export default function Voices() {
  return (
    <>
      <PageHead eyebrow="What Activators say" title="Voices"
        lead="Real messages from inside the community, reproduced as they were written."
        crumbs={[['Voices', '']]} tint="#123A2C" />
      <section className="band-sm" style={{ ['--accent' as string]: '#5CE8A0' }}>
        <div className="wrap">
          <div className="masonry">
            {voices.map((v, i) => (
              <div className={'bub rv' + (v.mine ? ' mine' : '')} key={i}>
                <p>{v.quote}</p>
                <span className="from"><Icon name="chat" />{v.name}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 34, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn" href="/branches/leathcity"><span className="fill" /><span>Join LeathCity</span><Icon name="arw" /></Link>
            <Link className="btn" href="/contact"><span className="fill" /><span>Contact</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
