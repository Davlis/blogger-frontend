import { Injectable }  from '@angular/core';
import { CanActivate, Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if(this.userService.isAuthenticated()) {
        resolve(true);
      } else {
        this.userService.init()
          .then(() => resolve(true))
          .catch((err) => resolve(false))
      }
    });
   }
}
