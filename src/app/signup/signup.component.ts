import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();

    constructor(public router: Router) { }

    ngOnInit() {}

    public goToHome() {
        // temp
        this.router.navigate(['/home']);
    }
}
