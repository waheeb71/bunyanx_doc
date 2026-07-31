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
    default: 'منصة BunyanX للأمن السيبراني — الجدار الناري المتقدم للمؤسسات',
    template: '%s | BunyanX Enterprise NGFW',
  },
  description: 'بوابة التوثيق الأكاديمي والتقني الشاملة لمشروع تخرج منصة BunyanX Enterprise NGFW. يضم المعمارية الهندسية، وحدات الذكاء الاصطناعي الـ 17، والأبحاث واختبارات الأداء.',
  keywords: [
    'BunyanX', 'NGFW', 'Firewall', 'Cybersecurity', 'eBPF', 'XDP', 'IDS', 'IPS',
    'WAF', 'DLP', 'UEBA', 'ORACLE v3', 'DART', 'SSL Inspection', 'Proxy',
    'الأمن السيبراني', 'الجدار الناري', 'مشروع التخرج', 'كلية الهندسة'
  ],
  authors: [{ name: 'فريق مشروع BunyanX' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'منصة BunyanX للأمن السيبراني — الجدار الناري المتقدم للمؤسسات',
    description: 'بوابة التوثيق الأكاديمي والتقني الشاملة لمشروع تخرج منصة BunyanX Enterprise NGFW. معمارية النظام، وحدات الذكاء الاصطناعي الـ 17، الأبحاث واختبارات الأداء.',
    url: SITE_ORIGIN,
    siteName: 'منصة BunyanX للأمن السيبراني',
    images: [
      {
        url: `${SITE_ORIGIN}/logo.png`,
        width: 512,
        height: 512,
        alt: 'شعار منصة BunyanX Enterprise NGFW',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'منصة BunyanX للأمن السيبراني — BunyanX Enterprise NGFW',
    description: 'بوابة التوثيق الأكاديمي والتقني الشاملة لمشروع تخرج منصة BunyanX Enterprise NGFW.',
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
