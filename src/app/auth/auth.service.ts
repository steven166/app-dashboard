// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { ConfigService } from '../config/config.service';
import { Auth0Service } from './auth0.service';
import { NoAuthService } from './no-auth.service';
import { SocialAuthServiceConfig, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { GoogleAuthService } from './google-auth.service';
import { Observable, forkJoin, from, of } from 'rxjs';

(window as any).global = window;

export interface AuthProviderService {
  handleAuthentication(): void;
  login(): void;
  logout(): void;
  initialised(): Observable<any>;
}

@Injectable()
export class AuthService {

  auth: Promise<AuthProviderService>;

  constructor(public router: Router, private configService: ConfigService, authService: SocialAuthService) {
    this.auth = configService.getConfig().then(config => {
      let provider: AuthProviderService;
      if (config.oauthProvider && config.oauthProvider === "Auth0") {
        provider = new Auth0Service(router, config.auth0);
      }
      else if (config.oauthProvider && config.oauthProvider === "Google") {
        provider = new GoogleAuthService(router, config.google, authService);
      }
      else {
        provider = new NoAuthService(router);
      }
      return provider;
    });
  }

  public async load(): Promise<any> {
    let provider = await this.auth;
    await provider.initialised().toPromise();

  }

  public login(): void {
    Promise.resolve(this.auth).then(auth => auth.login());
  }

  public handleAuthentication(): void {
    Promise.resolve(this.auth).then(auth => auth.handleAuthentication());
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('idTokenPayload');

    // Go back to the home route
    this.router.navigate(['/']);

    Promise.resolve(this.auth).then(auth => auth.logout());
  }

  public isAuthenticated(): boolean {
    if (this.auth instanceof NoAuthService) {
      return true;
    }
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getUserInfo(): { email: string, name: string, picture: string, sub: string } | {} {
    const json = localStorage.getItem('idTokenPayload');
    if (json) {
      return JSON.parse(json);
    }
    return {};
  }

}
