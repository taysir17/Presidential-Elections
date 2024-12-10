import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CandidateService } from '../../../services/candidate.service';
import { User } from '../../../classes/user';
import { Candidate } from '../../../classes/candidate';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: User = new User('', '', '', 'voter', []); // Initialize with an empty user
  isEditing: boolean = false;
  favoritesNames: { id: string; name: string; isSelected: boolean }[] = [];
  newPassword: string = '';
  confirmPassword: string = '';
  selectedFile: File | null = null;

  constructor(
    private userService: UserService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Load user profile data
  loadUserProfile(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data) => {
          this.profile = data;
          this.loadFavoritesNames(data.favorites); // Fetch favorite names
        },
        (error) => {
          console.error('Error loading profile:', error);
          alert('Unable to load user profile. Please try again later.');
        }
      );
    }
  }

  // Fetch favorite candidates' names based on their IDs
  loadFavoritesNames(favoriteIds: string[]): void {
    favoriteIds.forEach((id) => {
      this.candidateService.getCandidateById(id).subscribe(
        (candidate) => {
          this.favoritesNames.push({ id: candidate._id!, name: candidate.name, isSelected: true }); // Push candidate to list
        },
        (error) => {
          console.error('Error loading favorite candidate:', error);
        }
      );
    });
  }

  // Handle file selection for profile picture update
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Optionally, preview the selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.profile.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Switch to edit mode
  onEditProfile(): void {
    this.isEditing = true;
  }

  // Save changes after editing
  onSaveChanges(): void {
    if (
      this.profile.name &&
      this.profile.email &&
      this.newPassword === this.confirmPassword // Ensure passwords match
    ) {
      // Remove unchecked favorites from the list
      const updatedFavorites = this.favoritesNames
        .filter((favorite) => favorite.isSelected)
        .map((favorite) => favorite.id);
  
      // Update profile with new password and favorites
      if (this.newPassword) {
        this.profile.password = this.newPassword;  // Plain text password to send to back-end
      }
  
      this.profile.favorites = updatedFavorites;

      // Add the profile picture to the profile object
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profile.profilePicture = reader.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      }
  
      console.log('Profile Updated', this.profile);
  
      // Make the HTTP request to update the profile
      this.userService.updateUser(this.profile._id!, this.profile).subscribe(
        (updatedUser) => {
          console.log('Profile successfully updated!', updatedUser);
          // Reset password fields and exit edit mode
          this.newPassword = '';
          this.confirmPassword = '';
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('There was an issue updating the profile. Please try again.');
        }
      );
    } else {
      alert('Please check your password and confirm it matches!');
    }
  }
}
