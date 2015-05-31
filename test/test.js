'use strict';

/*jshint -W079 */
var expect = require('chai').expect;


var ExampleWidget = require('../examples/example-widget');

describe('example-widget', function() {

	var widget;
	var container = document.querySelector('#test');

	it('can be created', function() {

		widget = new ExampleWidget();

		expect(widget).to.not.be.null;

	});	


	it('can be added to the DOM', function() {

		container.appendChild(widget);

		var node = container.querySelector('example-widget');

		expect(node).to.equal(widget);

	});	


	it('contains its template content', function() {

		var node = container.querySelector('example-widget');

		expect(node.innerHTML).to.not.equal('');

		var span = node.querySelector('span');

		expect(span.innerText).to.equal('Example Widget');

	});	


	it('can be removed from the DOM', function() {

		container.removeChild(widget);

		var node = container.querySelector('example-widget');

		expect(node).to.be.null;

	});	

});



