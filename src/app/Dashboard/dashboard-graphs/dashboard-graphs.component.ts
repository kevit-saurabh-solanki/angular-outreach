import { Component, Input } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-graphs',
  templateUrl: './dashboard-graphs.component.html',
  styleUrl: './dashboard-graphs.component.scss'
})
export class DashboardGraphsComponent {
  @Input() title!: string;
  @Input() type: 'bar' | 'line' | 'pie' = 'bar';
  @Input() chartData!: ChartData<'bar' | 'line' | 'pie'>;
  @Input() chartOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { display: true } }
  };

  ngOnChanges(): void {
    // optional: transform data if needed on input change
  }
}
