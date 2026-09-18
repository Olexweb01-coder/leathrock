"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from './Icons';
import { read, Store, EMPTY } from '@/lib/store';
import { naira } from '@/lib/content';

function useStore() {
  const [s, setS] = useState<Store>(EMPTY);
  useEffect(() => {
    const sync = () => setS(read());
    sync();
    window.addEventListener('leathrock:store', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('leathrock:store', sync); window.removeEventListener('storage', sync); };
  }, []);
  return s;
}

export function ExtraCourses() {
  const s = useStore();
  if (!s.courses.length) return null;
  return (
    <>
      {s.courses.map((c: any) => (
        <div key={c.slug} className="prod">
          <span className="pic" style={{ display: 'grid', placeItems: 'center', color: 'var(--faint)' }}>
            <Icon name="audio" />
          </span>
          <span>
            <h3 className="dsp h3">{c.title}</h3>
            <p style={{ fontSize: 14, margin: 0 }}>{c.subtitle}</p>
            <p className="prc">{naira(Number(c.price) || 0)}</p>
            <p style={{ fontSize: 14, marginTop: 8 }}>{c.summary}</p>
            <Link className="btn sm" href="/contact" style={{ marginTop: 10 }}>
              <span className="fill" /><span>Ask about this</span>
            </Link>
          </span>
        </div>
      ))}
    </>
  );
}

export function ExtraEvents() {
  const s = useStore();
  if (!s.events.length) return null;
  return (
    <>
      {s.events.map((e: any) => (
        <article key={e.slug} className="pane" style={{ marginTop: 14 }}>
          <span className="badge" style={{ ['--tc' as string]: '#FFA23A' }}><Icon name="cal" />{e.status || 'upcoming'}</span>
          <h3 className="dsp h3" style={{ marginTop: 12 }}>{e.title}</h3>
          <p className="tag" style={{ margin: '6px 0 10px' }}>{[e.dateText, e.venue].filter(Boolean).join(' \u00b7 ') || 'Date to be announced'}</p>
          <p>{e.summary}</p>
          {e.link && (
            <a className="btn sm" href={e.link} target="_blank" rel="noopener noreferrer">
              <span className="fill" /><span>{e.linkLabel || 'Details'}</span><Icon name="arw" />
            </a>
          )}
        </article>
      ))}
    </>
  );
}

export function ExtraReviews({ slug }: { slug: string }) {
  const s = useStore();
  const list = s.reviews?.[slug] ?? [];
  if (!list.length) return null;
  return (
    <>
      {list.map((r, i) => (
        <div className="bub" key={i}>
          <p>{r.quote}</p>
          <span className="from"><Icon name="star" />{r.name}</span>
        </div>
      ))}
    </>
  );
}

export function ReviewCount({ slug, base }: { slug: string; base: number }) {
  const s = useStore();
  const n = base + (s.reviews?.[slug]?.length ?? 0);
  if (!n) return <div className="empty">No reviews published yet. They appear here once the admin adds them.</div>;
  return null;
}
