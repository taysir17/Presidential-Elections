import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidate } from '../classes/candidate';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private baseUrl = `${environment.apiUrl}/candidates`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  addCandidate(candidate: Candidate): Observable<Candidate> {
    const headers = this.createAuthHeaders();
    return this.http.post<Candidate>(`${this.baseUrl}/addCandidat`, candidate, { headers });
  }

  getAllCandidates(): Observable<Candidate[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Candidate[]>(`${this.baseUrl}/getAllCandidats`, { headers });
  }

  getCandidateById(id: string): Observable<Candidate> {
    const headers = this.createAuthHeaders();
    return this.http.get<Candidate>(`${this.baseUrl}/getCandidat/${id}`, { headers });
  }

  updateCandidate(id: string, candidate: Candidate): Observable<Candidate> {
    const headers = this.createAuthHeaders();
    return this.http.put<Candidate>(`${this.baseUrl}/updateCandidat/${id}`, candidate, { headers });
  }

  deleteCandidate(id: string): Observable<Candidate> {
    const headers = this.createAuthHeaders();
    return this.http.delete<Candidate>(`${this.baseUrl}/deleteCandidat/${id}`, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
