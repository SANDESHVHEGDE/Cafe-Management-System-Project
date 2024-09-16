import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CafeService } from '../../cafe.service';
import { FormBuilder } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errormessage: string = '';
  perrormessage: string = '';
  emailId: string = '';
  password: string = '';

  constructor(
    private route:Router,
    private  cafeservice:CafeService,
    private fb: FormBuilder) {}

    login(): void{
        if(this.emailId === '' || this.emailId === undefined)
        {
            this.errormessage = "Email address is blank";
            return;
        }

        const re = /\S+@\S+\.\S+/;
        if(!re.test(this.emailId)){
          this.errormessage="Email addresss not valid";
          return;
        }
        this.errormessage = '';

        if(this.password === '' || this.password === undefined){
            this.perrormessage = "Password is blank";
            return;
        }
        this.perrormessage='';

        const data:any = {
            "emailId":this.emailId,
            "password":this.password
        }

        // this.cafeservice.userSignIn(data).pipe(take(1)).subscribe((res:any)=>{
        //   console.log(data)

        //   if(res && res?.customerId)
        //   {
        //     alert("Login Successfully.");

        //     if(res?.role){
        //       this.cafeservice.storeUserRole(res?.role);
        //       // console.log(res?.role);
        //     }

        //     this.cafeservice.storeUserAuthorization(res?.customerId);
        //     console.log(res?.customerId);

        //     let firstName = '';
        //     if(res?.firstName){
        //       firstName+= res?.firstName; 
        //     }
        //     if(res?.lastName){
        //       firstName += ' '+res?.lastName;
        //     }
        //     console.log(firstName);

        //     this.cafeservice.storeUserName(firstName);

        //     console.log(res?.role);
        //     if(res?.role == 'admin'){
        //         this.route.navigate(['/admin/admin-home']);
        //     }else{+
        //         this.route.navigate(['/user/user-home']);
        //     }
        //   }
        // },err => {
        //   console.log("Error ", err);
        //   console.log(">>> ", err);
        //   if(err?.error && err?.error.startsWith("Customer  not found with")){
        //     alert("Customer email/password is invalid");
        //   }
        //   else{
        //     alert("Something going wrong in login! pls try again");
        //   }
        // })

        


        this.cafeservice.userSignIn(data).pipe(take(1)).subscribe(
          (res: any) => {
            console.log(data);
        
            if (res && res?.customerId) {
              alert("Login Successfully.");
        
              if (res?.role) {
                this.cafeservice.storeUserRole(res?.role);
                // console.log(res?.role);
              }
        
              this.cafeservice.storeUserAuthorization(res?.customerId);
              console.log(res?.customerId);
        
              let firstName = '';
              if (res?.firstName) {
                firstName += res?.firstName;
              }
              if (res?.lastName) {
                firstName += ' ' + res?.lastName;
              }
              console.log(firstName);
        
              this.cafeservice.storeUserName(firstName);
        
              console.log(res?.role);
              if (res?.role === 'admin') {
                this.route.navigate(['admin/']);
              } else if (res?.role === 'client'){
                this.route.navigate(['/user/']);
              }
            }
          },
          (err) => {
            console.error("Error: ", err);
        
            // Check if error has a specific message related to user not found
            if (err?.error && typeof err?.error === 'string' && err?.error.startsWith("Customer not found with")) {
              alert("Customer email/password is invalid");
            } 
            // Fallback for different error formats
            else if (err?.message) {
              console.log(`Error: ${err.message}`);
              alert("Customer email/password is invalid");
            } 
            // Generic error message
            else {
              alert("Something went wrong during login! Please try again.");
            }
          }
        );


    }

}
 