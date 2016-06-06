/*
	Form validator
	------------------------------- */

	module.exports = function Validator() {
		'use strict';

		var self = this,
			fieldElements;

		// Dependencies
		var $ = require('jquery');


/*
		External methods
		----------------------------------- */

		// Add form to validator
		self.add = function(form) {

			// Remove existing forms
			if (self.form)
				self.form.off('submit', self.submit);

			// Check for new form
			if (form && form.length) {
				self.form = form;

				// Wire up submit handler
				form.on('submit', self.submit);
			}
		};

		// Returns form field elements
		self.getFieldElements = function() {
			return fieldElements;
		};

		// Set form fieldElements
		self.setFieldElements = function(fieldElementsUpdated) {

			// Apply new field elements
			if (fieldElementsUpdated)
				fieldElements = fieldElementsUpdated;

			// Fall back to empty jQuery object or rebuild
			else fieldElements = !self.form || !self.form.length?
				$() : self.form.find('input, textarea, select');

			return self.getFieldElements();
		};

		// Handle form submit
		self.submit = function(event) {
			var elements;

			// Check for form
			if (self.form) {
				self.reset();

				// Get latest elements
				elements = self.getFieldElements();

				// Check each field
				elements.each(function() {

					var field = $(this),
						fieldValue = $.trim(field.val());

					// Associated "confirm" field
					var fieldMatchId = field.data('equalTo'),
						fieldMatch, fieldMatchValue;

					// Required fields
					if (field.attr('required')) {

						// But empty?
						if (fieldValue === '')
							self.invalid.push(field);

						// But lower than minimum length?
						else if (field.attr('minlength') && fieldValue.length < parseInt(field.attr('minlength'), 10))
							self.invalid.push(field);

						// Must be a valid email address
						else if (field.attr('type') === 'email' && !regexEmail.test(fieldValue))
							self.invalid.push(field);

						// Must match another field?
						if (fieldMatchId) {

							// Find associated field and value
							fieldMatch = elements.filter('#' + fieldMatchId);
							fieldMatchValue = $.trim(fieldMatch.val());

							// But doesn't match?
							if (fieldMatch.length && fieldValue !== fieldMatchValue)
								self.invalid.push(field);
						}
					}
				});

				// Don't bubble to other listeners
				if (event && self.invalid.length) {
					event.preventDefault();
					event.stopImmediatePropagation();
				}

				// Add validation output
				self.output();
			}
		};

		// Remove validation output
		self.reset = function() {
			self.setFieldElements();
			self.invalid = [];

			// Remove invalid class
			self.form.find('.' + classField).removeClass(classFieldInvalid);
			self.form.find('.' + classValidation).removeClass(classValidationEnabled);
		};

		// Add validation output
		self.output = function() {

			// Anything invalid?
			if (self.invalid.length) {

				// Add invalid class
				$.each(self.invalid, function(i) {
					self.invalid[i].parent().addClass(classFieldInvalid);
				});

				// Focus first invalid field
				self.invalid[0].focus();
			}
		};

		// Store invalid fieldElements
		self.invalid = [];


/*
		Internal
		----------------------------------- */

		var regexEmail = /^([_a-z0-9-\+]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9]+)*(\.[a-z]{2,}))$/i;

		var classField = 'fields__field',
			classFieldInvalid = classField + '--invalid',
			classValidation = 'fields__validation',
			classValidationEnabled = classValidation + '--enabled';
	};
