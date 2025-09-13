import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/Product ';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProductListsComponent {

   products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

  trackByProductId(index: number, product: Product): number {
  return product.id;
}
}
