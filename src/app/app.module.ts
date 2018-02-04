import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './+shared/navbar/navbar.component';
import { FooterComponent } from './+shared/footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { HomeModule } from './home/home.module';

import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';

import { ModalModule } from './+shared/modals/modal.module';
import { CoreModule } from './+core/core.module';

import { DevModule } from './dev/dev.module'

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,
    HomeModule,
    DevModule,
    ModalModule,
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
    PostEditorComponent,
    PostPreviewComponent,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
