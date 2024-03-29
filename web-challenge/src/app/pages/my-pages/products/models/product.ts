import { Time } from "@angular/common"

export interface ProductsResponse {
    products: Product[],
    total: number,
    skip: number,
    limit: number
}

export interface Product {
    id?: number,
    title: string,
    description?: string,
    price: number,
    discountPercentage?: number,
    rating?: number,
    stock?: number,
    brand?: string,
    category?: string,
    thumbnail?: string,
    images?: string[],
    isDeleted?: boolean,
    deletedOn?: Time,
    quantity?: number,
}