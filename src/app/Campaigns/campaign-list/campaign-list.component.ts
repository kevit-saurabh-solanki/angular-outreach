import { Component } from '@angular/core';
import { CampaignInterface } from '../campaign.interface';
import { SharedService } from '../../Shared/shared.service';
import { CampaignService } from '../campaign.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss'
})
export class CampaignListComponent {
  userRole: string = '';
  campaigns!: CampaignInterface[];

  constructor(private sharedService: SharedService, private campaignService: CampaignService) {}

  ngOnInit() {
    this.sharedService.workspaceId$.subscribe(id => {
      if (!id) return

      this.campaignService.getCampaignsByWorkspaceId(id).subscribe({
        next: (response) => {
          this.campaigns = response as CampaignInterface[];
          console.log('campaign fetched');
          return response;
        },
        error: (err) => {
          console.log(err);
        }
      })
    })

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }
  }
}
