import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SharedModule } from '../Shared/shared.module';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    ContactDetailsComponent,
    ContactListComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule
  ]
})
export class ContactsModule { }
