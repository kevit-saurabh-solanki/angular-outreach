import { Component, Input, inject } from '@angular/core';
import { ContactInterface } from '../contact.interface';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'tr[app-contact]',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Input() contact!: ContactInterface;
  userRole: string = '';
  private sharedService = inject(SharedService);

  constructor(private contactService: ContactsService, private router: Router) { }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }
  }

  deleteContact(contactId: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (!confirmDelete) return;

    this.contactService.deleteContact(contactId).subscribe({
      next: () => {
        console.log('Contact deleted');
        window.location.reload();
      },
      error: (err) => {
        this.sharedService.handleError(err);
      }
    });
  }
}
