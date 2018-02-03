import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2Webstorage } from 'ngx-webstorage';

import { AuthService } from './services/auth.service';
import { DataService } from './api/data.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    Ng2Webstorage,
  ],
  providers: [
    AuthService,
    DataService,
    UserService,
  ],
  exports: [
  ]
})
export class CoreModule { }
