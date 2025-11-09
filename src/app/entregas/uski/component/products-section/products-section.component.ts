import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Category } from './../../interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CategoryBtnComponent } from '../category-btn/category-btn.component';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-products-section',
  standalone: true,
  imports: [ProductCardComponent, CategoryBtnComponent, FormsModule],
  templateUrl: './products-section.component.html',
  styleUrl: './products-section.component.css',
})
export class ProductsSectionComponent {
  private productService = inject(ProductService);
  private catService = inject(CategoryService);

  products: Product[] = [];
  categories: Category[] = [];
  searchQuery = '';
  originalProducts: Product[] = [];
  selectedCategoryId: number = 0; // categoria All por defecto 

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    // obtener todos los productos de API
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.originalProducts = [...products];
    });

    // obtener todas las categorias de API y añadir categoria "All"
    this.catService.getAllCategories().subscribe((categories) => {
      this.categories = [{ 
        id: 0,
        name: 'All',
        image: '',
        slug: 'all',
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, ...categories]
    });
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        // obtener el texto de input
        map((event: Event) => (event.target as HTMLInputElement).value),
        // esperar hasta el usuario parará a escribir
        debounceTime(300),
        // si cambia letra por la misma no hacemos nada
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        this.searchProducts(searchTerm);
      });
  }

  searchProducts(term: string) {
    const query = term.toLowerCase().trim();

    // si input está vacio mostramos todos los productos
    if (!query) {
      this.products = this.originalProducts;
      return;
    }
    // buscar por palabra clave en nombre o en categoria o en descripción del producto y filtrarlos
    this.products = this.originalProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category?.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    );
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    
    if (id === 0) {
      this.products = this.originalProducts;
    } else {
      this.products = this.originalProducts.filter(
        product => product.category?.id === id
      );
    }
  }

}
