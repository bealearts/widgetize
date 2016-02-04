# Widgetize [![Build Status](https://travis-ci.org/bealearts/widgetize.svg)](https://travis-ci.org/bealearts/widgetize) [![npm version](https://badge.fury.io/js/widgetize.svg)](http://badge.fury.io/js/widgetize)
Custom Element based HTML5 Widgets and Views using Browserify

Create reusable and encapsulated HTML5 widgets and Application Views using HTML5, CSS3 and Javascript. 

Simply ```npm install``` and ```require()``` a widget and it will be automatically included in your Browserify project, for use in your HTML page as a custom element.

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

#### widgetize(tagName, constructor [, template] [, options])

Create a Custom Element widget and registers it with the browser.

*tagName* ```String``` Tag name of the element to use in HTML. Must contain at least one -. e.g. ```my-tag```

*constructor* ```Function``` Constructor function for the widgets definition. Can be ```null```. Instances are created with the ```new``` operator.

*template* ```String``` Template to use for the elements HTML content.

*options* ```Object``` Options
    *.extend*  ```String``` Tag name of the element to extend. Defaults to ```Element``` for HTMLElement


#### widgetize.base(elementProto)

Return a Babel friendly base class to extend

*elementProto* ```Object``` Element proto object e.g. HTMLElement

Babel expects a Constructor Function, not an Object Prototype when using ES6 Class declarations.


## Examples
- [Widget](examples/example-widget)
- [View](examples/example-view)
