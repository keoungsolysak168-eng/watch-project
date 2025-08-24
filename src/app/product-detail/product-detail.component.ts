import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService, WishlistItem } from '../services/cart.service';

interface Product {
  id: string;
  name: string;
  reference: string;
  price: string;
  priceValue: number; // Add numeric price for cart
  image: string;
  description?: string;
  features?: string[];
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  isInWishlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.product = this.getProductById(productId);
      
      if (!this.product) {
        this.router.navigate(['/product']);
      } else {
        // Check if product is in wishlist
        this.checkWishlistStatus();
      }
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart({
        id: this.product.id,
        name: this.product.name,
        price: this.product.priceValue,
        reference: this.product.reference,
        image: this.product.image
      });
    }
  }

  toggleWishlist(): void {
    if (this.product) {
      if (this.isInWishlist) {
        this.cartService.removeFromWishlist(this.product.id);
        this.isInWishlist = false;
      } else {
        this.cartService.addToWishlist({
          id: this.product.id,
          name: this.product.name,
          price: this.product.priceValue,
          reference: this.product.reference,
          image: this.product.image
        });
        this.isInWishlist = true;
      }
    }
  }

  private checkWishlistStatus(): void {
    if (this.product) {
      this.cartService.getWishlistItems().subscribe(items => {
        this.isInWishlist = items.some(item => item.id === this.product?.id);
      });
    }
  }

  private getProductById(id: string): Product | undefined {
    const products: Product[] = [
      {
        id: 'classic-aviavi1953-edition',
        name: 'Classic AVI AVI 1953 Edition',
        reference: 'Y233801A1B1X1',
        price: '$ 5,900',
        priceValue: 5900, // Add numeric price
        image: '../../assets/images/Classic AVI AVI 1953 Edition.jpg',
        description: 'A timeless classic that pays homage to the golden age of aviation. This 1953 edition features the iconic design that made Breitling famous.',
        features: ['42mm case diameter', 'Automatic movement', 'Water resistant to 30m', 'Leather strap', 'Chronograph function']
      },
      {
        id: 'classic-aviavi1953-re-edition',
        name: 'Classic AVI AVI Ref. 765 1953 Re-Edition',
        reference: 'SB04451A1B1X1',
        price: '$ 12,250',
        priceValue: 12250, // Add numeric price
        image: '../../assets/images/Classic AVI AVI Ref. 765 1953 Re-Edition.jpg',
        description: 'The legendary Ref. 765 reimagined for the modern era. This limited edition captures the essence of the original while incorporating contemporary craftsmanship.',
        features: ['46mm case diameter', 'Manual winding movement', 'Water resistant to 50m', 'Steel bracelet', 'Limited edition']
      },
      {
        id: 'classic-aviavi1964-re-edition',
        name: 'Classic AVI AVI Ref. 765 1964 Re-Edition',
        reference: 'R233801A1B1X1',
        price: '$ 20,500',
        priceValue: 20500, // Add numeric price
        image: '../../assets/images/Classic AVI AVI Ref. 765 1964 Re-Edition.jpg',
        description: 'A sophisticated re-edition of the 1964 classic, featuring premium materials and exceptional attention to detail.',
        features: ['46mm case diameter', 'Automatic chronograph', 'Water resistant to 100m', 'Premium leather strap', 'Exclusive movement']
      },
      {
        id: 'classic-aviavi-chronograph-mosquito',
        name: 'Classic AVI Chronograph 42 Mosquito',
        reference: 'A233801A1C1A1',
        price: '$ 6,100',
        priceValue: 6100, // Add numeric price
        image: '../../assets/images/Classic AVI Chronograph 42 Mosquito.jpg',
        description: 'Inspired by the legendary de Havilland Mosquito aircraft, this chronograph combines aviation heritage with modern precision.',
        features: ['42mm case diameter', 'Automatic chronograph', 'Water resistant to 30m', 'Steel bracelet', 'Tachymeter scale']
      },
      {
        id: 'classic-aviavi-chronograph-p51-mustang',
        name: 'Classic AVI Chronograph 42 P-51 Mustang',
        reference: 'Y233801A1B1X1',
        price: '$ 5,900',
        priceValue: 5900, // Add numeric price
        image: '../../assets/images/Classic AVI Chronograph 42 P-51 Mustang.jpg',
        description: 'A tribute to the iconic P-51 Mustang fighter aircraft, featuring precision engineering and classic aviation aesthetics.',
        features: ['42mm case diameter', 'Automatic chronograph', 'Water resistant to 30m', 'Leather strap', 'Vintage-inspired dial']
      },
      {
        id: 'classic-aviavi-chronograph-corsair',
        name: 'Classic AVI Chronograph 42 Tribute to Vought F4U Corsair',
        reference: 'SB04451A1B1X1',
        price: '$ 12,250',
        priceValue: 12250, // Add numeric price
        image: '../../assets/images/Classic AVI Chronograph 42 Tribute to Vought F4U Corsair.jpg',
        description: 'Honoring the legendary F4U Corsair, this chronograph features distinctive design elements inspired by the aircraft\'s unique inverted gull wing.',
        features: ['42mm case diameter', 'Automatic chronograph', 'Water resistant to 30m', 'Steel bracelet', 'Unique dial design']
      },
      {
        id: 'classic-aviavi-super-avi-curtiss-warhawk',
        name: 'Classic AVI Super AVI B04 Chronograph GMT 46 Curtiss Warhawk',
        reference: 'R233801A1B1X1',
        price: '$ 20,500',
        priceValue: 20500, // Add numeric price
        image: '../../assets/images/Classic AVI Super AVI B04 Chronograph GMT 46 Curtiss Warhawk.jpg',
        description: 'A sophisticated GMT chronograph inspired by the Curtiss P-40 Warhawk, featuring advanced functionality and premium materials.',
        features: ['46mm case diameter', 'GMT function', 'Water resistant to 100m', 'Premium leather strap', '24-hour display']
      },
      {
        id: 'classic-aviavi-super-avi-mosquito',
        name: 'Classic AVI Super AVI B04 Chronograph GMT 46 Mosquito',
        reference: 'A233801A1C1A1',
        price: '$ 6,100',
        priceValue: 6100, // Add numeric price
        image: '../../assets/images/Classic AVI Super AVI B04 Chronograph GMT 46 Mosquito.jpg',
        description: 'The legendary Mosquito aircraft inspires this advanced GMT chronograph, combining heritage with cutting-edge technology.',
        features: ['46mm case diameter', 'GMT function', 'Water resistant to 100m', 'Steel bracelet', 'Dual time zone']
      },
      {
        id: 'classic-aviavi-super-avi-p51-mustang-2',
        name: 'Classic AVI Super AVI B04 Chronograph GMT 46 P-51 Mustang (2)',
        reference: 'Y233801A1B1X1',
        price: '$ 5,900',
        priceValue: 5900, // Add numeric price
        image: '../../assets/images/Classic AVI Super AVI B04 Chronograph GMT 46 P-51 Mustang (2).jpg',
        description: 'A special edition tribute to the P-51 Mustang, featuring enhanced GMT functionality and exclusive design elements.',
        features: ['46mm case diameter', 'GMT function', 'Water resistant to 100m', 'Exclusive leather strap', 'Special edition dial']
      },
      {
        id: 'classic-aviavi-super-avi-p51-mustang',
        name: 'Classic AVI Super AVI B04 Chronograph GMT 46 P-51 Mustang',
        reference: 'SB04451A1B1X1',
        price: '$ 12,250',
        priceValue: 12250, // Add numeric price
        image: '../../assets/images/Classic AVI Super AVI B04 Chronograph GMT 46 P-51 Mustang.jpg',
        description: 'The iconic P-51 Mustang inspires this premium GMT chronograph, featuring exceptional craftsmanship and aviation heritage.',
        features: ['46mm case diameter', 'GMT function', 'Water resistant to 100m', 'Premium steel bracelet', 'Aviation-inspired design']
      },
      {
        id: 'classic-aviavi-super-avi-corsair',
        name: 'Classic AVI Super AVI B04 Chronograph GMT 46 Tribute to Vought F4U Corsair',
        reference: 'R233801A1B1X1',
        price: '$ 20,500',
        priceValue: 20500, // Add numeric price
        image: '../../assets/images/Classic AVI Super AVI B04 Chronograph GMT 46 Tribute to Vought F4U Corsair.jpg',
        description: 'A sophisticated tribute to the F4U Corsair, featuring advanced GMT functionality and distinctive design elements.',
        features: ['46mm case diameter', 'GMT function', 'Water resistant to 100m', 'Exclusive leather strap', 'Unique case design']
      },
      {
        id: 'navitimer-b01-chronograph',
        name: 'Navitimer B01 Chronograph 46',
        reference: 'A233801A1C1A1',
        price: '$ 6,100',
        priceValue: 6100, // Add numeric price
        image: '../../assets/images/Navitimer B01 Chronograph 46.jpg',
        description: 'The legendary Navitimer, featuring the in-house B01 movement and the iconic slide rule bezel that made it famous among pilots.',
        features: ['46mm case diameter', 'B01 automatic movement', 'Water resistant to 30m', 'Steel bracelet', 'Slide rule bezel']
      }
    ];

    return products.find(p => p.id === id);
  }

  goBack(): void {
    this.router.navigate(['/product']);
  }
}
