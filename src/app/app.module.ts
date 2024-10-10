import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { ConfigService } from './config/config.service';

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
    RouterModule.forRoot(ROUTES, {})
  ],
  providers: [
    AuthService,
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: loadAuthService , deps: [ AuthService ], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

