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
        next: (contact) => {(this.contact = { ...contact, phoneNumber: Number(contact.phoneNumber) })
      console.log(contact)},
        error: (err) => {
          console.error(err);
          // optional: redirect if contact not found
          this.router.navigate(['/contacts']);
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/contacts']);
  }
}



