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

    attach(dom) 
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

Create a Custom Element widget and registers it with the browser.

**_tagName_** ```String``` Tag name of the element to use in HTML. Must contain at least one -. e.g. `my-tag`

**_constructor_** ```Function``` Constructor function for the widgets definition. Can be ```null```. Instances are created with the ```new``` operator.

**_template_** ```String``` Template to use for the elements HTML content.

**_options_** ```Object``` Options

> **_.extend_**  ```String``` Tag name of the element to extend. Defaults to ```Element``` for HTMLElement

The created widget has a lifecycle which can be programmatically access by the object defined by the Constructor function.

The following methods are avaiable to be overridden by the widget

##### `init()`

##### `attach(dom)`

##### `update(dom)`

##### `detach(dom)`

The following methods are avaiable to be used by the widget

##### `invalidate()`


#### `widgetize.base(elementProto)`

Return a [Babel](https://babeljs.io/) friendly base class to extend

**_elementProto_** `Object` Element proto object e.g. HTMLElement

Babel expects a Constructor Function, not an Object Prototype when using ES6 Class declarations.


## Examples
- [Widget](examples/example-widget)
- [View](examples/example-view)
