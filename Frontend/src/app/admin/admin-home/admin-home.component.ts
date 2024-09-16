import { Component, OnInit } from '@angular/core';
import { CafeService } from '../../cafe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {

  userName: string = '';
  constructor(private cafeservice: CafeService, private route: Router ) {
    // if (this.cafeservice.getUserName() !== null) {
    //   this.userName = this.cafeservice.getUserName();
    //   console.log("*******",this.userName);
    // }
    // this.cafeservice.isAdminLoginPresent();
  }

  ngOnInit(): void {
  }

  logoutLink(): void{
    this.cafeservice.adminLogout();
    return;
  }



}
