import Link from 'next/link';
import Hero from '@/components/Hero';
import { Icon } from '@/components/Icons';
import { SectionHead } from '@/components/Bits';
import { about, branches, courses, voices, naira, site } from '@/lib/content';

export default function Home() {
  return (
    <>
      <Hero />

      {/* SHORT ABOUT */}
      <section className="band" aria-labelledby="ab-h">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.8fr) minmax(0,1.2fr)', gap: 'clamp(24px,4vw,56px)', alignItems: 'center' }}>
          <div style={{ borderRadius: '999px 999px 16px 16px', overflow: 'hidden', aspectRatio: '3/4', border: '1px solid rgba(224,104,44,.3)' }}>
            <img src="/img/hangout.webp" alt="Leathrock speaking at an Activators' Hangout" loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 20%' }} />
          </div>
          <div>
            <span className="rule" style={{ display: 'block', maxWidth: 120 }} aria-hidden="true" />
            <span className="eyebrow">The Chief</span>
            <h2 className="dsp h2" id="ab-h">{about.heading}</h2>
            <p className="lead" style={{ marginTop: 16 }}>{site.bio}</p>
            <div className="cards" style={{ margin: '20px 0 22px' }}>
              {about.pillars.map((p) => (
                <div className="card" key={p.title}>
                  <Icon name={p.icon} />
                  <h4 className="dsp h4">{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
            <div>
              <Link className="btn" href="/about"><span className="fill" /><span>Know more</span><Icon name="arw" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* BRANCHES PREVIEW */}
      <section className="band" style={{ background: '#0C0602' }} aria-labelledby="br-h">
        <div className="wrap">
          <SectionHead eyebrow="The branches" title="Where it all grows."
            action={<Link className="btn" href="/branches"><span className="fill" /><span>See all branches</span><Icon name="arw" /></Link>} />
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

      {/* COURSES PREVIEW */}
      <section className="band" aria-labelledby="cr-h">
        <div className="wrap">
          <SectionHead eyebrow="Knowledge products" title="Courses"
            action={<Link className="btn" href="/courses"><span className="fill" /><span>All courses</span><Icon name="arw" /></Link>} />
          <div className="grid g2">
            {courses.map((c) => (
              <Link key={c.slug} className="prod" href={`/courses/${c.slug}`}>
                <span className="pic"><img src={c.image} alt={c.title} loading="lazy" /></span>
                <span>
                  <h3 className="dsp h3">{c.title}</h3>
                  <p style={{ fontSize: 14, margin: 0 }}>{c.subtitle}</p>
                  <p className="prc">{naira(c.price)}</p>
                  <span className="meta">
                    {c.meta.slice(0, 2).map((m) => (
                      <span className="mini" key={m}><Icon name="inf" />{m}</span>
                    ))}
                  </span>
                  <span className="go">View course <Icon name="arw" /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section className="band" style={{ background: '#130F0C' }} aria-labelledby="vc-h">
        <div className="wrap">
          <SectionHead eyebrow="What Activators say" title="Voices"
            action={<Link className="btn" href="/voices"><span className="fill" /><span>More voices</span><Icon name="arw" /></Link>} />
          <div className="grid g3">
            {voices.slice(0, 3).map((v, i) => (
              <div className={'bub rv' + (v.mine ? ' mine' : '')} key={i}>
                <p>{v.quote}</p>
                <span className="from"><Icon name="chat" />{v.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="band" style={{ background: 'radial-gradient(90% 70% at 50% 100%,#3A1508,#0E0703 74%)', textAlign: 'center' }} aria-labelledby="ct-h">
        <div className="wrap">
          <span className="eyebrow">Next move</span>
          <h2 className="dsp h2" id="ct-h" style={{ maxWidth: '16ch', marginInline: 'auto' }}>Ready when you are.</h2>
          <div style={{ marginTop: 24 }}>
            <Link className="btn solid" href="/contact"><span className="fill" /><span>Get in touch</span><Icon name="arw" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
