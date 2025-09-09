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
  const confirmLogout = window.confirm('Are you sure you want to log out?');
  if (!confirmLogout) return;

  localStorage.removeItem('token');
  localStorage.clear();
  this.router.navigate(['/login']);
}


}
