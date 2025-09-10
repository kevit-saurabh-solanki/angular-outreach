import { Component } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

  activeTab?: string; // default active
  user: any;
  selectedWorkspaceId: string = '';

  constructor(private authService: AuthService, private router: Router) { }

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

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }

    const storedWorkspaceId = localStorage.getItem('workspaceId');
    if (storedWorkspaceId) {
      this.selectedWorkspaceId = storedWorkspaceId;
    }
  }

  onWorkspaceChange(event: any) {
    const newWorkspaceId = event.target.value;
    console.log(newWorkspaceId);

    // Remove previous workspaceId from localStorage
    localStorage.removeItem('workspaceId');

    // Store new workspaceId
    localStorage.setItem('workspaceId', newWorkspaceId);

    console.log('Stored:', localStorage.getItem('workspaceId'));

    // Update local variable if needed
    this.selectedWorkspaceId = newWorkspaceId;
  }

}
