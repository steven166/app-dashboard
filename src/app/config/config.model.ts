
export interface ConfigModel {
  oauthProvider: string;
  auth0: Auth0;
  google: Google;

  title: string;
  homeUrl: string;
  logo: string;
  darkLogo: string;
  favicon: string;
}

export interface Auth0 {
  clientID: string;
  domain: string;
  responseType: string;
  redirectUri: string;
  scope: string;
}

export interface Google {
  clientId: string;
  hosted_domain: string;
  clientSecret: string;
  scope: string;
}
