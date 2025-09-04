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

  constructor(private routeParam: ActivatedRoute, private contactService: ContactsService, private router: Router) { }


}
