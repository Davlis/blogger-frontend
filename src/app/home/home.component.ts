import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(public router: Router) {

  }

  ngOnInit() {}

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

  public gotoBlogCreate(): void {
    this.router.navigate(['/blog-create']); 
  }

  public gotoBlogList(): void {
    this.router.navigate(['/blog-list']);
  }

}
