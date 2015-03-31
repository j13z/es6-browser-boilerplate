# es6-boilerplate

*Work in progress.*

Boilerplate code for a web app with ES6 (ECMAScript 2015) modules.

Features (Gulp build):

- Compiles ES6 to ES5 (using Babel)
- Bundles ES6 modules and ES5 libraries into a single script. Uses [es6-module-transpiler]
- Sass (+ Autoprefixer), BrowserSync

There’s an alternative version that uses [systemjs-builder] on the [`systemjs-builder` branch](https://github.com/j13z/es6-boilerplate/tree/systemjs-builder).

[es6-module-transpiler]: https://github.com/esnext/es6-module-transpiler
[systemjs-builder]: https://github.com/guybedford/systemjs-builder


## Usage

- Clone the repo

- Run `npm install`

- The app source code lives in the [`app`](https://github.com/j13z/es6-boilerplate/tree/master/app) directory, the build goes to `dist`. Import other modules from `app/app.js`

- Use `gulp serve` to run a development web server with automatic reloading via BrowserSync (`app/index.html` won’t work in your browser)

Three files will be served via HTTP (from the `dist` directory):

- `index.html`
- `js/app.js`
- `css/styles.css`


## How are the modules loaded / compiled?

Here’s a minimal example:

```
// app/app.js
import greeting from './test-module';
alert(greeting);
```

```
// app/test-module.js
export default 'Greetings from an ES6 module!';
```

[es6-module-transpiler] produces the following output, no runtime required:

```javascript
// dist/js/app.js
"use strict";

(function () {
    "use strict";
    var $$test$module$$default = "Greetings from an ES6 module!";
    alert($$test$module$$default);
}).call(undefined);
```
