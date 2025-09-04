import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface } from './login.interface';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl: string = 'http://localhost:3000/login';


  login(body: loginInterface) {
    return this.http.post<{ access_token: string }>(`${this.baseUrl}`, body)
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGE0NzE0Njk0ZGY3NWE1ZWE4ZDI3ZGQiLCJlbWFpbCI6InNhdXJhYmhAa2V2aXQuaW8iLCJpc0FkbWluIjp0cnVlLCJyb2xlIjoiZWRpdG9yIiwid29ya3NwYWNlSUQiOltdLCJpYXQiOjE3NTY5Njc4OTYsImV4cCI6MTc1Njk3MTQ5Nn0.NhLmy5deG6E5nnIe_CTNHo0uP163oOA_1e9gbfibM8g"
