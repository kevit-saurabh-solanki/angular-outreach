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
  userRole: string = '';

  constructor(private messageService: MessageService, private sharedService: SharedService) { }

  ngOnInit() {
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

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }
  }
}
