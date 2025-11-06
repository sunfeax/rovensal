import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  readonly fallbackImage =
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';

  get coverImage(): string {
    const hasImage = Array.isArray(this.product?.images) && this.product.images.length > 0;
    return hasImage ? this.product.images[0] : this.fallbackImage;
  }
}
