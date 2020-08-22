import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/http';
import { AuthService } from './auth/auth.service';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { ConfigService } from './config/config.service';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export const LIGHT_THEME = 'theme-light';
export const DARK_THEME = 'theme-dark';
