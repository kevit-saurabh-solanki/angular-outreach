import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInterface } from './login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/login';


  login(body: loginInterface) {
    this.http.post(`${this.baseUrl}`, body).subscribe((response) => {
      console.log(response);
    })
  }
}
