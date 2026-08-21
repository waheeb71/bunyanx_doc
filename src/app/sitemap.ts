import { MetadataRoute } from 'next';
import { getAllDocs } from '@/lib/docs';
import { SITE_URL } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getAllDocs();

  const staticRoutes = [
    '',
    '/about',
    '/architecture',
    '/modules',
    '/demo',
    '/testing',
    '/docs',
    '/team',
    '/downloads',
    '/contact',
    '/faq',
    '/updates',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const docRoutes = docs.map((doc) => ({
    url: `${SITE_URL}/docs/${doc.slug}`,
    lastModified: doc.lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...docRoutes];
}
