import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageFormComponent } from "./message-form/message-form.component";
import { MessageTemplateComponent } from "./message-template/message-template.component";

const routes: Routes = [
    {
        path: '',
        component: MessageListComponent,
        title: 'Messages'
    },
    {
        path: 'add',
        component: MessageFormComponent,
        title: 'Add Message'
    },
    {
        path: 'edit/:id',
        component: MessageFormComponent,
        title: 'Edit Contact'
    },
    {
        path: ':id',
        component: MessageTemplateComponent,
        title: 'Contact details'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessageRoutingModule {}