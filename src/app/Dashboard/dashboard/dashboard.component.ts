import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private dashboardService: DashboardService) { }

  campaignsPerDay: ChartData<'bar'> = { labels: [], datasets: [] };
  messagesPerTypePerDay: ChartData<'bar'> = { labels: [], datasets: [] };
  // contactsReachedPerDay: ChartData<'bar'> = { labels: [], datasets: [] };

  startDate!: string;
  endDate!: string;

  ngOnInit(): void {
    this.loadCharts(); // initial load
  }

  loadCharts() {
    if (!this.startDate || !this.endDate) {
      this.campaignsPerDay = { labels: [], datasets: [] }; // clear chart
      return;
    }

    this.dashboardService.getCampaignsPerDay(this.startDate, this.endDate).subscribe({
      next: (res) => {
        this.campaignsPerDay = { labels: res.map(r => r.date), datasets: [{ data: res.map(r => r.count), label: 'Campaigns' }] }
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
    })
  }
}
