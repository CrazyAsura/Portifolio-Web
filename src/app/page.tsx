'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import RepositoryFactory from '@/core/factories/repositoryFactory';
import { Project, Contact } from '@/core/domain/types';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { useMounted } from '@/hooks/useMounted';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const mounted = useMounted();

  useEffect(() => {
    const fetchData = async () => {
      const projectRepo = RepositoryFactory.getProjectRepository();
      const contactRepo = RepositoryFactory.getContactRepository();

      const [loadedProjects, loadedContacts] = await Promise.all([
        projectRepo.getProjects(),
        contactRepo.getContacts(),
      ]);

      setProjects(loadedProjects);
      setContacts(loadedContacts);
    };

    fetchData();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }} />;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', overflow: 'hidden' }}>
      
      {/* HERO SECTION */}
      <HeroSection 
        onContactClick={() => scrollToSection('contatos')}
        onProjectsClick={() => scrollToSection('projetos')}
      />

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* PROJECTS SECTION */}
      <ProjectsSection projects={projects} />

      {/* CONTACT SECTION */}
      <ContactSection contacts={contacts} />

    </Box>
  );
}
