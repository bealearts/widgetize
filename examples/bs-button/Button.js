
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


module.exports = delegate( widgetize(pkg.name, Button, null, {shadow: false, extend: 'button'}) );


function delegate(Target) {

	var Delegate = function() {
		new Target();
	};
	
	//Delegate.prototype = Target.prototype;

	Delegate.prototype.attach = function(dom, content) {
		console.log('Hi');
	};

	return Delegate;
};
