import { Injectable } from '@angular/core';
import { ContactInterface } from './contact.interface';
import { CONTACTS } from './mock-contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts!:ContactInterface[];

  constructor() { 
    this.contacts = CONTACTS; 
  }
  
  getContacts(){
    return this.contacts;
  }

  getContactById(id: string) {
    const findContact = CONTACTS.find(contact => {
      return contact._id === id;
    })
    return findContact;
  }
}
