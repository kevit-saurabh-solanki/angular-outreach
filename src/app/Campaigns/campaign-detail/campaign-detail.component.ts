import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../campaign.service';
import { CampaignInterface } from '../campaign.interface';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrl: './campaign-detail.component.scss'
})
export class CampaignDetailComponent {
  campaign!: CampaignInterface;
  userRole: string = '';
  private sharedService = inject(SharedService);

  constructor(private route: ActivatedRoute, private campaignService: CampaignService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.campaignService.getCampaignById(id).subscribe({
        next: (campaign) => {
          this.campaign = (campaign as CampaignInterface);
        },
        error: (err) => {
          this.sharedService.handleError(err);
          // optional: redirect if contact not found
          this.router.navigate(['/campaigns']);
        },
      });
    }

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }
  }

  goBack() {
    this.router.navigate(['/campaigns']);
  }

  redirectToEdit() {
    this.router.navigate(['campaigns/edit', this.campaign?._id]);
  }

  deleteCampaign(campaignId: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
    if (!confirmDelete) return;

    this.campaignService.deleteCampaign(campaignId).subscribe({
      next: () => {
        console.log(`Campaign ${campaignId} deleted`);
        this.router.navigate(['/campaigns']);
      },
      error: (err: any) => {
        this.sharedService.handleError(err);
      }
    });
  }
}
