import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CandidateService } from '../../../services/candidate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Candidate } from '../../../classes/candidate';

@Component({
  selector: 'app-add-candidate',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css'],
})
export class AddCandidateComponent implements OnInit {
  candidate = {
    _id:'',
    name: '',
    party: '',
    biography: '',
    program: '',
    photoUrl: '',
  };

  selectedFile: File | null = null;

  constructor(private router: Router, private candidateService: CandidateService) {}

  ngOnInit(): void {
    // Initialization logic (e.g., admin check) if necessary
  }

  // Handle file selection and preview
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview the selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.candidate.photoUrl = reader.result as string; // Store base64 string for preview or upload
      };
      reader.readAsDataURL(file);
    }
  }

  // Save candidate logic
  onSubmit(): void {
    if (
      this.candidate.name &&
      this.candidate.party &&
      this.candidate.biography &&
      this.candidate.program
    ) {
      // Create a new Candidate instance
      const newCandidate = new Candidate(
        this.candidate.name,
        this.candidate.party,
        this.candidate.biography,
        this.candidate.program,
        this.candidate.photoUrl
      );

      console.log('Candidate added:', newCandidate);

      // Call the backend service to save the candidate
      this.candidateService.addCandidate(newCandidate).subscribe(
        (response) => {
          console.log('Candidate saved successfully:', response);
          this.router.navigate(['/admin/dashboard']); // Navigate to the dashboard
        },
        (error) => {
          console.error('Error saving candidate:', error);
        }
      );
    } else {
      console.log('Please fill in all required fields');
    }
  }
}
