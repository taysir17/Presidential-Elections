import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../classes/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string): Observable<{ _id:string,role: string, mytoken: string }> {
    return this.http.post<{_id:string, role: string, mytoken: string }>(`${this.baseUrl}/login`, { email, password });
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, user);
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
