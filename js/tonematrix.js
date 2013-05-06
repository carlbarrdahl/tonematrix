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

	tm.decode = function (in_s)
	{
		if (!in_s || !in_s.length)
		{
			console.warn('No array')
			return false
		}
		var s = in_s.split('-');
		var out_int, out_array = [];
		var jj = parseInt(s[0], 36);
		for (var i = 1, ii = s.length; i < ii; i++)
		{
			out_int = parseInt(s[i], 36);
			out_array[i - 1] = [];
			for (var j = 0; j < jj; j++)
			{
				out_array[i - 1].push((out_int >> j) & 1);
			}
		}
		return out_array;
	};

	tm.encode = function (in_array)
	{
		var out_int, out_s = in_array[0].length.toString(36);
		for (var i = 0, ii = in_array.length; i < ii; i++)
		{
			out_int = 0;
			for (var j = 0, k = in_array[i], jj = k.length; j < jj; j++)
			{
				out_int |= k[j] << j;
			}
			out_s += '-' + out_int.toString(36);
		}
		return out_s;
	};
	tm.$ = document.getElementById.bind(document);
	tm.$$ = document.querySelectorAll.bind(document);
	Element.prototype.on = Element.prototype.addEventListener;

})(window.tm = window.tm || {});