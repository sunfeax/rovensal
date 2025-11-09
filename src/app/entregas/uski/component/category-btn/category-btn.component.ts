import { Component, Input } from '@angular/core';
import { Category } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-btn',
  imports: [CommonModule],
  templateUrl: './category-btn.component.html',
  styleUrl: './category-btn.component.css',
})
export class CategoryBtnComponent {
  @Input() category!: Category;
  @Input() isActive: boolean = false;
}
