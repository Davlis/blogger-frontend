import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import * as jwt from 'jsonwebtoken';
import { DataService } from '../api/data.service';

@Injectable()
export class UserService {

  public isLoggedIn: boolean = false;

  public user: any;
  public access: any;
  public refresh: any;

  public userObservable: any;
  public userObserver: any;

  constructor(private dataService: DataService,
              private localStorage: LocalStorageService,
              private route: ActivatedRoute,
              private router: Router,) {

    this.init();
    
    this.userObservable = new Observable(observer => {
      this.userObserver = observer;
    });
  }

  async init() {

    console.log('init');

    this.retrieveBasis();

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

  retrieveBasis() {
    this.user = this.localStorage.retrieve('user');
    this.access = this.localStorage.retrieve('access');
    this.refresh = this.localStorage.retrieve('refresh');
  }

  isAuthenticated() {
    return (this.user && this.access && new Date(this.access.expDate) > new Date());
  }

  signUp(signUpData: any) {
    return this.dataService.callHandler('post', 'signup', { data: signUpData });
  }

  async login(loginData: any) {

    const result = await this.dataService.callHandler('post', 'login', { data: loginData });
    const [decodedAccess, decodedRefresh] = this.decodeTokens(result.token)

    if (decodedAccess.id === decodedRefresh.id
        && decodedRefresh.id === result.user.id) {
      
      this.setUser(result.user)
      this.setTokens(result.token)
    } else {
      this.isLoggedIn = false;
      throw { message: 'Invalid user' };
    }

    this.isLoggedIn = true;
    return this.user;
  }

  isUserStructure(user) {
    return (user && typeof user === 'object' && user.id && user.email && user.role && user.firstName && user.lastName);
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
    const result = await this.dataService.callHandler('post', 'refresh-token', { data:
      { refreshToken: this.refresh.token }})

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

  async resetPassword(resetData: any) {
    return (await this.dataService.callHandler('put', 'reset-password', { data: resetData }));
  }

  async setPassword(setData: any) {
    return (await this.dataService.callHandler('put', 'set-password', { data: setData }));
  }

  async editUser(data: any) {
    const result = await this.dataService.callHandler('patch', 'profile', { data });
    this.propagateChanges(result.user);
    return result.user;
  }

  setProfilePhoto(photoUrl: string): void {
    const user = Object.assign({}, this.user);
    user.photoUrl = photoUrl;
    this.propagateChanges(user);
  }

  logout() {
    this.router.navigate(['/login']).then(() => {
      this.user = null;
      this.access = null;
      this.refresh = null;
      this.isLoggedIn = false;
      this.localStorage.clear('user');
      this.localStorage.clear('access');
      this.localStorage.clear('refresh');
    });
  }
}
