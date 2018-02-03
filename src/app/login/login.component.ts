import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationUserService } from '../+core/services/application-user.service';

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
                public appUserService: ApplicationUserService,) { }

    ngOnInit() {}

    async login() {
        try {
            await this.appUserService.login({ email: this.email, password: this.password })
            this.goToHome();
        } catch(err) {
            console.log(err);
        }
    }

    public goToHome() {
        this.router.navigate(['/home']);
    }
}
