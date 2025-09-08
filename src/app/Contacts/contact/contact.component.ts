import { Component, Input } from '@angular/core';
import { ContactInterface } from '../contact.interface';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'tr[app-contact]',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Input() contact!: ContactInterface;

  constructor(private contactService: ContactsService) {}

  deleteContact(contactId: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (!confirmDelete) return;

    this.contactService.deleteContact(contactId).subscribe({
      next: () => {
        console.log('Contact deleted');
      },
      error: (err) => {
        console.error('Error deleting contact:', err);
      }
    });
  }
}
