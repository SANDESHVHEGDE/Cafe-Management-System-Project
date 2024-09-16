import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class CafeService {
  isLoggedIn() {
    throw new Error('Method not implemented.');
}
 
  url: string = 'http://localhost:8080';

  category: any = [{
    name: "ESPRESSO" , value: 0,
  }, {
    name: "ICED_AND_FROZEN", value: 1,
  }, {
    name: "SMOOTHIES", value: 2
  }, {
    name: "COFFEE", value:  3
  }, {
    name: " TEA_AND_COCOA", value:  4
  }, {
    name: "CHAI", value:  5
  },{
    name: "EXTRAS", value: 6
  }
]

  constructor(
    private http:HttpClient,
    private route:Router
  ) { }

  private expanded = new BehaviorSubject<boolean>(false);
  isExpanded = this.expanded.asObservable();

  toggleSidebar(): void {
    this.expanded.next(!this.expanded.value);
  }

  signUp(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customers/register", body);
  }

  userSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/customers/login", body);
  }

  storeUserAuthorization(token: string): void {
    localStorage.setItem("token", token);
  }  

  getUserAuthorization(): any {
    const token = localStorage.getItem("token");
    return token;
  }

  storeUserName(name: string): void {
    localStorage.setItem("userName", name);
  }

  getUserName(): any {
    const name = localStorage.getItem("userName");
    return name;
  }

  userLogout(): void {
    localStorage.clear();
    this.route.navigate(['']);
  }


//admin login
  adminSignIn(body: any): Observable<any> {
    return this.http.post(this.url + "/api/admin/login", body);
  }
  
  storeAdminAuthorization(token: string): void {
    localStorage.setItem("admin", token);
  }
  getAdminAuthorization(): any {
    const token = localStorage.getItem("admin");
    return token;
  }

  storeAdminUserName(name: string): void {
    localStorage.setItem("adminName", name);
  }

  getAdminName(): any {
    const name = localStorage.getItem("adminName");
    return name;
  }

  adminLogout(): void {
    localStorage.clear();
    this.route.navigate(['/']);
  }

  storeUserRole(role: string): void {
    localStorage.setItem("role", role);
  }

  getUserRole(): any {
    const role = localStorage.getItem("role");
    return role;
  }

  isAdminLoginPresent(): void {
    if (this.getAdminAuthorization() === null) {
      this.route.navigate(['/login']);
    }
  }
 
  isUserLoginPresent(): void {
    if (this.getUserAuthorization() === null) {
      this.route.navigate(['/login']);
    }
  }


  forgotPassword(body: any):Observable<any> {
    return this.http.post(this.url + "/api/customers/forgotpassword", body);
  }

  changePassword(customerId: any,password:any):Observable<any> {
    return this.http.post(this.url + "/api/customers/"+customerId+"/"+password,{});
  }


  addItem(body: any): Observable<any> {
    return this.http.post(this.url + "/api/menus/add", body);
  }

  getCategoryList(): any {
    return this.category;
  }

  getMenuById(itemId: any):Observable<any> {
    return this.http.get(this.url + "/api/menus/menu/"+itemId);
  }
  

  editItem(itemId: any, body: any):Observable<any> {
    return this.http.put(this.url + "/api/menus/edit/"+itemId, body);
  }
 
  getItemByCategory(categoryId: any):Observable<any>{
    return this.http.get(this.url + "/api/menus/category/"+categoryId);
  }

  getAllItems():Observable<any>{
    return this.http.get(this.url + "/api/menus/items");
  }

  deleteItem(itemId: any):Observable<any>{
    return this.http.delete(this.url + "/api/menus/delete/"+itemId);
  }
    
  getAllorderList():Observable<any>{
    return this.http.get(this.url + "/api/orders/order");
  }

  getMyOrderByCustomerId(customerId: any):Observable<any>{
    return this.http.get(this.url + "/api/myOrders/customer/"+customerId);
  }


  addToCart(cart: any, itemId: any, customerId: any):Observable<any>{
    return this.http.post(this.url + "/api/OrderItems/"+itemId+"/"+customerId, cart);
  }

  getCartItems(customerId: any):Observable<any>{
    return this.http.get(this.url + "/api/OrderItems/customer/"+customerId);
  }

  deleteCartItem(orderItemId: any):Observable<any>{
    return this.http.delete(this.url + "/api/OrderItems/deleting/"+orderItemId);
  }

  getAllCartItems():Observable<any>{
    return this.http.get(this.url + "/api/OrderItems/OrderItem");
  }

  insertOrder(customerId: any, order: any):Observable<any>{
    return this.http.post(this.url + "/api/orders/order/"+customerId, order);
  }

  getAllUserOrders(customerId: any):Observable<any>{
    return this.http.get(this.url + "/api/orders/customer/"+customerId);
  }

  addPayment(body:any,orderid:any,cid:any):Observable<any> {
    return this.http.post(this.url + "/api/payments/payment/"+orderid+"/"+cid, body);
  }

  addPaymentOfOrder(amount: any):Observable<any> {
    return this.http.get(this.url + "/api/orders/createTransaction/"+amount);
  }

  getCustomerData(customerId: any):Observable<any> {
    return this.http.get(this.url + "/api/customers/customer/"+customerId);
  }

  updateCustomer(customerId: any, customer: any):Observable<any> {
    return this.http.put(this.url + "/api/customers/update/"+customerId,customer);
  }

  getPendingDetails(customerId:any):Observable<any> {
    return this.http.get(this.url + "/api/OrderItems/pending/"+customerId);
  }

  deleteOrderByCustomerId(customerId:any):Observable<any> {
    return this.http.delete(this.url + "/api/orders/deleting/"+customerId);
  }

  deleteCartById(orderItemId: any):Observable<any>{
    return this.http.delete(this.url + "/api/OrderItems/delete/"+orderItemId);
  }

  getAllCustomers():Observable<any>{
    return this.http.get(this.url + "/api/customers");
  }

}
  