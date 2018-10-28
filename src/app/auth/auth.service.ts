// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { ConfigService } from '../config/config.service';

(window as any).global = window;

@Injectable()
export class AuthService {

  auth0: Promise<auth0.WebAuth>;

  constructor(public router: Router, private configService: ConfigService) {
    this.auth0 = configService.getConfig().then(config => {
      this.auth0 = new auth0.WebAuth({
        clientID: config.clientID,
        domain: config.domain,
        responseType: config.responseType || 'token id_token',
        redirectUri: `${location.protocol}//${location.host}${config.redirectUri || '/callback'}`,
        scope: config.scope || 'openid read:clients profile email'
      });
      return this.auth0;
    }).catch(e => {
      console.error(e);
    });
  }

  public login(): void {
    Promise.resolve(this.auth0).then(auth => auth.authorize());
  }

  public handleAuthentication(): void {
    Promise.resolve(this.auth0).then(auth => {
      auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.setSession(authResult);
          this.router.navigate(['/home']);
        } else if (err) {
          this.router.navigate(['/home']);
          console.log(err);
        }
      });
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('idTokenPayload', JSON.stringify(authResult.idTokenPayload));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('idTokenPayload');
    // Go back to the home route
    this.router.navigate(['/']);

    Promise.resolve(this.auth0).then(auth => auth.logout());
  }

  public isAuthenticated(): boolean {
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
