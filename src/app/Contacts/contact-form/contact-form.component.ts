import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactInterface } from '../contact.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  @Input() contact?: ContactInterface;
  @Output() formSumbit = new EventEmitter<ContactInterface>();

  constructor(private formBuilder: FormBuilder, private routeParam: ActivatedRoute) {}

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    tags: ['', [Validators.required]]
  })

  get name() {
    return this.contactForm.get('name');
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get tags() {
    return this.contactForm.get('tags');
  }

  getRouteId() {
    const id = this.routeParam.snapshot.paramMap.get('id');
  }
}
