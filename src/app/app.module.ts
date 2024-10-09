import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig, DummyLoginProvider, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { ConfigService } from './config/config.service';



function getSocialConfig(configService: ConfigService): Promise<SocialAuthServiceConfig> {
  const googleConfig: Promise<SocialAuthServiceConfig> = configService.getConfig().then(config => {
    if (config.oauthProvider && config.oauthProvider === 'Google') {
      return {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              config.google.clientId,
              {
                'apiKey': config.google.clientSecret,
                'clientId': config.google.clientId,
                'scope': 'email',
                'hosted_domain': config.google.hosted_domain,
                'discoveryDocs': ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
              }
            )
          }
        ]
      };
    }
    // otherwise return the dummy provider, to avoid errors
    const dummyUser: SocialUser = {
      id: '0123456789',
      name: 'Dummy User',
      email: 'info@maxxton.com',
      firstName: 'Dummy',
      lastName: 'User',
      authToken: 'dummyAuthToken',
      photoUrl: '',
      provider: 'DUMMY',
      idToken: 'dummyIdToken',
      authorizationCode: 'dummyAuthCode',
      response: null
    };
    return {
      autoLogin: true,
      providers: [
        {
          id: DummyLoginProvider.PROVIDER_ID,
          provider: new DummyLoginProvider(dummyUser)
        }
      ]
    };
  });
  return googleConfig;
}

export function loadAuthService(authService: AuthService): Function {
  return () => authService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' }),
    SocialLoginModule
  ],
  providers: [
    AuthService,
    ConfigService,
    {
      provide: 'SocialAuthServiceConfig',
      useFactory: getSocialConfig,
      deps: [ ConfigService ]
    },
    { provide: APP_INITIALIZER, useFactory: loadAuthService , deps: [ AuthService ], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

