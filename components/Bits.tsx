import Link from 'next/link';
import { Icon } from './Icons';

export function PageHead({ eyebrow, title, lead, crumbs, tint }: {
  eyebrow?: string; title: string; lead?: string;
  crumbs?: [string, string][]; tint?: string;
}) {
  return (
    <section className="phead" style={tint ? ({ ['--ph' as string]: tint }) : undefined}>
      <div className="wrap">
        {crumbs && (
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map(([t, h]) => (
              <span key={h + t} style={{ display: 'contents' }}>
                <span aria-hidden="true">/</span>
                {h ? <Link href={h}>{t}</Link> : <span aria-current="page">{t}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="dsp h1">{title}</h1>
        {lead && <p className="lead" style={{ marginTop: 16 }}>{lead}</p>}
      </div>
    </section>
  );
}

export function WaButton({ href, label, sub, solid }: { href: string; label: string; sub?: string; solid?: boolean }) {
  return (
    <a className={'btn ' + (solid ? 'wa' : '')} href={href} target="_blank" rel="noopener noreferrer">
      <span className="fill" /><Icon name="wa" /><span>{label}</span>{sub && <span className="sr">{sub}</span>}
    </a>
  );
}

export function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="head">
      <div>
        <span className="rule" aria-hidden="true" style={{ display: 'block', maxWidth: 120 }} />
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="dsp h2">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Card({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="card">
      <Icon name={icon} />
      <h4 className="dsp h4">{title}</h4>
      <p>{text}</p>
    </div>
  );
}
