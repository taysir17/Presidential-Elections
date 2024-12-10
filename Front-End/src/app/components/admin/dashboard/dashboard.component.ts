import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CandidateService } from '../../../services/candidate.service';
import { CommentService } from '../../../services/comment.service';
import { ElectionService } from '../../../services/election.service';
import { Candidate } from '../../../classes/candidate';
import { Comment } from '../../../classes/comment';
import { ResultService } from '../../../services/results.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../classes/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  candidates: Candidate[] = [];
  users: User[] = [];
  comments: Comment[] = [];
  totalUsers: number = 0;
  totalVotes: number = 0;
  totalCandidates: number = 0;
  
  

  constructor(
    private candidateService: CandidateService,
    private commentService: CommentService,
    private electionService: ElectionService,
    private resultService: ResultService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCandidates();
    this.fetchComments();
    this.getPlatformStats();
  }

  fetchCandidates(): void {
    this.candidateService.getAllCandidates().subscribe(
      (candidates) => {
        this.candidates = candidates;
        this.totalCandidates = candidates.length;
      },
      (error) => {
        console.error('Error fetching candidates:', error);
      }
    );
  }

  fetchComments(): void {
    this.commentService.getCommentsByCandidate('all').subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  getPlatformStats(): void {
    // Fetch elections data
    this.electionService.getAllElections().subscribe((elections) => {
      this.totalVotes = elections.reduce((total, election) => total + election.voteCount, 0);
    });

    // Fetch users data
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
        this.totalUsers = users.length-1;  // Now it's correctly set
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }



  editCandidate(candidate: Candidate): void {
    this.router.navigate(['/edit-candidate', candidate._id]);
  }

  deleteCandidate(candidateId: string): void {
    this.candidateService.deleteCandidate(candidateId).subscribe(
      () => {
        this.candidates = this.candidates.filter(candidate => candidate._id !== candidateId);
      },
      (error) => {
        console.error('Error deleting candidate:', error);
      }
    );
  }

  approveComment(comment: Comment): void {
    // Implement your comment approval logic here
    console.log(`Approving comment for candidate ${comment.candidateId}`);
  }

  deleteComment(comment: Comment): void {
    if (comment._id) {
    this.commentService.deleteComment(comment._id).subscribe(
      () => {
        this.comments = this.comments.filter(c => c._id !== comment._id);
      },
      (error) => {
        console.error('Error deleting comment:', error);
      }
    );
  }else{
    console.error('Comment ID is undefined');
  }
  }
}
