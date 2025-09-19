import { Component, Input } from '@angular/core';
import { CampaignInterface } from '../../Campaigns/campaign.interface';
import { topTagInterface } from '../../Contacts/contact.interface';

@Component({
  selector: 'app-dashboard-tables',
  templateUrl: './dashboard-tables.component.html',
  styleUrl: './dashboard-tables.component.scss'
})
export class DashboardTablesComponent {
  @Input() campaigns!: CampaignInterface[];
  @Input() topTags!: topTagInterface[];
}
