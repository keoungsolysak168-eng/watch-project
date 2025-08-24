import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, WishlistItem } from '../services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.getWishlistItems().subscribe(items => {
      this.wishlistItems = items;
    });
    
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  addToCart(id: string, name: string, price: number, reference: string, image: string): void {
    this.cartService.addToCart({
      id,
      name,
      price,
      reference,
      image
    });
  }

  toggleWishlist(id: string, name: string, price: number, reference: string, image: string): void {
    if (this.isInWishlist(id)) {
      this.cartService.removeFromWishlist(id);
    } else {
      this.cartService.addToWishlist({
        id,
        name,
        price,
        reference,
        image
      });
    }
  }

  isInWishlist(id: string): boolean {
    return this.wishlistItems.some(item => item.id === id);
  }
}
