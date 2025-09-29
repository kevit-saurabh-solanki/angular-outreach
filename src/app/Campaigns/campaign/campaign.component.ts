import { Component, inject, Input } from '@angular/core';
import { CampaignInterface } from '../campaign.interface';
import { CampaignService } from '../campaign.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'tr[app-campaign]',
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss'
})
export class CampaignComponent {
  @Input() campaign!: CampaignInterface;
  userRole: string = '';
  private sharedService = inject(SharedService);

  constructor(private campaignService: CampaignService, private router: Router) { }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }
  }

  deleteCampaign(campaignId: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
    if (!confirmDelete) return;

    this.campaignService.deleteCampaign(campaignId).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        this.sharedService.handleError(err);
      }
    });
  }

  launchCampaign(campaignId: string) {
    const confirmLaunch = window.confirm('Are you sure you want to launch campaign cannot edit it later');
    if (!confirmLaunch) return;

    this.campaignService.launchCampaign(campaignId).subscribe({
      next: (res) => {
        console.log('campaign launched');
      },
      error: (err) => {
        this.sharedService.handleError(err);
      }
    })
  }

  copyCampaign(campaignId: string) {
    const confirmCopy = window.confirm('Do you want to copy this campaign?');
    if (!confirmCopy) return;

    this.campaignService.copyCampaign(campaignId).subscribe({
      next: (res) => {
        console.log('campaign Copied');
      },
      error: (err) => {
        this.sharedService.handleError(err);
      }
    })
  }
}
