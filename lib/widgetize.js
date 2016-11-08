
'use strict';

var domify = require('domify');
var camelCase = require('lodash.camelcase');
var decorateProperty = require('poor-mans-proxy-decorate-property');

// Proxy Polyfill - Force for Safari
if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    global.Proxy = require('poor-mans-proxy');
} else {
    require('poor-mans-proxy');
}

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

            if (Proxy.isPolyfill) {
                decorateInstanceProperties(this);
            }
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

    var decorated = new Proxy(Proxy.isPolyfill ? Object.create(constructor.prototype) : constructor.prototype, {
        set: setHandler
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


function decorateInstanceProperties(obj) {
    var props = Object.keys(obj);

    props.forEach(function(prop) {
        if (prop.charAt(0) === '_') {
            return;
        }

        var meta = Object.getOwnPropertyDescriptor(obj, prop);
        if (!meta || (meta.value === undefined) || !meta.configurable) {
            return;
        }

        obj['_' + prop] = obj[prop];
        decorateProperty(obj, obj, {
            set: instanceSetHandler,
            get: instanceGetHandler
        }, prop);
    });
}


function setHandler(target, name, value) {
    if (target[name] === value) {
        return true;
    }

    target[name] = value;

    if (name.charAt(0) !== '_') {
        target.invalidate();
    }

    return true;
}


function instanceSetHandler(target, name, value) {
    if (target['_' + name] === value) {
        return true;
    }

    target['_' + name] = value;

    target.invalidate();

    return true;
}


function instanceGetHandler(target, name) {
    return target['_' + name];
}
