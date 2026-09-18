import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { PageHead } from '@/components/Bits';
import { ExtraCourses } from '@/components/Extras';
import { courses, naira } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'TLNAC and Women Leadership Training \u2014 self-paced audio courses with lifetime access.',
  alternates: { canonical: '/courses' },
};

export default function Courses() {
  return (
    <>
      <PageHead eyebrow="Knowledge products" title="Courses"
        lead="Self-paced audio, lifetime access, built from what he actually teaches inside the rooms."
        crumbs={[['Courses', '']]} tint="#5A3A16" />
      <section className="band-sm">
        <div className="wrap">
          <div className="grid g2">
            {courses.map((c) => (
              <Link key={c.slug} className="prod" href={`/courses/${c.slug}`}>
                <span className="pic"><img src={c.image} alt={c.title} loading="lazy" /></span>
                <span>
                  <h2 className="dsp h3">{c.title}</h2>
                  <p style={{ fontSize: 14, margin: 0 }}>{c.subtitle}</p>
                  <p className="prc">{naira(c.price)}</p>
                  <p style={{ fontSize: 14, marginTop: 8 }}>{c.short}</p>
                  <span className="meta">
                    {c.meta.map((m) => <span className="mini" key={m}><Icon name="inf" />{m}</span>)}
                  </span>
                  <span className="go">More info <Icon name="arw" /></span>
                </span>
              </Link>
            ))}
            <ExtraCourses />
          </div>
        </div>
      </section>
    </>
  );
}
