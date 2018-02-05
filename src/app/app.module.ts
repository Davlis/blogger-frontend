import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';

import { AppRoutingModule } from './app.routing';

import { NavbarComponent } from './+shared/navbar/navbar.component';
import { FooterComponent } from './+shared/footer/footer.component';
import { CommentBoxComponent } from './+shared/comment-box/comment-box.component';

import { AppComponent } from './app.component';

import { LandingComponent } from './landing/landing.component';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { ProfileComponent } from './profile/profile.component';

import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';

import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { PostViewComponent } from './post-view/post-view.component';

import { HomeModule } from './home/home.module';

import { ModalModule } from './+shared/modals/modal.module';
import { CoreModule } from './+core/core.module';





import { DevModule } from './dev/dev.module'

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    DevModule,
    ModalModule,
    FileUploadModule,
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    BlogComponent,
    BlogListComponent,
    BlogCreateComponent,
    PostEditorComponent,
    PostPreviewComponent,
    PostViewComponent,
    CommentBoxComponent,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
