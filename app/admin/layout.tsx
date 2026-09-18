import type { Metadata } from 'next';

/**
 * The admin area is reachable only by typing the URL directly: yourdomain.com/admin
 * It is linked from nowhere on the site, and this tells crawlers to keep it out of
 * search results entirely. It is deliberately NOT listed in robots.txt, because that
 * file is public and would advertise the path.
 */
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, nocache: true,
    googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
