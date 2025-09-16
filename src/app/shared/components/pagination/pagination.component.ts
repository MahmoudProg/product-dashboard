import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() pageSize!: number;

  @Output() prevPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() pageSizeChange = new EventEmitter<number>();

  onPrevPage() {
    this.prevPage.emit();
  }

  onNextPage() {
    this.nextPage.emit();
  }

  onPageSizeChangeHandler(event: Event) {
    const value = +(event.target as HTMLSelectElement).value;
    this.pageSizeChange.emit(value);
  }

}
