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
  displayedColumns: string[] = ['user', 'total'];
  imports: [
    CommonModule,
    ReactiveFormsModule
  ];

  constructor(private cartsService: CartsService, private usersService: UsersService, private addCartDialog: MatDialog) {
    this.getAllCarts();
  }

  getAllCarts(){
    this.cartsService.getAllCarts().subscribe(res => {
      this.cartsList = res.carts ?? [];
      this.filteredCartsList = this.cartsList;

      this.filteredCartsList.forEach(cart => {
        this.usersService.getUser(cart.userId).subscribe(userRes => {
          cart.user = userRes;
        });
      });
    });
  }

  openAddCartDialog(){
    this.addCartDialog.open(AppAddCartDialog,{width:'50%'});
  }

  filterCarts(text: string){
    if(!text){
      this.filteredCartsList = this.cartsList;
      return;
    }

    this.filteredCartsList = this.cartsList.filter(cart => cart.user!.firstName.toLowerCase().includes(text.toLowerCase()));
  }

  ngOnInit(): void {}
}
