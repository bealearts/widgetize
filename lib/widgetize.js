
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


	clazz.prototype.createdCallback = function() {
		
		// TODO: Use Symbols
		this.__updateTriggered = false;
		this.__dom = this.createShadowRoot ? this.createShadowRoot() : this;

		if (this.init)
		{
			this.init.call(this);
		}
	};



	clazz.prototype.attachedCallback = function() {
		
		if (domNode)
		{
			this.__dom.appendChild(domNode);
		}

		if (this.attach)
		{
			this.attach.call(this, this.__dom);
		}

		if (this.update)
		{
			this.update.call(this, this.__dom);
		}
	};


	clazz.prototype.detachedCallback = function() {

		if (this.detach)
		{
			this.detach.call(this, this.__dom);
		}
	};


	clazz.prototype.invalidate = function() {

		if (this.update && !this.__updateTriggered)
		{
			this.__updateTriggered = true;

			process.nextTick(function doUpdate() {
				this.__updateTriggered = false;
				this.update(this.__dom);
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

