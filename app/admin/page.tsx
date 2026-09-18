"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { read, write, download, Store, EMPTY, STORE_KEY } from '@/lib/store';
import { events, courses } from '@/lib/content';

const GATE_KEY = 'leathrock.admin.unlocked';
const PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || 'leathrock';
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item-' + Date.now();

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [pw, setPw] = useState('');
  const [tab, setTab] = useState<'events' | 'courses' | 'reviews'>('events');
  const [s, setS] = useState<Store>(EMPTY);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setOk(typeof window !== 'undefined' && window.sessionStorage.getItem(GATE_KEY) === '1');
    setS(read());
  }, []);

  const save = (next: Store) => { setS(next); write(next); flash('Saved to this browser.'); };
  const flash = (m: string) => { setMsg(m); window.setTimeout(() => setMsg(''), 2600); };

  // form state
  const [ev, setEv] = useState({ title: '', dateText: '', venue: '', status: 'upcoming', summary: '', link: '', linkLabel: '' });
  const [co, setCo] = useState({ title: '', subtitle: '', price: '', summary: '' });
  const [rv, setRv] = useState({ target: events[0]?.slug ?? '', name: '', quote: '' });

  if (!ok) {
    return (
      <section className="phead" style={{ minHeight: '70svh', display: 'grid', alignItems: 'center' }}>
        <div className="wrap" style={{ maxWidth: 440 }}>
          <span className="eyebrow">Admin</span>
          <h1 className="dsp h2">Locked.</h1>
          <p style={{ marginTop: 10, fontSize: 14.5 }}>
            Enter the passphrase to manage events, courses and reviews.
          </p>
          <form className="adm" onSubmit={(e) => {
            e.preventDefault();
            if (pw === PASS) { window.sessionStorage.setItem(GATE_KEY, '1'); setOk(true); }
            else flash('That passphrase is not right.');
          }}>
            <div className="fld">
              <label htmlFor="pw">Passphrase</label>
              <input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" />
            </div>
            <button className="btn solid" type="submit"><span className="fill" /><span>Unlock</span></button>
            {msg && <p style={{ color: '#FF7B7B', fontSize: 14 }}>{msg}</p>}
          </form>
          <p style={{ fontSize: 12.5, marginTop: 18, color: 'var(--faint)' }}>
            This is a soft gate for a static site, not real security. Set NEXT_PUBLIC_ADMIN_PASS in your
            environment to change it, and put the page behind Vercel password protection or a real
            auth provider before it holds anything sensitive.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="phead" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Admin</span></nav>
          <span className="eyebrow">Admin</span>
          <h1 className="dsp h1">Manage content</h1>
          <p className="lead" style={{ marginTop: 12 }}>
            Add events, courses and reviews. Changes show on the site in this browser straight away.
            Export the JSON and commit it to make them permanent for everyone.
          </p>
        </div>
      </section>

      <section className="band-sm">
        <div className="wrap">
          <div className="tabs" role="tablist" aria-label="Admin sections">
            {(['events', 'courses', 'reviews'] as const).map((t) => (
              <button key={t} className="tab" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>

          {msg && <p className="badge" style={{ marginBottom: 14 }}><Icon name="star" />{msg}</p>}

          {tab === 'events' && (
            <div className="pane">
              <h2 className="dsp h3" style={{ marginBottom: 14 }}>Add an event</h2>
              <form className="adm" onSubmit={(e) => {
                e.preventDefault();
                if (!ev.title.trim()) return flash('Give the event a title.');
                save({ ...s, events: [...s.events, { ...ev, slug: slugify(ev.title) }] });
                setEv({ title: '', dateText: '', venue: '', status: 'upcoming', summary: '', link: '', linkLabel: '' });
              }}>
                <div className="fld"><label htmlFor="et">Title</label>
                  <input id="et" value={ev.title} onChange={(e) => setEv({ ...ev, title: e.target.value })} placeholder="El-Preneur '27" /></div>
                <div className="row2">
                  <div className="fld"><label htmlFor="ed">Date</label>
                    <input id="ed" value={ev.dateText} onChange={(e) => setEv({ ...ev, dateText: e.target.value })} placeholder="12th \u2013 13th December" /></div>
                  <div className="fld"><label htmlFor="ev2">Venue</label>
                    <input id="ev2" value={ev.venue} onChange={(e) => setEv({ ...ev, venue: e.target.value })} placeholder="Overnight \u00b7 online" /></div>
                </div>
                <div className="fld"><label htmlFor="es">Status</label>
                  <select id="es" value={ev.status} onChange={(e) => setEv({ ...ev, status: e.target.value })}>
                    <option value="upcoming">Upcoming</option><option value="past">Past edition</option>
                  </select></div>
                <div className="fld"><label htmlFor="esum">Summary</label>
                  <textarea id="esum" value={ev.summary} onChange={(e) => setEv({ ...ev, summary: e.target.value })} /></div>
                <div className="row2">
                  <div className="fld"><label htmlFor="el">Link</label>
                    <input id="el" value={ev.link} onChange={(e) => setEv({ ...ev, link: e.target.value })} placeholder="https://chat.whatsapp.com/..." /></div>
                  <div className="fld"><label htmlFor="ell">Link label</label>
                    <input id="ell" value={ev.linkLabel} onChange={(e) => setEv({ ...ev, linkLabel: e.target.value })} placeholder="Join the group" /></div>
                </div>
                <button className="btn solid" type="submit"><span className="fill" /><span>Add event</span></button>
              </form>
              <div className="lst">
                {s.events.length === 0 && <div className="empty">No added events yet. The built-in ones live in content/site.json.</div>}
                {s.events.map((e: any, i: number) => (
                  <div className="lit" key={e.slug + i}>
                    <span><b>{e.title}</b><span>{[e.dateText, e.venue].filter(Boolean).join(' \u00b7 ') || 'Date to be announced'}</span></span>
                    <button className="del" onClick={() => save({ ...s, events: s.events.filter((_, j) => j !== i) })}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'courses' && (
            <div className="pane">
              <h2 className="dsp h3" style={{ marginBottom: 14 }}>Add a course</h2>
              <form className="adm" onSubmit={(e) => {
                e.preventDefault();
                if (!co.title.trim()) return flash('Give the course a title.');
                save({ ...s, courses: [...s.courses, { ...co, price: Number(co.price) || 0, slug: slugify(co.title) }] });
                setCo({ title: '', subtitle: '', price: '', summary: '' });
              }}>
                <div className="fld"><label htmlFor="ct">Title</label>
                  <input id="ct" value={co.title} onChange={(e) => setCo({ ...co, title: e.target.value })} /></div>
                <div className="row2">
                  <div className="fld"><label htmlFor="cs">Subtitle</label>
                    <input id="cs" value={co.subtitle} onChange={(e) => setCo({ ...co, subtitle: e.target.value })} /></div>
                  <div className="fld"><label htmlFor="cp">Price (NGN)</label>
                    <input id="cp" type="number" min="0" value={co.price} onChange={(e) => setCo({ ...co, price: e.target.value })} /></div>
                </div>
                <div className="fld"><label htmlFor="csum">Summary</label>
                  <textarea id="csum" value={co.summary} onChange={(e) => setCo({ ...co, summary: e.target.value })} /></div>
                <button className="btn solid" type="submit"><span className="fill" /><span>Add course</span></button>
              </form>
              <div className="lst">
                {s.courses.length === 0 && <div className="empty">No added courses yet. TLNAC and Women Leadership live in content/site.json.</div>}
                {s.courses.map((c: any, i: number) => (
                  <div className="lit" key={c.slug + i}>
                    <span><b>{c.title}</b><span>{c.subtitle}</span></span>
                    <button className="del" onClick={() => save({ ...s, courses: s.courses.filter((_, j) => j !== i) })}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="pane">
              <h2 className="dsp h3" style={{ marginBottom: 14 }}>Add a review</h2>
              <form className="adm" onSubmit={(e) => {
                e.preventDefault();
                if (!rv.quote.trim() || !rv.target) return flash('Pick an event and write the review.');
                const next = { ...s, reviews: { ...s.reviews, [rv.target]: [...(s.reviews[rv.target] ?? []), { name: rv.name || 'Attendee', quote: rv.quote }] } };
                save(next);
                setRv({ ...rv, name: '', quote: '' });
              }}>
                <div className="fld"><label htmlFor="rt">Event</label>
                  <select id="rt" value={rv.target} onChange={(e) => setRv({ ...rv, target: e.target.value })}>
                    {events.map((e) => <option key={e.slug} value={e.slug}>{e.title}</option>)}
                    {s.events.map((e: any) => <option key={e.slug} value={e.slug}>{e.title}</option>)}
                  </select></div>
                <div className="fld"><label htmlFor="rn">Name</label>
                  <input id="rn" value={rv.name} onChange={(e) => setRv({ ...rv, name: e.target.value })} placeholder="Eeritage" /></div>
                <div className="fld"><label htmlFor="rq">Review</label>
                  <textarea id="rq" value={rv.quote} onChange={(e) => setRv({ ...rv, quote: e.target.value })} /></div>
                <button className="btn solid" type="submit"><span className="fill" /><span>Add review</span></button>
              </form>
              <div className="lst">
                {Object.keys(s.reviews).length === 0 && <div className="empty">No reviews added yet.</div>}
                {Object.entries(s.reviews).map(([slug, list]) =>
                  list.map((r, i) => (
                    <div className="lit" key={slug + i}>
                      <span><b>{r.name}</b><span>{slug} &mdash; {r.quote.slice(0, 60)}{r.quote.length > 60 ? '\u2026' : ''}</span></span>
                      <button className="del" onClick={() => save({ ...s, reviews: { ...s.reviews, [slug]: list.filter((_, j) => j !== i) } })}>Remove</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="pane" style={{ marginTop: 16 }}>
            <h2 className="dsp h3" style={{ marginBottom: 8 }}>Make it permanent</h2>
            <p style={{ fontSize: 14.5 }}>
              Everything above is stored in this browser only. Export the file, then either commit it or
              merge it into <code>content/site.json</code> and redeploy so every visitor sees it.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <button className="btn solid" onClick={() => download(s)}><span className="fill" /><span>Export JSON</span></button>
              <button className="btn" onClick={() => { if (confirm('Clear everything added in this browser?')) { window.localStorage.removeItem(STORE_KEY); save(EMPTY); } }}>
                <span className="fill" /><span>Reset</span>
              </button>
              <Link className="btn" href="/branches/events"><span className="fill" /><span>View events page</span><Icon name="arw" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
