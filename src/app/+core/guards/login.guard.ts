import { Injectable }  from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { ApplicationUserService } from '../services/application-user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private applicationUserService: ApplicationUserService) {
  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.applicationUserService.isAuthenticated()) {
        this.router.navigate(['/home']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}
