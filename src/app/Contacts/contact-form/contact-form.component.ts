import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ContactInterface, SendContactInterface } from '../contact.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContactsService } from '../contacts.service';
import { SharedService } from '../../Shared/shared.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contact?: ContactInterface;
  contactForm!: FormGroup;
  message?: boolean;
  private sharedService = inject(SharedService);

  constructor(private formBuilder: FormBuilder, private routeParam: ActivatedRoute, private location: Location, private contactService: ContactsService) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(10), Validators.maxLength(15)]],
      tags: [[], Validators.required]
    });

    const contactId = this.routeParam.snapshot.paramMap.get('id');
    if (contactId) {
      this.contactService.getContactById(contactId).subscribe((contact: ContactInterface) => {
        this.contact = contact;
        this.contactForm.patchValue({
          name: contact.name,
          phoneNumber: contact.phoneNumber,
          tags: contact.tags
        });
      });
    }
  }

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

  goBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    const formValue = this.contactForm.value;
    const wokspaceId = localStorage.getItem('workspaceId');

    const contactToAdd: SendContactInterface = {
      name: formValue.name,
      phoneNumber: Number(formValue.phoneNumber),
      tags: formValue.tags,
      workspaceId: wokspaceId || ''
    };

    this.contactService.addContact(contactToAdd).subscribe({
      next: (result) => {
        this.message = true;
        this.contactForm.reset();
      },
      error: (err) => {
        this.message = false;
        this.sharedService.handleError(err);
      }
    });
  }

  onEdit() {
    if (this.contactForm.invalid || !this.contact) return;

    const formValue = this.contactForm.value;
    const workspaceId = localStorage.getItem('workspaceId');

    const contactToEdit: SendContactInterface = {
      name: formValue.name,
      phoneNumber: Number(formValue.phoneNumber),
      tags: formValue.tags,
      workspaceId: workspaceId || ''
    };

    this.contactService.editContact(contactToEdit, this.contact._id).subscribe({
      next: (result) => {
        this.message = true;
        this.contactForm.reset();
      },
      error: (err) => {
        this.message = false;
        this.sharedService.handleError(err);
      }
    });
  }
}

