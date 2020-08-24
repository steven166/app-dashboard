// src/app/auth/auth.service.ts

import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { ConfigModel, Auth0 } from '../config/config.model';
import { AuthProviderService } from './auth.service';
import { Observable, of } from 'rxjs';

(window as any).global = window;

export class NoAuthService implements AuthProviderService {

  constructor(public router: Router) {

  }

  public login(): void {

  }

  initialised(): Observable<any> {
    return of(() => true);
  }

  public handleAuthentication(): void {
    window.location.hash = '';
    this.router.navigate(['/home']);
  }

  public logout(): void {
    // Go back to the home route
    this.router.navigate(['/']);

  }
}
