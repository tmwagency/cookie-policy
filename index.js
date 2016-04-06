/**
 * Cookie policy checker
 * @module
 * @author Zander Martineau
 */


export function CookiePolicy(element, options) {
	this.element = element;
	this.options = Object.assign(this.defaultOptions, options);

	if (!window.localStorage) { return; }

	console.log('foo');

	// Check storage
	if (localStorage.getItem(this.options.cookieName)) {
		return;

	} else if (localStorage.getItem(this.options.cookieName) !== 'true') {

		if (this.options.accept.seen && localStorage.getItem(this.options.cookieNameSeen)) {
			// Policy seen but not accepted. Implicitly accept policy
			this.acceptPolicy();

		} else {
			// Show policy
			setTimeout(() => this.showCookieMessage, 500);
			this.addEvents();

		}
	}
}

/**
 * defaultOptions
 */
CookiePolicy.prototype.defaultOptions = {
	cookieName: 'cookies-agreed', // cookie name to check
	cookieNameSeen: 'cookies-policy-seen', // cookie name to check
	accept: {
		// cta: true, // accept policy if cta button clicked
		seen: true, // accept policy if seen once
		// hide: true // accept policy if close/hide button clicked
	},
	expire: 30, // in days
};

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

	// var nodesArray = [].slice.call(this.element.querySelectorAll('.js-cookiePolicy-accept'));
	// nodesArray.addEventListener('click', this.acceptPolicy.bind(this));
	console.log('addevents');
	// $$('.js-cookiePolicy-accept', this.element).forEach((element, index) => {
	// 	element.addEventListener('click', this.acceptPolicy);
	// });

	// const arr = ['a', 'b', 'c'];
	for (const elem of acceptElements) {
		console.log(elem);
	}
};

/**
 * acceptPolicy
 */
CookiePolicy.prototype.acceptPolicy = function(ev) {
	if (ev) {
		ev.preventDefault();
	}
	console.log('clicked');

	localStorage.setItem(this.options.cookieName, true);
	this.element.classList.remove('is-visible');
};