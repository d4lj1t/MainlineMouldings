/*
	Dependencies
	----------------------------------- */

	// Gulp + plugins
	var gulp = require('gulp'),
		plugins = require('gulp-load-plugins')();

	// Non-gulp modules
	plugins.browserSync = require('browser-sync');
	plugins.path = require('path');
	plugins.runSequence = require('run-sequence');

	// Fetch config
	var config = require('./package.json').config;


/*
	Child tasks
	----------------------------------- */

	plugins.getModule = function(task) {
		return require(plugins.path.resolve(config.paths.tasks, task))(config.paths, gulp, plugins);
	};

	gulp.task('clean', plugins.getModule('clean'));
	gulp.task('copy', plugins.getModule('copy'));
	gulp.task('css', plugins.getModule('css'));
	gulp.task('email', plugins.getModule('email'));
	gulp.task('html', plugins.getModule('html'));
	gulp.task('html-lint', plugins.getModule('html-lint'));
	gulp.task('images', plugins.getModule('images'));
	gulp.task('javascript', plugins.getModule('javascript'));
	gulp.task('javascript-lint', plugins.getModule('javascript-lint'));
	gulp.task('watch', plugins.getModule('watch'));
	gulp.task('browser-sync', plugins.getModule('browser-sync'));


/*
	Main task sequences
	----------------------------------- */

	// Default tasks
	gulp.task('default', ['clean'], function(callback) {
		return plugins.runSequence('javascript-lint', ['css', 'html', 'javascript', 'copy'], 'email', 'html-lint', callback);
	});

	// Development tasks
	gulp.task('dev', function(callback) {
		return plugins.runSequence('default', ['browser-sync', 'watch'], callback);
	});


