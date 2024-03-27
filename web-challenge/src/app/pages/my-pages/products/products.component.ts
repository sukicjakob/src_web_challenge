import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})

export class AppProductsComponent implements OnInit {

  @Input() product: Product;
  productsList: Product[];
  
  constructor(private productsService: ProductsService) {
    this.productsService.getAllProducts().subscribe(res => {
      this.productsList = res.products ?? []; 
    })
  }

  ngOnInit(): void {}
}
