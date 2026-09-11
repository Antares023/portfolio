import type { Metadata } from 'next';
import '../index.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata: Metadata = {
  title: 'Muhammad Ilham Ramdhani | Web & Embedded Systems Engineer',
  description: 'Muhammad Ilham Ramdhani adalah seorang Web & Embedded Systems Engineer dari Universitas Muhammadiyah Cirebon (UMC). Portofolio proyek Web, IoT, dan Machine Learning.',
  keywords: 'Muhammad Ilham Ramdhani, Web Developer, Embedded Systems, IoT Systems Engineer, React, Arduino, Machine Learning, Portfolio',
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
