/*
	Compile Sass to CSS
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function(callback) {

			var options = {

				sass: {
					outputStyle: 'compressed',
					errLogToConsole: true
				},

				autoprefixer: {
					browsers: ['> 2%', 'IE >= 9', 'iOS >= 7'],
					cascade: false,
					remove: true
				},

				mqpacker: {
					sort: true
				}
			};

			// Task-specific dependencies
			var autoprefixer = require('autoprefixer'),
				csswring = require('csswring'),
				eyeglass = require('eyeglass');
				mqpacker = require('css-mqpacker');

			// Load all Sass files
			return gulp.src(plugins.path.resolve(paths.src, 'static/scss/*.scss'))

				// Convert to CSS
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.sass(eyeglass(options.sass, plugins.sass)).on('error', plugins.sass.logError))

				// Process PostCSS
				.pipe(plugins.postcss([
					autoprefixer(options.autoprefixer),
					csswring(options.csswring),
					mqpacker(options.mqpacker)
				]))

				// Rename, write to files
				.pipe(plugins.rename({ suffix: '.min' }))
				.pipe(plugins.sourcemaps.write('.', { sourceRoot: '/static/scss/' }))
				.pipe(gulp.dest(plugins.path.resolve(paths.build, 'static/css')))

				// Reload in browser
				.pipe(plugins.browserSync.stream({ match: '**/*.css' }));
		};
	};
