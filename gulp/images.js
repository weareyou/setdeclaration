module.exports = function task(gulp, config, plugins) {
	gulp.task('build:images', function buildTask() {
		// Only use the HTML files in the root of the src.html folader as input,
		// the HTML files in the partials folder should NOT be processed by Gulp
		// as input files.
		return gulp.src(`${ config.src.images }*`)
			// Write the output to disk.
			.pipe(gulp.dest(config.output.images));
	});
}
