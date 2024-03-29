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
import { ProductsService } from '../../products/services/products.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./styles/carts.component.scss']
})

export class AppCartDetailsComponent implements OnInit {

  @Input() cart: Cart = {} as Cart;
  @Input() cartUser: User = {} as User;
  @Input() productsInCart: Product[] = [];
  @Input() allUsers: User[] = [];
  @Input() allProducts: Product[] = [];

  route: ActivatedRoute = inject(ActivatedRoute);
  selectedProductId: number = -1
  cartUserId: number = -1
  updatingCart = false;
  cartDeleted = false;
  cartId = -1;
  addingProduct = false;
  productQuantity = 0;
  totalSum: number = 0.0;

  imports: [
    CommonModule,
    ReactiveFormsModule
  ];

  updateCartForm = new FormGroup({
    cartUserId: new FormControl(-1),
    productQuantity: new FormControl(1),
  })

  constructor(private cartsService: CartsService, private usersService: UsersService, private productsService: ProductsService) {
    this.cartId = Number(this.route.snapshot.params['id']);

    this.cartsService.getCart(this.cartId).subscribe(res => {
      this.cart = res || {}; 

      this.cartUserId = this.cart.user?.id!;

      this.usersService.getUser(this.cart.userId).subscribe(userRes => {
        this.cartUser = userRes;
      });

      this.usersService.getAllUsers(0, 0, "").subscribe(res => {
        this.allUsers = res.users ?? [];
      });

      this.productsService.getAllProducts(0, 0, "").subscribe(res => {
        this.allProducts = res.products ?? [];
      });
    });

  }

  submitUpdateCart(){
    if(!this.updatingCart){
      this.updatingCart  = true;
      return;
    }

    if(this.addingProduct){
      this.addToCart();
      this.selectedProductId = -1
      this.toggleAddProduct();
    }
    
    else{
      let updatedCart: Cart = {
        id: this.cartId,
        products: this.productsInCart,
        total: this.totalSum,
        userId: this.cartUserId
      };
  
      this.cartsService.updateCart(updatedCart).subscribe(res => {
        this.cart = res;
        this.usersService.getUser(this.cart.userId).subscribe(userRes => {
          this.cartUser = userRes;
        });
        console.log(res);
      });
      this.updatingCart = false;
    }
  }

  toggleAddProduct(){
    this.addingProduct = !this.addingProduct;
  }

  deleteCart(){
    this.cartsService.deleteCart(this.cart.id!).subscribe(res => {
      this.cartDeleted = res.isDeleted ?? false;
      this.ngOnInit();
    });
  }

  addToCart(){
    let quantity = this.updateCartForm.value.productQuantity ?? 0;
    this.productsService.getProduct(this.selectedProductId).subscribe(res => {
      res.quantity = quantity
      this.productsInCart.push(res);
      this.totalSum += res.price * quantity;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cartId = params['id'];
    })
  }
}
