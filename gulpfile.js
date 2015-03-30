'use strict';
/* jshint node: true */

var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var del = require('del');

var browserSync = require('browser-sync');
var reload = browserSync.reload.bind(null, { stream: true });



var settings = {

	// Files that will be copied unprocessed
	staticFiles: [
		'app/index.html'
	],

	jsDependencies: [
		// Array determines order for concatenation
		'lib/jquery-1.11.2.min.js',

		'node_modules/underscore/underscore-min.js',
		'node_modules/backbone/backbone-min.js',

		'node_modules/es6-module-loader/dist/es6-module-loader.js',
		'node_modules/systemjs-builder/node_modules/systemjs/dist/system.js'
	]
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


// --- scripts -----------------------------------------------------------------

/**
 * @return {Promise}
 */
function createModuleBundle(outputFilename) {

	var Builder = require('systemjs-builder');

	return new Builder().build('app/*', outputFilename, { minify: true });
	// .build('app/*', outputFilename, { minify: true, sourceMaps: true })
}

gulp.task('scripts', function() {

	var scripts = settings.jsDependencies.concat('.tmp/module_bundle.js');

	createModuleBundle('.tmp/module_bundle.js').then(function() {

		return gulp.src(scripts)
			.pipe($.concat('app.js'))
			.pipe(gulp.dest('dist/js'))
			.pipe($.size({ title: 'scripts' }))
			.pipe(reload());

		// TODO: Clean up temp files: `.tmp/module_bundle.js`
	})
	.catch(function(err) {
		console.log('Error:', err);
	});
});



// ---- styles -----------------------------------------------------------------

// (Adapted from `google/web-starter-kit`)

gulp.task('styles', function () {
	return gulp.src('app/scss/styles.scss')
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
	return gulp.src(settings.staticFiles)
		.pipe(gulp.dest('dist'));
});



// ---- watch ------------------------------------------------------------------

// Run build when any file in `app` directory changes

function watch() {
	gulp.watch([ 'app/**', __filename ], [ 'build' ]);
}

gulp.task('watch', [ 'default' ], watch);



// ---- browser-sync -----------------------------------------------------------

// Start HTTP server with browser-sync enabled

gulp.task('browser-sync', [ 'build' ], function () {

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
