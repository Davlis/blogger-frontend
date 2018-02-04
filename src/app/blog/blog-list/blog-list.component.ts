import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

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

  constructor(public router: Router) { }

  ngOnInit() {}

  public goToHome() {
    this.router.navigate(['/home']);
  }

  public gotoBlog(blog) {
    this.router.navigate(['/blog', blog.id]);
  }
}
