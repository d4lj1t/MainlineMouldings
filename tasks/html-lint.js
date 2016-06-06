/*
	Lint HTML for errors etc
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function(callback) {

			// Load all HTML files
			return gulp.src(plugins.path.resolve(paths.build, '*.html'))
				.pipe(plugins.htmlhint())
				.pipe(plugins.htmlhint.reporter())
		};
	};
