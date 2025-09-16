// import { Component, EventEmitter, Output } from '@angular/core';

// @Component({
//   selector: 'app-filters',
//   templateUrl: './filters.component.html',
//   styleUrls: ['./filters.component.scss']
// })
// export class FiltersComponent {
//   searchTerm: string = '';
//   sortBy: string = '';
//   sortOrder: string = 'asc';

//   @Output() applyFilters = new EventEmitter<{ searchTerm: string; sortBy: string; sortOrder: string }>();

//   onSearchChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     this.searchTerm = input.value;
//     this.emitFilters();
//   }

//   onSortChange(event: Event): void {
//     const sortBy = (event.target as HTMLSelectElement).value;
//     this.sortBy = sortBy;
//     this.emitFilters();
//   }

//   onOrderChange(event: Event): void {
//     const order = (event.target as HTMLSelectElement).value;

//     this.sortOrder = order;
//     this.emitFilters();
//   }

//   private emitFilters(): void {
//     this.applyFilters.emit({
//       searchTerm: this.searchTerm,
//       sortBy: this.sortBy,
//       sortOrder: this.sortOrder
//     });
//   }
// }


import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  filtersVisible = false;
  Min_range = 1;
  Max_range = 1000;

  @Output() filtersApplied = new EventEmitter<{ searchTerm: string; sortBy: string; sortOrder: string; min: number; max: number }>();

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  _onPoint1Changed(val: number) {
    this.Min_range = val;
  }

  _onPoint2Changed(val: number) {
    this.Max_range = val;
  }

  applyFilters(searchTerm: string, sortBy: string, sortOrder: string) {
    this.filtersApplied.emit({
      searchTerm,
      sortBy,
      sortOrder,
      min: this.Min_range,
      max: this.Max_range
    });
    this.toggleFilters(); // close popup after apply
  }
}

