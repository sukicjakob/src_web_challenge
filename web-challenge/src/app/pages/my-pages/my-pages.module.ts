import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { MyPagesRoutes } from './my-pages.routing';
import { AppProductsComponent } from './products/products.component';
import { AppUsersComponent } from './users/users.component';
import { AppCartsComponent } from './carts/carts.component';
import { AppProductDetailsComponent } from './products/product-details.component';


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
    AppCartsComponent
  ],
})

export class MyPagesModule {}
