import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from 'src/app/core/models/Product ';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProductListsComponent {

  products: Product[] = [];
  categories: string[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'all';
  loading = true;
  error: string | null = null;
  // trackById :number = 0

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = ['all', ...data];
      },
      error: () => {
        this.categories = ['all'];
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;

    if (category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.productService.getProductsByCategory(category).subscribe({
        next: (data) => (this.filteredProducts = data),
        error: () => (this.filteredProducts = [])
      });
    }
  }
}

