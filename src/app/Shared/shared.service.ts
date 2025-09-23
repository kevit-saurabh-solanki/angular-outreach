import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private router: Router) { }

  private workspaceIdSubject = new BehaviorSubject<string | null>(localStorage.getItem('workspaceId'));
  workspaceId$ = this.workspaceIdSubject.asObservable();

  setWorkspace(id: string) {
    localStorage.setItem('workspaceId', id);
    this.workspaceIdSubject.next(id);
  }

  getCurrentWorkspace() {
    return this.workspaceIdSubject.value;
  }

  handleError(error: any): void {
    const message = error.error.message || error.message || '';

    if (message.toLowerCase().includes('forbidden resource')) {
      window.alert("Session Expired Please Login again");
      this.router.navigate(['/login']);
    }
    else {
      window.alert(`Error occurred: ${message}`);
    }
  }
}
