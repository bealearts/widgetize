
'use strict';

const widgetize = require('widgetize');
const template = require('./ExampleView.html');
const pkg = require('./package.json');
const ExampleViewPM = require('./ExampleViewPM.js');
const bindling = require('bindling');

/**
 * Example View
 */
class ExampleView extends widgetize.base(HTMLElement)	// Babel expects a Constructor Function, not an Object Prototype i.e. HTMLElement
{
	init() 
	{
		this._pm = new ExampleViewPM();
	}

	attach(dom) 
	{
		dom.appendChild( bindling(template, this._pm) );
		this._pm.init();
	}
	
}


module.exports = widgetize(pkg.name, ExampleView);