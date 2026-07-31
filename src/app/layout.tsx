import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NavigationProgressBar } from '@/components/layout/NavigationProgressBar';
import { getAllDocs } from '@/lib/docs';
import { generateWebsiteSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL('https://bunyanx.enterprise-ngfw.org'),
  title: {
    default: 'منصة BunyanX للأمن السيبراني — الجدار الناري المتقدم للمؤسسات',
    template: '%s | BunyanX Enterprise NGFW',
  },
  description: 'الموقع الرسمي للتوثيق الأكاديمي والتقني الشامل لمنصة BunyanX Enterprise NGFW. معمارية النظام، وحدات الذكاء الاصطناعي الـ 17، الأبحاث وااختبارات الأداء.',
  keywords: [
    'BunyanX', 'NGFW', 'Firewall', 'Cybersecurity', 'eBPF', 'XDP', 'IDS', 'IPS',
    'WAF', 'DLP', 'UEBA', 'ORACLE v3', 'DART', 'SSL Inspection', 'Proxy',
    'الأمن السيبراني', 'الجدار الناري', 'مشروع التخرج', 'كلية الهندسة'
  ],
  authors: [{ name: 'BunyanX Team' }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'BunyanX Enterprise NGFW — Academic Documentation Portal',
    description: 'Complete technical documentation portal for BunyanX Enterprise NGFW graduation project.',
    url: 'https://bunyanx.enterprise-ngfw.org',
    siteName: 'BunyanX Enterprise NGFW',
    images: [{ url: '/logo.png' }],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BunyanX Enterprise NGFW',
    description: 'Enterprise Cybersecurity Graduation Project Documentation Portal',
    images: ['/logo.png'],
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
