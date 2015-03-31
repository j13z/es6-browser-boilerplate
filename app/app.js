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
			<li>Deployable artifacts are written to <code>/dist</code></li>
		</ul>
	`);
};

saySomething(greeting);

console.log('Up and running.');
