# API & Widget lifecycle

#### `widgetize(tagName, constructor [, template] [, options])`

Creates a widget and registers it with the browser. Returns a reference to the widget's constructor.

**_tagName_** ```String``` Tag name of the element to use in HTML. Must contain at least one -. e.g. `my-tag`

**_constructor_** ```Function``` Constructor function for the widgets definition. Can be ```null```. Instances are created with the ```new``` operator.

**_template_** ```String``` Template to use for the elements HTML content.

**_options_** ```Object``` Options

> **_.shadow_**  ```String``` Whether to use the ShadowDOM if it is available. Defaults to ```true```.

The created widget has a lifecycle which can be programmatically accessed by the object defined by the Constructor function.


## The following instance methods are available to be overridden by the widget

##### `init()`

Called when a widget is created, either by being called with `new Widget()` or when parsed by the browser in the DOM.

A good place to initialise instance variables.

##### `attach(dom, content)`

Called when the widget is added to the DOM, either by being used with `.appendChild(widget)` or when rendered by the browser in the DOM.

**_dom_** is a reference to the element's shadow DOM if supported, or the element itself.

**_content_** is a Document Fragment containing any content the element had.

The place to make one time modifications to the widget DOM, available as `dom`, and to add event listeners.

##### `update(dom)`

Called after `attach()` and then once per Event Loop execution after a call to `invalidate`.

**_dom_** is a reference to the element's shadow DOM if supported, or the element itself.

The place to make updates to the DOM after a change of state of the widget.

By waiting for `update()` to be called, DOM updates for multiple changes of state can be scheduled together.

##### `detach(dom)`

Called when the widget is removed from the DOM, either by being used with `` or when the browser removes the element from the DOM.

**_dom_** is a reference to the element's shadow DOM if supported, or the element itself.

The place to clean up references and event listeners etc.

## The following instance methods are available to be used by the widget

##### `invalidate()`

Invalidates the widget, so that `update()` will be called in the next Event Loop execution.

Multiple calls to `invalidate()` within the same Event Loop execution, will only tigger one call to `update()` in the next Event Loop execution.
