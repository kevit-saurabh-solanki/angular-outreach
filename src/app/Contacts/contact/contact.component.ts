import { Component, Input } from '@angular/core';
import { ContactInterface } from '../contact.interface';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-contact]',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Input() contact!: ContactInterface;
  userRole: string = '';

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
        this.router.navigate(['/contacts']);
      },
      error: (err) => {
        console.error('Error deleting contact:', err);
      }
    });
  }
}
