import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ConfigService } from './config/config.service';
import { ConfigModel } from './config/config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public config: ConfigModel = {} as any;

  constructor(public auth: AuthService, public configService: ConfigService) {
    auth.handleAuthentication();
    configService.getConfig().then(config => {
      config.homeUrl = config.homeUrl || '';
      this.config = config;
      document.title = config.title || 'App Dashboard';
    }).catch(e => console.error(e));
  }

}
