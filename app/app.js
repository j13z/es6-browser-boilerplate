// This is the main application module. Import other module from here.
//
// All modules will be compiled to ES5 and bundled into a single file,
// `dist/js/app.js` so that the code can be run in today's browsers.


import greeting from './test-module';

const saySomething = (message) => {
	document.write(`
		<h1>ES6 web app boilerplate project</h1>

		<p>${message}</p>

		<ul>
			<li>Module sources and styles (SCSS): <code>/app</code> directory</li>
			<li>Deployable artifacts go to <code>/dist</code></li>
			<li>3rd party libaries live in <code>/lib</code> or <code>/node_modules</code> (npm)</li>
		</ul>
	`);
};

saySomething(greeting);


// jQuery, Backbone.js and Underscore.js are available on the global scope.
// Ultimately they would be loaded as modules, too.

console.log('Here are some toys to play with:');

console.log('jQuery:', jQuery);
console.log('Underscore.js:', _);
console.log('Backbone.js:', Backbone);
