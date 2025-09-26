import { Component } from '@angular/core';
import { LogsInterface } from '../logs.interface';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrl: './logs-list.component.scss'
})
export class LogsListComponent {
  logs!: LogsInterface[];
}
