import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthService {
  
  constructor(private localStorage: LocalStorageService) {
  }

  public getToken(): any {
    const access = this.localStorage.retrieve('access');
    return (access && access.token) || '';
  }

  public getExpirationDate(): any {
    const access = this.localStorage.retrieve('access');
    return (access && access.token) || new Date();
  }

  public getPayload(): any {
    return this.localStorage.retrieve('user');
  }

  public getAuthHeader(): string {
    return `Bearer ${this.getToken()}`;
  }
}
