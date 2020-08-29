import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  appData: { [x: string]: any; };
  selectedTeam: string;
  showDropdown = false;

  constructor(public auth: AuthService, public config: ConfigService) {
    config.getApplications().then(appData => {
      this.appData = appData;
      console.log("blaaa" + JSON.stringify(appData));
      this.selectedTeam = localStorage.getItem('selectedGroup') || this.objectToArray(this.appData)[0].key;
    }).catch(e => console.error(e));
  }

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.auth.login();
    } else {
    }
  }

  public objectToArray(obj: any): any[] {
    return Object.keys(obj).map((key) => {
      return { key: key, value: obj[key] };
    });
  }

  public selectTeam(team: string) {
    if (!this.appData[team]) {
      throw new Error(`Unknown team: ${team}`);
    }
    this.selectedTeam = team;
    localStorage.setItem('selectedGroup', team);
  }

  public isSelected(team: string): boolean {
    return this.selectedTeam === team;
  }

}
