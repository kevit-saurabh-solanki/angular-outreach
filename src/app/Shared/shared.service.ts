import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private workspaceIdSubject = new BehaviorSubject<string | null>(localStorage.getItem('workspaceId'));
  workspaceId$ = this.workspaceIdSubject.asObservable();

  setWorkspace(id: string) {
    localStorage.setItem('workspaceId', id);
    this.workspaceIdSubject.next(id);
  }

  getCurrentWorkspace() {
    return this.workspaceIdSubject.value;
  }
}
