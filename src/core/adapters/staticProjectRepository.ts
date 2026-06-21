import { Project } from '../domain/types';
import { ProjectRepository } from '../ports/projectRepository';

export class StaticProjectRepository implements ProjectRepository {
  private projects: Project[] = [
    {
      id: '1',
      title: '+Contábil',
      category: 'Fintech & Accounting',
      description: 'Solução inteligente que une tecnologia e expertise humana para transformar a gestão financeira empresarial e pessoal.',
      image: '/+contabil-image.jpeg',
      link: 'https://contabil-six.vercel.app/',
      tags: ['Next.js', 'React', 'Material UI', 'PostgreSQL'],
      objectPosition: 'center'
    },
    {
      id: '2',
      title: 'Nestfy',
      category: 'E-commerce Platform',
      description: 'Uma experiência de e-commerce de luxo construída com Next.js e design minimalista, oferecendo navegação fluida e integração de checkout.',
      image: '/nestfy-image.jpeg',
      link: 'https://nestfy-1.vercel.app/',
      tags: ['Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion'],
      objectPosition: 'center'
    },
    {
      id: '3',
      title: 'Matheus Portfolio',
      category: 'Personal Brand',
      description: 'Desenvolvimento de identidade digital e portfólio profissional para psicólogo clínico, focado em agendamentos e apresentação de serviços.',
      image: '/matheus-portifolio-image.jpeg',
      link: 'https://portif-lio-matheus.vercel.app/',
      tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Responsive'],
      objectPosition: 'top'
    }
  ];

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.projects; // Todos são destaques por enquanto
  }
}
