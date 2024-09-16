import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CafeService } from '../../cafe.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  dob: string = "";
  phone: string = "";
  district: string = "";
  state: string = "";
  zipcode: string = "";
  gender: string = "";
  address: string = "";
  isPasswordValid: boolean = false;
  isPasswordFocused: boolean = false; 

  constructor(
    
    private router: Router,
    private datePipe: DatePipe,
    private cafeservice: CafeService

  ) { }

  ngOnInit(): void {
  }
  
  setDOB(ev: any): void {
    const date: any = this.datePipe.transform(ev?.value, 'yyyy-MM-dd');
    this.dob = date;
  }

  validatePassword(): void {
    const pattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    this.isPasswordValid = pattern.test(this.password);
  }

  onPasswordFocus(focused: boolean): void {
    this.isPasswordFocused = focused;  // Update focus state
  }

  signup(): void {
    if (this.firstName === '' || this.firstName.length < 3) {
      alert('FirstName must contain atleast 3 characters');
      return ;
    }
    if (this.lastName === '' || this.lastName.length < 2) {
      alert('LastName must contain atleast 2 characters');
      return;
    }

    if (this.phone === '' || this.phone.length < 10 || this.phone.length > 10) {
      alert('Phone must contain atleast 10 characters');
      return;
    }
    const pattern=/^[6789][0-9]{9}$/;
    if (!pattern.test(this.phone)) {
      alert('Invalid mobile number.');
      return;
    }
    if (this.district === '' || this.district.length < 3) {
      alert('District must contain atleast 3 characters');
      return;
    }
    if (this.state === '' || this.state.length < 3) {
      alert('State must contain atleast 3 characters');
      return;
    }
    if (this.zipcode === '' || this.zipcode.length < 6) {
      alert('Zipcode must contain atleast 6 characters');
      return;
    }
    if (!this.isPasswordValid) {
      alert('Password does not meet the requirements');
      return;
    }
    const body: any = {
      firstName : this.firstName,
      lastName : this.lastName,
      dateOfBirth :this.dob,
      phoneNo : this.phone,
      gender :this.gender,
      address: this.address,
      district : this.district,
      state: this.state,
      zipCode :this.zipcode,
      emailId :this.email,
      password:this.password,
      role: "client" 
     
    }
    console.log("=======>",body);
    this.cafeservice.signUp(body).pipe(take(1)).subscribe((res :any) => {
      console.log("*****",res);
      if(res && res?.customerId){
        alert("Registration sucessful");
        this.router.navigate(["/login"]);
      }
    }, err =>{
        console.log("Error  ", err);
        if (err && err?.error === 'Oops duplicate Entry of the data !') {
          alert("Email address registered already, please go to login.");
        } else {
          alert("Something going wrong..pls try again");
        }
    }) 

  }

}
