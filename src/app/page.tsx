import RepositoryFactory from '@/core/factories/repositoryFactory';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

export default async function Home() {
  const [projects, contacts] = await Promise.all([
    RepositoryFactory.getProjectRepository().getProjects(),
    RepositoryFactory.getContactRepository().getContacts(),
  ]);
  return <><HeroSection /><ProjectsSection projects={projects} /><AboutSection /><ContactSection contacts={contacts} /></>;
}
