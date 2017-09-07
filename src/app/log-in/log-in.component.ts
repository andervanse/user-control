import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
  `]
})
export class LogInComponent implements OnInit {

  emailMessages: string[];
  passwordMessages: string[];
  showInvalidLoginTempted = false;

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(values: any): void {

    this.authService.login(values.email, values.password)
      .subscribe(
      res => {
        this.showInvalidLoginTempted = false;
        this.emailMessages = null;
        this.passwordMessages = null;
        this.router.navigate(['home']);
      },
      err => {
        if (err.error) {
          this.showInvalidLoginTempted = false;
          const error = JSON.parse(err.error);
          this.emailMessages = error.Email;
          this.passwordMessages = error.Password;
        } else {
          this.showInvalidLoginTempted = true;
        }
      }
      );

  }

  cancel(): void {
    this.router.navigate(['home']);
  }
}

