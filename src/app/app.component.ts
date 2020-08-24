import { Component, Renderer2, Inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './config/config.service';
import { ConfigModel } from './config/config.model';
import { DOCUMENT } from '@angular/common';

export const LIGHT_THEME = 'theme-light';
export const DARK_THEME = 'theme-dark';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public currentTheme: string;

  public config: ConfigModel = {} as any;

  constructor(public auth: AuthService, public configService: ConfigService, private renderer: Renderer2, @Inject(DOCUMENT) private document: HTMLDocument) {
    configService.getConfig().then(config => {
      auth.handleAuthentication();

      config.homeUrl = config.homeUrl || '';
      this.config = config;
      document.title = config.title || 'App Dashboard';
      this.setFavicon();
    }).catch(e => console.error(e));
    this.currentTheme = localStorage.getItem('dashboard-theme');
    if (!this.currentTheme) {
      this.currentTheme = LIGHT_THEME;
    }
    this.renderer.addClass(document.body, this.currentTheme);
  }

  private setFavicon(): void {
    this.document.getElementById('appFavicon').setAttribute('href', this.config.favicon || '/favicon.ico');
  }

  public switchTheme(): void {
    if (this.currentTheme === LIGHT_THEME) {
      this.currentTheme = DARK_THEME;
      this.renderer.removeClass(document.body, LIGHT_THEME);
      this.renderer.addClass(document.body, DARK_THEME);
    } else {
      this.currentTheme = LIGHT_THEME;
      this.renderer.addClass(document.body, LIGHT_THEME);
      this.renderer.removeClass(document.body, DARK_THEME);
    }
    localStorage.setItem('dashboard-theme', this.currentTheme);
  }

  public getLogo(): string {
    if (this.config.logo && this.currentTheme === LIGHT_THEME) {
      return this.config.logo;
    }
    if (this.config.logo && this.currentTheme === DARK_THEME) {
      return this.config.darkLogo;
    }
    if (this.currentTheme === LIGHT_THEME) {
      return 'assets/logo.jpg';
    } else {
      return 'https://newyse-res.cloudinary.com/image/upload/maxxton-logo.png';
    }
  }

}
