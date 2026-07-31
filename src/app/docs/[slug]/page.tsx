import React from 'react';
import { notFound } from 'next/navigation';
import { getAllDocs, getDocBySlug } from '@/lib/docs';
import { generateDocSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { Sidebar } from '@/components/docs/Sidebar';
import { TableOfContents } from '@/components/docs/TableOfContents';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { ReadingProgress } from '@/components/docs/ReadingProgress';
import { PDFExportButton } from '@/components/docs/PDFExportButton';
import { PageFeedback } from '@/components/docs/PageFeedback';
import { PrevNextNav } from '@/components/docs/PrevNextNav';
import { Callout } from '@/components/docs/Callout';
import { Clock, FileText, Calendar, Sparkles, Tag } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) return {};

  return {
    title: `${doc.titleAr} | BunyanX Enterprise NGFW`,
    description: doc.summaryAr,
    keywords: doc.keywords,
    openGraph: {
      title: doc.titleAr,
      description: doc.summaryAr,
      type: 'article',
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  if (!doc) notFound();

  const allDocs = await getAllDocs();
  const currentIndex = allDocs.findIndex((d) => d.slug === doc.slug);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  const docSchema = generateDocSchema(doc, 'ar');
  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'الرئيسية', url: '/' },
    { name: 'التوثيق الأكاديمي', url: '/docs' },
    { name: doc.titleAr, url: `/docs/${doc.slug}` },
  ]);

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(docSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Breadcrumbs
          items={[
            { label: 'التوثيق الأكاديمي', href: '/docs' },
            { label: doc.titleAr },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar Index */}
          <Sidebar docs={allDocs} />

          {/* Main Article Content Container */}
          <article className="flex-1 w-full min-w-0 glass-panel p-6 sm:p-10 space-y-8">
            {/* Header Title Section */}
            <div className="space-y-4 pb-6 border-b border-dark-border">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="cyber-badge">{doc.categoryAr}</span>
                <PDFExportButton docTitle={doc.titleAr} />
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
                {doc.titleAr}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  {doc.readingTime} دقائق قراءة
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  {doc.wordCount} كلمة
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  آخر تحديث: {doc.lastUpdated}
                </span>
              </div>
            </div>

            {/* AI Automated Summary Box */}
            <Callout type="info" title="الملخص الأوتوماتيكي للتوثيق الأكاديمي (AI Generated Summary)">
              <p className="leading-relaxed">{doc.summaryAr}</p>
            </Callout>

            {/* Extracted Keywords Badges */}
            {doc.keywords.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap text-xs pt-2">
                <Tag className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-300">الكلمات المفتاحية:</span>
                {doc.keywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-dark-bg border border-dark-border text-slate-300 text-[11px]">
                    {kw}
                  </span>
                ))}
              </div>
            )}

            {/* Rendered HTML Content */}
            <div
              className="prose prose-invert prose-cyan max-w-none text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: doc.htmlContent }}
            />

            {/* Page Feedback Widget */}
            <PageFeedback />

            {/* Navigation Previous / Next */}
            <PrevNextNav prevDoc={prevDoc} nextDoc={nextDoc} />
          </article>

          {/* Right Table of Contents */}
          <TableOfContents headings={doc.headings} />
        </div>
      </div>
    </>
  );
}
