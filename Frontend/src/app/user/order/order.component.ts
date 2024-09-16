import { Component, OnInit } from '@angular/core';
import { CafeService } from '../../cafe.service';
import { Order } from '../../model/order.model';
import { take } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Customer } from '../../model/customer.model';

declare var Razorpay: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
 
  orderList: Order[] = [];
  tempOrderList: Order[] = [];
  customerId: any = '';
  selectedOrder: Order | undefined;
  ngZone: any;
  customer: Customer[] = [this.customerId = this.customerId];
  updateTotalPrice: any;
  

  constructor(private cafeservice: CafeService, private datePipe: DatePipe) { // Inject DatePipe
    this.customerId = this.cafeservice.getUserAuthorization();
  }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(): void {

    this.cafeservice.getPendingDetails(this.customerId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("updated total pricee",res)
        this.updateTotalPrice = res;
      });


    this.cafeservice.getAllUserOrders(this.customerId).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Order list:", res);
        if (!!res && Array.isArray(res)) {
          this.orderList = res;
            this.tempOrderList = res;
            
          this.orderList.forEach(order => {
            if (order.paymentStatus === 'Pending') {
              order.totalPrice = this.updateTotalPrice; // Update total price for pending orders
            }
          });
          
        }
      }, err => {
        console.log("Error fetching order list:", err);

      }
    );

  
  }

  getDate(d: string | undefined): string | null {
    if (d) {
      return this.datePipe.transform(d, 'yyyy-MM-dd') || null;
    }
    return null;
  }

  changeDate(ev: any): void {
    const selectedDate = ev.target.value; // Directly from the input field as a string
    if (selectedDate) {
      this.orderList = this.tempOrderList.filter((order: Order) => {
        const orderDate = this.datePipe.transform(order.orderDate, 'yyyy-MM-dd');
        return orderDate === selectedDate; // Compare the formatted dates
      });
    } else {
      this.orderList = this.tempOrderList; // Reset if no date is selected
    }
  }


  addPayment(order: Order): void {
    
    this.cafeservice.addPaymentOfOrder(order?.totalPrice).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>12333', res);
      console.log('****');
      if (res && res?.orderId) {
        this.openTransactionModel(res);
        this.selectedOrder = order;
      }
     
    }, error => {
      console.log("Error => ", error);
    })
  }


  openTransactionModel(response: any) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Cafe House',
      description: 'Payment of Cafe House',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        console.log('####', response);
        if(response!= null && response.razorpay_payment_id != null) {
          this.processResponse(response);
        } else {
          alert("Payment failed..")
        }
      
      },
      prefill : {
        name:'Nagaraju H S',
        email: 'Nagaraju@gmail.com',
        contact: '9898454565'
      },
      notes: {
        address: 'Cafe Management System'
      },
      theme: {
        color: '#528FF0'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }
 
  processResponse(resp: any) {
    
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>',resp);
    if (resp && resp?.razorpay_order_id && resp?.razorpay_payment_id && this.selectedOrder) {
      const body: any = {
        totalPrice: this.selectedOrder?.totalPrice,
        orderId: this.selectedOrder?.orderId,
       
        PaidDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd')?.toString(),
        paidAmount: this.selectedOrder?.totalPrice,
        customer: this.customer

      };
      console.log("$$$$$$$", body);
      this.cafeservice.addPayment(body, this.selectedOrder?.orderId, this.customerId).pipe(take(1)).subscribe(
        (res: any) => {
          console.log("*********", res);
          if (res && res?.paymentId) {
            alert("Payment done sucessfulyy");
            this.ngZone.run(() => {
              this.getOrderList();
            });
            
          }
        }, err => {
          console.log("error");
        }
      )
    }
  }

  
  deleteOrder(order: any){
    this.cafeservice.deleteOrderByCustomerId(order.orderId).pipe(take(1)).subscribe(
      (res: any) => {
        alert("Order deleted Successfully.");
      });
      alert("Order deleted Successfully.");
  }



}
