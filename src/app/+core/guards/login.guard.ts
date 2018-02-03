import { Injectable }  from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.userService.isAuthenticated()) {
        this.router.navigate(['/home']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

}
