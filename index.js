/**
 * Cookie policy checker
 * @module
 * @author Zander Martineau
 */

function CookiePolicy(element, options) {
	this.element = element;

	this.options = {
		cookieName: options.cookieName || 'cookies-agreed', // cookie name to check
		cookieNameSeen: options.cookieNameSeen || 'cookies-policy-seen', // cookie name to check
		expire: options.expire || 30, // in days
	}

	this.accept = {
		// cta: true, // accept policy if cta button clicked
		seen: true, // accept policy if seen once
		// hide: true // accept policy if close/hide button clicked
	};

	if (!window.localStorage) { return; }

	// Check storage
	if (localStorage.getItem(this.options.cookieName)) {
		return;

	} else {

		if (this.accept.seen && localStorage.getItem(this.options.cookieNameSeen)) {
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
	localStorage.setItem(this.options.cookieNameSeen, true);
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

	localStorage.setItem(this.options.cookieName, true);
	this.element.classList.remove('is-visible');
};

function $$(selector, context) {
	context = context || document;
	var elements = context.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
}

module.exports = CookiePolicy;