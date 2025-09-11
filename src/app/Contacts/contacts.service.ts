import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, throwError } from 'rxjs';
import { ContactInterface, SendContactInterface } from './contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:3000/contacts";

  getContactById(id: string) {
    return this.http.get<ContactInterface>(`${this.baseUrl}/${id}`).pipe(
      map(contact => ({
        ...contact,
      })),

      retry(1),

      catchError(err => {
        console.error('Error fetching contact:', err);
        return throwError(() => err);
      })
    );
  }

  addContact({ name, phoneNumber, tags, workspaceId }: SendContactInterface) {
    return this.http.post(`${this.baseUrl}`, { name, phoneNumber, tags, workspaceId }).pipe(
      catchError(err => {
        console.error('Error fetching contact:', err);
        return throwError(() => err);
      })
    )
  }

  editContact({ name, phoneNumber, tags, workspaceId }: SendContactInterface, contactId: string) {
    return this.http.put(`${this.baseUrl}/${contactId}`, { name, phoneNumber, tags, workspaceId }).pipe(
      catchError(err => {
        console.error('Error editing contact:', err);
        return throwError(() => err);
      })
    );
  }

  deleteContact(contactId: string) {
    return this.http.delete(`${this.baseUrl}/${contactId}`).pipe(
      catchError(err => {
        console.error('Error deleting contact:', err);
        return throwError(() => err);
      })
    );
  }

  getContactsByWorkspaceId(workspaceId: string) {
    return this.http.get(`${this.baseUrl}/workspace/${workspaceId}`).pipe(
      catchError(err => {
        console.error('error fetching contacts:', err);
        return throwError(() => err);
      })
    )
  }
}