import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from '../classes/comment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  addComment(comment: Comment): Observable<Comment> {
    const headers = this.createAuthHeaders();
    return this.http.post<Comment>(`${this.baseUrl}/addComment`, comment, { headers });
  }

  getCommentsByCandidate(candidateId: string): Observable<Comment[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Comment[]>(`${this.baseUrl}/candidate/${candidateId}`, { headers });
  }

  deleteComment(id: string): Observable<Comment> {
    const headers = this.createAuthHeaders();
    return this.http.delete<Comment>(`${this.baseUrl}/deleteComment/${id}`, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
