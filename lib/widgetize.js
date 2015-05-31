
'use strict';

var domify = require('domify');

module.exports = function widgetize(name, proto, template, options) {

	options = options || {};
	options.extend = options.extend || 'element';	// Basic HTML Element 

	var domNode;
	if (template)
	{
		domNode = domify(template);
	}

	var elementProto = Object.create(HTMLElement.prototype);


	elementProto.createdCallback = function() {
		
		if (!proto) return;

		this._instance = Object.create(proto);

		this._instance._element = this;
		//this._instance._dom = this.shadowDom.root;

		if (this._instance.created)
		{
			this._instance.created.call(this._instance);
		}
	};


	elementProto.attachedCallback = function() {
		
		if (domNode)
		{
			this.appendChild(domNode);
		}

		if (!proto) return;

		if (this._instance.attached)
		{
			this._instance.attached.call(this._instance);
		}
	};


	elementProto.detachedCallback = function() {

		if (!proto) return;

		if (this._instance.detached)
		{
			this._instance.detached.call(this._instance);
		}
	};


	var config = {prototype: elementProto}; 

	if (options.extend !== 'element')
	{
		config.extends = options.extend;
	}

	return document.registerElement(name, config);
};