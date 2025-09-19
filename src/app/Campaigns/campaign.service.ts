import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { PaginatedCampaignsInterface, SendCampaignInterface } from './campaign.interface';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:3000/campaigns";

  getAllCampaigns() {
    return this.http.get(`${this.baseUrl}`).pipe(
      retry(1),
      catchError(err => throwError(() => err))
    );
  }

  getCampaignById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      retry(1),
      catchError(err => throwError(() => err))
    );
  }

  addCampaign(campaign: SendCampaignInterface) {
    return this.http.post(`${this.baseUrl}`, campaign).pipe(
      catchError(err => throwError(() => err))
    );
  }

  editCampaign(campaign: SendCampaignInterface, campaignId: string) {
    return this.http.put(`${this.baseUrl}/${campaignId}`, campaign).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => err);
      }) 
    );
  }

  deleteCampaign(campaignId: string) {
    return this.http.delete(`${this.baseUrl}/${campaignId}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  getCampaignsByWorkspaceId(workspaceId: string, page: number, limit: number = 10) {
    return this.http.get<PaginatedCampaignsInterface>(`${this.baseUrl}/workspace/${workspaceId}?page=${page}&limit=${limit}`).pipe(
      catchError(err => {
        console.error('error fetching messages:', err);
        return throwError(() => err);
      })
    )
  }

  launchCampaign(campaignId: string) {
    return this.http.post(`${this.baseUrl}/${campaignId}/launch`, {}).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
