(function (tm)
{
	'use strict';
	tm.Class = function (superclass, properties)
	{
		var prototype;
		if (!properties)
		{
			prototype = superclass;
		}
		else
		{
			prototype = Object.create(superclass.prototype);
			for (var a in properties)
			{
				if (properties.hasOwnProperty(a))
				{
					prototype[a] = properties[a];
				}
			}
		}
		var ClassObject = function ()
		{
			var newObject = Object.create(prototype);
			if (newObject.constructor)
			{
				newObject.constructor.apply(newObject, arguments);
			}
			return newObject;
		};
		ClassObject.prototype = prototype;
		return ClassObject;
	};

	tm.extend = function (obj, extension, override)
	{
		var prop;
		if (override === false)
		{
			for (prop in extension)
			if (!(prop in obj)) obj[prop] = extension[prop];
		}
		else
		{
			for (prop in extension)
			obj[prop] = extension[prop];
			if (extension.toString !== Object.prototype.toString) obj.toString = extension.toString;
		}
	};
	tm.$ = document.getElementById.bind(document);
	tm.$$ = document.querySelectorAll.bind(document);
	Element.prototype.on = Element.prototype.addEventListener;

})(window.tm = window.tm || {});