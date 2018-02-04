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

  public gotoBlogCreate(): void {
    this.router.navigate(['/blog-create', 'new']); 
  }

  public gotoBlogList(): void {
    this.router.navigate(['/blog-list']);
  }

}
