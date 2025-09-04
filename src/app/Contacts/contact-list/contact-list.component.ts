import { Component } from '@angular/core';
import { ContactInterface } from '../contact.interface';
import { CONTACTS } from '../mock-contacts';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

 
  contacts: ContactInterface[] = CONTACTS;
}
