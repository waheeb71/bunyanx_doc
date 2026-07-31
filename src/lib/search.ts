import Fuse from 'fuse.js';
import { DocItem } from './docs';

export interface SearchResult {
  doc: DocItem;
  matches: {
    key: string;
    value: string;
  }[];
  score?: number;
}

export function createSearchIndex(docs: DocItem[]) {
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.35,
    ignoreLocation: true,
    keys: [
      { name: 'titleAr', weight: 0.9 },
      { name: 'titleEn', weight: 0.9 },
      { name: 'keywords', weight: 0.8 },
      { name: 'summaryAr', weight: 0.6 },
      { name: 'summaryEn', weight: 0.6 },
      { name: 'content', weight: 0.4 },
    ],
  };

  return new Fuse(docs, options);
}

export function searchDocs(docs: DocItem[], query: string): SearchResult[] {
  if (!query.trim()) return [];

  const fuse = createSearchIndex(docs);
  const results = fuse.search(query);

  return results.slice(0, 15).map((res) => ({
    doc: res.item,
    matches: (res.matches || []).map((m) => ({
      key: m.key || '',
      value: m.value || '',
    })),
    score: res.score,
  }));
}
