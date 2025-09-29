import { Component, inject } from '@angular/core';
import { LogsInterface } from '../logs.interface';
import { SharedService } from '../../Shared/shared.service';
import { LogsService } from '../logs.service';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrl: './logs-list.component.scss'
})
export class LogsListComponent {
  logs!: LogsInterface[];
  private sharedService = inject(SharedService);
  private logsService = inject(LogsService);

  loadLogs() {
    this.sharedService.workspaceId$.subscribe(id => {
      if (!id) return

      this.logsService.getLogsByWorkspaceId(id).subscribe({
        next: (res) => {
          this.logs = res;
          console.log(`logs recieved`);
        },
        error: (err) => {
          this.sharedService.handleError(err);
        }
      })
    })
  }

  ngOnInit() {
    this.loadLogs();
  }
}
