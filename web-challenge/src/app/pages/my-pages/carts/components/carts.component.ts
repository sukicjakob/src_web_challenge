import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cart } from '../models/cart';
import { CartsService } from '../services/carts.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../products/models/product';
import { MatDialog } from '@angular/material/dialog';
import { AppAddCartDialog } from './add-cart-dialog.component';
import { User } from '../../users/models/user';
import { UsersService } from '../../users/services/users.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./styles/carts.component.scss']
})

export class AppCartsComponent implements OnInit {

  @Input() cart: Cart = {} as Cart;
  @Input() cartProducts = [] as Product[];

  cartsList: Cart[];
  filteredCartsList: Cart[];
  limitValue: number = 0;
  skipValue: number = 0;
  selectValue: string = "";
  displayedColumns: string[] = ['user', 'totalQuantity', 'total', 'discountedTotal'];
  imports: [
    CommonModule,
    ReactiveFormsModule
  ];

  constructor(private cartsService: CartsService, private usersService: UsersService, private addCartDialog: MatDialog) {
    this.getAllCarts();
  }

  getAllCarts(){
    this.cartsService.getAllCarts(this.limitValue, this.skipValue, this.selectValue).subscribe(res => {
      this.cartsList = res.carts ?? [];
      this.filteredCartsList = this.filteredCartsList;

      this.cartsList.forEach(cart => {
        this.usersService.getUser(cart.userId).subscribe(userRes => {
          cart.user = userRes;
        });
      });
    });
  }

  applySettings(){
    this.limitValue = parseInt((<HTMLInputElement>document.getElementById("limitInputField")).value);
    this.skipValue = parseInt((<HTMLInputElement>document.getElementById("skipInputField")).value);
    this.selectValue = (<HTMLInputElement>document.getElementById("selectInputField")).value;
    this.getAllCarts();
  }

  openAddCartDialog(){
    this.addCartDialog.open(AppAddCartDialog,{width:'50%'});
  }

  searchCarts(){

  }

  filterCarts(){

  }

  ngOnInit(): void {}
}
