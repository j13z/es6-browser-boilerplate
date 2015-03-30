# es6-boilerplate

Boilerplate code for a web app with ES6 modules.

*Work in progress.*

All ES6 modules are compiled to ES5 and bundled into a single file (`dist/js/app.js`) so that the code can be run in today’s browsers.

Uses [es6-module-loader] / [SystemJS]. Also adds Backbone.js, Underscore.js and jQuery to the bundle.

[es6-module-loader]: https://github.com/ModuleLoader/es6-module-loader
[SystemJS]: https://github.com/systemjs/systemjs


## Usage

- Clone the repo

- Run `npm install`

- The app source code lives in the [`app`](https://github.com/j13z/es6-boilerplate/tree/master/app) directory, the build goes to `dist`. Write your app with ES6 modules, Backbone.js and SASS. Gulp handles the build

- Use `gulp browser-sync` to run a development web server with automatic reloading via BrowserSync. (`app/index.html` won’t work in your browser.)

Three files will be served via HTTP (from the `dist` directory):

- `index.html`
- `js/app.js`
- `css/styles.css`
