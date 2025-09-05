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
  loginForm!: FormGroup;
  invalidCredits?: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
    }) //not working

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  login() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.invalidCredits = false;
        this.router.navigate(['/contacts']);
      },
      error: () => {
        this.invalidCredits = true;
      },
    });
  }
}

