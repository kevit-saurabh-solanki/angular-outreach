import { Component, Input } from '@angular/core';
import { ContactInterface } from '../contact.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Input() contact!:ContactInterface;
  tags: string[] = this.contact.tags;

}
