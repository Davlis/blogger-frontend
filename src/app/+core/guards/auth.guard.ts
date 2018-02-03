import { Injectable }  from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApplicationUserService } from '../services/application-user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public applicationUserService: ApplicationUserService) {
  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.applicationUserService.isAuthenticated()) {
        resolve(true);
      } else {
        this.applicationUserService.init()
          .then(() => resolve(true))
          .catch((err) => resolve(false))
      }
    });
   }
}
