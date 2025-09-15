import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageInterface, SendMessageInterface } from '../message.interface';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrl: './message-form.component.scss'
})
export class MessageFormComponent {
  messageTypeOption: any;
  message?: MessageInterface;
  messageForm!: FormGroup;
  successMessage?: boolean;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private messageService: MessageService, private location: Location) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      messageType: ['', Validators.required],
      content: ['', Validators.required],
      imagePath: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.messageService.getMessageById(id).subscribe({
        next: (msg) => {
          this.message = (msg as MessageInterface);

          if (this.message) {
            this.messageForm.patchValue({
              title: this.message.title,
              messageType: this.message.messageType,
              content: this.message.content,
              imagePath: this.message.imagePath || ''
            });
          }
        },
        error: (err) => {
          console.error('Error fetching message:', err);
        }
      });
    }

    this.messageTypeOption = ["Text", "Text and Image"];
  }

  get title() {
    return this.messageForm?.get('title');
  }
  get messageType() {
    return this.messageForm?.get('messageType');
  }
  get content() {
    return this.messageForm?.get('content');
  }

  goBack() {
    this.location.back();
  }

  addMessage() {
    if (this.messageForm.invalid) return;

    const formValue = this.messageForm.value;
    const workspaceId = localStorage.getItem('workspaceId');

    const messageToAdd: SendMessageInterface = {
      title: formValue.title,
      messageType: formValue.messageType,
      imagePath: formValue.imagePath || '',
      content: formValue.content,
      workspaceId: workspaceId || ''
    };

    this.messageService.addMessage(messageToAdd).subscribe({
      next: (result) => {
        this.messageForm.reset();
        this.successMessage = true;
        console.log('Message added');
      },
      error: (err) => {
        console.error('Error adding message:', err);
      }
    });
  }

  editMessage() {
    if (this.messageForm.invalid || !this.message) return;

    const formValue = this.messageForm.value;
    const workspaceId = localStorage.getItem('workspaceId');

    const messageToEdit: SendMessageInterface = {
      title: formValue.title,
      messageType: formValue.messageType,
      content: formValue.content,
      workspaceId: workspaceId || ''
    };

    this.messageService.editMessage(messageToEdit, this.message._id).subscribe({
      next: (result) => {
        this.messageForm.reset();
        this.successMessage = true;
        console.log('Message edited:', result);
      },
      error: (err) => {
        console.error('Error editing message:', err);
      }
    });
  }
}
