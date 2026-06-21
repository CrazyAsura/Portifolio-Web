export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  objectPosition?: string;
}

export interface Contact {
  id: string;
  platform: string;
  value: string;
  href: string;
  iconName: string;
  category: string;
}

export interface TechSkill {
  name: string;
  category: 'frontend' | 'backend' | 'state' | 'tools' | 'database';
}
