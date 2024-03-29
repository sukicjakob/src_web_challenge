import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MyPagesRoutes } from './my-pages.routing';
import { AppProductsComponent } from './products/components/products.component';
import { AppUsersComponent } from './users/components/users.component';
import { AppAddUserDialog } from './users/components/add-user-dialog.component';
import { AppCartsComponent } from './carts/components/carts.component';
import { AppProductDetailsComponent } from './products/components/product-details.component';
import { AppUserDetailsComponent } from './users/components/user-details.component';
import { AppCartDetailsComponent } from './carts/components/cart-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MyPagesRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  declarations: [
    AppProductsComponent,
    AppProductDetailsComponent,
    AppUsersComponent,
    AppUserDetailsComponent,
    AppCartsComponent,
    AppCartDetailsComponent,
    AppAddUserDialog
  ],
})

export class MyPagesModule {}
