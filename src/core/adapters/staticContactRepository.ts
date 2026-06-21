import { Contact } from '../domain/types';
import { ContactRepository } from '../ports/contactRepository';

export class StaticContactRepository implements ContactRepository {
  private contacts: Contact[] = [
    {
      id: '1',
      platform: 'E-mail',
      value: 'leoncdzt@gmail.com',
      href: 'mailto:leoncdzt@gmail.com',
      iconName: 'Mail',
      category: 'primary'
    },
    {
      id: '2',
      platform: 'WhatsApp',
      value: '+55 (79) 99957-6753',
      href: 'https://wa.me/5579999576753',
      iconName: 'Phone',
      category: 'primary'
    },
    {
      id: '3',
      platform: 'LinkedIn',
      value: 'Leon Mendonça',
      href: 'https://www.linkedin.com/in/leonmendoncatrindade/',
      iconName: 'Linkedin',
      category: 'social'
    },
    {
      id: '4',
      platform: 'GitHub',
      value: '@CrazyAsura',
      href: 'https://github.com/CrazyAsura',
      iconName: 'Github',
      category: 'social'
    }
  ];

  async getContacts(): Promise<Contact[]> {
    return this.contacts;
  }
}
