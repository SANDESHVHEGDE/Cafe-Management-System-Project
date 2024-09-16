import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './user/cart/cart.component';
import { LoginComponent } from './user/login/login.component';
import { MenuComponent } from './user/menu/menu.component';
import { MyOrderComponent } from './user/my-order/my-order.component';
import { OrderComponent } from './user/order/order.component';
import { ProfileComponent } from './user/profile/profile.component';

import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminMenulistComponent } from './admin/admin-menulist/admin-menulist.component';
import { AdminOrderlistComponent } from './admin/admin-orderlist/admin-orderlist.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './user/register/register.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { RouterModule } from '@angular/router';
import { ContanctComponent } from './contanct/contanct.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    CartComponent,
    LoginComponent,
    MenuComponent,
    MyOrderComponent,
    OrderComponent,
    ProfileComponent,
    AdminHomeComponent,
    AdminMenulistComponent,
    AdminOrderlistComponent,
    AdminProfileComponent,
    RegisterComponent,
    UserHomeComponent,
    ChangePasswordComponent,
    AddItemComponent,
    ContanctComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
