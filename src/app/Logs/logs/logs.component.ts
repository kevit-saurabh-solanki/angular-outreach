import { Component, Input } from '@angular/core';
import { LogsInterface } from '../logs.interface';

@Component({
  selector: 'tr[app-logs]',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {
  @Input() logs!: LogsInterface;
}
