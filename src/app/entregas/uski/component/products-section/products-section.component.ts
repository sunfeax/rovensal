import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent {
  private productService = inject(ProductService);

  products: Product[] = [];
  selectedProduct: Product | null = null;

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  openProductModal(product: Product) {
    this.selectedProduct = product;
  }

  closeProductModal() {
    this.selectedProduct = null;
  }
}
