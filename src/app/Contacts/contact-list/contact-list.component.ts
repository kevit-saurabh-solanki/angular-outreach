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

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    const workspaceId = localStorage.getItem('workspaceId');
    if(!workspaceId) return;

    this.contactService.getContactsByWorkspaceId(workspaceId).subscribe({
      next: (response) => {
        console.log('Contacts fetched');
        this.contacts = response as ContactInterface[];
        return response;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

}
