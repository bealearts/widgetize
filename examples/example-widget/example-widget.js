
'use strict';

var widgetize = require('widgetize');
var template = require('./example-widget.html');
var pkg = require('./package.json');

module.exports = widgetize(
	pkg.name, 
	{
		created: function() {

		},

		attached: function() {

		},

		updated: function() {

		},

		detached: function() {

		}
	},
	template
);