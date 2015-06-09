'use strict';
/* jshint node: true */


// Gulp
var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

// Node
var path = require('path');

// Others
var del = require('del');
var streamQueue = require('streamqueue').bind(null, { objectMode: true });

var browserSync = require('browser-sync');
var reload = browserSync.reload.bind(null, { stream: true });

var jshintStylish = require('jshint-stylish');



var paths = {

	script:     'app/app.js',
	stylesheet: 'app/scss/styles.scss',

	// Files that will be copied unprocessed
	staticFiles: [
		'app/index.html'
	],

	jsDependencies: [
		// Place additional libaries (not ES6 modules) to be bundled here.
		// (Array determines order for concatenation)
	]

    // sourceRoot: path.join(__dirname, 'app')
};


// Taken from `google/web-starter-kit`
var AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];



// --- lint --------------------------------------------------------------------

gulp.task('lint', function () {
	return gulp.src('app/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter(jshintStylish));
});


// --- scripts -----------------------------------------------------------------

gulp.task('scripts', [ 'lint' ], function() {

	// TODO: Generate source maps for this.

	var moduleBundle = gulp.src(paths.script)
		// .pipe($.sourcemaps.init())
		.pipe($.es6ModuleTranspiler({
			formatter: 'bundle',
			basePath: 'app'
		}))
		.pipe($.babel())
        // .pipe($.sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
		.on('error', $.util.log);

	var libs = gulp.src(paths.jsDependencies);

	return streamQueue(libs, moduleBundle)
		.pipe($.concat('app.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe($.size({ title: 'scripts' }))
		.pipe(reload());
});



// ---- styles -----------------------------------------------------------------

// (Adapted from `google/web-starter-kit`)

gulp.task('styles', function () {
	return gulp.src(paths.stylesheet)
		.pipe($.sourcemaps.init())
		.pipe($.changed('.tmp/styles', { extension: '.css' }))

		// Compile
		.pipe($.sass({
			precision: 10,
			onError: console.error.bind(console, 'Sass error:')
		}))

		// Autoprefixer
		.pipe($.autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))

		.pipe($.sourcemaps.write())
		.pipe(gulp.dest('.tmp/styles'))

		// Concatenate and minify
		.pipe(gulp.dest('dist/css'))
		.pipe($.size({ title: 'styles' }));
});


// ---- copy -------------------------------------------------------------------

// Copy files that don't need processing to `dist` directory

gulp.task('copy', function () {
	return gulp.src(paths.staticFiles)
		.pipe(gulp.dest('dist'));
});



// ---- watch ------------------------------------------------------------------

// Run build when any file in `app` directory changes

function watch() {
	gulp.watch([ 'app/**', 'lib/**', __filename ], [ 'build' ]);
}

gulp.task('watch', [ 'default' ], watch);



// ---- serve ------------------------------------------------------------------

// Start HTTP server with browser-sync enabled

gulp.task('serve', [ 'build' ], function () {

    browserSync({
        server: { baseDir: 'dist' },
        open: false
    });

    watch();
});



// ---- Various ----------------------------------------------------------------

gulp.task('build', [ 'scripts', 'styles', 'copy' ]);

gulp.task('clean', del.bind(null, [ '.tmp', 'dist' ], { dot: true }));

gulp.task('default', [ 'build' ]);
