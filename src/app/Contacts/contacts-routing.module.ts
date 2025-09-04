import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent,
    title: 'Contacts'
  },
  {
    path: ':id',
    component: ContactDetailsComponent,
    title: 'Contact details'
  },
  {
    path: 'edit/:id',
    component: ContactFormComponent,
    title: 'Edit Contact'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
