/*
 Compile partials to HTML in /dist/
 ----------------------------------- */

module.exports = function(paths, gulp, plugins) {

	// Child modules
	var assemble = require('assemble'),
		app = assemble();

	// Return module
	return function() {

		// Default page options
		var options = {
			locale: 'en-GB',
			theme: 'mainline-mouldings',

			// Appended to includes to bust cache
			timestamp: Date.now()
		};

		// Find layouts and partials
		app.layouts(plugins.path.resolve(paths.html, 'layouts/*.hbs'));
		app.partials(plugins.path.resolve(paths.html, 'partials/{,*/}*.hbs'));

		// Add classic helpers
		app.helpers(require('handlebars-helpers')(), app.helpers);

		// Build templates, exclude emails
		return app.src(plugins.path.resolve(paths.html, '*.hbs'))
			.pipe(app.renderFile(options))
			.pipe(plugins.rename({ extname: '.html' }))
			.pipe(app.dest(paths.build))
			.pipe(plugins.browserSync.stream({ match: '**/*.html' }));
	};
};
