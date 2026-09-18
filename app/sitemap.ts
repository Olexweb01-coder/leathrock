import type { MetadataRoute } from 'next';
import { site, branches, courses } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    '/', '/about', '/branches', '/courses', '/voices', '/contact',
    ...branches.map((b) => `/branches/${b.slug}`),
    ...courses.map((c) => `/courses/${c.slug}`),
  ];
  return paths.map((p) => ({
    url: site.url + p,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '/' ? 1 : 0.7,
  }));
}
