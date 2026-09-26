import { notFound } from 'next/navigation';
import RepositoryFactory from '@/core/factories/repositoryFactory';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { locales, type Locale } from '@/i18n/messages';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!locales.includes(value as Locale)) notFound();
  const locale = value as Locale;
  const [projects, contacts] = await Promise.all([
    RepositoryFactory.getProjectRepository().getProjects(),
    RepositoryFactory.getContactRepository().getContacts(),
  ]);

  return <>
    <HeroSection locale={locale} />
    <ProjectsSection projects={projects} locale={locale} />
    <AboutSection locale={locale} />
    <ContactSection contacts={contacts} locale={locale} />
  </>;
}
