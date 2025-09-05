import { Component } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

  activeTab: string = 'contacts'; // default active

  constructor(private authService: AuthService, private router: Router) {}

  setActive(tab: string) {
    this.activeTab = tab;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
