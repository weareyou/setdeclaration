const gulp = require('gulp'),
	runSequence = require('run-sequence'),
	plugins = require('gulp-load-plugins')(),
	argv = require('yargs').argv,
	config = {
		output: {
			base: './dist/',
			css: './dist/css/',
			html: './dist/',
			images: './dist/img/',
			js: './dist/js/'
		},
		production: argv.mode === 'production',
		src: {
			css: './src/css/',
			html: './src/',
			images: './src/img/',
			js: './src/js/'
		}
	};

plugins.chalk = require('chalk');

// Load the tasks, these needs to be done after config is fully setup.
require('./gulp/clean')(gulp, config, plugins);
require('./gulp/css')(gulp, config, plugins);
require('./gulp/html')(gulp, config, plugins);
require('./gulp/images')(gulp, config, plugins);

// Global Gulp tasks. These are the taks that will usually be run from the CLI.
gulp.task('webserver', function webserver(taskReady) {
	gulp.src('dist').pipe(
		plugins.serverLivereload({
			directoryListing: false,
			livereload: true,
			open: true,
			port: 1337
		})
	);
});

gulp.task('build', function build(taskReady) {
	runSequence(
		'clean',
		['build:html', 'build:css', 'build:images'],
		taskReady
	);
});

gulp.task('dev', function devTask(taskReady) {
	runSequence(
		'build',
		['watch:css', 'watch:html', 'webserver'],
		taskReady
	);
});
