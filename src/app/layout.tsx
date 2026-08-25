import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NavigationProgressBar } from '@/components/layout/NavigationProgressBar';
import { getAllDocs } from '@/lib/docs';
import { generateWebsiteSchema } from '@/lib/seo';

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://bunyanx-doc.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: 'BUNYANX | Cybersecurity Graduation Project',
    template: '%s | BUNYANX ',
  },
  description: 'نظام استجابة ذكي للهجمات السيبرانية يجمع بين تحليل التهديدات، كشف الهجمات، الاستجابة الأمنية، حماية الشبكات، وفحص حركة البيانات ضمن بنية دفاعية متعددة الطبقات — مشروع التخرج الأكاديمي BUNYANX 2026.',

  keywords: [
    'BUNYANX',
    'Intelligent Response System to Cyberattacks',
    'Cyberattack Response',
    'Cybersecurity',
    'Threat Detection',
    'Threat Analysis',
    'Intelligent Security',
    'AI Cybersecurity',
    'NGFW',
    'Next Generation Firewall',
    'eBPF',
    'XDP',
    'PHANTOM',
    'IDS',
    'IPS',
    'WAF',
    'DLP',
    'UEBA',
    'AEGIS v3',
    'DART',
    'SSL Inspection',
    'MemoryBIO',
    'Active Directory',
    'LDAP',
    'مشروع تخرج',
    'نظام استجابة ذكي للهجمات السيبرانية',
    'أمن سيبراني'
  ],
  authors: [{ name: 'فريق مشروع BunyanX' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'BUNYANX — نظام الاستجابة الذكي للهجمات السيبرانية',

    description: 'البوابة الرسمية للتوثيق الأكاديمي والتقني لمشروع BUNYANX — نظام الاستجابة الذكي للهجمات السيبرانية. تستعرض المنظومة معمارية النظام، مكوناته الأمنية، محركات الذكاء الاصطناعي، الأبحاث العلمية، والاختبارات والتقييمات المعملية.',

    url: SITE_ORIGIN,

    siteName: 'BUNYANX — نظام الاستجابة الذكي للهجمات السيبرانية',
    images: [
      {
        url: `${SITE_ORIGIN}/logo.png`,
        width: 512,
        height: 512,
        alt: 'شعار منظومة BUNYANX Intelligent Response System to Cyberattacks',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'منظومة BunyanX للأمن السيبراني — BUNYANX Intelligent Response System to Cyberattacks',
    description: 'بوابة التوثيق الأكاديمي والتقني الشاملة لمشروع تخرج منظومة BUNYANXIntelligent Response System to Cyberattacks.',
    images: [`${SITE_ORIGIN}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = await getAllDocs();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta property="og:image" content={`${SITE_ORIGIN}/logo.png`} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta name="twitter:image" content={`${SITE_ORIGIN}/logo.png`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-cyan-500 selection:text-black">
        <LanguageProvider>
          <ThemeProvider>
            <NavigationProgressBar />
            <Header docs={docs} />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
