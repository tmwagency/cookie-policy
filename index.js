/**
 * Cookie policy checker
 * @module
 * @author Zander Martineau
 */

function CookiePolicy(element, options) {
	this.element = element;

	this.options = {
		policyName: options.policyName || 'policy-agreed',
		policySeen: options.policySeen || 'policy-seen',
		expire: options.expire || 30, // in days
	}

	this.accept = {
		// cta: true, // accept policy if cta button clicked
		seen: true, // accept policy if seen once
		// hide: true // accept policy if close/hide button clicked
	};

	if (!window.localStorage) { return; }

	// Check storage
	if (localStorage.getItem(this.options.policyName)) {
		return;

	} else {

		if (this.accept.seen && localStorage.getItem(this.options.policySeen)) {
			// Policy seen but not accepted. Implicitly accept policy
			this.acceptPolicy();

		} else {
			// Show policy
			setTimeout(this.showCookieMessage.bind(this), 500);
			this.addEvents();
		}
	}
}

/**
 * showCookieMessage
 */
CookiePolicy.prototype.showCookieMessage = function() {
	this.element.classList.add('is-visible');

	try {
		localStorage.setItem(this.options.policySeen, true);
	} catch (e) {
		console.log("localStorage not supported: " + e);
	}
};

/**
 * addEvents
 */
CookiePolicy.prototype.addEvents = function() {
	var acceptElements = this.element.querySelectorAll('.js-cookiePolicy-accept'); //.on('click', this.acceptPolicy.bind(this));

	$$('.js-cookiePolicy-accept', this.element).forEach(function(element, index) {
		element.addEventListener('click', this.acceptPolicy.bind(this));
	}.bind(this));
};

/**
 * acceptPolicy
 */
CookiePolicy.prototype.acceptPolicy = function(ev) {
	if (ev) {
		ev.preventDefault();
	}

	try {
		localStorage.setItem(this.options.policyName, true);
	} catch (e) {
		console.log("localStorage not supported: " + e);
	}

	this.element.classList.remove('is-visible');
};

function $$(selector, context) {
	context = context || document;
	var elements = context.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
}

module.exports = CookiePolicy;
