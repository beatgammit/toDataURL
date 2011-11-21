(function () {
	var $ = require('ender'),
		toDataURL = require('../src/download');

	$.domReady(function () {
		$('button').bind('click', function () {
			var a = $.toDataURL($('textarea').val()),
				uint8, i;

			console.log('As string:');
			console.log('DataURL:', a);
			console.log('Decoded text:', atob(a.match(/base64,(.*)/)[1]));
			console.log('');

			a = Array.prototype.slice.call($('textarea').val()).map(function (item) {
				return item.charCodeAt(0);
			});
			a = $.toDataURL(a);
			console.log('As byte array:');
			console.log('DataURL:', a);
			console.log('Decoded text:', atob(a.match(/base64,(.*)/)[1]));
			console.log('');

			a = $('textarea').val();
			uint8 = new Uint8Array(a.length);
			for (i = uint8.length; i >= 0; i -= 1) {
				uint8[i] = a.charCodeAt(i);
			}
			a = $.toDataURL(uint8);
			console.log('As Uint8Array:');
			console.log('DataURL:', a);
			console.log('Decoded text:', atob(a.match(/base64,(.*)/)[1]));

			if (confirm ('Would you like to download your text?')) {
				$.openDataURL(a);
			}
		});
	});
}());
