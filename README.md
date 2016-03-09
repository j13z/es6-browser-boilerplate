*Work in progress (no stable versions / releases). A repo that I use to start smaller ES6 projects (with the shell snippet below).*


[![](https://david-dm.org/j13z/es6-browser-boilerplate/dev-status.png)](https://david-dm.org/j13z/es6-browser-boilerplate/#info=devDependencies&view=table)

# es6-boilerplate

ECMAScript 2015 (ES6) boilerplate project for current browsers, to be used with HTTP/1.1.

Features (via [Gulp] build):

- Compiles ES6 to ES5 (using [Babel])
- Bundles ES6 modules and ES5 libraries into a single script using [Browserify]
- [Sass] (with [Autoprefixer]), [Browsersync], linting ([ESLint])
- Support for React’s [JSX] syntax

[Autoprefixer]: https://github.com/postcss/autoprefixer
[Babel]: http://babeljs.io
[Browserify]: http://browserify.org/
[Browsersync]: https://www.browsersync.io/
[ESLint]: http://eslint.org/
[Gulp]: http://gulpjs.com/
[JSX]: https://facebook.github.io/jsx/
[Sass]: http://sass-lang.com/



## Usage

- Clone the repo
- Run `npm install` *(takes a fair chunk of disk space)*
- Start a development server (BrowserSync) with `npm start` (or `gulp serve`)

Or all in one run:

```shell
git clone git@github.com:j13z/es6-boilerplate.git project  && \
cd project   && \
rm -rf .git  && \
cat /dev/null > README.md  && \
cat /dev/null > TODO.md    && \
npm install  && \
npm start
```

Three files will be served via HTTP (from the `dist` directory):

- `index.html`
- `app.js`
- `styles.css`

You can use `npm run gulp` as an alias for the local Gulp. Otherwise make sure you global Gulp is up to date.

The app source code lives in the [`app`](https://github.com/j13z/es6-boilerplate/tree/master/app) directory, the build goes to `dist`. Import other ES6 modules from `app/app.js`. Use npm to install dependencies.
