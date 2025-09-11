import { Component, Input } from '@angular/core';
import { CampaignInterface } from '../campaign.interface';
import { CampaignService } from '../campaign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-campaign]',
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.scss'
})
export class CampaignComponent {
  @Input() campaign!: CampaignInterface;
  userRole: string = '';

  constructor(private campaignService: CampaignService, private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }
  }

  deleteCampaign(campaignId: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
    if (!confirmDelete) return;

    this.campaignService.deleteCampaign(campaignId).subscribe({
      next: () => {
        console.log('campaign deleted');
        this.router.navigate(['/campaigns']);
      },
      error: (err) => {
        console.error('Error deleting campaign:', err);
      }
    });
  }
}
