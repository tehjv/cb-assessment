import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean;

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.httpService.user.subscribe(value => {
      if (value) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  onLogout() {
    this.httpService.logUserOut();
    this.router.navigate(['/login']);
  }
}
