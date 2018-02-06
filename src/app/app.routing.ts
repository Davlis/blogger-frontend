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
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';

import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { PostViewComponent } from './post-view/post-view.component';

import { AuthGuard } from './+core/guards/auth.guard';
import { LoginGuard } from './+core/guards/login.guard';

import { DevComponent } from './dev/dev.component';

const routes: Routes = [
  { 
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  { 
    path: 'profile/:id',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  { 
    path: 'signup',
    canActivate: [LoginGuard],
    component: SignupComponent,
  },
  { 
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  { 
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  { 
    path: 'landing',
    component: LandingComponent,
  },
  { 
    path: 'blog/:id',
    canActivate: [AuthGuard],
    component: BlogComponent,
  },
  {
    path: 'blog-list',
    canActivate: [AuthGuard],
    component: BlogListComponent,
  },
  {
    path: 'blog-create/:id',
    canActivate: [AuthGuard],
    component: BlogCreateComponent,
  },
  { 
    path: 'nucleoicons',
    component: NucleoiconsComponent,
  },
  { 
    path: 'dev',
    component: DevComponent,
  },
  { 
    path: 'post-edit/:blogId/:postId',
    canActivate: [AuthGuard], 
    component: PostEditorComponent,
  },
  {
    path: 'post-preview',
    component: PostPreviewComponent,
  },
  {
    path: 'post-view/:blogId/:postId',
    canActivate: [AuthGuard],
    component: PostViewComponent,
  },
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
  ],
  providers: [
    AuthGuard,
    LoginGuard,
  ],
})
export class AppRoutingModule { }
