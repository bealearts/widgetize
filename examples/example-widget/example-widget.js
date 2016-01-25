
'use strict';

const widgetize = require('widgetize');
const template = require('./example-widget.html');
const pkg = require('./package.json');


/**
 * Example Widget
 */
class ExampleWidget extends widgetize.HTMLElement	// Babel expects a Constructor Function, not an Object Prototype i.e. HTMLElement
{
	init() 
	{
		this._timer = null;

		this._timeElement = null;
	}

	attach(dom) 
	{
		this._timeElement = dom.querySelector('time');

		this._timer = setInterval(function() {
			this.invalidate();
		}.bind(this), 1000);
	}

	update(dom) 
	{
		this._timeElement.textContent = new Date();
	}

	detach(dom)
	{
		clearInterval(this._timer);
	}	
}


module.exports = widgetize(pkg.name, ExampleWidget, template);