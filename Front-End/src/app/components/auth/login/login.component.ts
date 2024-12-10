import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule,CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  redirectLink: string = '/'; // Default redirection link
  role: string = ''; // Will store the role (admin/user)


  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {}

  // Handle login form submission
  onLogin(): void {
    if (this.email && this.password) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          // Check if the role is "admin" or "user"
          const { mytoken, role } = response; // Get mytoken from response instead of token
          
          // Save token to the token service
          this.tokenService.setToken(mytoken);
          localStorage.setItem('userId', response._id);
          localStorage.setItem('role', role);
          console.log('Response:', response);
          console.log('User ID:', response._id);
          console.log('Role:', role);



          // Customize the success message and redirection based on role
          if (role === 'admin') {
            this.successMessage = 'Welcome Admin! Redirecting to the Admin Dashboard...';
            this.redirectLink = '/admin/dashboard'; // Admin redirection
          } else {
            this.successMessage = 'Login successful! Redirecting to the Candidates...';
            this.redirectLink = '/candidates'; // User redirection
          }
  
          // Redirect after 1 seconds
          setTimeout(() => {
            this.router.navigate([this.redirectLink]);
          }, 1000);
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          // Handle errors as before
          if (error.status === 400) {
            this.errorMessage = 'Invalid email or password. Please try again.';
          } else if (error.status === 401) {
            this.errorMessage = 'Unauthorized access. Please check your credentials.';
          } else if (error.status === 500) {
            this.errorMessage = 'Server error. Please try again later.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again.';
          }
        }
      );
    } else {
      this.errorMessage = 'Please fill in all fields.';
    }
  }
  
}
