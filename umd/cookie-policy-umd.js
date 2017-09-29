(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CookiePolicy = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
		console.log("localStorage not enabled on this system: " + e);
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
			console.log("localStorage not enabled on this system: " + e);
	}

	this.element.classList.remove('is-visible');
};

function $$(selector, context) {
	context = context || document;
	var elements = context.querySelectorAll(selector);
	return Array.prototype.slice.call(elements);
}

module.exports = CookiePolicy;

},{}]},{},[1])(1)
});