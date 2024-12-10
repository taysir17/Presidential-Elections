import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CandidateListComponent } from './components/candidates/candidate-list/candidate-list.component';
import { CandidateDetailsComponent } from './components/candidates/candidate-details/candidate-details.component';
import { ResultsComponent } from './components/results/results/results.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ErrorComponent } from './components/main/error/error.component';
import { NgModule } from '@angular/core';
import { AddCandidateComponent } from './components/admin/add-candidate/add-candidate.component';
import { EditCandidateComponent } from './components/admin/edit-candidate/edit-candidate.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },  
  { path: 'candidates', component: CandidateListComponent },
  { path: 'candidate/:id', component: CandidateDetailsComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },  
  { path: 'add-candidate', component: AddCandidateComponent, canActivate: [AuthGuard, AdminGuard] },  
  { path: 'edit-candidate/:id', component: EditCandidateComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', title: 'Erreur', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
