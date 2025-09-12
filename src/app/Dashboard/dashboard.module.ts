import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
import { DashboardGraphsComponent } from './dashboard-graphs/dashboard-graphs.component';
import { DashboardTablesComponent } from './dashboard-tables/dashboard-tables.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../Shared/shared.module';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    WelcomeMessageComponent,
    DashboardGraphsComponent,
    DashboardTablesComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
