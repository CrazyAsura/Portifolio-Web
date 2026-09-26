export type Locale = 'pt' | 'en';

export const locales: Locale[] = ['pt', 'en'];

export const messages = {
  pt: {
    nav: { label: 'Navegação principal', projects: 'Projetos', about: 'Sobre', contact: 'Contato', switchTo: 'Switch to English' },
    dock: { label: 'Atalhos e aparência', home: 'Início', projects: 'Projetos', about: 'Sobre', contact: 'Contatos', light: 'Ativar tema claro', dark: 'Ativar tema escuro' },
    hero: {
      role: 'Desenvolvedor Software Engineer', intro: <>Do primeiro detalhe da interface<br /> à estrutura que faz tudo funcionar.</>,
      explore: 'Explorar projetos', talk: 'Vamos conversar', motto: 'CÓDIGO COM INTENÇÃO. DESIGN COM CLAREZA.',
      portrait: 'Retrato de Leon Mendonça Trindade', caption: 'ENTRE LÓGICA E CRIATIVIDADE', nextStep: 'Construindo o próximo passo.', portfolio: 'PORTFÓLIO / 01',
      continue: 'Continue explorando', modalSubtitle: 'Desenvolvedor Software Engineer',
      availability: 'Disponível para novos projetos', status: 'Status e disponibilidade', systems: 'Software Engineer & Systems', principles: 'Clean Arch · TDD',
    },
    projects: {
      eyebrow: 'Trabalhos selecionados', heading: <>Ideias que viraram<br /><span className="serif-accent">experiência.</span></>,
      description: <>Produtos, interfaces e sistemas.<br />Uma seleção do que venho construindo.</>,
      visit: (title: string) => `Visitar ${title} (abre em nova aba)`, zoom: (title: string) => `Ampliar imagem de ${title}`,
      imageAlt: (title: string) => `Interface do projeto ${title}`,
      details: {
        '1': 'Solução inteligente que une tecnologia e expertise humana para transformar a gestão financeira empresarial e pessoal.',
        '2': 'Uma experiência de e-commerce de luxo construída com Next.js e design minimalista, oferecendo navegação fluida e integração de checkout.',
        '3': 'Desenvolvimento de identidade digital e portfólio profissional para psicólogo clínico, focado em agendamentos e apresentação de serviços.',
      },
    },
    about: {
      eyebrow: 'Sobre mim', headingA: 'Atenção ao detalhe.', headingB: 'Visão do todo.',
      paragraphs: [
        'Sou Leon, Software Engineer. Trabalho da interface à modelagem de dados, unindo raciocínio lógico e design de sistemas.',
        'Meu foco está em sistemas escaláveis, respostas rápidas e interfaces que funcionam bem em qualquer tela. Gosto de entender o problema inteiro antes de escrever a primeira linha.',
      ],
      stats: ['Estudo intensivo', 'Projetos criados', 'Inglês avançado'], education: 'Formação / Senac',
      educationDetail: <>Informática Básica · Lógica de Programação<br />Programador Web · Programador Full Stack</>,
      categories: ['Frontend & Mobile', 'Backend & Integrações', 'Bancos de dados', 'Design & Diagramas'],
    },
    contact: {
      eyebrow: 'Próxima conversa', headingA: 'Tem algo', headingB: 'em mente?',
      description: 'Um projeto, uma oportunidade ou uma boa ideia. Vamos conversar sobre o próximo passo.',
    },
    footer: { backToTop: 'DE VOLTA AO TOPO', top: 'Voltar para o topo da página' },
    imageModal: { dialog: 'Visualização ampliada da imagem', close: 'Fechar visualização ampliada', zoomIn: 'Ampliar imagem', zoomOut: 'Reduzir imagem', escape: 'ESC PARA FECHAR' },
  },
  en: {
    nav: { label: 'Main navigation', projects: 'Projects', about: 'About', contact: 'Contact', switchTo: 'Mudar para Português' },
    dock: { label: 'Shortcuts and appearance', home: 'Home', projects: 'Projects', about: 'About', contact: 'Contact', light: 'Switch to light theme', dark: 'Switch to dark theme' },
    hero: {
      role: 'Software Engineer', intro: <>From the smallest interface detail<br /> to the structure that makes it work.</>,
      explore: 'Explore projects', talk: "Let's talk", motto: 'CODE WITH INTENT. DESIGN WITH CLARITY.',
      portrait: 'Portrait of Leon Mendonça Trindade', caption: 'BETWEEN LOGIC AND CREATIVITY', nextStep: 'Building what comes next.', portfolio: 'PORTFOLIO / 01',
      continue: 'Keep exploring', modalSubtitle: 'Software Engineer',
      availability: 'Available for new projects', status: 'Availability and status', systems: 'Software Engineer & Systems', principles: 'Clean Arch · TDD',
    },
    projects: {
      eyebrow: 'Selected work', heading: <>Ideas turned into<br /><span className="serif-accent">experiences.</span></>,
      description: <>Products, interfaces, and systems.<br />A selection of what I have been building.</>,
      visit: (title: string) => `Visit ${title} (opens in a new tab)`, zoom: (title: string) => `Enlarge image of ${title}`,
      imageAlt: (title: string) => `Interface for the ${title} project`,
      details: {
        '1': 'A smart solution combining technology and human expertise to transform business and personal financial management.',
        '2': 'A luxury e-commerce experience built with Next.js and minimalist design, with smooth navigation and checkout integration.',
        '3': 'Digital identity and professional portfolio for a clinical psychologist, focused on appointments and service presentation.',
      },
    },
    about: {
      eyebrow: 'About me', headingA: 'Attention to detail.', headingB: 'The bigger picture.',
      paragraphs: [
        "I'm Leon, a Software Engineer. I work across interfaces and data modeling, bringing logical thinking together with system design.",
        'I focus on scalable systems, fast responses, and interfaces that work on every screen. I like to understand the whole problem before writing the first line.',
      ],
      stats: ['Focused study', 'Projects built', 'Advanced English'], education: 'Education / Senac',
      educationDetail: <>Computer Fundamentals · Programming Logic<br />Web Developer · Full Stack Developer</>,
      categories: ['Frontend & Mobile', 'Backend & Integrations', 'Databases', 'Design & Diagrams'],
    },
    contact: {
      eyebrow: 'Start a conversation', headingA: 'Have something', headingB: 'in mind?',
      description: "A project, an opportunity, or a good idea. Let's talk about the next step.",
    },
    footer: { backToTop: 'BACK TO TOP', top: 'Back to the top of the page' },
    imageModal: { dialog: 'Enlarged image view', close: 'Close enlarged view', zoomIn: 'Zoom in', zoomOut: 'Zoom out', escape: 'ESC TO CLOSE' },
  },
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
