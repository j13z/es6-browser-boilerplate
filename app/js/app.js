import 'babel-polyfill';
import ui from './ui';

console.log(
	'Up and running 👏\n\n' +
	'To remove React run:  npm uninstall --save react react-dom'
);

ui.init().then(ui.render);
