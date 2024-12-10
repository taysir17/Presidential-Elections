import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Check if the user has an 'admin' role in localStorage
    const user = localStorage.getItem('role');
    if (user === 'admin') {
      return true;
    }

    // If user is not an admin, redirect to the login page or another route
    this.router.navigate(['/login']);
    return false;
  }
}
