import { Component } from '@angular/core';
import { ContactInterface } from '../contact.interface';
import { ContactsService } from '../contacts.service';
import { SharedService } from '../../Shared/shared.service';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

  contacts!: ContactInterface[];

  constructor(private contactService: ContactsService, private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.workspaceId$.subscribe(id => {
      if(!id) return

      this.contactService.getContactsByWorkspaceId(id).subscribe({
        next: (response) => {
          this.contacts = response as ContactInterface[];
          return response;
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }

}
