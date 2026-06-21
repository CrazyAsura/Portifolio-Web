import { ProjectRepository } from '../ports/projectRepository';
import { ContactRepository } from '../ports/contactRepository';
import { StaticProjectRepository } from '../adapters/staticProjectRepository';
import { StaticContactRepository } from '../adapters/staticContactRepository';

class RepositoryFactory {
  private static projectRepoInstance: ProjectRepository;
  private static contactRepoInstance: ContactRepository;

  public static getProjectRepository(): ProjectRepository {
    if (!this.projectRepoInstance) {
      this.projectRepoInstance = new StaticProjectRepository();
    }
    return this.projectRepoInstance;
  }

  public static getContactRepository(): ContactRepository {
    if (!this.contactRepoInstance) {
      this.contactRepoInstance = new StaticContactRepository();
    }
    return this.contactRepoInstance;
  }
}

export default RepositoryFactory;
