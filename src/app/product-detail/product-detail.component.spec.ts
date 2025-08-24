import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from '../services/cart.service';

import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      params: of({ id: 'classic-aviavi1953-edition' })
    });
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockCartService = jasmine.createSpyObj('CartService', ['addToCart', 'addToWishlist', 'removeFromWishlist', 'getWishlistItems']);

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: CartService, useValue: mockCartService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product details on init', () => {
    expect(component.product).toBeDefined();
    expect(component.product?.name).toBe('Classic AVI AVI 1953 Edition');
  });

  it('should navigate back to products page', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/product']);
  });

  it('should add product to cart', () => {
    component.addToCart();
    expect(mockCartService.addToCart).toHaveBeenCalled();
  });

  it('should toggle wishlist status', () => {
    component.toggleWishlist();
    expect(mockCartService.addToWishlist).toHaveBeenCalled();
  });
});
