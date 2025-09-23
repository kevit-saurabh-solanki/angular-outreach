import { Component, inject } from '@angular/core';
import { MessageInterface } from '../message.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../message.service';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrl: './message-template.component.scss'
})
export class MessageTemplateComponent {
  message?: MessageInterface;
  userRole: string = '';
  private sharedService = inject(SharedService);

  constructor(private router: Router, private messageService: MessageService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.messageService.getMessageById(id).subscribe({
        next: (msg) => {
          this.message = (msg as MessageInterface);
        },
        error: (err) => {
          this.sharedService.handleError(err);
        }
      });
    }

    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userRole = parsedUser.role;
    }
  }

  goBack() {
    this.router.navigate(['/messages']);
  }

  redirectToEdit() {
    this.router.navigate(['messages/edit', this.message?._id]);
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
        this.sharedService.handleError(err);
      }
    });
  }
}
