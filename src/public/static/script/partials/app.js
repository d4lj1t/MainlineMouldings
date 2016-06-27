/*
	App base constructor
	----------------------------------- */

	module.exports = function App() {
		'use strict';

		var self = this;

		// Dependencies
		var $ = require('jquery');


/*
		External methods
		----------------------------------- */

		self.init = function() {

			//plugins


			// Start other modules
			new (require('partials/side-menu'))();
			new (require('partials/secondary-nav'))();
			/*new (require('partials/jssor-slider'))();*/



		/*	// 3rd party
			require('picturefill');
			(require('fastclick'))(document.body);

			// Prevent linking on disabled <a>
			$(document).on('click', 'a.button--disabled', function(event) {
				event.preventDefault();
			});*/


		};

		// Auto initialise
		self.init();
		/*require('jquery','plugins/bootstrap.min.js');*/

		// Return instance
		return self;
	};
