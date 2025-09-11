import { Component } from '@angular/core';
import { MessageInterface } from '../message.interface';
import { MessageService } from '../message.service';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  messages: MessageInterface[] = [];

  constructor(private messageService: MessageService, private sharedService: SharedService) { }

  ngOnInit() {
    // const workspaceId = localStorage.getItem('workspaceId');
    // if (!workspaceId) return;

    // this.messageService.getMessagesByWorkspaceId(workspaceId).subscribe({
    //   next: (response) => {
    //     console.log('Contacts fetched');
    //     this.messages = response as MessageInterface[];
    //     return response;
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   }
    // });

    this.sharedService.workspaceId$.subscribe(id => {
      if (!id) return

      this.messageService.getMessagesByWorkspaceId(id).subscribe({
        next: (response) => {
          this.messages = response as MessageInterface[];
          return response;
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }
}
