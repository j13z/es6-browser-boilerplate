/**
 * @return {Promise}
 */
export function whenDomReady() {

	return new Promise(resolve => {
		if (document.readyState !== 'loading') {
			resolve();
		} else {
			document.addEventListener('DOMContentLoaded', resolve);
		}
	});
}
