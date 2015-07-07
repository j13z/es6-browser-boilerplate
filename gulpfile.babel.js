/* jshint node: true */

// import path from 'path';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import _streamQueue from 'streamqueue';
import browserSync from 'browser-sync';
import jshintStylish from 'jshint-stylish';

const $ = gulpLoadPlugins();
const streamQueue = _streamQueue.bind(null, { objectMode: true });
const reload = browserSync.reload.bind(null, { stream: true });


const paths = {

	script:     'app/app.js',
	stylesheet: 'app/scss/styles.scss',

	// Files that will be copied unprocessed
	staticFiles: [
		'app/index.html'
	],

	jsDependencies: [
		// Place additional libaries (not ES6 modules) to be bundled here.
		// (Array determines order for concatenation)
	],

	// sourceRoot: path.join(__dirname, 'app')
};


// Taken from `google/web-starter-kit`
const autoprefixerBrowsers = [
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

gulp.task('lint', () => {
	return gulp.src('app/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter(jshintStylish));
});


// --- scripts -----------------------------------------------------------------

gulp.task('scripts', [ 'lint' ], function() {

	// TODO: Generate source maps for this.

	const moduleBundle = gulp.src(paths.script)
		// .pipe($.sourcemaps.init())
		.pipe($.es6ModuleTranspiler({
			formatter: 'bundle',
			basePath: 'app'
		}))
		.pipe($.babel())
        // .pipe($.sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
		.on('error', $.util.log);

	const libs = gulp.src(paths.jsDependencies);

	return streamQueue(libs, moduleBundle)
		.pipe($.concat('app.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe($.size({ title: 'scripts' }))
		.pipe(reload());
});



// ---- styles -----------------------------------------------------------------

// (Adapted from `google/web-starter-kit`)

gulp.task('styles', () => {
	return gulp.src(paths.stylesheet)
		.pipe($.changed('.tmp/styles', { extension: '.css' }))
		.pipe($.sourcemaps.init())

		// Compile
		.pipe($.sass({
			precision: 10,
		}))
		.on('error', $.sass.logError)

		// Autoprefixer
		.pipe($.autoprefixer(autoprefixerBrowsers))

		.pipe(gulp.dest('.tmp'))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'))

		.pipe($.size({ title: 'styles' }));
});


// ---- copy -------------------------------------------------------------------

// Copy files that don't need processing to `dist` directory

gulp.task('copy', () => {
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

gulp.task('serve', [ 'build' ], () => {

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
