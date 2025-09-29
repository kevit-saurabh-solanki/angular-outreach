import { Component, inject, Input } from '@angular/core';
import { MessageInterface } from '../message.interface';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message!: MessageInterface;
  userRole: string = '';
  private sharedService = inject(SharedService);

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
        window.location.reload();
      },
      error: (err: any) => {
        this.sharedService.handleError(err);
      }
    });
  }

}
