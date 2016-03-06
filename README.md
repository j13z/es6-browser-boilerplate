*Work in progress. A repo that I use to start smaller ES6 projects (with the shell snippet below).*


[![](https://david-dm.org/j13z/es6-browser-boilerplate/dev-status.png)](https://david-dm.org/j13z/es6-browser-boilerplate/#info=devDependencies&view=table)

# es6-boilerplate

ES6 (ECMAScript 2015) boilerplate project for current browsers, to be used with HTTP/1.1. Features (via Gulp build):

- Compiles ES6 to ES5 (using Babel)
- Bundles ES6 modules and ES5 libraries into a single script. Uses [es6-module-transpiler]
- No runtime
- Sass (+ Autoprefixer), BrowserSync, linting (JSHint)


[es6-module-transpiler]: https://github.com/esnext/es6-module-transpiler



## Usage

- Clone the repo
- Run `npm install` *(takes about 110 MB disk space)*
- Start a development server (BrowserSync) with `gulp serve`

Or all in one run:

```shell
git clone git@github.com:j13z/es6-boilerplate.git project  && \
cd project   && \
rm -rf .git  && \
cat /dev/null > README.md  && \
cat /dev/null > TODO.md    && \
npm install  && \
gulp serve
```

(Assumes an up-to-date global gulp installation; use `./node_modules/.bin/gulp` to run the local gulp instead.)

Three files will be served via HTTP (from the `dist` directory):

- `index.html`
- `js/app.js`
- `css/styles.css`

The app source code lives in the [`app`](https://github.com/j13z/es6-boilerplate/tree/master/app) directory, the build goes to `dist`. Import other modules from `app/app.js`



## How are the modules loaded / compiled?

Here’s a minimal example:

```javascript
// app/app.js
import greeting from './test-module';
alert(greeting);
```

```javascript
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

## Limitations

- Still painful to include compilation of React’s JSX
