import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cart } from '../models/cart';
import { CartsService } from '../services/carts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './cart-details.component.html'
})

export class AppCartDetailsComponent implements OnInit {

  @Input() cart: Cart = {} as Cart;
  route: ActivatedRoute = inject(ActivatedRoute);
  cartId = -1;

  constructor(private cartsService: CartsService) {
    this.cartId = Number(this.route.snapshot.params['id']);
    this.cartsService.getCart(this.cartId).subscribe(res => {
      this.cart = res || {}; 
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cartId = params['id'];
    })
  }
}
