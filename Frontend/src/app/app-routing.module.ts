import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { MenuComponent } from './user/menu/menu.component';
import { OrderComponent } from './user/order/order.component';
import { MyOrderComponent } from './user/my-order/my-order.component';
import { CartComponent } from './user/cart/cart.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminMenulistComponent } from './admin/admin-menulist/admin-menulist.component';
import { AdminOrderlistComponent } from './admin/admin-orderlist/admin-orderlist.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { ContanctComponent } from './contanct/contanct.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';


const routes: Routes = [
 { path:"",redirectTo:"home",pathMatch:"full"},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContanctComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'change-password', component: ChangePasswordComponent},


  {path:'admin',children:[   
    { path: 'admin-home', component: AdminHomeComponent},
    { path: 'admin-menulist', component: AdminMenulistComponent},
    { path: 'admin-orderlist', component: AdminOrderlistComponent},
    { path: 'admin-profile', component: AdminProfileComponent},
    { path: 'add-item', component: AddItemComponent }
  ]},
 

  {path:'user',children:[   
    { path: 'user-home', component: UserHomeComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'order', component: OrderComponent },
    { path: 'myOrder', component: MyOrderComponent },
    { path: 'cart', component: CartComponent },
    { path: 'user-login', component: LoginComponent },
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    scrollPositionRestoration: 'enabled', // Restores scroll to top on navigation
    anchorScrolling: 'enabled' // Allows anchor scrolling
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
