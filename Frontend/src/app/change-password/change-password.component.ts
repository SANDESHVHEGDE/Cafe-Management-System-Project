import { Component } from '@angular/core';
import { CafeService } from '../cafe.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  emailId: string= '';
  isShowChangePassword: boolean = false;
  newPassword: string = '';
  user: any;

  constructor(
    private cafeservice: CafeService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (!this.emailId) {
      alert("Please enter a valid email.");
      return;
    }

    const body = {
      emailId: this.emailId
    };

    this.cafeservice.forgotPassword(body).pipe(take(1)).subscribe({
      next: (res) => {
        if (res?.emailId) {
          this.user = res;
          this.isShowChangePassword = true;
          console.log(this.user);
        } else {
          alert("User not found. Please enter a valid email.");
        }
      },
      error: (err) => {
        console.error(err);
        alert("Error while fetching user details. Please try again.");
      }
    });
  }

  onChangePassword(): void {
    this.user.password = this.newPassword;
    this.cafeservice.changePassword(this.user?.customerId,this.newPassword).pipe(take(1)).subscribe((res) => {
      if (res && res.customerId) {
        alert("Password changed successfully");
        this.route.navigate(["/login"]);
      }
    }, error => {
      alert("Error occured while changing password.");
    });
  }


}
