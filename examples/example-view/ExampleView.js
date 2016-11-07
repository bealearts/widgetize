
'use strict';

import widgetize from 'widgetize';
import template from './ExampleView.html';
import pkg from './package.json';
import ExampleViewPM from './ExampleViewPM.js';
import bindling from 'bindling';

// Widgets
import exampleWidget from '../example-widget';

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


export default widgetize(pkg.name, ExampleView);
