import { Component } from '@angular/core';
import { ContactInterface } from '../contact.interface';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  contacts!: ContactInterface[];
  
  constructor(private contactService: ContactsService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContactByUserId().subscribe({
      next: (response) => {
        console.log('Contacts fetched');
        console.log(response);
        this.contacts = response as ContactInterface[];
        return response;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
