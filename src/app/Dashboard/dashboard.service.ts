import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface graphDatatype {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/campaigns';

  getCampaignsPerDay(start: string, end: string) {
    const workspaceId = localStorage.getItem('workspaceId') || '';
    return this.http.get<{ date: string, count: number }[]>(`${this.baseUrl}/campaign-per-day`,
      {
        params: { start, end, workspaceId: workspaceId }
      }
    ).pipe(
      catchError((err) => {
        console.log('Error fetching campaign count: ', err);
        return throwError(() => err);
      })
    )
  }

  getCampaignsPerMessageType(start: string, end: string) {
    const workspaceId = localStorage.getItem('workspaceId') || '';
    return this.http.get<graphDatatype>(`${this.baseUrl}/campaign-per-message-type`,
      {
        params: { start, end, workspaceId: workspaceId }
      }
    ).pipe(
      catchError((err) => {
        console.log('Error fetching campaign count:', err);
        return throwError(() => err);
      })
    )
  }

  getContactsReached(start: string, end: string) {
    const workspaceId = localStorage.getItem('workspaceId') || '';
    return this.http.get<graphDatatype>(`${this.baseUrl}/contacts-reached-per-day`,
      {
        params: { start, end, workspaceId: workspaceId }
      }
    ).pipe(
      catchError((err) => {
        console.log('Error fetching contacts count:', err);
        return throwError(() => err);
      })
    )
  }

  getRecentCampaigns() {
    const workspaceId = localStorage.getItem('workspaceId') || '';
    return this.http.get(`${this.baseUrl}/recent-campaigns`,
      {
        params: { workspaceId: workspaceId }
      }
    ).pipe(
      catchError((err) => {
        console.log('Error fetching recent campaigns:', err);
        return throwError(() => err);
      })
    )
  }

  getTopTags() {
    const workspaceId = localStorage.getItem('workspaceId') || '';
    return this.http.get(`http://localhost:3000/contacts/toptags`,
      {
        params: { workspaceId: workspaceId }
      }
    ).pipe(
      catchError(err => {
        console.log(err);
        return throwError(() => err);
      })
    )
  }

}
