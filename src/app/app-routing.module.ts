import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { authGuard } from './Auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Outreach Hub Login'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Dashboard/dashboard.module').then(m => m.DashboardModule),
    title: 'Dashboard',
    canActivate: [authGuard]
  },
  {
    path: 'contacts',
    loadChildren: () => import('./Contacts/contacts.module').then(m => m.ContactsModule),
    title: 'Contacts',
    canActivate: [authGuard]
  },
  {
    path: 'messages',
    loadChildren: () => import('./Message/message.module').then(m => m.MessageModule),
    title: 'Messages',
    canActivate: [authGuard]
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./Campaigns/campaigns.module').then(m => m.CampaignsModule),
    title: 'Campaigns',
    canActivate: [authGuard]
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
