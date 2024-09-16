import { Component } from '@angular/core';
import { CafeService } from '../../cafe.service';
import { Order } from '../../model/order.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-orderlist',
  templateUrl: './admin-orderlist.component.html',
  styleUrl: './admin-orderlist.component.css'
})
export class AdminOrderlistComponent {

  orderList: Order[] = [];
  tempOrderList: Order[] = [];
  today = new Date();

  constructor(
    private cafeservice:CafeService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.cafeservice.isUserLoginPresent();
  }
 
  ngOnInit(): void {
    this.getOrderList();
  }
  getOrderList(): void {
    this.cafeservice.getAllorderList().pipe(take(1)).subscribe(
      (res: any) => {
        if (!!res && Array.isArray(res)) {
          this.orderList = res;
          this.tempOrderList = res;
        }
      }, err => {
        console.log("Error");
      }
    )
  }


   getDate(d: string | undefined): any {
    if (d) {
      return this.datePipe.transform(d, 'yyyy-MM-dd');
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

}
