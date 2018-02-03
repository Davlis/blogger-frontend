import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../+core/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public date : Date = new Date();

    public email: string = '';
    public password: string = '';

    constructor(public router: Router,
                public userService: UserService,) { }

    ngOnInit() {}

    async login() {
        try {
            await this.userService.login({ email: this.email, password: this.password })
            this.goToHome();
        } catch(err) {
            console.log(err);
        }
    }

    public goToHome() {
        this.router.navigate(['/home']);
    }
}
