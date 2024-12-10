import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseChartDirective } from 'ng2-charts';  // Correct module import

import { Chart } from 'chart.js';




// Import your components here
import { HomeComponent } from './components/main/home/home.component';
import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CandidateListComponent } from './components/candidates/candidate-list/candidate-list.component';
import { CandidateDetailsComponent } from './components/candidates/candidate-details/candidate-details.component';
import { ResultsComponent } from './components/results/results/results.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AddCandidateComponent } from './components/admin/add-candidate/add-candidate.component';
import { EditCandidateComponent } from './components/admin/edit-candidate/edit-candidate.component';

import { FilterPipe } from './pipes/search.pipe';
import { SortPipe } from './pipes/sort.pipe';


// Import the RouterModule with your routes
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routes } from './app.routes';
import { AuthInterceptor } from './services/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,

    LoginComponent,
    RegisterComponent,
    ProfileComponent,

    CandidateListComponent,
    CandidateDetailsComponent,
    ResultsComponent,

    FilterPipe,
    SortPipe,
    DashboardComponent,
    AddCandidateComponent,
    EditCandidateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    Chart,
    BaseChartDirective,
    ReactiveFormsModule
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
