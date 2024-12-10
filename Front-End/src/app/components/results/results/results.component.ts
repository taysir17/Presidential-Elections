import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Candidate } from '../../../classes/candidate';
import { Election } from '../../../classes/election';
import { Result } from '../../../classes/result';
import { CandidateService } from '../../../services/candidate.service';
import { ElectionService } from '../../../services/election.service';
import { ResultService } from '../../../services/results.service';

@Component({
  standalone: true,
  selector: 'app-results',
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  electionId: string = '67516a0ef482bb1819b98ac7'; // This should be dynamically set or passed
  candidates: Candidate[] = [];
  results: Result[] = [];
  voteCounts: { [key: string]: number } = {};
  election: Election | null = null;
  
  constructor(
    private electionService: ElectionService,
    private resultService: ResultService,
    private candidateService: CandidateService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Fetch election data
    console.log('Fetching election data...');
    this.electionService.getElectionById(this.electionId).subscribe(election => {
      console.log('Election fetched:', election);
      this.election = election;
      this.loadResultsAndCandidates();
    }, error => {
      console.error('Error fetching election:', error);
    });
  }

  loadResultsAndCandidates(): void {
    console.log('Loading results and candidates...');
    
    // Get results for the election
    this.resultService.getResultsByElection(this.electionId).subscribe(results => {
      console.log('Results fetched:', results);
      this.results = results;
    }, error => {
      console.error('Error fetching results:', error);
    });
  
    // Get all candidates without filtering
    this.candidateService.getAllCandidates().subscribe(candidates => {
      console.log('Fetched candidates:', candidates);
      this.candidates = candidates; // No filtering based on election candidates
      
      // Fetch votes for each candidate
      const votePromises = this.candidates.map(candidate =>
        this.resultService.getVotesByCandidate(candidate._id!).toPromise()
      );
  
      // After all votes are fetched, update the charts
      Promise.all(votePromises).then(votesArray => {
        votesArray.forEach((votes, index) => {
          const candidate = this.candidates[index];
          console.log('Votes for candidate:', votes);
          this.voteCounts[candidate._id!] = votes?.length || 0;
        });
  
        this.updateCharts(); // Update charts after all votes are fetched
      }).catch(error => {
        console.error('Error fetching votes:', error);
      });
    }, error => {
      console.error('Error fetching candidates:', error);
    });
  }
  
  
  
  calculateVoteCounts(): void {
    // Calculate vote counts for each candidate
    console.log('Calculating vote counts...');
    this.voteCounts = this.results.reduce((acc, result) => {
      if (!acc[result.candidateId]) {
        acc[result.candidateId] = 0;
      }
      acc[result.candidateId]++;
      return acc;
    }, {} as { [key: string]: number });
    console.log('Vote counts:', this.voteCounts);
  }

  calculatePercentage(votes: number): number {
    const totalVotes = Object.values(this.voteCounts).reduce((acc, count) => acc + count, 0);
    const percentage = totalVotes ? (votes / totalVotes) * 100 : 0;
    console.log(`Percentage calculation for ${votes} votes: ${percentage}%`);
    return percentage;
  }

  updateCharts(): void {
    console.log('Updating charts...');
    // Create the vote chart
    this.createVoteChart();
    // Create the top candidates chart
    this.createTopCandidatesChart();
  }

  createVoteChart() {
    console.log('Creating vote chart...');
    const data = this.candidates.map(candidate => {
      const votes = this.voteCounts[candidate._id!] || 0;
      return { candidate: candidate.name, votes: votes };
    });

    const voteChart = new Chart('voteChart', {
      type: 'doughnut',
      data: {
        labels: data.map(item => item.candidate),
        datasets: [{
          label: 'Votes',
          data: data.map(item => item.votes),
          backgroundColor: ['#FF6F61', '#6B8E23', '#8A2BE2', '#FF4500', '#D2691E'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} votes`
            }
          }
        }
      }
    });
  }

  createTopCandidatesChart() {
    console.log('Creating top candidates chart...');
    const sortedCandidates = this.candidates.map(candidate => ({
      candidate,
      votes: this.voteCounts[candidate._id!] || 0
    })).sort((a, b) => b.votes - a.votes).slice(0, 5); // Get the top 5 candidates

    const topCandidatesChart = new Chart('topCandidatesChart', {
      type: 'bar',
      data: {
        labels: sortedCandidates.map(item => item.candidate.name),
        datasets: [{
          label: 'Votes',
          data: sortedCandidates.map(item => item.votes),
          backgroundColor: '#4CAF50',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} votes`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
