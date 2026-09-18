import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icons';
import { PageHead } from '@/components/Bits';
import { ExtraEvents, ExtraReviews, ReviewCount } from '@/components/Extras';
import { branches, getBranch, events, wa } from '@/lib/content';

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBranch(slug);
  if (!b) return { title: 'Not found' };
  return {
    title: b.name,
    description: b.intro.slice(0, 160),
    alternates: { canonical: `/branches/${b.slug}` },
    openGraph: { title: `${b.name} \u2014 Leathrock`, description: b.intro.slice(0, 160), images: [b.image] },
  };
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBranch(slug);
  if (!b) notFound();

  return (
    <div style={{ ['--accent' as string]: b.color }}>
      <PageHead eyebrow={b.kind} title={b.name} lead={b.intro}
        crumbs={[['Branches', '/branches'], [b.name, '']]}
        tint={b.color + '33'} />

      <section className="band-sm">
        <div className="wrap">
          <p className="tag" style={{ marginBottom: 22 }}>{b.tagline}</p>

          {b.highlights.length > 0 && (
            <div className="cards" style={{ marginBottom: 34 }}>
              {b.highlights.map((h) => (
                <div className="card" key={h.title}>
                  <Icon name={h.icon} />
                  <h3 className="dsp h4">{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          )}

          {b.defs && b.defs.length > 0 && (
            <div className="acc" style={{ marginBottom: 34 }}>
              {b.defs.map(([t, d]) => (
                <details key={t}>
                  <summary><span className="qn">&bull;</span>{t}<span className="ic" aria-hidden="true" /></summary>
                  <div className="ans"><p>{d}</p></div>
                </details>
              ))}
            </div>
          )}

          {b.mission.length > 0 && (
            <div style={{ marginBottom: 34 }}>
              <h2 className="dsp h3" style={{ marginBottom: 14 }}>The mission</h2>
              <div style={{ display: 'grid', gap: 8 }}>
                {b.mission.map((m, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,.03)', border: '1px solid var(--hair)' }}>
                    <b style={{ color: b.color, fontFamily: 'Archivo', fontSize: 12, letterSpacing: '.14em' }}>{String(i + 1).padStart(2, '0')}</b>
                    <p style={{ margin: 0, fontSize: 15.5 }}>{m}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {b.cores.length > 0 && (
            <div style={{ marginBottom: 34 }}>
              <h2 className="dsp h3" style={{ marginBottom: 14 }}>The three Cores</h2>
              <div className="grid g3">
                {b.cores.map((c) => (
                  <div className="pane" key={c.name}>
                    <h3 className="dsp h4" style={{ color: b.color, marginBottom: 8 }}>{c.name}</h3>
                    <p style={{ fontSize: 14.5 }}>{c.text}</p>
                    <div style={{ marginTop: 12 }}>
                      {c.rules.map(([t, ok]) => (
                        <div className={'cmb ' + (ok ? 'ok' : 'no')} key={t}>
                          <span className="mk" aria-hidden="true">{ok ? '\u2713' : '\u2715'}</span>
                          <span>{t}</span>
                          <span className="sr">{ok ? 'Allowed' : 'Not allowed'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {b.coreNote && <p style={{ borderLeft: `2px solid ${b.color}`, paddingLeft: 16, marginTop: 18, fontSize: 16 }}>{b.coreNote}</p>}
            </div>
          )}

          {b.slug === 'events' && (
            <div style={{ marginBottom: 34 }}>
              <h2 className="dsp h3" style={{ marginBottom: 14 }}>The gatherings</h2>
              <div style={{ display: 'grid', gap: 14 }}>
                {events.map((e) => (
                  <article className="pane" key={e.slug}>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span className="badge" style={{ ['--tc' as string]: b.color }}><Icon name="cal" />{e.status === 'past' ? 'Past edition' : 'Upcoming'}</span>
                      <span className="tag">{[e.dateText, e.venue].filter(Boolean).join(' \u00b7 ') || 'Date to be announced'}</span>
                    </div>
                    <h3 className="dsp h3" style={{ marginTop: 12 }}>{e.title}</h3>
                    <p className="tag" style={{ margin: '6px 0 10px' }}>{e.tagline}</p>
                    <p>{e.summary}</p>
                    {e.pillars.length > 0 && (
                      <div className="cards" style={{ marginTop: 14 }}>
                        {e.pillars.map((p) => (
                          <div className="card" key={p.title}>
                            <Icon name={p.icon} />
                            <h4 className="dsp h4">{p.title}</h4>
                            <p>{p.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
                      {e.link && (
                        <a className="btn sm" href={e.link} target="_blank" rel="noopener noreferrer">
                          <span className="fill" /><span>{e.linkLabel || 'Details'}</span><Icon name="arw" />
                        </a>
                      )}
                      <a className="btn sm wa" href={wa(`I'd like to know when the next ${e.title} is happening.`, e.title)} target="_blank" rel="noopener noreferrer">
                        <span className="fill" /><Icon name="wa" /><span>Ask about dates</span>
                      </a>
                    </div>
                    <div style={{ marginTop: 18 }}>
                      <h4 className="tag" style={{ marginBottom: 10 }}>Reviews</h4>
                      <div className="grid g3">
                        {e.reviews.map((r, i) => (
                          <div className="bub" key={i}><p>{r.quote}</p><span className="from"><Icon name="star" />{r.name}</span></div>
                        ))}
                        <ExtraReviews slug={e.slug} />
                      </div>
                      <ReviewCount slug={e.slug} base={e.reviews.length} />
                    </div>
                  </article>
                ))}
                <ExtraEvents />
              </div>
            </div>
          )}

          {/* HOW TO JOIN */}
          <div id="join">
            <h2 className="dsp h2" style={{ marginBottom: 18 }}>{b.join.heading}</h2>
            <div className="steps">
              {b.join.steps.map((s) => (
                <div className="step" key={s.n}>
                  <b>{s.n}</b>
                  <h3 className="dsp h4">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            {b.join.note && <p style={{ marginTop: 16, fontSize: 14.5 }}>{b.join.note}</p>}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
              <a className="btn wa" href={wa(b.join.wa, b.name)} target="_blank" rel="noopener noreferrer">
                <span className="fill" /><Icon name="wa" /><span>Message on WhatsApp</span>
              </a>
              <Link className="btn" href="/contact"><span className="fill" /><span>Other ways to reach us</span><Icon name="arw" /></Link>
            </div>
          </div>

          {b.faqs.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h2 className="dsp h3" style={{ marginBottom: 12 }}>Questions</h2>
              <div className="acc">
                {b.faqs.map(([q, a], i) => (
                  <details key={q}>
                    <summary><span className="qn">{String(i + 1).padStart(2, '0')}</span>{q}<span className="ic" aria-hidden="true" /></summary>
                    <div className="ans"><p>{a}</p></div>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 44, paddingTop: 22, borderTop: '1px solid var(--hair)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {branches.filter((x) => x.slug !== b.slug).map((x) => (
              <Link className="btn sm" key={x.slug} href={`/branches/${x.slug}`} style={{ ['--accent' as string]: x.color }}>
                <span className="fill" /><span>{x.name}</span><Icon name="arw" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
