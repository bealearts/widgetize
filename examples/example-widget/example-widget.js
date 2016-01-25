
'use strict';

const widgetize = require('widgetize');
const template = require('./example-widget.html');
const pkg = require('./package.json');


/**
 * Example Widget
 */
class ExampleWidget extends widgetize.HTMLElement	// Babel expects a Constructor Function, not an Prototype Object i.e. HTMLElement
{
	init() 
	{

	}

	attach() 
	{

	}

	update() 
	{

	}

	detach()
	{

	}	
}


module.exports = widgetize(pkg.name, ExampleWidget, template);