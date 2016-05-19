/**
 * Credits:
 *
 * - `bundleJs` task with Browserify based on
 *   http://www.jayway.com/2015/03/04/using-react-with-ecmascript-6/
 *
 * - Some fragements adopted from the fine Google Web Starter Kit:
 *   https://github.com/google/web-starter-kit
 */

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserify from 'browserify';
import babelify from 'babelify';
import browserSync from 'browser-sync';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import del from 'del';
import chalk from 'chalk';
const plugins = gulpLoadPlugins();


// Filenames and patterns

const files = {
	output: {
		scriptBundle: 'app.js',
	}
};

const dirs = {
	app:  'app',
	dist: 'dist',

	output: {
		styles: 'dist'
	}
};
dirs.js     = dirs.app + '/js';
dirs.styles = dirs.app + '/styles';
dirs.static = dirs.app + '/static';

const patterns = {
	jsSources:    [ dirs.js     + '/**/*.{js,jsx}' ],
	staticFiles:  [ dirs.static + '/**/*' ],
	stylesheets:  [ dirs.styles + '/**/*.{scss,css}' ],
	filesToClean: [ dirs.dist   + '/**/*' ],
	html:         [ dirs.static + '/**/*.html' ]
};



// Environment (dev / production)

const ENV_DEV = Symbol('ENV_DEV');
const ENV_PRODUCTION = Symbol('ENV_PODUCTION');

const env = process.env.ENV === 'production' ?
            ENV_PRODUCTION :
            ENV_DEV;


// ---- watch ------------------------------------------------------------------

// Run build when any file in `app` directory changes

function watch() {
	gulp.watch(patterns.html, [ 'html', browserSync.reload ]);
	gulp.watch(patterns.stylesheets, [ 'styles', browserSync.reload ]);
	gulp.watch(patterns.jsSources, [ 'bundleJs' ]);
}

gulp.task('watch', [ 'default' ], watch);


// --- lint --------------------------------------------------------------------

// Settings defined in `.eslintrc`.
gulp.task('lint', () =>
	gulp.src(patterns.jsSources)
		.pipe(plugins.eslint())
		.pipe(plugins.eslint.format())
);


// --- bundleJs ----------------------------------------------------------------

gulp.task('bundleJs', [ 'lint' ], () => {
	browserify({
		entries: dirs.js + '/app.js',
		extensions: [ '.jsx' ],
		debug: env === ENV_DEV    // enables source maps
	})
	.transform(babelify)  // ES 2015 -> ES 5
	.bundle()
	.on('error', handleBabelError)
	.pipe(source(files.output.scriptBundle))
	.pipe(buffer())            // buffer streaming vinyl file objects
	.pipe(plugins.if(env === ENV_PRODUCTION, plugins.uglify()))
	.pipe(gulp.dest(dirs.dist));
});


// --- styles ------------------------------------------------------------------

// Taken from Google Web Starter Kit:

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {

	const AUTOPREFIXER_BROWSERS = [
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

	// For best performance, don't add Sass partials to `gulp.src`
	return gulp.src(patterns.stylesheets)
		.pipe(plugins.newer('.tmp/styles'))
		.pipe(plugins.sourcemaps.init())
		// .pipe(plugins.sass({
		// 	precision: 10
		// }).on('error', plugins.sass.logError))
		.pipe(plugins.plumber())    // Handle sass errors
		.pipe(plugins.sass({
			precision: 10
		}))
		.pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
		.pipe(gulp.dest('.tmp/styles'))
		// Concatenate and minify styles
		.pipe(plugins.if('*.css', plugins.cleanCss()))
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest(dirs.output.styles));
});


// --- copy --------------------------------------------------------------------

// Copy files that don't need processing

gulp.task('copy', () => {
	return gulp.src(patterns.staticFiles.concat(patterns.html))
		.pipe(gulp.dest(dirs.dist));
});


// ---- serve ------------------------------------------------------------------

// Start a development HTTP server with browser-sync enabled

gulp.task('serve', [ 'build' ], () => {

	browserSync({
		server: { baseDir: dirs.dist },
		open: false
	});

	watch();
});


// --- Various -----------------------------------------------------------------

gulp.task('clean:bundle', () =>
	del(dirs.dist + '/' + files.output.scriptBundle, { dot: true })
);

gulp.task('clean', () =>
	del(patterns.filesToClean, { dot: true })
);

gulp.task('html', [ 'copy' ]);


gulp.task('build', [ 'bundleJs', 'copy', 'styles' ]);

gulp.task('default', [ 'build' ]);




// --- Utilities ---------------------------------------------------------------

/**
 * Formats and prints a Babel error.
 */
function handleBabelError(error) {

	if (!error.codeFrame || !error.filename) {
		return;
	}

	// Make filenames in error message relative:
	const message = error.toString().replace(
		new RegExp(__dirname + '/', 'g'), ''
	);

	const codeFrame = error.codeFrame
		.replace(
			new RegExp('^>', 'm'),
			chalk.bgRed('→')
		)
		.replace(
			new RegExp('(\\|\\s+)\\^(\\s*)$', 'm'),
			'$1' + chalk.bgRed('↑') + '$2'
		);

	const clickableFilename = error.filename.replace(/ /g, '\\ ') +
	                          `:${error.loc.line}:${error.loc.column}`;

	plugins.util.log([
		'\n',
		chalk.bgRed(' ERROR: '),
		'',
		chalk.red(message),
		chalk.red(`Line ${error.loc.line}, column ${error.loc.column}`),
		'',
		clickableFilename,
		'',
		codeFrame,
		''
	].join('\n'));
}
