# Cookie policy message

Show a cookie policy message/banner on your site

## Installation

```sh
npm install --save tmw-cookiepolicy
```

## Options

```js
var policyElement = document.querySelector('.cookiePolicy');

new CookiePolicy(policyElement, {
	// options, defaults listed

	policyName: 'cookies-agreed',
	// cookie name to check

	policySeen: 'cookies-policy-seen',
	// cookie name to check

	expire: 30,
	// in days
});
```

## Template
Use the template at https://github.com/tmwagency/cookie-policy/blob/master/template.html

## Styling
Some basic styles for the banner can be found at https://github.com/tmwagency/cookie-policy/blob/master/cookiePolicy.css