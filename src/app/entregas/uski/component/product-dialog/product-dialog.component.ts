import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css',
})
export class ProductDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { product: Product }) {}
  
  readonly fallbackImage = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';
}