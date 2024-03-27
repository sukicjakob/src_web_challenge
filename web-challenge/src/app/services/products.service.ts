import { Injectable } from '@angular/core';
import { Products } from '../pages/my-pages/products/products';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  url = "https://dummyjson.com/products"

  async getAllProducts(): Promise<Products[]>{
    const data = await fetch(this.url);
    return await data.json();
  }

  constructor() {}
}
