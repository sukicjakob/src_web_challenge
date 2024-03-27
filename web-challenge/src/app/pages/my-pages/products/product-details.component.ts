import { Component, Input, OnInit, inject } from '@angular/core';
import { Product } from './product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})

export class AppProductDetailsComponent implements OnInit {

  @Input() product: Product;
  route: ActivatedRoute = inject(ActivatedRoute);
  productId = -1;

  constructor(private productsService: ProductsService) {
    this.productId = Number(this.route.snapshot.params['id']);
    this.productsService.getProduct(this.productId).subscribe(res => {
      this.product = res || {}; 
    })
  }

  ngOnInit(): void {}
}
