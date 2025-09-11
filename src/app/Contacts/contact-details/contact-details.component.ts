import { Component } from '@angular/core';
import { ContactInterface } from '../contact.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  contact?: ContactInterface;
  userRole: string = '';

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get id from route param
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactService.getContactById(id).subscribe({
        next: (contact) => {
          console.log(contact);
          this.contact = {
            ...contact,
          };
        },
        error: (err) => {
          console.error(err);
          // optional: redirect if contact not found
          this.router.navigate(['/contacts']);
        },
      });
    }

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }
  }

  goBack() {
    this.router.navigate(['/contacts']);
  }

  redirectToEdit() {
    this.router.navigate(['contacts/edit', this.contact?._id]);
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



