# Gym app - Angular SPA for consuming API with jwt token authentication

© 2019 Mikael Fehrm, micke@tempory.org

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.

## Development server
För att slippa Invalid host header origin etc. Disconnected:
`ng serve --disable-host-check`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build for github pages
Build for github pages with correct base-href:
<!-- ng build --prod --base-href "https://<user-name>.github.io/<repo>/" -->
`ng build --prod --base-href https://mickdarkstar.github.io/gym-client/`
Deploy to github pages:
`ngh`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Build for native mobile app
Run `tns preview` for testing and development

Build prod:
TBD

More info: https://docs.nativescript.org/angular/code-sharing/migrating-a-web-project 