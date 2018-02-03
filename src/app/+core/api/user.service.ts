import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class UserService {
  
  constructor(private dataService: DataService) {
  }

  public login(data): Promise<any> {
    return this.dataService.callHandler('post', 'auth/login', { data });
  }

  public register(data): Promise<any> {
    return this.dataService.callHandler('post', 'auth/register', { data });
  }

  public resetPassword(data): Promise<any> {
    return this.dataService.callHandler('put', 'auth/reset-password', { data });
  }

  public setPassword(data): Promise<any> {
    return this.dataService.callHandler('put', 'auth/set-password', { data });
  }

  public refreshToken(data): Promise<any> {
    return this.dataService.callHandler('post', 'auth/refresh-token', {  data });
  }
}
