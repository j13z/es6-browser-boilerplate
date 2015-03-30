# es6-boilerplate

Boilerplate code for a web app with ES6 modules, compiled and bundled into a single ES5 script.

*Work in progress.*

ES6 modules are bundled using [es6-module-loader] / [SystemJS].

[es6-module-loader]: https://github.com/ModuleLoader/es6-module-loader
[SystemJS]: https://github.com/systemjs/systemjs


## Usage

- Clone the repo

- Run `npm install`

- Write your app with ES6 modules, SASS, Backbone.js, jQuery and Underscore.js. Build it with Gulp

- Use `gulp browser-sync` to run a development web server with automatic reloading (BrowserSync). `app/index.html` won't work in your browser (serve `dist` instead)

The app source lives in the [`app`](https://github.com/j13z/es6-boilerplate/tree/master/app) directory, the build goes to `dist`.