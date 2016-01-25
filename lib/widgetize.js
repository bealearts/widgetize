
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
		clazz = HTMLElement;
	}


	var updateTriggered = false;


	clazz.prototype.createdCallback = function() {
		
		this._dom = this.createShadowRootx ? this.createShadowRoot() : this;

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

		if (this.attach)
		{
			this.attach.call(this);
		}

		if (this.update)
		{
			this.update.call(this);
		}
	};


	clazz.prototype.detachedCallback = function() {

		if (this.detach)
		{
			this.detach.call(this);
		}
	};


	clazz.prototype.invalidate = function() {

		if (this.update && !updateTriggered)
		{
			updateTriggered = true;
			
			process.nextTick(function doUpdate() {
				updateTriggered = false;
				this.update();
			}.bind(this));
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

