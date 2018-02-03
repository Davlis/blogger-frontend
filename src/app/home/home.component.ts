import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
      left: true,
      middle: false,
      right: false
    };
    constructor(public router: Router) { }

    public user: any = {
      firstName: 'Dawid',
      lastName: 'Liszka',
    };

    public blogs: any[] = [
      {
        id: '1',
        title: 'My epic journey',
        tags: ['epic', 'journey'],
        photoUrl: 'assets/img/blog_1.jpg',
        owner: {
          firstName: 'Dawid',
          lastName: 'Liszka',
        }
      },
      {
        id: '2',
        title: 'Life is too short',
        tags: ['life', 'is', 'too', 'short'],
        photoUrl: 'assets/img/blog_1.jpg',
        owner: {
          firstName: 'Dawid',
          lastName: 'Liszka',
        }
      },
    ]

    public gotoBlog() {
      this.router.navigate(['/blog']);
    }

    ngOnInit() {}
}
