# AppDashboard

App Dashboard can be used as a landing-page for multiple applications, it is protected by OAuth2 authentication and can be configured through yaml files.

## Usage
```bash
docker run -p 8080:8080 -v config.yml:/usr/share/nginx/html/assets/config/config.yml -v apps.yml:/usr/share/nginx/html/assets/config/apps.yml steven166/app-dashboard
```

## Configure
**/usr/share/nginx/html/assets/config/config.yml**
```yaml
clientID: <OAUTH_CLIENT_ID>
domain: example.com
responseType: 'token id_token'
redirectUri: '/callback'
scope: 'openid read:clients profile email'
homeUrl: example.com
logo: https://static.example.com/logo.png
```
**/usr/share/nginx/html/assets/config/apps.yml**
```yaml
<team>:
  <section>:
    <application>:
      description: <descripition>
      color: <color_name>
      image: <image_link>
      url: <target_url>
```

## Production build
```bash
docker build -t app-dashboard .
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#License
MIT
