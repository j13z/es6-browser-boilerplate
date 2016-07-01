/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorldComponent from './components/hello-world-component';
/* eslint-enable no-unused-vars */
// (see https://github.com/babel/babel-eslint/issues/6#issuecomment-76532017)

export default {

	render: element => {

		ReactDOM.render(
			<HelloWorldComponent />,
			element,
			() => element.classList.remove('-hidden')
		);
	}
};

