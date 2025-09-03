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

  ngOnInit() {
    const id = this.getRouteParamId();
    console.log(id);
    this.contact = this.getContactById(id);
  }

  private getRouteParamId(): string {
    const paramId = this.routeParam.snapshot.paramMap.get('id');
    if (!paramId) {
      throw new Error('Contact id not found in route parameters');
    }
    return paramId;
  }

  getContactById(id: string) {
    return this.contactService.getContactById(id);
  }

  back() {
    setTimeout(() => {
      this.router.navigate(['/contacts']);
    }, 2000)
  }

}
