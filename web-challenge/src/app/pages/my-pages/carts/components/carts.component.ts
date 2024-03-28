import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cart } from '../models/cart';
import { CartsService } from '../services/carts.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../products/models/product';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html'
})

export class AppCartsComponent implements OnInit {

  @Input() cart: Cart = {} as Cart;
  @Input() cartProducts = [] as Product[];
  
  cartsList: Cart[];
  filteredCartsList: Cart[];
  limitValue: number = 0;
  skipValue: number = 0;
  selectValue: string = "";
  imports: [
    CommonModule,
    ReactiveFormsModule
  ];

  constructor(private cartsService: CartsService) {
    this.getAllCarts();
  }

  getAllCarts(){
    this.cartsService.getAllCarts(this.limitValue, this.skipValue, this.selectValue).subscribe(res => {
      this.cartsList = res.carts ?? [];
      this.filteredCartsList = this.filteredCartsList;
    });
  }

  applySettings(){
    this.limitValue = parseInt((<HTMLInputElement>document.getElementById("limitInputField")).value);
    this.skipValue = parseInt((<HTMLInputElement>document.getElementById("skipInputField")).value);
    this.selectValue = (<HTMLInputElement>document.getElementById("selectInputField")).value;
    this.getAllCarts();
  }

  ngOnInit(): void {}
}
