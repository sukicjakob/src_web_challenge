import { Routes } from '@angular/router';


// pages
import { AppProductsComponent } from './products/components/products.component';
import { AppProductDetailsComponent } from './products/components/product-details.component';
import { AppUsersComponent } from './users/components/users.component';
import { AppCartsComponent } from './carts/components/carts.component';
import { AppUserDetailsComponent } from './users/components/user-details.component';
import { AppCartDetailsComponent } from './carts/components/cart-details.component';

export const MyPagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        component: AppProductsComponent,
      },
      {
        path: 'product/:id',
        component: AppProductDetailsComponent,
      },
      {
        path: 'users',
        component: AppUsersComponent,
      },
      {
        path: 'user/:id',
        component: AppUserDetailsComponent
      },
      {
        path: 'carts',
        component: AppCartsComponent,
      },
      {
        path: 'cart/:id',
        component: AppCartDetailsComponent
      }
    ],
  },
];
