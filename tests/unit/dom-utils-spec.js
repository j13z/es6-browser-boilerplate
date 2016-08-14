import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;

import { whenDomReady } from '../../app/js/ui/dom-utils';


// FIXME: Will not work in browser, only Node.js

describe('DOM utils', () => {

	let sandbox;

	beforeEach(() => {

		// FIXME: Stubs for Node.js environment. Find a proper way to test this.

		if (typeof document === 'undefined') {
			global.document = {};
		}

		document.addEventListener = (eventName, listener) => {
			setTimeout(listener, 0);
		};

		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('whenDomReady', () => {

		it('eventually resolves the promise', whenDomReady);


		context('when `document.readyState` is `loading`', () => {
			it('attaches an event listener for `DOMContentLoaded`', () => {

				document.readyState = 'loading';
				document.addEventListener = sinon.spy(document.addEventListener);

				return whenDomReady().then(() => {
					expect(document.addEventListener.callCount).to.equal(1);
					expect(document.addEventListener.getCall(0).args[0]).to.equal('DOMContentLoaded');
				});
			});
		});


		context('when `document.readyState` is not `loading`', () => {
			it('does not call `document.addEventListener', () => {

				document.readyState = 'don’t care';
				sandbox.spy(document, 'addEventListener');

				return whenDomReady().then(() => {
					expect(document.addEventListener.callCount).to.equal(0);
				});
			});
		});
	});
});
