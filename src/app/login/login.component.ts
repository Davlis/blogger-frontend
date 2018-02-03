import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    test : Date = new Date();

    constructor(public router: Router) { }

    ngOnInit() {}

    public goToHome() {
        // temp
        this.router.navigate(['/home']);
    }
}
