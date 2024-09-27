# LorawanStorageNg

Web interface for LoRaWAN identity storage
[https://github.com/commandus/lorawan-storage-ng](https://github.com/commandus/lorawan-storage-ng)

Requires [https://github.com/commandus/lorawan-storage](https://github.com/commandus/lorawan-storage) built with -DENABLE_HTTP=on -DENABLE_JSON=on -DENABLE_QRCODE=on options.

## Quick start

Run 

```
npm install
```
to install dependencies

Run lorawan-identity-service on ports:

- JSON service localhost:4246
- SVG QR code localhost:4248 

Run
```
ng serve
```
to start service locally.

## Production deployment

- in src/app/json.ts file replace SVG http://localhost:4246 to the production address (usually behind reverse proxy such nginx)
- in src/app/urn.service.ts file replace SVG http://localhost:4248 to the production address (usually behind reverse proxy such nginx)

Run 
```
ng build
```
and distribute generated files from the /dist folder.

## Notices

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm use v22.4.1
npm install -g @angular/cli@latest
npm install

ng add @angular/localize
npm install @angular/material
npm install @angular/service-worker
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Acknowledgement

Code generator library (TypeScript) Copyright (c) Project Nayuki. (MIT License) https://www.nayuki.io/page/qr-code-generator-library


```
ng extract-i18n --output-path src/locale
```