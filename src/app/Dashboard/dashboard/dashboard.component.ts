import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { DashboardService } from '../dashboard.service';
import { CampaignInterface } from '../../Campaigns/campaign.interface';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private dashboardService: DashboardService, private sharedService: SharedService) { }

  campaignsPerDay: ChartData<'bar'> = { labels: [], datasets: [] };
  messagesPerTypePerDay: ChartData<'bar'> = { labels: [], datasets: [] };
  contactsReachedPerDay: ChartData<'bar'> = { labels: [], datasets: [] };
  recentCampaigns!: CampaignInterface[];

  startDate!: string;
  endDate!: string;

  ngOnInit(): void {
    this.sharedService.workspaceId$.subscribe(id => {
      if (!id) return;

      this.loadCharts(); // initial load
      this.loadTables();
    })
  }

  loadCharts() {
    if (!this.startDate || !this.endDate) {
      this.campaignsPerDay = { labels: [], datasets: [] }; // clear chart
      return;
    }

    this.dashboardService.getCampaignsPerDay(this.startDate, this.endDate).subscribe({
      next: (res) => {
        this.campaignsPerDay = {
          labels: res.map(r => r.date),
          datasets: [{ data: res.map(r => r.count), label: 'Campaigns' }]
        }
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.dashboardService.getCampaignsPerMessageType(this.startDate, this.endDate).subscribe({
      next: (res) => {
        console.log(res);
        this.messagesPerTypePerDay = {
          labels: res.labels,
          datasets: res.datasets.map(ds => ({
            label: ds.label,
            data: ds.data
          }))
        };
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.dashboardService.getContactsReached(this.startDate, this.endDate).subscribe({
      next: (res) => {
        this.contactsReachedPerDay = {
          labels: res.labels,
          datasets: res.datasets.map(ds => ({
            label: ds.label,
            data: ds.data
          }))
        };
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  loadTables() {
    this.dashboardService.getRecentCampaigns().subscribe({
      next: (res) => {
        this.recentCampaigns = (res as CampaignInterface[]);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
