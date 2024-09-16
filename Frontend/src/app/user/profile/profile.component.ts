import { Component, OnInit } from '@angular/core';
import { CafeService } from '../../cafe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  customerId: any;
  customer: any = {};

  constructor(private cafeservice: CafeService) {}

  ngOnInit(): void {
    this.customerId = this.cafeservice.getUserAuthorization();
    this.getCustomerData(this.customerId).subscribe(data => {
      this.customer = data;
      console.log("customer >>>>>>",this.customer);
    });
  }

  getCustomerData(customerId: any): Observable<any> {
    return this.cafeservice.getCustomerData(customerId);

  }

  updateCustomer(): void {
    const body: any = {
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      dateOfBirth: this.customer.dateOfBirth, // Ensure this matches the backend expected field
      phoneNo: this.customer.phoneNo,
      gender: this.customer.gender,
      address: this.customer.address,
      district: this.customer.district,
      state: this.customer.state,
      zipCode: this.customer.zipCode, // Ensure this matches the backend expected field
      emailId: this.customer.emailId // Ensure this matches the backend expected field
    }

    console.log("body >>>>>>",body);
  
    this.cafeservice.updateCustomer(this.customerId, body).subscribe(response => {
      console.log('Customer updated successfully:', response);
    }, error => {
      console.error('Error updating customer:', error);
    });
  }
  
}
