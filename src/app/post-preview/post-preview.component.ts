import { Component, OnInit } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { Router } from '@angular/router';

import {
  LinkModalComponent,
  PictureModalComponent
} from '../+shared';

declare var $;

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent implements OnInit {

  @LocalStorage()
  public viewHTML;

  constructor(public router: Router,) { }

  // TODO(dliszka): Issue token for preview.

  ngOnInit() {
    if (this.viewHTML === undefined) {
      console.error('Post preview failure')
      this.router.navigate(['/home']);
    }
  }

}

/*

  Blog creation
  Blog update

*/