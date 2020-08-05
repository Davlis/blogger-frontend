import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NAVBAR_ROUTES } from '../../config/navbar-routes.config';
import { ApplicationUserService } from '../../+core/services/application-user.service';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @LocalStorage()
  public user;

  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(
    public location: Location, 
    private element : ElementRef, 
    public appUserService: ApplicationUserService,) {

    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];

    setTimeout(function(){
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  };

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  };

  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

      if (titlee === '/home') {
        return true;
      } else {
        return false;
      }
  }

  isNavbarRoutes() {
    const titlee = this.location.prepareExternalUrl(this.location.path()).split('/')[1]
    return NAVBAR_ROUTES.includes(titlee)
  }

  isLogin() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === '/login') {
      return true;
    } else {
      return false;
    }        
  }

  isRegister() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === '/signup') {
      return true;
    } else {
      return false;
    }        
  }

  isLanding() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === '/landing') {
      return true;
    } else {
      return false;
    }        
  }

  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === '/documentation' ) {
      return true;
    } else {
      return false;
    }
  }

  public logout() {
    this.appUserService.logout();
  }
}
