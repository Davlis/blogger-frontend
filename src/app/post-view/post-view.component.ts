import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { Router } from '@angular/router';

import {
  LinkModalComponent,
  PictureModalComponent
} from '../+shared';

declare var $;

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {

  @LocalStorage()
  public viewHTML;

  constructor(public router: Router,) { }

  ngOnInit() {
    if (this.viewHTML === undefined) {
      console.error('Post view failure')
      this.router.navigate(['/home']);
    }
  }

}
