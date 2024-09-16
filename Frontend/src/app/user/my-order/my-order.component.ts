import { Component, OnInit } from '@angular/core';
import { CafeService } from '../../cafe.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})

export class MyOrderComponent implements OnInit {

  orders: any[] = [];  // Holds the fetched orders

  constructor(private cafeService: CafeService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    const userId = this.getUserAuthorization();
    this.cafeService.getMyOrderByCustomerId(userId).subscribe((response: any) => {
      // Process response to group items by order
      console.log("My Orders>>>>>>>>>>"+response);
      this.orders = this.groupOrdersByOrderId(response);
    }, error => {
      console.error("Error fetching orders:", error);
    });
  }

  getUserAuthorization(): any {
    const token = localStorage.getItem("token");
    return token;
  }

  groupOrdersByOrderId(orders: any[]): any[] {
    const groupedOrders: any = {};

    orders.forEach(order => {
      const orderId = order.order.orderId;
      if (!groupedOrders[orderId]) {
        groupedOrders[orderId] = {
          orderId: orderId,
          orderDate: order.order.orderDate,
          orderStatus: order.order.orderStatus,
          paymentStatus: order.order.paymentStatus,
          customer: order.customer,
          totalPrice: order.order.totalPrice,
          items: []
        };
      }
      // Push menu items under the same order
      groupedOrders[orderId].items.push({
        itemName: order.menu.itemName,
        price: order.menu.price,
        quantity: order.quantity
      });
    });

    // Convert grouped object to an array
    return Object.values(groupedOrders);
  }
  
}


