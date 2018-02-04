import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2Webstorage } from 'ngx-webstorage';

import { DataService } from './api/data.service';
import { AuthService } from './services/auth.service';
import { ApplicationUserService } from './services/application-user.service';
import { SearchService } from './services/search.service';

import { BlogService } from './api/blog.service';
import { PostService } from './api/post.service';
import { UserService } from './api/user.service';

@NgModule({
  imports: [
    CommonModule,
    Ng2Webstorage,
  ],
  providers: [
    DataService,
    AuthService,
    ApplicationUserService,
    SearchService,
    UserService,
    BlogService,
    PostService,
  ],
  exports: [
  ]
})
export class CoreModule { }
