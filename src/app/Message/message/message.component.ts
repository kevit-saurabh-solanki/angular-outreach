import { Component, Input } from '@angular/core';
import { MessageInterface } from '../message.interface';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message!: MessageInterface;
  userRole: string = '';

  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }
  }

  deleteMessage(messageId: string) {
    const confirmDelete = window.confirm('Are you sure you want to delete this message?');
    if (!confirmDelete) return;

    this.messageService.deleteMessage(messageId).subscribe({
      next: () => {
        console.log(`Message ${messageId} deleted`);
        this.router.navigate(['/messages']);
      },
      error: (err: any) => {
        console.error('Error deleting message:', err);
      }
    });
  }

}
