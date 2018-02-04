import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

import {
  LinkModalComponent,
  PictureModalComponent,
  PublishModalComponent,
} from './index'

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    FileUploadModule,
  ],
  entryComponents: [
    LinkModalComponent,
    PictureModalComponent,
    PublishModalComponent,
  ],
  declarations: [
    LinkModalComponent,
    PictureModalComponent,
    PublishModalComponent,
  ],
  exports: [
    LinkModalComponent,
    PictureModalComponent,
    PublishModalComponent,
  ],
  providers: [],
})
export class ModalModule { }
