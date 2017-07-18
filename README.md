*Not maintained anymore*: While this minimalistic setup has some benefits, I prefer webpack based setups theses days.

---

*Work in progress (no stable versions / releases). A repo that I use to start smaller ES6 projects (with the shell snippet below).*


[![](https://david-dm.org/j13z/es6-browser-boilerplate/dev-status.png)](https://david-dm.org/j13z/es6-browser-boilerplate?type=dev)
[![Build Status](https://travis-ci.org/j13z/es6-browser-boilerplate.svg?branch=master)](https://travis-ci.org/j13z/es6-browser-boilerplate)

# es6-browser-boilerplate

ECMAScript 2015 (ES6) boilerplate / starter project / seed for current browsers, to be used with HTTP/1.1.

Features (via [Gulp] build):

- Compiles ES6 to ES5 (using [Babel])
- Bundles ES6 modules and ES5 libraries into a single script using [Browserify]
- [Sass] (with [Autoprefixer]), [Browsersync], linting ([ESLint])
- React-ready, with support for [JSX] \(but otherwise not tied to React)
- Unit test setup: [Mocha], [Chai], [Sinon], [Istanbul]

[Autoprefixer]: https://github.com/postcss/autoprefixer
[Babel]: http://babeljs.io
[Browserify]: http://browserify.org/
[Browsersync]: https://www.browsersync.io/
[Chai]: http://chaijs.com/
[ESLint]: http://eslint.org/
[Gulp]: http://gulpjs.com/
[Istanbul]: https://github.com/gotwarlost/istanbul
[JSX]: https://facebook.github.io/jsx/
[Mocha]: mochajs.org
[Sass]: http://sass-lang.com/
[Sinon]: http://http://sinonjs.org/



## Usage

- Clone the repo
- Run `npm install` *(takes a fair chunk of disk space)*
- Start a development server (BrowserSync) with `npm start` (or `gulp serve`)

Or all in one run:

```shell
git clone https://github.com/j13z/es6-browser-boilerplate.git project  && \
cd project   && \
rm -rf .git  && \
cat /dev/null > README.md  && \
cat /dev/null > TODO.md    && \
git init && \
cd .git/hooks/ && ln -s ../../git-hooks/pre-commit && cd - && \
npm install  && \
npm start
```
Then point your browser to [localhost:3000](http://localhost:3000/).

Three files will be served via HTTP (from the `dist` directory):

- `index.html`
- `app.js`
- `styles.css`

You can use `npm run gulp <task>` as an alias for the local Gulp (`./node_modules/.bin/gulp`). Otherwise make sure your global Gulp is up to date.

To remove React, run: `npm uninstall --save react react-dom`.

The app source code lives in the [`app`](https://github.com/j13z/es6-boilerplate/tree/master/app) directory, the build goes to `dist`. Import other ES6 modules from `app/app.js`. Use npm to install dependencies.

Run tests with `npm test`. Generate a coverage report with `npm run coverage` (will be written to `coverage/lcov-report/index.html`).
