import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, throwError } from 'rxjs';
import { ContactInterface } from './contact.interface';

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
        return err;
      })
    );
  }

  getContactById(id: string) {
    return this.http.get<ContactInterface>(`http://localhost:3000/contacts/${id}`).pipe(
      // 1️⃣ transform data (optional)
      map(contact => ({
        ...contact,
        name: contact.name.toUpperCase(), // example transformation
        // phoneNumber: `+91-${contact.phoneNumber}`
      })),

      // 2️⃣ retry request if it fails
      retry(1),

      // 3️⃣ handle errors gracefully
      catchError(err => {
        console.error('Error fetching contact:', err);
        return throwError(() => err); // forward error to component
      })
    );
  }

}