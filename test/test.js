'use strict';

/*jshint -W079 */
var expect = require('chai').expect;


var ExampleWidget = require('../examples/example-widget');
var ExampleView = require('../examples/example-view');

after(function(){
	var container = document.querySelector('#test');
	container.innerHTML = '';
});



describe('example-widget', function() {

	describe('programmatically', function() {

		var widget;
		var container = document.querySelector('#test');

		it('can be created', function() {

			widget = new ExampleWidget();

			var x = expect(widget).to.not.be.null;

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

			var h3 = dom.querySelector('h3');

			expect(h3.innerText).to.equal('Example Widget');

		});	


		it('can be removed from the DOM', function() {

			container.removeChild(widget);

			var node = container.querySelector('example-widget');

			var x = expect(node).to.be.null;

		});	

	});





	describe('declaratively', function() {

		var container = document.querySelector('#test');


		it('can be added to the DOM', function(done) {

			container.innerHTML = '<example-widget></example-widget>';

			setTimeout(function() {
				var node = container.querySelector('example-widget');

				var x = expect(node).to.not.be.null;

				done();
			}, 10);

		});


		it('contains its template content', function(done) {

			var element = container.querySelector('example-widget');
			var dom = element.shadowRoot ? element.shadowRoot : element;

			setTimeout(function() {
				expect(dom.innerHTML).to.not.equal('');

				var h3 = dom.querySelector('h3');

				expect(h3.innerText).to.equal('Example Widget');

				done();
			}, 10);
		});		


	});	

});



describe('example-view', function() {

	describe('declaratively', function() {

		var container = document.querySelector('#test');


		it('can be added to the DOM', function(done) {

			container.innerHTML = '<example-view></example-view>';

			setTimeout(function() {
				var node = container.querySelector('example-view');

				var x = expect(node).to.not.be.null;

				done();
			}, 10);

		});


		it('contains its template content', function(done) {

			var element = container.querySelector('example-view');
			var dom = element.shadowRoot ? element.shadowRoot : element;

			setTimeout(function() {
				expect(dom.innerHTML).to.not.equal('');

				var h3 = dom.querySelector('h1');

				expect(h3.innerText).to.equal('Example View');

				done();
			}, 10);
		});		


	});	

});


