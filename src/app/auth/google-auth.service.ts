// src/app/auth/auth.service.ts

import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { ConfigModel, Auth0, Google } from '../config/config.model';
import { AuthProviderService } from './auth.service';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Observable } from 'rxjs';

(window as any).global = window;

export class GoogleAuthService implements AuthProviderService {

  constructor(public router: Router, config: Google, private authService: SocialAuthService) {
    this.authService.authState.subscribe((user) => {
      // Null means the user logged out
      if (user !== null) {
        this.setSession({
          expiresIn: 3600,
          idToken: user.idToken,
          accessToken: user.authToken,
          name: user.name,
          email: user.email,
          picture: user.photoUrl.replace('=s96-c', '')
        });
      }
    });
  }

  public login(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  initialised(): Observable<any> {
    return this.authService.initState;
  }

  public handleAuthentication(): void {
    // not much use here, it's the authState listener that does the work
    window.location.hash = '';
    this.router.navigate(['/home']);
  }

  private setSession(authResult: any): void {
    // Set the time that the Access Token will expire, always 1 hour from now with Google
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    // Create our own json structure from the separate fields returned by Google
    const userPayload = {
      name: authResult.name,
      email: authResult.email,
      picture: authResult.picture
    };

    localStorage.setItem('idTokenPayload', JSON.stringify(userPayload));
  }

  public logout(): void {
    this.authService.signOut();
    // Go back to the home route
    this.router.navigate(['/']);

  }

}
