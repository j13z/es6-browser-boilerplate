import chai from 'chai';
import sinon from 'sinon';
import { bind } from '../../app/js/util';
const expect = chai.expect;


describe('util', () => {

	describe('bind', () => {

		context('when called with more than one arguments', () => {
			it('should bind the arguments to the function (first argument)', () => {

				const f = sinon.spy();
				const g = bind(f, 'bound arg 1', 'bound arg 2');

				g('arg 1', 'arg 2');

				expect(f.callCount).to.equal(1);
				expect(f.calledWith('bound arg 1', 'bound arg 2', 'arg 1', 'arg 2')).to.equal(true);
			});
		});

		context('when called with only one argument', () => {
			it('should not change the function’s behavior', () => {

				const f = sinon.spy(() => 'hello');
				const g = bind(f);

				expect(f()).to.equal('hello');
				expect(f.callCount).to.equal(1);
				expect(f.getCall(0).args).to.deep.equal([]);

				expect(g()).to.equal('hello');
				expect(f.callCount).to.equal(2);
				expect(f.getCall(1).args).to.deep.equal([]);
			});
		});
	});
});
