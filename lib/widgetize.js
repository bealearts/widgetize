
'use strict';

var domify = require('domify');
var camelCase = require('lodash.camelcase');

var widgetize = module.exports = function widgetize(name, clazz, template, options) {

	options = options || {};
	options.extend = options.extend || 'element';	// Basic HTML Element
	options.shadow = options.shadow || true;

	var domNode;
	if (template) {
		domNode = domify(template);
	}


	if (!clazz) {
		clazz = HTMLElement;
	}


	clazz.prototype.createdCallback = function() {
		
		// TODO: Use Symbols
		this.__updateTriggered = false;
		this.__dom = this.createShadowRoot && options.shadow ? this.createShadowRoot() : this;

		if (this.init) {
			this.init.call(this);
		}
	};



	clazz.prototype.attachedCallback = function() {
		
		var updateProperty = updatePropertyFromAttribute.bind(this);

		Array.prototype.forEach.call(this.attributes, function(attr) {
			updateProperty(attr.name, attr.value);
		});


		var content = document.createDocumentFragment();
		while (this.firstChild) {
			content.appendChild(this.removeChild(this.firstChild));
		}

		if (domNode) {
			this.__dom.appendChild( domNode.cloneNode(true) );
		}

		if (this.attach) {
			this.attach.call(this, this.__dom, content);
		}

		if (this.update) {
			this.update.call(this, this.__dom);
		}
	};


	clazz.prototype.detachedCallback = function() {

		if (this.detach) {
			this.detach.call(this, this.__dom);
		}
	};


	clazz.prototype.attributeChangedCallback = function(attrName, oldValue, newValue) {

		updatePropertyFromAttribute.call(this, attrName, newValue);

		this.invalidate();
	};


	clazz.prototype.invalidate = function() {

		if (this.update && !this.__updateTriggered) {
			this.__updateTriggered = true;

			process.nextTick(function doUpdate() {
				this.__updateTriggered = false;
				this.update(this.__dom);
			}.bind(this));
		}
	};


	var config = {prototype: clazz.prototype};

	return document.registerElement(name, config);
};



/* Expose Element superclasses in a Babel friendly way */

widgetize.base = function(Element) {

	var base = function() {
		return new Element();
	};
	
	base.prototype = Element.prototype;

	return base;
};


/* PRIVATE */


function updatePropertyFromAttribute(attrName, newValue) {
	var propertyName = camelCase(attrName);
	if (this[propertyName] !== undefined) {
		try {
			this[propertyName] = defaultValue(this[propertyName], newValue);
		} catch (error) {
			// Suppress DOM errors
		}
	}
}


function defaultValue(current, value) {
	if (current === true || current === false) {
		return value === null ? false : true;
	} else {
		return value;
	}
}