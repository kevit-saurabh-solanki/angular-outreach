import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/campaigns';
  
  getCampaignsPerDay(start: string, end: string) {
    return this.http.get<{ date: string, count: number }[]>(`${this.baseUrl}/campaign-per-day`, 
      {
        params: { start, end }
      }
    ).pipe(
      catchError((err) => {
        console.log('Error fetching campaign count: ', err);
        return throwError(() => err);
      })
    )
  }

}
