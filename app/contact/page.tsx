import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';
import { PageHead } from '@/components/Bits';
import { site, wa } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach Leathrock on WhatsApp, by phone or by email.',
  alternates: { canonical: '/contact' },
};

const NEEDS: [string, string, string][] = [
  ['Join LeathCity', 'Access fee, Cores and how to start your rate lock', "I'd like to join LeathCity. Please send me the current access fee and how to start my rate lock."],
  ['Join Leathroom', 'The free channel and the next subscription window', "I'd like to join Leathroom. Please send me the free channel and the next subscription window."],
  ['Buy TLNAC', 'The Lead Nurturing Audio Course \u2014 \u20a630,000', "I want to buy TLNAC \u2014 The Lead Nurturing Audio Course (\u20a630,000). Please send me the payment details."],
  ['Buy Women Leadership Training', '\u20a610,000', "I want to buy the Women Leadership Training (\u20a610,000). Please send me the payment details."],
  ['Attend an event', 'El-Preneur and the Leathrock gatherings', "I'd like to attend the next Leathrock event. Please let me know when the next edition is."],
  ['Speaking or collaboration', 'Invite Leathrock to host, speak or partner', "I'd like to discuss a speaking or collaboration opportunity with Leathrock."],
  ['Something else', 'General enquiry', 'I have a question about Leathrock.'],
];

export default function Contact() {
  return (
    <>
      <PageHead eyebrow="Contact" title="Start the conversation."
        lead="WhatsApp is fastest. Every button below opens a message that already says what you need and where you came from."
        crumbs={[['Contact', '']]} />
      <section className="band-sm">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.35fr) minmax(0,.85fr)', gap: 'clamp(24px,4vw,52px)', alignItems: 'start' }}>
          <div>
            <h2 className="dsp h3" style={{ marginBottom: 14 }}>What do you need?</h2>
            <div className="waopts">
              {NEEDS.map(([t, d, msg]) => (
                <a className="waopt" key={t} href={wa(msg, t)} target="_blank" rel="noopener noreferrer">
                  <Icon name="wa" />
                  <span><b>{t}</b><span>{d}</span></span>
                  <Icon name="arw" className="ico" />
                </a>
              ))}
            </div>
            <p style={{ fontSize: 13.5, marginTop: 14 }}>
              Each link opens WhatsApp with the message already written, so Leathrock knows exactly which page you came from.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <h2 className="dsp h3" style={{ marginBottom: 4 }}>Direct</h2>
            <a className="ctcard" style={{ ['--cc' as string]: '#25D366' }}
               href={wa('I have a question about Leathrock.')} target="_blank" rel="noopener noreferrer">
              <Icon name="wa" />
              <span><b>WhatsApp</b><span>{site.phone}</span></span>
            </a>
            <a className="ctcard" href={`tel:${site.phoneRaw}`}>
              <Icon name="phone" />
              <span><b>Call</b><span>{site.phone}</span></span>
            </a>
            <a className="ctcard" href={`mailto:${site.email}?subject=${encodeURIComponent('Enquiry from the Leathrock website')}&body=${encodeURIComponent("Hi Leathrock,\n\nI'm coming from your website.\n\n")}`}>
              <Icon name="mail" />
              <span><b>Email</b><span>{site.email}</span></span>
            </a>
            <div className="pane" style={{ marginTop: 6 }}>
              <span className="tag">Also</span>
              <p style={{ fontSize: 14, marginTop: 8, marginBottom: 10 }}>The El-Preneur group is where event dates are announced first.</p>
              <a className="btn sm" href={site.elpreneurGroup} target="_blank" rel="noopener noreferrer">
                <span className="fill" /><span>Join the group</span><Icon name="arw" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
