import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}
  getAllUsers(): Observable<User[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<User[]>(`${this.baseUrl}`, { headers });
  }

  getUserById(id: string): Observable<User> {
    const headers = this.createAuthHeaders();
    return this.http.get<User>(`${this.baseUrl}/getUserById/${id}`, { headers });
  }

  updateUser(id: string, user: User): Observable<User> {
    const headers = this.createAuthHeaders();
    return this.http.put<User>(`${this.baseUrl}/updateUser/${id}`, user, { headers });
  }

  // Helper method to get auth headers
  private createAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
