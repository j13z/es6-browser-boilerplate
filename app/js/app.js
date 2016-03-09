import 'babel-polyfill';
import * as reactExample from './ui/react-example';
import $ from 'jquery';

console.log(
	'Up and running.\n\n' +
	'To remove React run:  npm uninstall --save react react-dom\n' +
	'To remove jQuery run: npm uninstall --save jquery\n'
);

$(document).ready(reactExample.render);
