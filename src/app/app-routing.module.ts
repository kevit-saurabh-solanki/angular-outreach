import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Outreach Hub Login'
  },
  {
    path: 'contacts',
    loadChildren: () => import('./Contacts/contacts.module').then(m => m.ContactsModule),
    title: 'Contacts'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
