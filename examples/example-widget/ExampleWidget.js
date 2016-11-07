import widgetize from 'widgetize';
import template from './ExampleWidget.html';
import pkg from './package.json';


/**
 * Example Widget
 */
class ExampleWidget extends HTMLElement
{
	init() {
		this._timer = null;

		this._timeElement = null;

		this.disabled = false;
	}


	attach(dom) {
		this._timeElement = dom.querySelector('time');

		this._timer = setInterval(() => {
			this.invalidate();
		}, 1000);
	}


	update(dom) {
		if (!this.disabled) {	// Note: A better implementation would only run the timer when not disabled.
			this._timeElement.textContent = new Date();
		}
	}


	detach(dom) {
		clearInterval(this._timer);
	}
}


export default widgetize(pkg.name, ExampleWidget, template);
