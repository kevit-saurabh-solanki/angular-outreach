import { RouterModule, Routes } from "@angular/router";
import { CampaignListComponent } from "./campaign-list/campaign-list.component";
import { CampaignFormComponent } from "./campaign-form/campaign-form.component";
import { CampaignDetailComponent } from "./campaign-detail/campaign-detail.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: CampaignListComponent,
        title: 'Campaigns'
    },
    {
        path: 'add',
        component: CampaignFormComponent,
        title: 'Add Campaign'
    },
    {
        path: 'edit/:id',
        component: CampaignFormComponent,
        title: 'Edit Campaign'
    },
    {
        path: ':id',
        component: CampaignDetailComponent,
        title: 'Campaign details'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CampaignRoutingModule {}