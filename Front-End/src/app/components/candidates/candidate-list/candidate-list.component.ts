import { Component, OnInit } from "@angular/core";
import { CandidateService } from "../../../services/candidate.service";
import { CommentService } from "../../../services/comment.service";
import { ElectionService } from "../../../services/election.service"; // Added ElectionService for voting logic
import { Candidate } from "../../../classes/candidate";
import { Comment } from "../../../classes/comment";  
import { User } from "../../../classes/user";
import { AuthService } from "../../../services/auth.service"; // Added AuthService for current user data
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FilterPipe } from "../../../pipes/search.pipe";
import { SortPipe } from "../../../pipes/sort.pipe";
import { Vote } from "../../../classes/vote";
import { ResultService } from "../../../services/results.service";

@Component({
  standalone: true,
  selector: "app-candidate-list",
  imports: [FilterPipe, FormsModule, CommonModule],
  templateUrl: "./candidate-list.component.html",
  styleUrls: ["./candidate-list.component.css"],
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  sortedCandidates: Candidate[] = [];
  dropdownOpen: boolean = false;
  selectedSortOption: string = "name";
  searchTerm: string = "";
  selectedCandidate: Candidate | null = null;
  comments: Comment[] = [];
  newComment: string = "";
  currentUser: User | null = null; // For holding the logged-in user
  voteSuccessMessage: string | null = null;  // For displaying success message
  voteErrorMessage: string | null = null;    // For displaying error message
  isVoting: boolean = false;  // To handle the state when voting is in progress
  votedCandidateId: string | null = null;  // Store the ID of the voted candidate



  constructor(
    private candidateService: CandidateService,
    private commentService: CommentService,
    private resultService: ResultService,
    private authService: AuthService, // Injected AuthService for user data
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCandidates();
    this.loadCurrentUser(); // Load current user data
    
  }

  loadCandidates(): void {
    this.candidateService.getAllCandidates().subscribe({
      next: (data) => {
        this.candidates = data;
        this.sortedCandidates = [...this.candidates]; // Initialize sorted candidates
      },
      error: (err) => console.error('Error fetching candidates:', err)
    });
  }

  loadCurrentUser(): void {
    // Get user ID from localStorage
    const userId = localStorage.getItem('userId');
    console.log('userId from localStorage:', userId);
    if (userId) {
      this.authService.getUserById(userId).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.sort('favorites');
          console.log('Current user data:', user);
        },
        error: (err) => console.error('Error fetching user data:', err)
      });
    }
  }

  addComment(): void {
    if (!this.selectedCandidate || !this.newComment.trim()) return;

    // Get user ID from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No user ID found in localStorage');
      return;
    }

    const comment = new Comment(
      userId, // Use userId from localStorage
      this.selectedCandidate._id!,
      this.newComment,
      new Date()
    );

    console.log('Adding comment:', comment);

    this.commentService.addComment(comment).subscribe({
      next: (newComment) => {
        this.comments.push(newComment);  // Add new comment to the list
        this.newComment = '';  // Clear the input field
        console.log('Comment added successfully:', newComment);
      },
      error: (err) => {
        console.error('Error adding comment:', err);
        alert('Failed to add comment. Please try again later.');
      }
    });
  }

  loadComments(candidateId: string): void {
    this.commentService.getCommentsByCandidate(candidateId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => console.error('Error fetching comments:', err)
    });
  }

  sort(option: string): void {
    this.selectedSortOption = option;
    this.dropdownOpen = false;

    if (option === "name") {
      this.sortedCandidates.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "party") {
      this.sortedCandidates.sort((a, b) => a.party.localeCompare(b.party));
    } else if (option === "favorites") {
      // Sort by favorite status, candidates in the favorites list are prioritized
      this.sortedCandidates = this.candidates.filter(candidate => this.currentUser?.favorites.includes(candidate._id!))
        .concat(this.candidates.filter(candidate => !this.currentUser?.favorites.includes(candidate._id!)));
    }
  }

  toggleFavorite(candidate: Candidate): void {
    if (!this.currentUser) return;

    const isFavorite = this.currentUser.favorites.includes(candidate._id!);
    if (isFavorite) {
      // Remove from favorites
      this.currentUser.favorites = this.currentUser.favorites.filter(id => id !== candidate._id);
    } else {
      // Add to favorites
      this.currentUser.favorites.push(candidate._id!);
    }

    this.authService.updateUser(this.currentUser._id!, this.currentUser).subscribe({
      next: () => {
        this.sort(this.selectedSortOption); // Re-sort after updating favorites
      },
      error: (err) => console.error('Error updating favorites:', err)
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  openModal(candidate: Candidate): void {
    this.selectedCandidate = candidate;
    this.loadComments(candidate._id!); // Load comments for the selected candidate
    const modal = new bootstrap.Modal(document.getElementById('candidateModal')!);
    modal.show();
  }

  closeModal(): void {
    this.selectedCandidate = null;
  }

  vote(candidateId: string): void {
    if (!this.currentUser) return;

    // Get user ID from localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No user ID found in localStorage for voting');
      return;
    }

    const electionId = '6750a27ac89ba11dda45b9b9';  // Replace with actual election ID
    const vote = new Vote(
      userId,  
      candidateId,
      electionId,
      new Date()
    );

    console.log('Submitting vote:', vote);

    this.resultService.addVote(vote).subscribe({
      next: (response) => {
        console.log('Voted successfully:', response);
        this.votedCandidateId = candidateId;  // Store the voted candidate ID
        this.voteErrorMessage = '';  // Clear any previous error message
        this.voteSuccessMessage = 'Vote submitted successfully!';

        // Move the voted candidate to the top of the list
        this.sortedCandidates = this.sortedCandidates.sort((a, b) => {
          if (a._id === this.votedCandidateId) return -1;  // Move voted candidate to the top
          return 0;
        });
      },
      error: (err) => {
        console.error('Error voting:', err);
        if (err.error && err.error.message) {
          this.voteErrorMessage = err.error.message;
        } else {
          this.voteErrorMessage = 'Failed to vote. Please try again later.';
        }
      }
    });
  }
}
