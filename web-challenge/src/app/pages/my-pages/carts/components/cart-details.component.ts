import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cart } from '../../carts/models/cart';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../products/models/product';
import { User } from '../../users/models/user';
import { UsersService } from '../../users/services/users.service';
import { CartsService } from '../services/carts.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./styles/carts.component.scss']
})

export class AppCartDetailsComponent implements OnInit {

  @Input() cart: Cart = {} as Cart;
  @Input() cartUser: User = {} as User;
  @Input() productsInCart: Product[] = [];

  route: ActivatedRoute = inject(ActivatedRoute);
  updatingCart = false;
  cartDeleted = false;
  cartId = -1;

  imports: [
    CommonModule,
    ReactiveFormsModule
  ];

  updateCartForm = new FormGroup({

  })

  constructor(private cartsService: CartsService, private usersService: UsersService) {
    this.cartId = Number(this.route.snapshot.params['id']);

    if(!this.updatingCart)
      this.updateCartForm.disable();

    this.cartsService.getCart(this.cartId).subscribe(res => {
      this.cart = res || {}; 

      this.usersService.getUser(this.cart.userId).subscribe(userRes => {
        this.cartUser = userRes;
      });
    });

  }

  submitUpdateCart(){
    this.updatingCart = !this.updatingCart;

    if(!this.updatingCart){
      this.updateCartForm.disable();
  
      this.cartsService.updateCart(this.cart).subscribe(res => {
        this.cartDeleted = res.isDeleted ?? false;
      });

      return;
    }
    this.updateCartForm.enable();
  }

  deleteUser(){
    this.cartsService.deleteCart(this.cart.id!).subscribe(res => {
      this.cartDeleted = res.isDeleted ?? false;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cartId = params['id'];
    })
  }
}
