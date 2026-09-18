import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icons';
import { PageHead } from '@/components/Bits';
import { courses, getCourse, naira, wa, site } from '@/lib/content';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCourse(slug);
  if (!c) return { title: 'Not found' };
  return {
    title: c.title,
    description: c.short,
    alternates: { canonical: `/courses/${c.slug}` },
    openGraph: { title: `${c.title} \u2014 Leathrock`, description: c.short, images: [c.image] },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCourse(slug);
  if (!c) notFound();

  const ld = {
    '@context': 'https://schema.org', '@type': 'Course', name: c.title, description: c.summary,
    provider: { '@type': 'Organization', name: 'Leathrock', url: site.url },
    offers: { '@type': 'Offer', price: String(c.price), priceCurrency: 'NGN', category: 'Paid', availability: 'https://schema.org/InStock' },
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Online', courseWorkload: 'PT3H' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHead eyebrow="Course" title={c.title} lead={c.subtitle}
        crumbs={[['Courses', '/courses'], [c.title, '']]} tint="#5A3A16" />
      <section className="band-sm">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.8fr) minmax(0,1.2fr)', gap: 'clamp(24px,4vw,52px)', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <img src={c.image} alt={c.title} loading="lazy" style={{ width: '100%', borderRadius: 14, border: '1px solid var(--hair)' }} />
            <p className="prc" style={{ fontSize: 30, marginTop: 16 }}>{naira(c.price)}</p>
            <div className="meta" style={{ marginBottom: 16 }}>
              {c.meta.map((m) => <span className="mini" key={m}><Icon name="inf" />{m}</span>)}
            </div>
            <div style={{ display: 'grid', gap: 9 }}>
              <a className="btn wa" href={wa(`I want to buy ${c.title} (${naira(c.price)}). Please send me the payment details.`, c.title)} target="_blank" rel="noopener noreferrer">
                <span className="fill" /><Icon name="wa" /><span>Buy on WhatsApp</span>
              </a>
              <a className="btn" href={`mailto:${site.email}?subject=${encodeURIComponent(c.title + ' \u2014 enquiry from the website')}&body=${encodeURIComponent(`Hi Leathrock,\n\nI'm coming from your website and I'd like to buy ${c.title} (${naira(c.price)}).\n\nThank you.`)}`}>
                <span className="fill" /><Icon name="mail" /><span>Email instead</span>
              </a>
            </div>
          </div>
          <div>
            <p className="lead">{c.summary}</p>

            <h2 className="dsp h3" style={{ margin: '28px 0 12px' }}>What you&rsquo;ll learn</h2>
            <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--dim)' }}>
              {c.learn.map((l) => <li key={l} style={{ marginBottom: 7 }}>{l}</li>)}
            </ul>

            {c.curriculum.length > 0 && (
              <>
                <h2 className="dsp h3" style={{ margin: '28px 0 12px' }}>The curriculum</h2>
                <div className="acc">
                  {c.curriculum.map(([t, d]) => (
                    <details key={t}>
                      <summary><span className="qn">&bull;</span>{t}<span className="ic" aria-hidden="true" /></summary>
                      <div className="ans"><p>{d}</p></div>
                    </details>
                  ))}
                </div>
              </>
            )}

            <h2 className="dsp h3" style={{ margin: '28px 0 12px' }}>What you get</h2>
            <div className="cards">
              {c.get.map((g) => (
                <div className="card" key={g}><Icon name="audio" /><p style={{ marginTop: 4 }}>{g}</p></div>
              ))}
            </div>

            <h2 className="dsp h3" style={{ margin: '28px 0 10px' }}>Who it&rsquo;s for</h2>
            <p>{c.forWho}</p>

            <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid var(--hair)' }}>
              <h2 className="dsp h3" style={{ marginBottom: 12 }}>How to join</h2>
              <div className="steps">
                <div className="step"><b>01</b><h3 className="dsp h4">Message or email</h3><p>Tell us which course you want. The message is already written for you.</p></div>
                <div className="step"><b>02</b><h3 className="dsp h4">Pay</h3><p>You&rsquo;ll get the payment details directly.</p></div>
                <div className="step"><b>03</b><h3 className="dsp h4">Get access</h3><p>The audio lessons and materials are sent to you. Lifetime access.</p></div>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
                <a className="btn wa" href={wa(`I want to buy ${c.title} (${naira(c.price)}). Please send me the payment details.`, c.title)} target="_blank" rel="noopener noreferrer">
                  <span className="fill" /><Icon name="wa" /><span>Get {c.title}</span>
                </a>
                <Link className="btn" href="/courses"><span className="fill" /><span>All courses</span><Icon name="arw" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
