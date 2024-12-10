import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string = '';
  isAdmin: boolean = false; // To determine if the user is an admin

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.tokenService.isLoggedIn();
    if (this.isLoggedIn) {
      const userId = localStorage.getItem('userId');
      const userRole = localStorage.getItem('role'); // Check the role in localStorage
      this.isAdmin = userRole === 'admin'; // Set isAdmin to true if the role is admin

      if (userId) {
        this.authService.getUserById(userId).subscribe(user => {
          this.userName = user.name;
        });
      }
    }
  }

  logout(): void {
    this.tokenService.removeToken();
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
