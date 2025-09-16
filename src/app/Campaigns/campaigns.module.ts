import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    CampaignComponent,
    CampaignListComponent,
    CampaignDetailComponent,
    CampaignFormComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FloatLabelModule,
    DropdownModule,
    InputTextareaModule,
    ChipsModule,
    InputTextModule
  ]
})
export class CampaignsModule { }
