import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Dock from '@/components/layout/Dock';
import ScrollToTop from '@/components/effects/ScrollToTop';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Leon Mendonça Trindade | Portfólio',
  description: 'Portfólio de Leon Mendonça Trindade — Desenvolvedor Full Stack. Projetos, tecnologias e contato.',
};

const themeScript = `try{var p=localStorage.getItem('persist:portfolio-leon-v1');var m=p?JSON.parse(JSON.parse(p).theme).mode:'dark';m=m==='light'?'light':'dark';document.documentElement.classList.toggle('dark',m==='dark');document.documentElement.style.colorScheme=m}catch{};`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground">Pular para o conteúdo</a>
        <Providers>
          <Header />
          <main id="conteudo">{children}</main>
          <Dock />
          <ScrollToTop />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
