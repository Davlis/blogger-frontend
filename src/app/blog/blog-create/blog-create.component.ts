import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent implements OnInit {

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
    this.router.navigate(['/home']);
  }
}
