import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogsListComponent } from "./logs-list/logs-list.component";

const routes: Routes = [
    {
        path: '',
        component: LogsListComponent,
        title: 'Logs List'
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class LogsRoutingModule {}