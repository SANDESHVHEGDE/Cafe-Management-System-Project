import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CafeService } from '../../cafe.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  dob: string = "";
  phone: string = "";
  district: string = "";
  state: string = "";
  pincode: string = "";
  gender: string = "";
  address: string = "";
  confirmPassword: string = "";
  acceptTerms: boolean = false;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private bservice: CafeService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: any): void {
    if (form.valid) {
      this.signup();
    } else {
      console.log('Form is not valid');
    }
  }

  setDOB(event: any): void {
    const date: any = this.datePipe.transform(event?.value, 'yyyy-MM-dd');
    this.dob = date;
  }

  signup(): void {
    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dob,
      phoneNo: this.phone,
      gender: this.gender,
      address: this.address,
      district: this.district,
      state: this.state,
      pincode: this.pincode,
      emailId: this.email,
      password: this.password,
      role: "client"
    };

    console.log("Submitting data:", body);
    this.bservice.signUp(body).pipe(take(1)).subscribe(
      (res: any) => {
        console.log("Response:", res);
        if (res && res?.userId) {
          alert("Registration successful");
          this.router.navigate(["/user-login"]);
        }
      },
      err => {
        console.log("Error:", err);
        if (err && err?.error === 'Oops duplicate Entry of the data !') {
          alert("Email address already registered, please go to login.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    );
  }
  
}
 

