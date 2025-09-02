import { Component } from '@angular/core';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {
  // items: MenuItem[] | undefined;

  // ngOnInit() {
  //   this.items = [
  //     { label: 'Dashboard', icon: 'pi pi-home' },
  //     { label: 'Transactions', icon: 'pi pi-chart-line' },
  //     { label: 'Products', icon: 'pi pi-list' },
  //     { label: 'Messages', icon: 'pi pi-inbox' }
  //   ]
  // }
  sidebarVisible: boolean = false;
}
