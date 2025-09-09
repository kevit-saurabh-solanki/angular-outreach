import { Component } from '@angular/core';
import { MessageInterface } from '../message.interface';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  messages: MessageInterface[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.messageService.getAllMessages().subscribe({
      next: (response: any) => {
        console.log('messages fetched');
        console.log(response);
        this.messages = response as MessageInterface[];
      },
      error: (err: any) => {
        console.error('Error fetching messages:', err);
      }
    });
  }
}
