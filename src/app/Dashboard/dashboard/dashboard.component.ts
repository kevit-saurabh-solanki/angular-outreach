import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor() { }

  campaignsPerDay: ChartData<'bar'> = { labels: [], datasets: [] };
  messagesPerTypePerDay: ChartData<'bar'> = { labels: [], datasets: [] };
  contactsReachedPerDay: ChartData<'bar'> = { labels: [], datasets: [] };

  startDate!: Date;
  endDate!: Date;

  ngOnInit(): void {
    this.loadCharts(); // initial load
  }

  loadCharts(): void {
    // 1️⃣ Example: fetch campaigns per day from backend
    // Replace with API call that returns [{date:'2025-09-12', count:5}, ...]
    const campaignsData = [
      { date: '2025-09-10', count: 3 },
      { date: '2025-09-11', count: 5 },
      { date: '2025-09-12', count: 2 }
    ];
    this.campaignsPerDay = {
      labels: campaignsData.map(d => d.date),
      datasets: [{ label: 'Campaigns', data: campaignsData.map(d => d.count), backgroundColor: '#2563EB' }]
    };

    // 2️⃣ Messages sent per type per day
    const messagesData = [
      { date: '2025-09-10', text: 5, image: 3 },
      { date: '2025-09-11', text: 6, image: 4 }
    ];
    this.messagesPerTypePerDay = {
      labels: messagesData.map(d => d.date),
      datasets: [
        { label: 'Text', data: messagesData.map(d => d.text), backgroundColor: '#3B82F6' },
        { label: 'Text + Image', data: messagesData.map(d => d.image), backgroundColor: '#1E40AF' }
      ]
    };

    // 3️⃣ Contacts reached per day
    const contactsData = [
      { date: '2025-09-10', count: 50 },
      { date: '2025-09-11', count: 80 }
    ];
    this.contactsReachedPerDay = {
      labels: contactsData.map(d => d.date),
      datasets: [{ label: 'Contacts Reached', data: contactsData.map(d => d.count), backgroundColor: '#2563EB' }]
    };
  }

  onDateChange(start: Date, end: Date): void {
    this.startDate = start;
    this.endDate = end;
    this.loadCharts(); // re-fetch charts based on selected range
  }
}
