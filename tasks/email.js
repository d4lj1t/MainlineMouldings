/*
	Compile email partials to HTML in /dist/emails
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function() {

			// Build email templates
			return gulp.src(plugins.path.resolve(paths.build, 'email-*.html'))
				.pipe(plugins.inlineCss({
					preserveMediaQueries: true,
					/*removeHtmlSelectors: true*/
				}))
				.pipe(gulp.dest(paths.build))
				.pipe(plugins.browserSync.stream({ match: '**/email-*.html' }));
		};
	};
