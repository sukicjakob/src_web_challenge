import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Product } from './product';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})

export class AppProductDetailsComponent implements OnInit {

  @Input() product: Product = {} as Product;
  route: ActivatedRoute = inject(ActivatedRoute);
  productId = -1;

  updateProductForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(0),
    discountPercentage: new FormControl(0.0),
    rating: new FormControl(0),
    stock: new FormControl(0),
    brand: new FormControl(''),
    category: new FormControl(''),
  })

  constructor(private productsService: ProductsService) {
    this.productId = Number(this.route.snapshot.params['id']);
    this.productsService.getProduct(this.productId).subscribe(res => {
      this.product = res || {}; 
    })
  }

  submitUpdateProduct(){
    let product: Product = {
      id: this.productId,
      title: this.updateProductForm.value.title ?? '',
      description: this.updateProductForm.value.description ?? '',
      price: this.updateProductForm.value.price ?? 0,
      discountPercentage: this.updateProductForm.value.discountPercentage ?? 0,
      rating: this.updateProductForm.value.rating ?? 0,
      stock: this.updateProductForm.value.stock ?? 0,
      brand: this.updateProductForm.value.brand ?? '',
      category: this.updateProductForm.value.category ?? ''
    }

    this.productsService.updateProduct(product).subscribe(res => {
      this.product = res;
    });
  }

  deleteProduct(){
    this.productsService.deleteProduct(this.product.id).subscribe(res => {
      console.log("Deleted product");
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    })
  }
}
