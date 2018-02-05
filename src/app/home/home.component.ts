import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  @LocalStorage()
  public user;

  constructor(public router: Router) {

  }

  ngOnInit() {}
  
  public gotoBlogCreate(): void {
    this.router.navigate(['/blog-create', 'new']); 
  }

  public gotoBlogList(): void {
    this.router.navigate(['/blog-list']);
  }

}
