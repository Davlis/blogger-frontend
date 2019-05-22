import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import * as jwt from 'jsonwebtoken';

import { UserService } from '../api/user.service';


@Injectable()
export class ApplicationUserService {

  @LocalStorage()
  public user: any;

  @LocalStorage()
  public access: any;

  @LocalStorage()
  public refresh: any;

  public userObservable: any;
  public userObserver: any;

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    public userService: UserService,) {
    
    this.userObservable = new Observable(observer => {
      this.userObserver = observer;
    });
  }

  async init() {

    let now = new Date();

    if(this.user && this.access &&
       this.refresh && new Date(this.refresh.expDate) > now) {

      try {
        await this.refreshTokens();
      } catch(err) {
        console.log(err);
        return this.logout();
      }

    } else if(!this.refresh || new Date(this.refresh.expDate) < now) {
      this.logout();
    }
  }

  isAuthenticated() {
    return (this.user && this.access && new Date(this.access.expDate) > new Date());
  }

  async register(registerData: any) {

    const result = await this.userService.register(registerData)

    this.setUser(result.user)
    this.setTokens(result.token)
  }

  async login(loginData: any) {

    const result = await this.userService.login(loginData);
    const [decodedAccess, decodedRefresh] = this.decodeTokens(result.token)

    if (decodedAccess.id === decodedRefresh.id
        && decodedRefresh.id === result.user.id) {
      
      this.setUser(result.user)
      this.setTokens(result.token)
    } else {
      throw { message: 'Invalid user' };
    }

    return this.user;
  }

  setUser(user) {
    this.user = user;
    this.localStorage.store('user', this.user);
  }

  setTokens(token) {
    [this.access, this.refresh] = this.decodeTokens(token);

    this.localStorage.store('access', this.access);
    this.localStorage.store('refresh', this.refresh);
  }

  decodeTokens(token) {
    const decodedAccess = jwt.decode(token.accessToken);
    const decodedRefresh = jwt.decode(token.refreshToken);

    const access = {
      token: token.accessToken,
      id: decodedAccess.id,
      expDate: new Date(decodedAccess.exp * 1000)
    }

    const refresh = {
      token: token.refreshToken,
      id: decodedRefresh.id,
      expDate: new Date(decodedRefresh.exp * 1000)
    }

    return [access, refresh]
  }

  async refreshTokens() {
    const result = await this.userService.refreshToken({ refreshToken: this.refresh.token });
    const [decodedAccess, decodedRefresh] = this.decodeTokens(result)

    if (decodedAccess.id === decodedRefresh.id 
        && decodedRefresh.id === this.user.id) {

      this.setTokens(result)

      return;
    } else {
      return { message: 'Wrong user data' };
    }
  }

  private propagateChanges(user) {
    this.user = user
    this.userObserver.next(user);
    this.localStorage.store('user', user);
  }

  async editUser(data: any) {
    //const result = await this.dataService.callHandler('patch', 'profile', { data });
    //this.propagateChanges(result.user);
    //return result.user;
  }

  public setProfilePhoto(photoUrl: string): void {
    const user = Object.assign({}, this.user);
    user.photoUrl = photoUrl;
    this.propagateChanges(user);
  }

  logout() {
    this.user = null;
    this.access = null;
    this.refresh = null;
    this.localStorage.clear('user');
    this.localStorage.clear('access');
    this.localStorage.clear('refresh');

    this.router.navigate(['/landing']).then(() => {
      //
    });
  }
}
