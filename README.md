# es6-boilerplate

Boilerplate code for a web app with ES6 modules.

*Work in progress.*

All ES6 modules are compiled to ES5 and bundled into a single file (`dist/js/app.js`) so that the code can be run in today's browsers.

Uses [es6-module-loader] / [SystemJS]. Also adds Backbone.js and jQuery to the bundle.

[es6-module-loader]: https://github.com/ModuleLoader/es6-module-loader
[SystemJS]: https://github.com/systemjs/systemjs


## Usage

- Clone the repo

- Run `npm install`

- Write your app with ES6 modules, SASS, Backbone.js, jQuery and Underscore.js. Build it with Gulp

- Use `gulp browser-sync` to run a development web server with automatic reloading (BrowserSync). `app/index.html` won't work in your browser (serve `dist` instead)

The app source lives in the [`app`](https://github.com/j13z/es6-boilerplate/tree/master/app) directory, the build goes to `dist`.