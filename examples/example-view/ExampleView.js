
'use strict';

const widgetize = require('widgetize');
const template = require('./ExampleView.html');
const pkg = require('./package.json');
const ExampleViewPM = require('./ExampleViewPM.js');
const bindling = require('bindling');

// Widgets
require('../example-widget');

/**
 * Example View
 */
class ExampleView extends HTMLElement
{
	init() {
		this._pm = new ExampleViewPM();
	}

	attach(dom) {
		dom.appendChild( bindling(template, this._pm) );
		this._pm.init();
	}

}


module.exports = widgetize(pkg.name, ExampleView);
