/*
	Refresh on changes during dev
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function() {

			// Source paths
			var pathCSS = plugins.path.resolve(paths.src, '**/*.scss'),
				pathJS = plugins.path.resolve(paths.src, '**/*.js'),
				pathHTML = plugins.path.resolve(paths.html, '**/*.hbs'),
				pathFonts = plugins.path.resolve(paths.src, 'static/fonts/**'),
				pathImages = plugins.path.resolve(paths.src, 'static/images/**')


			// Watch for CSS changes
			plugins.watch(pathCSS, plugins.batch(function (events, done) {
				return plugins.runSequence('css', done);
			}));

			// Watch for JS changes
			plugins.watch(pathJS, plugins.batch(function (events, done) {
				return plugins.runSequence('javascript-lint', 'javascript', 'copy', done);
			}));

			// Watch for HTML changes
			plugins.watch(pathHTML, plugins.batch(function (events, done) {
				return plugins.runSequence('html', 'email', 'html-lint', done);
			}));

			// Watch for static asset changes
			plugins.watch([pathFonts, pathImages], plugins.batch(function (events, done) {
				return plugins.runSequence('copy', done);
			}));
		};
	};
