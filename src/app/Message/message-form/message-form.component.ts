import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageInterface, SendMessageInterface } from '../message.interface';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { SharedService } from '../../Shared/shared.service';

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
  private sharedService = inject(SharedService);

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private messageService: MessageService, private location: Location) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      messageType: ['', Validators.required],
      content: ['', Validators.required],
      imagePath: [''],
      filePath: ['']
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
          this.sharedService.handleError(err);
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

    const formData = new FormData();
    formData.append('title', formValue.title);
    formData.append('messageType', formValue.messageType);
    formData.append('content', formValue.content);
    formData.append('workspaceId', workspaceId || '');

    if (formValue.imagePath) {
      formData.append('imagePath', formValue.imagePath);
    }

    // 👇 append the actual file object from file input
    if (formValue.filePath) {
      const fileInput = (document.getElementById('filePath') as HTMLInputElement);
      if (fileInput.files && fileInput.files.length > 0) {
        formData.append('filePath', fileInput.files[0]); // Must match Multer field name
      }
    }

    this.messageService.addMessage(formData).subscribe({
      next: (result) => {
        this.messageForm.reset();
        this.successMessage = true;
        console.log('Message added');
      },
      error: (err) => {
        this.sharedService.handleError(err);
      }
    });
  }

  editMessage() {
    if (this.messageForm.invalid || !this.message) return;

    const formValue = this.messageForm.value;
    const workspaceId = localStorage.getItem('workspaceId');

    const editFormData = new FormData();
    editFormData.append('title', formValue.title);
    editFormData.append('messageType', formValue.messageType);
    editFormData.append('content', formValue.content);
    editFormData.append('workspaceId', workspaceId || '');

    if (formValue.imagePath) {
      editFormData.append('imagePath', formValue.imagePath);
    }

    // 👇 append the actual file object from file input
    if (formValue.filePath) {
      const fileInput = (document.getElementById('filePath') as HTMLInputElement);
      if (fileInput.files && fileInput.files.length > 0) {
        editFormData.append('filePath', fileInput.files[0]); // Must match Multer field name
      }
    }

    this.messageService.editMessage(editFormData, this.message._id).subscribe({
      next: (result) => {
        this.messageForm.reset();
        this.successMessage = true;
        console.log('Message edited');
      },
      error: (err) => {
        this.sharedService.handleError(err);
      }
    });
  }
}
