import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product ';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly BASE_URL = 'https://fakestoreapi.com/products';
  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL);
  }

  // Get product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/${id}`);
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
