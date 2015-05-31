
'use strict';

module.exports = function widgetize(proto, domFragment, baseElement) {

	baseElement = baseElement | 'html';

	var widget = Object.create(HTMLElement.prototype);

	widget.createdCallback = function() {
		
	};
};