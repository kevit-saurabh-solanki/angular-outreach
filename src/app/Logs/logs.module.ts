import { NgModule } from "@angular/core";
import { LogsComponent } from "./logs/logs.component";
import { LogsListComponent } from "./logs-list/logs-list.component";
import { CommonModule } from "@angular/common";
import { LogsRoutingModule } from "./logs-routing.module";
import { SharedModule } from "../Shared/shared.module";

@NgModule({
    declarations: [
        LogsComponent,
        LogsListComponent
    ],
    imports: [
        CommonModule,
        LogsRoutingModule,
        SharedModule
    ]
})
export class LogsModule {}