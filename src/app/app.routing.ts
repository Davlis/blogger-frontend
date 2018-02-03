import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BlogComponent } from './blog/blog.component';
import { PostEditorComponent } from './post-editor/post-editor.component';


import { DevComponent } from './dev/dev.component';

const routes: Routes = [
  { path: 'home',             component: HomeComponent },
  { path: 'user-profile',     component: ProfileComponent },
  { path: 'signup',           component: SignupComponent },
  { path: 'login',            component: LoginComponent },
  { path: 'forgot-password',  component: ForgotPasswordComponent },
  { path: 'landing',          component: LandingComponent },
  { path: 'blog',             component: BlogComponent },
  { path: 'nucleoicons',      component: NucleoiconsComponent },
  { path: 'dev',              component: DevComponent },
  { path: 'post-edit',        component: PostEditorComponent },
  { path: '', redirectTo: 'post-edit', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
