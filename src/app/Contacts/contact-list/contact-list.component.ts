import { Component } from '@angular/core';
import { ContactInterface } from '../contact.interface';
import { CONTACTS } from '../mock-contacts';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  

  constructor(private contactService:ContactsService){}

  contacts!:ContactInterface[]

  ngOnInit(){
    this.contacts = this.getContact();
    console.log("In comp");
  }

  getContact() : ContactInterface[]{
    return this.contactService.getContacts();
  }

}
