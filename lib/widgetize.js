
'use strict';

module.exports = function widgetize(name, proto, template, options) {

	options = options || {};
	options.extend = options.extend || 'html';


	var elementProto = Object.create(HTMLElement.prototype);


	elementProto.createdCallback = function() {
		var instance = Object.create(proto);

		instance._element = this;
		//instance._dom = this.shadowDom.root;

		if (instance.created)
		{
			instance.created.call(instance);
		}
	};



	return document.registerElement(name, {
		prototype: elementProto,
		//extends: options.extend
	});
};