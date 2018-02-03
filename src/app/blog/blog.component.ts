import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
    test : Date = new Date();

    public user: any = {
      firstName: 'Dawid',
      lastName: 'Liszka',
    };

    public blog: any = {
        id: '1',
        title: 'My epic journey',
        tags: ['epic', 'journey'],
        photoUrl: 'assets/img/blog_1.jpg',
        owner: {
          firstName: 'Dawid',
          lastName: 'Liszka',
        }
    };

    constructor(public router: Router) { }

    ngOnInit() {}

    public goToHome() {
        // temp
        this.router.navigate(['/home']);
    }
}
