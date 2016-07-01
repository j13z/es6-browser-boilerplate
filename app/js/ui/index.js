import { whenDomReady } from './dom-utils';
import reactExample from './react/react-example';

export default {

	init: whenDomReady,

	render: () => {
		reactExample.render(document.getElementById('react-example'));
	}
};
