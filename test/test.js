'use strict';

/*jshint -W079 */
var expect = require('chai').expect;


var ExampleWidget = require('../examples/example-widget');

after(function(){
	var container = document.querySelector('#test');
	//container.innerHTML = '';
});



describe('example-widget', function() {

	describe('programmatically', function() {

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

			var element = container.querySelector('example-widget');
			var dom = element.shadowRoot ? element.shadowRoot : element;

			expect(dom.innerHTML).to.not.equal('');

			var span = dom.querySelector('h3');

			expect(span.innerText).to.equal('Example Widget');

		});	


		// it('can be removed from the DOM', function() {

		// 	container.removeChild(widget);

		// 	var node = container.querySelector('example-widget');

		// 	expect(node).to.be.null;

		// });	

	});





	// describe('declaratively', function() {

	// 	var container = document.querySelector('#test');


	// 	it('can be added to the DOM', function() {

	// 		container.innerHTML = '<example-widget></example-widget>'

	// 		var node = container.querySelector('example-widget');

	// 		expect(node).to.not.be.null;

	// 	});	


	// });	

});



