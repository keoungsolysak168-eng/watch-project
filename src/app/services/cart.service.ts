import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  reference: string;
  image: string;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  reference: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private wishlistItems = new BehaviorSubject<WishlistItem[]>([]);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only load from localStorage if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromLocalStorage();
    }
  }

  // Cart methods
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  addToCart(item: Omit<CartItem, 'quantity'>): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      this.cartItems.next([...currentItems]);
    } else {
      this.cartItems.next([...currentItems, { ...item, quantity: 1 }]);
    }
    
    this.saveToLocalStorage();
    this.showNotification('Added to cart!');
  }

  removeFromCart(itemId: string): void {
    const currentItems = this.cartItems.value;
    this.cartItems.next(currentItems.filter(item => item.id !== itemId));
    this.saveToLocalStorage();
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }
    
    const currentItems = this.cartItems.value;
    const item = currentItems.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.saveToLocalStorage();
    }
  }

  getCartTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.saveToLocalStorage();
  }

  // Wishlist methods
  getWishlistItems(): Observable<WishlistItem[]> {
    return this.wishlistItems.asObservable();
  }

  addToWishlist(item: WishlistItem): void {
    const currentItems = this.wishlistItems.value;
    if (!currentItems.find(wishlistItem => wishlistItem.id === item.id)) {
      this.wishlistItems.next([...currentItems, item]);
      this.saveToLocalStorage();
      this.showNotification('Added to wishlist!');
    } else {
      this.showNotification('Already in wishlist!');
    }
  }

  removeFromWishlist(itemId: string): void {
    const currentItems = this.wishlistItems.value;
    this.wishlistItems.next(currentItems.filter(item => item.id !== itemId));
    this.saveToLocalStorage();
  }

  isInWishlist(itemId: string): boolean {
    return this.wishlistItems.value.some(item => item.id === itemId);
  }

  // Local storage methods
  private saveToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
        localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems.value));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }

  private loadFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const cartData = localStorage.getItem('cart');
        const wishlistData = localStorage.getItem('wishlist');
        
        if (cartData) {
          this.cartItems.next(JSON.parse(cartData));
        }
        
        if (wishlistData) {
          this.wishlistItems.next(JSON.parse(wishlistData));
        }
      } catch (error) {
        console.error('Error loading cart/wishlist from localStorage:', error);
      }
    }
  }

  // Notification method
  private showNotification(message: string): void {
    // Only show notifications in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Create a simple notification
      const notification = document.createElement('div');
      notification.className = 'cart-notification';
      notification.textContent = message;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  }
}
