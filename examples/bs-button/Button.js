
'use strict';

const widgetize = require('widgetize');
const pkg = require('./package.json');


/**
 * A Bootstrap (http://getbootstrap.com/) Button
 */
class Button extends widgetize.base(HTMLButtonElement)
{

	init() 
	{
		this._button = document.createElement('button');
	}


	attach(dom, content) 
	{
		this._button.appendChild(content);
		dom.appendChild(this._button);

		this._button.setAttribute('type', 'button');
		this._button.setAttribute('class', 'btn btn-default');
	}


	update(dom) 
	{

	}


	detach(dom)
	{

	}	
}


module.exports = widgetize(pkg.name, Button, null, {shadow: false, extend: 'button'});

