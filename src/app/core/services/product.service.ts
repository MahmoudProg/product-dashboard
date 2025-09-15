import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/Product ';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly BASE_URL = 'https://fakestoreapi.com/products';

    // cache: productId -> { data, expiry }
  private cache = new Map<number, { data: Product; expiry: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL);
  }

  // Get product by ID with cache
  getProductById(id: number): Observable<Product> {
    const now = Date.now();
    const cached = this.cache.get(id);

    if (cached && cached.expiry > now) {
      return of(cached.data);
    }

    return new Observable<Product>((observer) => {
      this.http.get<Product>(`${this.BASE_URL}/${id}`).subscribe({
        next: (product) => {
          this.cache.set(id, { data: product, expiry: now + this.TTL });
          observer.next(product);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  // Get all categories
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/categories`);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/category/${category}`);
  }
}
