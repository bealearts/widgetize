
'use strict';

var domify = require('domify');
var camelCase = require('lodash.camelcase');

var widgetize = module.exports = function widgetize(name, constructor, template, options) {

    options = options || {};
    options.extend = options.extend || 'element';	// Basic HTML Element
    options.shadow = options.shadow || true;

    var domNode;
    if (template) {
        domNode = domify(template);
    }


    if (!constructor) {
        constructor = HTMLElement;
    }


    constructor.prototype.createdCallback = function() {

        // TODO: Use Symbols
        this.__updateTriggered = false;
        this.__dom = this.createShadowRoot && options.shadow ? this.createShadowRoot() : this;

        if (this.init) {
            this.init.call(this);
        }
    };



    constructor.prototype.attachedCallback = function() {

        var updateProperty = updatePropertyFromAttribute.bind(this);

        Array.prototype.forEach.call(this.attributes, function(attr) {
            updateProperty(attr.name, attr.value);
        });


        var content = document.createDocumentFragment();
        while (this.firstChild) {
            content.appendChild(this.removeChild(this.firstChild));
        }

        if (domNode) {
            this.__dom.appendChild( domNode.cloneNode(true) );
        }

        if (this.attach) {
            this.attach.call(this, this.__dom, content);
        }

        if (this.update) {
            this.update.call(this, this.__dom);
        }
    };


    constructor.prototype.detachedCallback = function() {

        if (this.detach) {
            this.detach.call(this, this.__dom);
        }
    };


    constructor.prototype.attributeChangedCallback = function(attrName, oldValue, newValue) {

        updatePropertyFromAttribute.call(this, attrName, newValue);

        this.invalidate();
    };


    constructor.prototype.invalidate = function() {

        if (this.update && !this.__updateTriggered) {
            this.__updateTriggered = true;

            process.nextTick(function doUpdate() {
                this.__updateTriggered = false;
                this.update(this.__dom);
            }.bind(this));
        }
    };


    var decorated = new Proxy(constructor.prototype, {
        set: function(target, name, value) {
            target[name] = value;

            if (name.charAt(0) !== '_') {
                target.invalidate();
            }

            return true;
        }
    });

    var config = {prototype: decorated};

    return document.registerElement(name, config);
};



/* PRIVATE */


function updatePropertyFromAttribute(attrName, newValue) {
    var propertyName = camelCase(attrName);
    if (this[propertyName] !== undefined) {
        try {
            this[propertyName] = defaultValue(this[propertyName], newValue);
        } catch (error) {
            // Suppress DOM errors
        }
    }
}


function defaultValue(current, value) {
    if (current === true || current === false) {
        return value === null ? false : true;
    } else {
        return value;
    }
}
