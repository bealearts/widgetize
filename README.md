# Widgetize
Custom Element based HTML5 Widgets and Views using Browserify

Create reusable and encapsulated HTML5 widgets and Application Views using HTML5, CSS3 and Javascript. 

Simply npm install and require a widget and it will be automatically included in your Browserify project, for use in your HTML page as a custom element.

## Install
```shell
npm install widgetize --save-dev
```

## Usage

### JS
```js
var widgetize = require('widgetize');

module.exports = widgetize(
	'time-widget', 
	{
		created: function() {
			this.timer = null;
		},
		attached: function() {
			var span = this._dom.querySelector('span');
			span.textContent = new Date();

			setInterval(function() {
				span.textContent = new Date();
			}.bind(this), 1000);
		},
		detached: function() {
			clearInterval(this.timer);
		}
	}, 
	'The Time is: <span></span>'
);
```

### HTML
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


## Example
