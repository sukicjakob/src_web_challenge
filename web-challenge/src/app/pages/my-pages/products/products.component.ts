import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})

export class AppProductsComponent implements OnInit {

  @Input() product: Product;
  productsList: Product[];
  filteredProductsList: Product[];
  categories: string[];
  selectedCategory: string;
  searchValue: string = "";
  limitValue: number = 0;
  skipValue: number = 0;
  selectValue: string = "";

  constructor(private productsService: ProductsService) {
    this.getAllProducts();
    this.getCategories();
  }

  getAllProducts(){
    if(!this.selectedCategory){
      this.productsService.getAllProducts(this.limitValue, this.skipValue, this.selectValue).subscribe(res => {
        this.productsList = res.products ?? [];
        this.filteredProductsList = this.productsList; 
      });
    }
    else{
      this.productsService.getProductsFromCategory(this.selectedCategory).subscribe(res => {
        this.productsList = res.products ?? [];
        this.filteredProductsList = this.productsList;
      });
    }
  }

  searchProducts(){
    this.searchValue = (<HTMLInputElement>document.getElementById("searchInputField")).value;

    if(!this.searchValue){
      this.ngOnInit();
      return;
    }

    this.productsService.searchProducts(this.searchValue).subscribe(res => {
    this.filteredProductsList = res.products ?? []});
  }

  filterProducts(text: string){
    if(!text){
      this.filteredProductsList = this.productsList;
      return;
    }

    this.filteredProductsList = this.productsList.filter(product => product?.title.toLowerCase().includes(text.toLowerCase()));
  }

  applySettings(){
    this.limitValue = parseInt((<HTMLInputElement>document.getElementById("limitInputField")).value);
    this.skipValue = parseInt((<HTMLInputElement>document.getElementById("skipInputField")).value);
    this.selectValue = (<HTMLInputElement>document.getElementById("selectInputField")).value;
    this.getAllProducts();
  }

  getCategories(){
    this.productsService.getCategories().subscribe(res => {
      this.categories = res;
      console.log("Categories: " + this.categories);
    });
  }

  setCategory(category: string){
    if(this.selectedCategory == category)
      this.selectedCategory = "";

    else
      this.selectedCategory = category;

    this.getAllProducts();
  }

  ngOnInit(): void {}
}
