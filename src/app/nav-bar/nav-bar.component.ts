import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  isUserAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  getUserName(): string {
    return this.auth.getUserName();
  }

}
