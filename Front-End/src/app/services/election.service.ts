import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Election } from '../classes/election';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {
  private baseUrl = `${environment.apiUrl}/elections`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  addElection(election: Election): Observable<Election> {
    const headers = this.createAuthHeaders();
    return this.http.post<Election>(`${this.baseUrl}/addElection`, election, { headers });
  }

  getAllElections(): Observable<Election[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Election[]>(`${this.baseUrl}/getElections`, { headers });
  }

  getElectionById(id: string): Observable<Election> {
    const headers = this.createAuthHeaders();
    return this.http.get<Election>(`${this.baseUrl}/getElection/${id}`, { headers });
  }

  updateElection(id: string, election: Election): Observable<Election> {
    const headers = this.createAuthHeaders();
    return this.http.put<Election>(`${this.baseUrl}/updateElection/${id}`, election, { headers });
  }

  deleteElection(id: string): Observable<Election> {
    const headers = this.createAuthHeaders();
    return this.http.delete<Election>(`${this.baseUrl}/deleteElection/${id}`, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
