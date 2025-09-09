import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoutingModule } from './message-routing.module';
import { MessageFormComponent } from './message-form/message-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageTemplateComponent } from './message-template/message-template.component';
import { SharedModule } from '../Shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [
    MessageFormComponent,
    MessageComponent,
    MessageListComponent,
    MessageTemplateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MessageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    FormsModule
]
})
export class MessageModule { }
