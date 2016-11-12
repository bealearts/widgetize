# Widgetize [![Build Status](https://travis-ci.org/bealearts/widgetize.svg)](https://travis-ci.org/bealearts/widgetize) [![npm version](https://badge.fury.io/js/widgetize.svg)](http://badge.fury.io/js/widgetize)
[Custom Element](http://w3c.github.io/webcomponents/spec/custom/) based HTML5 Widgets and Views using [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/)

Create reusable and encapsulated HTML5 Widgets and Application Views using HTML5, CSS3 and Javascript.

Simply ```npm install``` and ```require() / import``` a widget and it will be automatically included in your [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/) project, for use in your HTML page as a custom element.

## Install
```shell
npm install widgetize --save
```

You may also require a custom element polyfill.

```shell
npm install document-register-element --save
```

## Usage

> ES6 Syntax is optional

#### JS
time-widget.js
```js
import widgetize from 'widgetize';

/**
 * Time Widget
 */
class TimeWidget extends HTMLElement
{
    init() {
        this._timer = null;

        this._timeElement = null;
    }

    attach(dom, content) {
        this._timeElement = dom.querySelector('time');

        this._timer = setInterval(() => {
            this.invalidate();
        }, 1000);
    }

    update(dom) {
        this._timeElement.textContent = new Date();
    }

    detach(dom) {
        clearInterval(this._timer);
    }
}


export default widgetize('time-widget', TimeWidget, 'The Time is: <time></time>');
```

main.js
```js
import TimeWidget from 'time-widget';

...
```

#### HTML
index.html
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

[API & Widget lifecycle](./docs/api.md)


## Examples
- [Widget](examples/example-widget)
- [View](examples/example-view)


## Test

```shell
npm install
npm run install:examples
npm test
```
