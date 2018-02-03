import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../+core/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  date : Date = new Date();

  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;

  constructor(public router: Router,
              public userService: UserService,) { }

  ngOnInit() {}

  async register() {
    try {

      await this.userService.register(Object.assign({}, {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      }))
      this.goToHome();
    } catch(err) {
      console.log(err);
    }
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }
}
