# Widgetize [![Build Status](https://travis-ci.org/bealearts/widgetize.svg)](https://travis-ci.org/bealearts/widgetize) [![npm version](https://badge.fury.io/js/widgetize.svg)](http://badge.fury.io/js/widgetize)
[Custom Element](http://w3c.github.io/webcomponents/spec/custom/) based HTML5 Widgets and Views using [Browserify](http://browserify.org/)

Create reusable and encapsulated HTML5 widgets and Application Views using HTML5, CSS3 and Javascript. 

Simply ```npm install``` and ```require()``` a widget and it will be automatically included in your [Browserify](http://browserify.org/) project, for use in your HTML page as a custom element.

## Install
```shell
npm install widgetize --save-dev
```

## Usage

#### JS
```js
const widgetize = require('widgetize');

/**
 * Time Widget
 */
class TimeWidget extends widgetize.base(HTMLElement)	// Babel expects a Constructor Function, not an Object Prototype i.e. HTMLElement
{
    init() 
    {
        this._timer = null;

        this._timeElement = null;
    }

    attach(dom, content) 
    {
        this._timeElement = dom.querySelector('time');

        this._timer = setInterval(() => {
            this.invalidate();
        }, 1000);
    }

    update(dom) 
    {
        this._timeElement.textContent = new Date();
    }

    detach(dom)
    {
        clearInterval(this._timer);
    }	
}


module.exports = widgetize('time-widget', ExampleWidget, 'The Time is: <span></span>');
```

#### HTML
```html
<html>
    <head>
        <script src="bundle.js"></script>
    </head>
    <body>
        <time-widget></time-widget>	
    </body>
</html>
```

## API

#### `widgetize(tagName, constructor [, template] [, options])`

Creates a widget and registers it with the browser.

**_tagName_** ```String``` Tag name of the element to use in HTML. Must contain at least one -. e.g. `my-tag`

**_constructor_** ```Function``` Constructor function for the widgets definition. Can be ```null```. Instances are created with the ```new``` operator.

**_template_** ```String``` Template to use for the elements HTML content.

**_options_** ```Object``` Options

> **_.extend_**  ```String``` Tag name of the element to extend. Defaults to ```Element``` for HTMLElement

The created widget has a lifecycle which can be programmatically accessed by the object defined by the Constructor function.

###### The following instance methods are avaiable to be overridden by the widget

##### `init()` Called when a widget is created, either by being called with `new Widget()` or when parsed by the browser in the DOM.

A good place to initalise instance variables.

##### `attach(dom, content)` Called when the widget is added to the DOM, either by being used with `.appendChild(widget)` or when rendered by the browser in the DOM.

The place to make one time modifications to the widget DOM, available as `dom`, and to add event listeners.

`dom` is a reference to the element's shadow DOM if supported, or the element itself.

`content` is a Document Fragment containing any content the element had.

##### `update(dom)` Called after `attach()` and then once per Event Loop execution after a call to `invalidate`.

The place to make updates to the DOM after a change of state of the widget.

By waiting for `update()` to be called, DOM updates for multipule changes of state can be scheduled together.  

`dom` is a reference to the element's shadow DOM if supported, or the element itself.

##### `detach(dom)` Called when the widget is removed from the DOM, either by being used with `` or when the browser removes the elemnt from the DOM.

The place to clean up references and event listeners etc.

`dom` is a reference to the element's shadow DOM if supported, or the element itself.

###### The following instance methods are avaiable to be used by the widget

##### `invalidate()` Invalidates the widget, so that `update()` will be called in the next Event Loop execution.

Multiple calls to `invalidate()` within the same Event Loop execution, will only tigger one call to `update()` in the next Event Loop execution.



#### `widgetize.base(elementProto)`

Return a [Babel](https://babeljs.io/) friendly base class to extend

**_elementProto_** `Object` Element proto object e.g. HTMLElement

Babel expects a Constructor Function, not an Object Prototype when using ES6 Class declarations.


## Examples
- [Widget](examples/example-widget)
- [View](examples/example-view)


## Test

```shell
npm install
npm install:examples
npm test
```

