
'use strict';

var domify = require('domify');

var widgetize = module.exports = function widgetize(name, clazz, template, options) {

	options = options || {};
	options.extend = options.extend || 'element';	// Basic HTML Element 

	var domNode;
	if (template)
	{
		domNode = domify(template);
	}


	if (!clazz)
	{
		clazz = HtmlElement;
	}


	clazz.prototype.createdCallback = function() {
		
		this._dom = this.createShadowRoot ? this.createShadowRoot() : this;

		if (this.init)
		{
			this.init.call(this);
		}
	};



	clazz.prototype.attachedCallback = function() {
		
		if (domNode)
		{
			this._dom.appendChild(domNode);
		}

		if (this.attached)
		{
			this.attach.call(this);
		}
	};


	clazz.prototype.detachedCallback = function() {

		if (this.detach)
		{
			this.detach.call(this);
		}
	};


	var config = {prototype: clazz.prototype}; 

	if (options.extend !== 'element')
	{
		config.extends = options.extend;
	}

	return document.registerElement(name, config);
};



/* Expose Element superclasses in a Babel friendly way */

widgetize.HTMLElement = function() {
	return new HTMLElement();
};
widgetize.HTMLElement.prototype = HTMLElement.prototype;

