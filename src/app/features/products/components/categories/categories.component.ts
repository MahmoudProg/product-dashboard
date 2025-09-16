import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  @Input() categories: string[] | null = [];
  @Input() selectedCategory: string | null = null;
  @Output() categorySelect = new EventEmitter<string>();

  selectCategory(category: string): void {
    this.categorySelect.emit(category);
  }
}
