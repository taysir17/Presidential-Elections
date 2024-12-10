import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../../../classes/candidate';
import { CandidateService } from '../../../services/candidate.service';

@Component({
  selector: 'app-edit-candidate',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {
  candidateForm!: FormGroup;
  candidateId!: string;
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';
  selectedFile: File | null = null;

  candidate: Candidate = {
    _id: '',
    name: '',
    party: '',
    biography: '',
    program: '',
    photoUrl: ''
  };

  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the candidate ID from the route parameters
    this.candidateId = this.route.snapshot.paramMap.get('id')!;
    console.log('Candidate ID:', this.candidateId); // Debugging candidate ID

    // Initialize the form group with form controls
    this.candidateForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      party: new FormControl('', [Validators.required]),
      biography: new FormControl('', [Validators.required]),
      program: new FormControl('', [Validators.required]),
      photoUrl: new FormControl('')
    });

    // Fetch the candidate details
    this.getCandidateDetails();
  }

  // Fetch candidate details and prepopulate the form
  getCandidateDetails(): void {
    console.log('Fetching candidate details...'); // Debugging fetch

    this.loading = true;
    this.candidateService.getCandidateById(this.candidateId).subscribe(
      (candidate: Candidate) => {
        console.log('Candidate data received:', candidate); // Debugging candidate data

        this.loading = false;
        // Fill the form with the candidate data
        this.candidate = candidate; // Store candidate data in the component
        this.candidateForm.patchValue({
          name: candidate.name,
          party: candidate.party,
          biography: candidate.biography,
          program: candidate.program,
          photoUrl: candidate.photoUrl || '' // If no photo, set empty string
        });
      },
      error => {
        this.loading = false;
        console.error('Error fetching candidate:', error); // Debugging error
        this.errorMessage = 'Failed to load candidate details';
      }
    );
  }

  // Handle form submission
  onSubmit(): void {
    if (this.candidateForm.invalid) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }

    console.log('Submitting form with values:', this.candidateForm.value);  // Log the form values

    this.loading = true;

    // Update candidate with form values
    this.candidate.name = this.candidateForm.get('name')?.value;
    this.candidate.party = this.candidateForm.get('party')?.value;
    this.candidate.biography = this.candidateForm.get('biography')?.value;
    this.candidate.program = this.candidateForm.get('program')?.value;

    // If a new photo is selected, update the photoUrl
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.candidate.photoUrl = reader.result as string; // Store base64 string for preview or upload
      };
      reader.readAsDataURL(this.selectedFile);
    }

    // Call the service to update the candidate
    this.candidateService.updateCandidate(this.candidateId, this.candidate).subscribe(
      (response) => {
        console.log('Update success response:', response); // Log the response
        this.loading = false;
        this.successMessage = 'Candidate updated successfully!';
        this.router.navigate(['/admin/dashboard']); // Navigate after success
      },
      (error) => {
        this.loading = false;
        console.error('Error updating candidate:', error);  // Log any error
        this.errorMessage = 'Failed to update candidate details';
      }
    );
  }

  // Handle photo file change
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name); // Debugging file selection
      this.selectedFile = file;
    }
  }
}
