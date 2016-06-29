# Cookie policy message

Show a cookie policy message/banner on your site

## Installation

```sh
npm install --save tmw-cookiepolicy
```

### Import/require
```js
// ES2015/ES6
import CookiePolicy from 'tmw-cookiepolicy';

// ES5
var CookiePolicy = require('tmw-cookiepolicy');
```

### UMD build
If you need a UMD/ES5 version, it has been provided. Use the CDN version at https://npmcdn.com/tmw-cookiepolicy@2.0.0/umd/cookie-policy-umd.js or require it with an explicit path:

```js
var CookiePolicy = require('tmw-cookiepolicy/umd/cookie-policy-umd');
```

## Options

```js
var policyElement = document.querySelector('.cookiePolicy');

new CookiePolicy(policyElement, {
	// options, defaults listed

	policyName: 'policy-agreed',
	// cookie name to check

	policySeen: 'policy-seen',
	// cookie name to check

	expire: 30,
	// in days
});
```

## Template
Use the template at https://github.com/tmwagency/cookie-policy/blob/master/template.html

## Styling
Some basic styles for the banner can be found at https://github.com/tmwagency/cookie-policy/blob/master/cookiePolicy.css