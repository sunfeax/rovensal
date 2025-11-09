import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private dialog: MatDialog) {}

  readonly fallbackImage =
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';

  get coverImage(): string {
    const hasImage = Array.isArray(this.product?.images) && this.product.images.length > 0;
    return hasImage ? this.product.images[0] : this.fallbackImage;
  }

  openProductDetail(): void {
    this.dialog.open(ProductDialogComponent, {
      data: { product: this.product },
      width: '800px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'product-detail-modal'
    });
  }
}
