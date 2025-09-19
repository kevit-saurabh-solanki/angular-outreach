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
  page: number = 1;
  totalPages: number = 1;

  constructor(private sharedService: SharedService, private campaignService: CampaignService) { }

  ngOnInit() {
    this.loadCampaigns();

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }

    this.sharedService.workspaceId$.subscribe(id => {
      if (!id) return;
      this.page = 1;
    })
  }

  loadCampaigns() {
    this.sharedService.workspaceId$.subscribe(id => {
      if (!id) return

      this.campaignService.getCampaignsByWorkspaceId(id, this.page).subscribe({
        next: (response) => {
          this.campaigns = response.data;
          response.totalPages === 0 ? this.totalPages = 1 : this.totalPages = response.totalPages;
        },
        error: (err) => {
          console.error(err);
        }
      })
    })
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadCampaigns();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadCampaigns();
    }
  }
}
