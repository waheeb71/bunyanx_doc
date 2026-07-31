import { DocItem } from './docs';

export const SITE_URL = 'https://bunyanx.enterprise-ngfw.org';

export function generateDocSchema(doc: DocItem, lang: 'ar' | 'en') {
  const isAr = lang === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/docs/${doc.slug}`,
    },
    'headline': isAr ? doc.titleAr : doc.titleEn,
    'description': isAr ? doc.summaryAr : doc.summaryEn,
    'articleSection': isAr ? doc.categoryAr : doc.categoryEn,
    'inLanguage': [lang],
    'wordCount': doc.wordCount,
    'dateModified': doc.lastUpdated,
    'author': {
      '@type': 'Organization',
      'name': 'BunyanX Cybersecurity Engineering Team',
      'url': SITE_URL,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'BunyanX Enterprise NGFW',
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_URL}/logo.png`,
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'BunyanX Enterprise NGFW Documentation Portal',
    'url': SITE_URL,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
