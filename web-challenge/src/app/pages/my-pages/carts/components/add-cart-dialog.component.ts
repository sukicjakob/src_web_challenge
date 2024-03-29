import { Component, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Cart } from "../models/cart";
import { CartsService } from "../services/carts.service";
import { User } from "../../users/models/user";
import { ProductsService } from "../../products/services/products.service";
import { UsersService } from "../../users/services/users.service";
import { Product } from "../../products/models/product";

@Component({
    selector: 'app-add-user-dialog',
    templateUrl: './add-cart-dialog.component.html',
    styleUrls: ['./styles/carts.component.scss']
  })

export class AppAddCartDialog{
  
    @Input() cart: Cart = {} as Cart;
    @Input() cartUser: User = {} as User;
    @Input() allUsers: User[] = [];
    @Input() allProducts: Product[] = [];
    @Input() cartProducts: Product[] = [];

    selectedProductId: number = -1
    cartUserId: number = -1
    totalSum: number = 0.0;
    addingProduct = false;
    productQuantity = 0;
    
    selectedGender: string = "";
    constructor(private cartsService: CartsService, private usersService: UsersService, 
      private productsService: ProductsService, private addCartDialog: MatDialogRef<AppAddCartDialog>){
        
        this.usersService.getAllUsers(0, 0, "").subscribe(res => {
          this.allUsers = res.users ?? [];
        });

        this.productsService.getAllProducts(0,0,"").subscribe(res => {
          this.allProducts = res.products;
        })
    }
  
    addCartForm = new FormGroup({
      cartUserId: new FormControl(-1),
      productQuantity: new FormControl(1),
    })
  
    submitAddCart(){

      if(this.addingProduct){
        this.addToCart();
        this.selectedProductId = -1
        this.toggleAddProduct();
      }
      
      else{
        let cart: Cart = {
          products: this.cartProducts,
          total: this.totalSum,
          userId: this.cartUserId
        };

        this.cartsService.addCart(cart).subscribe(res => {
          console.log(res)
        });
  
        this.closeAddCartDialog();
      }
    }
  
    closeAddCartDialog(){
      this.addCartDialog.close();
    }

    toggleAddProduct(){
      this.addingProduct = !this.addingProduct;
    }

    addToCart(){
      let quantity = this.addCartForm.value.productQuantity ?? 0
      this.productsService.getProduct(this.selectedProductId).subscribe(res => {
        this.cartProducts.push(res);
        this.totalSum += res.price * quantity;
        return;
      });
    }
  }