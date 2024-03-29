import { Component, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Cart } from "../models/cart";
import { CartsService } from "../services/carts.service";

@Component({
    selector: 'app-add-user-dialog',
    templateUrl: './add-cart-dialog.component.html',
    styleUrls: ['./styles/carts.component.scss']
  })

export class AppAddCartDialog{
  
    @Input() cart: Cart = {} as Cart;
    selectedGender: string = "";
    constructor(private cartsService: CartsService, private addCartDialog: MatDialogRef<AppAddCartDialog>){}
  
    addUserForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      birthDate: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      postalCode: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl('')
    })
  
    submitAddCart(){
      
          let cart: Cart = {
            id: 0,
            products: [],
            total: 0,
            discountedTotal: 0,
            userId: 0,
            totalProducts: 0,
            totalQuantity: 0
          };

          this.cartsService.addCart(cart).subscribe(res => {
            console.log(res)
          });

          this.closeAddCartDialog();
    }
  
    closeAddCartDialog(){
      this.addCartDialog.close();
    }
  }