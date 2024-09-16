import { Component, OnInit } from '@angular/core';
import { CafeService } from '../../cafe.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  url: string = "/home";
  userName: string = '';

  constructor(
    private cafeservice : CafeService,
    private router:Router
  ) {
    if (this.cafeservice.getUserName() !== null) {
      this.userName = this.cafeservice.getUserName();
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      this.url = event?.url;
    });

  }

  logoutLink(): void{
      this.cafeservice.userLogout();
      return;
  }
}
