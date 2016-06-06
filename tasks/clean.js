/*
	Clean previous builds from /dist/
	----------------------------------- */

	module.exports = function(paths, gulp, plugins) {

		// Return module
		return function(callback) {

			var pathsDel = [
				plugins.path.resolve(paths.build, '*')
			];

			return require('del')(pathsDel, callback);
		};
	};
