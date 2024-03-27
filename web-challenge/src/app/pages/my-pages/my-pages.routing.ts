import { Routes } from '@angular/router';


// pages
import { AppProductsComponent } from './products/products.component';
import { AppUsersComponent } from './users/users.component';
import { AppCartsComponent } from './carts/carts.component';

export const MyPagesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        component: AppProductsComponent,
      },
      {
        path: 'users',
        component: AppUsersComponent,
      },
      {
        path: 'carts',
        component: AppCartsComponent,
      },
    ],
  },
];
