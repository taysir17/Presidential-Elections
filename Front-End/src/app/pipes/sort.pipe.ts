import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(candidates: any[], sortBy: string): any[] {
    if (!candidates || !sortBy) {
      return candidates;
    }
  
    return candidates.sort((a, b) => {
      // Handle sorting by 'favorites' or any other property
      if (sortBy === 'favorites') {
        return Number(b[sortBy]) - Number(a[sortBy]); // Descending order for favorites
      }
      // Handle other properties (like 'name', 'party', etc.)
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
  }
  
}
