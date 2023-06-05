import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;
  passwordVisible: boolean;

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {
    this.username = '';
    this.password = '';
    this.passwordVisible = false;
  }

  login(): void {
    if (!this.username || !this.password) {
      this.showSnackBar('Please enter both username and password.');
      return;
    }

    this.http.get<any>('./assets/auth.json').subscribe(
      (authData) => {
        if (
          authData &&
          authData.username === this.username &&
          authData.password === this.password
        ) {
          this.showSnackBar('Login successful.');
          this.router.navigate(['/dashboard']);
        } else {
          this.showSnackBar('Invalid username or password.');
        }
      },
      (error) => {
        console.log('Error loading auth.json', error);
        this.showSnackBar('Error occurred during authentication.');
      }
    );
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
