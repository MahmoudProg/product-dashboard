import { Product } from 'src/app/core/models/Product ';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';


describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // يتأكد إن مفيش requests مفتوحة
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    const dummyProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        description: 'Desc 1',
        category: 'Category 1',
        image: 'image1.jpg',
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        title: 'Product 2',
        price: 200,
        description: 'Desc 2',
        category: 'Category 2',
        image: 'image2.jpg',
        rating: { rate: 4.0, count: 5 },
      },
    ];

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should fetch product by ID and cache it', () => {
    const dummyProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'Desc 1',
      category: 'Category 1',
      image: 'image1.jpg',
      rating: { rate: 4.5, count: 10 },
    };

    // أول طلب
    service.getProductById(1).subscribe((product) => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);

    // ثاني طلب يجيب من الـ cache بدون HTTP
    service.getProductById(1).subscribe((product) => {
      expect(product).toEqual(dummyProduct);
    });

    httpMock.expectNone('https://fakestoreapi.com/products/1');
  });

  it('should fetch all categories', () => {
    const dummyCategories = ['Category 1', 'Category 2'];

    service.getCategories().subscribe((categories) => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(dummyCategories);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/categories');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCategories);
  });

  it('should fetch products by category', () => {
    const dummyProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 100,
        description: 'Desc 1',
        category: 'Category 1',
        image: 'image1.jpg',
        rating: { rate: 4.5, count: 10 },
      },
    ];

    service.getProductsByCategory('Category 1').subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/category/Category 1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });
});
