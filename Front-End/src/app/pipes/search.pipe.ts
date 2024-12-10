import { Pipe, PipeTransform } from '@angular/core';
import { Candidate } from '../classes/candidate';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(candidates: Candidate[], searchTerm: string): any[] {
    if (!candidates || !searchTerm) {
      return candidates;
    }
    return candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.party.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
