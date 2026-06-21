import { Project } from '../domain/types';

export interface ProjectRepository {
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
}
