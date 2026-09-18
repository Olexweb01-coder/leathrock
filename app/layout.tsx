import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Fx from '@/components/Fx';
import { IconSprite } from '@/components/Icons';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Leathrock \u2014 Depth Over Noise', template: '%s \u2014 Leathrock' },
  description: site.bio,
  openGraph: {
    type: 'website', siteName: 'Leathrock', url: site.url,
    title: 'Leathrock \u2014 Depth Over Noise', description: site.bio,
    images: ['/img/og.jpg'],
  },
  twitter: { card: 'summary_large_image', title: 'Leathrock \u2014 Depth Over Noise', description: site.bio, images: ['/img/og.jpg'] },
  icons: { icon: '/img/mark.webp' },
  alternates: { canonical: '/' },
};

const JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Person', '@id': site.url + '/#person', name: site.person, alternateName: 'Leathrock',
      email: site.email, telephone: site.phoneRaw, description: site.bio, url: site.url },
    { '@type': 'Organization', '@id': site.url + '/#org', name: 'Leathrock', url: site.url,
      slogan: site.tagline, founder: { '@id': site.url + '/#person' },
      contactPoint: [{ '@type': 'ContactPoint', telephone: site.phoneRaw, email: site.email, contactType: 'customer support' }] },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet" />        <meta name="theme-color" content="#120904" />
        <link rel="preload" as="image" href="/img/figure.webp" fetchPriority="high" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <span className="grain" aria-hidden="true" />
        <IconSprite />
        <Fx />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
