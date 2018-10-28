import { Injectable } from '@angular/core';
import { ConfigModel } from './config.model';
import * as yaml from 'js-yaml';

@Injectable()
export class ConfigService {

  constructor() {
  }

  public async getConfig(): Promise<ConfigModel> {
    const config = await fetch('/assets/config/config.yml').then(resp => resp.text());
    return yaml.safeLoad(config);
  }

  public async getApplications(): Promise<any> {
    const config = await fetch('/assets/config/apps.yml').then(resp => resp.text());
    return yaml.safeLoad(config);
  }

}
