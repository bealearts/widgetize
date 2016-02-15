
'use strict';

const widgetize = require('widgetize');
const template = require('./ExampleWidget.html');
const pkg = require('./package.json');


/**
 * Example Widget
 */
class ExampleWidget extends widgetize.base(HTMLInputElement)	// Babel expects a Constructor Function, not an Object Prototype i.e. HTMLElement
{
	get disabled()
	{
		return this._disabled;
	}

	set disabled(value)
	{
		if (value !== this._disabled)
		{
			this._disabled = value;
			this.invalidate();
		}
	}


	init() 
	{
		this._timer = null;

		this._timeElement = null;

		this._disabled = false;
	}


	attach(dom) 
	{
		this._timeElement = dom.querySelector('time');

		this._timer = setInterval(() => {
			this.invalidate();
		}, 1000);
	}


	update(dom) 
	{
		if (!this.disabled)	// Note: A better implementation would only run the timer when not disabled.
		{
			this._timeElement.textContent = new Date();
		}
	}


	detach(dom)
	{
		clearInterval(this._timer);
	}	
}


module.exports = widgetize(pkg.name, ExampleWidget, template);