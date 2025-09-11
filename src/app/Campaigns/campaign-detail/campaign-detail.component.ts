import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignService } from '../campaign.service';
import { CampaignInterface } from '../campaign.interface';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrl: './campaign-detail.component.scss'
})
export class CampaignDetailComponent {
  campaign!: CampaignInterface;
  userRole: string = '';

  constructor(private route: ActivatedRoute, private campaignService: CampaignService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.campaignService.getCampaignById(id).subscribe({
        next: (campaign) => {
          console.log(campaign);
          this.campaign = (campaign as CampaignInterface);
        }, 
        error: (err) => {
          console.error(err);
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
}
