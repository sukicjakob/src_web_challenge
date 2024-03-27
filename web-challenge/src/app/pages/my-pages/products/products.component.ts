import { Component, OnInit, inject } from '@angular/core';
import { Products } from './products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})

export class AppProductsComponent implements OnInit {

  productsList: Products[] = [];
  productsService: ProductsService = inject(ProductsService);

  constructor() {
    this.productsService.getAllProducts().then(
      (productsList: Products[]) => {
        this.productsList = productsList;
        console.log(this.productsList);
      }
    );
  }

  ngOnInit(): void {
  }
}
