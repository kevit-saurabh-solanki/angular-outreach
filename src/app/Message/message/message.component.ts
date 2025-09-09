import { Component, Input } from '@angular/core';
import { MessageInterface } from '../message.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message?: MessageInterface;

}
