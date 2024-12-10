import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Result } from '../classes/result';
import { TokenService } from './token.service';
import { Vote } from '../classes/vote';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  vote(vote: Vote) {
    throw new Error("Method not implemented.");
  }
  private baseUrl = `${environment.apiUrl}/votes`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getResultsByElection(electionId: string): Observable<Result[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Result[]>(`${this.baseUrl}/election/${electionId}`, { headers });
  }

  addResult(result: Result): Observable<Result> {
    const headers = this.createAuthHeaders();
    return this.http.post<Result>(`${this.baseUrl}/addResult`, result, { headers });
  }
  addVote(vote: Vote): Observable<Result> {
    const headers = this.createAuthHeaders();
    return this.http.post<Result>(`${this.baseUrl}/castVote`, vote, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getVotesByCandidate(candidateId: string): Observable<Vote[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Vote[]>(`${this.baseUrl}/candidate/${candidateId}`, { headers });
  }
}
