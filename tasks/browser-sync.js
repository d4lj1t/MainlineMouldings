/*
	Browser Sync (Live reload for dev)
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function(callback) {

			// Watch for CSS changes
			plugins.watch([plugins.path.resolve(paths.src, 'content/**/*.scss')], function() {
				gulp.start('sass');
			});

			return plugins.browserSync({
				open: false,
				notify: false,
				reloadDebounce: 400,
				reloadDelay: 400,
				server: {
					baseDir: paths.build,
					index: 'index.html'
				}
			});
		};
	};
