import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import 'devicon/devicon.min.css';
import { Providers } from '@/providers/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Dock from '@/components/layout/Dock';
import ScrollToTop from '@/components/effects/ScrollToTop';
import { locales, type Locale } from '@/i18n/messages';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return locale === 'en'
    ? {
        title: 'Leon Mendonça Trindade | Portfolio',
        description: 'Portfolio of Leon Mendonça Trindade — Software Engineer. Projects, technologies, and contact.',
        alternates: { languages: { 'pt-BR': '/pt', en: '/en' } },
      }
    : {
        title: 'Leon Mendonça Trindade | Portfólio',
        description: 'Portfólio de Leon Mendonça Trindade — Software Engineer. Projetos, tecnologias e contato.',
        alternates: { languages: { 'pt-BR': '/pt', en: '/en' } },
      };
}

const themeScript = `try{var p=localStorage.getItem('persist:portfolio-leon-v1');var m=p?JSON.parse(JSON.parse(p).theme).mode:'dark';m=m==='light'?'light':'dark';document.documentElement.classList.toggle('dark',m==='dark');document.documentElement.style.colorScheme=m}catch{};`;

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: value } = await params;
  if (!locales.includes(value as Locale)) notFound();
  const locale = value as Locale;

  return (
    <html lang={locale === 'pt' ? 'pt-BR' : 'en'} className="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground">
          {locale === 'pt' ? 'Pular para o conteúdo' : 'Skip to content'}
        </a>
        <Providers>
          <Header locale={locale} />
          <main id="conteudo">{children}</main>
          <Dock locale={locale} />
          <ScrollToTop locale={locale} />
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
