/*
	Form handler
	----------------------------------- */

	module.exports = function Form(form, options) {
		'use strict';

		var self = this;

		// Dependencies
		var handler = require('partials/api/handler');


/*
		External methods
		----------------------------------- */

		self.init = function(form) {

			// The form
			self.form = form;

			// Check form exists
			if (self.form.length) {

				// Validation summary and fields
				self.summary = self.form.find('.' + classSummary);
				self.fields = self.form.find('input, textarea, select, button');

				// Add validation
				self.validator = new (require('partials/validator'))();
				self.validator.add(self.form);

				// Add submit handler
				self.form.submit(self.submit);
			}
		};

		self.submit = function(event) {
			self.form.trigger('form:submit');

			// Submit via AJAX promise?
			if (options && options.submitPromise && typeof options.submitPromise === 'function') {
				event.preventDefault();

				// Lock UI
				self.lock();

				// Wire up promise
				self.promise = options.submitPromise();

				// Add fail/done handlers
				self.promise.fail(handler.handleError.bind(self, self.fail));
				self.promise.done(self.success);
			}
		};

		self.success = function() {
			self.form.trigger('form:success');

			// Reset validation
			self.validator.reset();

			if (typeof options.onSuccess === 'function')
				options.onSuccess.call(self);

			// Unlock UI
			self.unlock();
		};

		self.fail = function(error) {
			self.form.trigger('form:fail');

			var message = self.getMessage(error);

			// Reset validation, display fallback summary
			self.validator.reset();
			message.addClass(classMessageEnabled);

			if (typeof options.onFail === 'function')
				options.onFail.call(self, error);

			// Unlock UI
			self.unlock();
		};

		self.getMessage = function(error) {

			// Default error message
			var message = self.summary.first(),
				messageOverride;

			// Override error message by code?
			if (error && error.Message) {
				messageOverride = self.summary.filter('[data-message="' + encodeURIComponent(error.Message) + '"]');

				// Found override
				if (messageOverride.length)
					message = messageOverride;
			}

			return message;
		};

		// Lock UI
		self.lock = function() {
			self.form.addClass(classContainerPending);
			self.form.removeClass(classContainerEnabled);
			self.fields.prop('disabled', true);
		};

		// Unlock UI
		self.unlock = function() {
			self.form.addClass(classContainerEnabled);
			self.form.removeClass(classContainerPending);
			self.fields.prop('disabled', false);
		};


/*
		Internal
		----------------------------------- */

		var classContainer = 'fields',
			classContainerEnabled = classContainer + '--enabled',
			classContainerPending = classContainer + '--pending',
			classMessageEnabled = 'fields__validation--enabled',
			classSummary = 'fields__message';

		self.init(form);

		// Return instance
		return self;
	};
