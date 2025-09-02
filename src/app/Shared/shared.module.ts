import { NgModule } from "@angular/core";
import { TabMenuModule } from "primeng/tabmenu";
import { MenuBarComponent } from "./menu-bar/menu-bar.component";
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [MenuBarComponent],
    imports: [TabMenuModule, SidebarModule, ButtonModule, CommonModule],
    exports: [MenuBarComponent]
})
export class SharedModule {}