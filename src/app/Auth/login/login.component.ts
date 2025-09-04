import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }
  loginForm!: FormGroup;
  invalidCredits?: boolean;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('token', response.access_token);
        this.invalidCredits = false;
        this.router.navigate(['/contacts']);
      },
      error: (err) => {
        console.log(err);
        this.invalidCredits = true;
      }
    });

  }
}
