// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { ConfigService } from '../config/config.service';
import { ConfigModel, Auth0 } from '../config/config.model';
import { AuthProviderService } from './auth.service';
import { Observable, of } from 'rxjs';

(window as any).global = window;

export class Auth0Service implements AuthProviderService {

  auth0: Promise<auth0.WebAuth>;

  constructor(public router: Router, private configAuth0: Auth0) {
    this.auth0 = new auth0.WebAuth({
      clientID: configAuth0.clientID,
      domain: configAuth0.domain,
      responseType: configAuth0.responseType || 'token id_token',
      redirectUri: `${location.protocol}//${location.host}${configAuth0.redirectUri || '/callback'}`,
      scope: configAuth0.scope || 'openid read:clients profile email'
    });
  }

  public login(): void {
    Promise.resolve(this.auth0).then(auth => auth.authorize());
  }

  initialised(): Observable<any> {
    return of(() => true);
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
    // Go back to the home route
    this.router.navigate(['/']);

    Promise.resolve(this.auth0).then(auth => auth.logout());
  }

}
