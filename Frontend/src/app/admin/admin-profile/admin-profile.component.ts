import { Component, OnInit } from '@angular/core';
import { CafeService } from '../../cafe.service';
import { Customers } from '../../model/customers.model';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit{

  // customers: Customers[] = [];  // To hold the list of customers

  // constructor(private cafeservice: CafeService) { }

  // ngOnInit(): void {
  //   this.getAllCustomers();
  // }

  // // Method to fetch all customers
  // getAllCustomers(): void {
  //   this.cafeservice.getAllCustomers().subscribe(
  //     (res: Customers[]) => {
  //       this.customers = res;  // Assign the result to customers array
  //       console.log('Customers:', this.customers);
  //     },
  //     err => {
  //       console.error('Error fetching customers:', err);
  //     }
  //   );
  // }


  customers: Customers[] = [];  // To hold the list of customers
  roles: string[] = ['admin', 'client'];  // Available roles to select from

  constructor(private cafeservice: CafeService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  // Method to fetch all customers
  getAllCustomers(): void {
    this.cafeservice.getAllCustomers().subscribe(
      (res: Customers[]) => {
        this.customers = res;  // Assign the result to customers array
        console.log('Customers:', this.customers);
      },
      err => {
        console.error('Error fetching customers:', err);
      }
    );
  }

  // Method to update the customer role
  updateCustomerRole(customer: Customers): void {
    // Call the service method to update the customer
    this.cafeservice.updateCustomer(customer.customerId, customer).subscribe(
      res => {
        console.log(`Customer ${customer.customerId} updated successfully`, res);
        alert(`Customer ${customer.firstName} ${customer.lastName}'s role updated to ${customer.role}`);
      },
      err => {
        console.error(`Error updating customer ${customer.customerId}`, err);
      }
    );
  }


}
