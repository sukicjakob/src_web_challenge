import { Time } from "@angular/common"
import { Product } from "../../products/models/product"

export interface CartsResponse {
    carts: Cart[],
    total: number,
    skip: number,
    limit: number
}

export interface Cart {
    id: number,
    products: Product[],
    total: number,
    discountedTotal: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number
}