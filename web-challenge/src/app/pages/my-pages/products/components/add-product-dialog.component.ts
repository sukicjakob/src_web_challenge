import { Component, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ProductsService } from "../services/products.service";
import { Product } from "../models/product";
import { AppAddUserDialog } from "../../users/components/add-user-dialog.component";

@Component({
    selector: 'app-add-user-dialog',
    templateUrl: './add-product-dialog.component.html',
    styleUrls: ['./styles/products.component.scss']
  })

export class AppAddProductDialog{
  
    constructor(private productsService: ProductsService, private addProductDialog: MatDialogRef<AppAddUserDialog>){}
  
    addProductForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(0),
      discountPercentage: new FormControl(0.0),
      rating: new FormControl(0),
      stock: new FormControl(0),
      brand: new FormControl(''),
      category: new FormControl(''),
    })
  
    submitAddProduct(){
      let product: Product = {
        title: this.addProductForm.value.title ?? '',
        description: this.addProductForm.value.description ?? '',
        price: this.addProductForm.value.price ?? 0,
        discountPercentage: this.addProductForm.value.discountPercentage ?? 0,
        rating: this.addProductForm.value.rating ?? 0,
        stock: this.addProductForm.value.stock ?? 0,
        brand: this.addProductForm.value.brand ?? '',
        category: this.addProductForm.value.category ?? ''
      }

      this.productsService.addProduct(product).subscribe(res => {
        console.log(res)
      });

      this.closeAddProductDialog();
    }
  
    closeAddProductDialog(){
      this.addProductDialog.close();
    }
  }