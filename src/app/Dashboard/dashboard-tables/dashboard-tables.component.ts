import { Component, Input } from '@angular/core';
import { CampaignInterface } from '../../Campaigns/campaign.interface';

@Component({
  selector: 'app-dashboard-tables',
  templateUrl: './dashboard-tables.component.html',
  styleUrl: './dashboard-tables.component.scss'
})
export class DashboardTablesComponent {
  @Input() campaigns!: CampaignInterface[];
  @Input() topTags: any;
}
