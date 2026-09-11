import type { Metadata } from 'next';
import '../index.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.emham.my.id'),
  title: {
    default: 'Muhammad Ilham Ramdhani | Web & Embedded Systems Engineer',
    template: '%s | Muhammad Ilham Ramdhani',
  },
  description: 'Muhammad Ilham Ramdhani adalah seorang Web & Embedded Systems Engineer dari Universitas Muhammadiyah Cirebon (UMC). Portofolio proyek Web PWA, IoT Systems, dan Machine Learning.',
  keywords: [
    'Muhammad Ilham Ramdhani',
    'Antares023',
    'Web Developer',
    'Embedded Systems Engineer',
    'IoT Developer',
    'React',
    'Next.js',
    'Arduino',
    'ESP32',
    'Machine Learning',
    'Portfolio',
    'Universitas Muhammadiyah Cirebon',
  ],
  authors: [{ name: 'Muhammad Ilham Ramdhani', url: 'https://www.emham.my.id' }],
  creator: 'Muhammad Ilham Ramdhani',
  alternates: {
    canonical: 'https://www.emham.my.id',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/avatar.png', type: 'image/png' },
    ],
    shortcut: '/avatar.png',
    apple: '/avatar.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    url: 'https://www.emham.my.id',
    siteName: 'Muhammad Ilham Ramdhani Portfolio',
    title: 'Muhammad Ilham Ramdhani | Web & Embedded Systems Engineer',
    description: 'Muhammad Ilham Ramdhani, seorang Web & Embedded Systems Engineer dari Universitas Muhammadiyah Cirebon (UMC). Menampilkan proyek Web modern, arsitektur IoT cerdas, dan AI/ML.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Ilham Ramdhani - Web & Embedded Systems Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Ilham Ramdhani | Web & Embedded Systems Engineer',
    description: 'Portofolio resmi Muhammad Ilham Ramdhani — Insinyur Web & Embedded Systems.',
    images: ['/og-image.png'],
    creator: '@Antares023',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gh-canvas text-gh-text antialiased">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-gh-canvas w-full transition-colors duration-300">
            <Navbar />
            <main className="flex-grow overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
