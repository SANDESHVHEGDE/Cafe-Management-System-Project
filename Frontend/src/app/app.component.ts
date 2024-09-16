import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CafeService } from './cafe.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CafeManagementSystem';
  
  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(
    private route:Router,
    private cafeservice:CafeService)
    {
      this.route.events.pipe(
        filter(event => event instanceof NavigationStart)
      ).subscribe((event: any) => {
        if (this.cafeservice.getUserRole() !== null && this.cafeservice.getUserRole() === "client") {
          setTimeout(() => {
            this.isLoggedIn = true;
            this.isAdminLoggedIn = false;
          }, 100);
        } else {
          console.log('>>>>>>', this.cafeservice.getUserRole());
          if (this.cafeservice.getUserRole() !== null && this.cafeservice.getUserRole() === "admin") {
            setTimeout(() => {
              console.log("11111111111");
              this.isAdminLoggedIn = true;
              this.isLoggedIn = false;
              
            }, 100);
          } {
            setTimeout(() => {
              console.log("222222222");
              this.isLoggedIn = false;
              this.isAdminLoggedIn = false;
            }, 1);
          }
        }
      });


      // this.route.events.pipe(
      //   filter(event => event instanceof NavigationStart)
      // ).subscribe((event: any) => {
      //   const role = this.cafeservice.getUserRole();
      //   if (role === "client") {
      //     this.isLoggedIn = true;
      //     this.isAdminLoggedIn = false;
      //   } else if (role === "admin") {
      //     this.isAdminLoggedIn = true;
      //     this.isLoggedIn = false;
      //   } else if (role === "client"){
      //     this.isLoggedIn = false;
      //     this.isAdminLoggedIn = false;
      //   }
      // });


    }





}
