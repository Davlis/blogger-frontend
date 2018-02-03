import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    test : Date = new Date();

    showToken: boolean = false;

    constructor(public router: Router) { }

    ngOnInit() {}

    public goToHome() {
        // temp
        this.router.navigate(['/home']);
    }

    public sendRequest() {
        this.showToken = true;
    }

    public setPassword() {
        this.router.navigate(['/home']);
    }
}
