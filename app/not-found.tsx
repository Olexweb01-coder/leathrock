import Link from 'next/link';
import { Icon } from '@/components/Icons';

export default function NotFound() {
  return (
    <section className="phead" style={{ minHeight: '70svh', display: 'grid', alignItems: 'center' }}>
      <div className="wrap">
        <span className="eyebrow">404</span>
        <h1 className="dsp h1">That page isn&rsquo;t part of this world.</h1>
        <p className="lead" style={{ marginTop: 14 }}>The link may be old, or the page may have moved.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
          <Link className="btn solid" href="/"><span className="fill" /><span>Back home</span><Icon name="arw" /></Link>
          <Link className="btn" href="/branches"><span className="fill" /><span>See the branches</span></Link>
        </div>
      </div>
    </section>
  );
}
