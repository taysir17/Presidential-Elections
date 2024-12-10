import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../../services/candidate.service';
import { Comment } from "../../../classes/comment";  // Path to your comment class or interface
import { Candidate } from "../../../classes/candidate";
@Component({
  standalone:true,
  selector: 'app-candidate-details',
  imports: [CommonModule, FormsModule,],
  templateUrl: './candidate-details.component.html',
  styleUrl: './candidate-details.component.css'
})


export class CandidateDetailsComponent implements OnInit {
  candidateId: Candidate | undefined; // Add this property to store the candidate data
  newComment: string = ''; // To bind the new comment text input

  constructor(private route: ActivatedRoute, private candidateService: CandidateService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.candidateService.getCandidateById(id).subscribe(candidate => {
        this.candidateId = candidate;
      });
    }
  }

  toggleFavorite(candidate: Candidate): void {
    // Logic to toggle favorite
  }

  vote(candidate: Candidate): void {
    // Voting logic here
  }

  addComment(candidate: Candidate): void {
    const comment: Comment = {
      _id: '', // Handle the ID if needed
      userId: 'someUserId', // Replace with actual user data
      candidateId: candidate._id!,
      content: this.newComment,
      createdAt: new Date()
    };
    //this.candidateService.addComment(candidate._id, comment).subscribe(response => {
      // Handle the response after adding the comment
   // });
  }
}
