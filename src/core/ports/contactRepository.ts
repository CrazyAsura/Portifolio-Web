import { Contact } from '../domain/types';

export interface ContactRepository {
  getContacts(): Promise<Contact[]>;
}
