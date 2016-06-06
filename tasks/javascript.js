/*
	Combine JavaScript partials
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Child modules
		var browserify = require('browserify'),
			buffer = require('vinyl-buffer'),
			source = require('vinyl-source-stream');

		// Configure
		var b = browserify({
			debug: true,
			entries: plugins.path.resolve(paths.src, 'static/script/main.js'),
			paths: [
				plugins.path.resolve(paths.src, 'static/script/')
			]
		});

		// Return module
		return function(callback) {

			return b.bundle()
				.pipe(plugins.plumber())

				// Load files
				.pipe(source(plugins.path.resolve(paths.src, 'static/script/main.js')))
				.pipe(buffer())

				// Start sourcemaps
				.pipe(plugins.sourcemaps.init({ loadMaps: true }))

				// Uglify and switch to build location
				.pipe(plugins.uglify())
				.pipe(plugins.rename({
					dirname: 'dist/static/script',
					suffix: '.min'
				}))

				// Write to files
				.pipe(plugins.sourcemaps.write('.'))
				.pipe(gulp.dest('.'))

				// Reload in browser
				.pipe(plugins.browserSync.stream({ match: '**/*.js' }));
		};
	};
