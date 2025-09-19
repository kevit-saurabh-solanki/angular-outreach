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

  page: number = 1;
  totalPages: number = 1;
  contacts!: ContactInterface[];
  userRole: string = '';

  constructor(private contactService: ContactsService, private sharedService: SharedService) { }

  ngOnInit() {
    this.loadContacts();

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }

    this.sharedService.workspaceId$.subscribe(id => {
      if (!id) return;
      this.page = 1;
    })
  }

  loadContacts() {
    this.sharedService.workspaceId$.subscribe(id => {
      if (!id) return

      this.contactService.getContactsByWorkspaceId(id, this.page).subscribe({
        next: (response) => {
          this.contacts = response.data;
          response.totalPages === 0 ? this.totalPages = 1 : this.totalPages = response.totalPages;
        },
        error: (err) => {
          console.error(err);
        }
      })
    })
  }



  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadContacts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadContacts();
    }
  }

}
