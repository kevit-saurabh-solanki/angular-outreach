import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface } from './login.interface';
import { catchError, tap, throwError, switchMap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  authState$ = this.authState.asObservable(); //not working

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl: string = 'http://localhost:3000/login';


  login(body: loginInterface) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/users`, body).pipe(
      switchMap((res) => {
        const token = res.token;
        localStorage.setItem('token', token);

        // decode token using jwt-decode
        const decoded: any = jwtDecode(token);
        const userId = decoded._id;

        // fetch user object
        return this.http.get<any>(`http://localhost:3000/users/${userId}`).pipe(
          tap((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            if (user.workspaceId && user.workspaceId.length > 0) {
              localStorage.setItem('workspaceId', user.workspaceId[0]._id);
            }
            this.authState.next(true);
          })
        );
      }),
      catchError((err) => {
        console.error('Login failed:', err);
        return throwError(() => err);
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

}

