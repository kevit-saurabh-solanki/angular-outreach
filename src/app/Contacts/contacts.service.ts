import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, throwError } from 'rxjs';
import { ContactInterface, SendContactInterface } from './contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:3000/contacts";

  getContactByUserId() {
    return this.http.get(`${this.baseUrl}`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => err);
      })
    );
  }

  getContactById(id: string) {
    return this.http.get<ContactInterface>(`http://localhost:3000/contacts/${id}`).pipe(
      map(contact => ({
        ...contact,
        // name: contact.name.toUpperCase(),
        // phoneNumber: `+91-${contact.phoneNumber}` not working
      })),

      // 2️⃣ retry request if it fails
      retry(1),

      // 3️⃣ handle errors gracefully
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
    return this.http.put(`http://localhost:3000/contacts/${contactId}`, { name, phoneNumber, tags, workspaceId }).pipe(
      catchError(err => {
        console.error('Error editing contact:', err);
        return throwError(() => err);
      })
    );
  }

  deleteContact(contactId: string) {
    return this.http.delete(`http://localhost:3000/contacts/${contactId}`).pipe(
      catchError(err => {
        console.error('Error deleting contact:', err);
        return throwError(() => err);
      })
    );
  }

  getContactsByWorkspaceId(workspaceId: string) {
    return this.http.get(`http://localhost:3000/contacts/${workspaceId}`).pipe(
      catchError(err => {
        console.error('error fetching contacts:', err);
        return throwError(() => err);
      })
    )
  }
}