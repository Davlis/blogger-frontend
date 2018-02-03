import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import {
  LinkModalComponent,
  PictureModalComponent,
} from './index'

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
  ],
  entryComponents: [
    LinkModalComponent,
    PictureModalComponent,
  ],
  declarations: [
    LinkModalComponent,
    PictureModalComponent,
  ],
  exports: [
    LinkModalComponent,
    PictureModalComponent,
  ],
  providers: [],
})
export class ModalModule { }
