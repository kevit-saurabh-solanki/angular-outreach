import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface } from './login.interface';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  authState$ = this.authState.asObservable(); //not working

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl: string = 'http://localhost:3000/login';


  login(body: loginInterface) {
    return this.http.post<{ access_token: string }>(this.baseUrl, body).pipe(
      tap((res) => {
        localStorage.setItem('token', res.access_token); // save token here
        this.authState.next(true);
      }),
      catchError((err) => {
        console.error('Login failed:', err);
        return throwError(() => err); // return error properly
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

}

