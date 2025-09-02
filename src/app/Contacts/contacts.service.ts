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
    console.log("In service");
    console.log(this.contacts);
    return this.contacts;
  }
}
