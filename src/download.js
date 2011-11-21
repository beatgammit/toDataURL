(function (exports) {
	'use strict';

	var lookup = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
		'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
		'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
		'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
		'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
		'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
		'w', 'x', 'y', 'z', '0', '1', '2', '3',
		'4', '5', '6', '7', '8', '9', '+', '/'
	];

	function uint8ToBase64(uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length;

		function tripletToBase64 (num) {
			return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
		};

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
			output += tripletToBase64(temp);
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1];
				output += lookup[temp >> 2];
				output += lookup[(temp << 4) & 0x3F];
				output += '==';
				break;
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
				output += lookup[temp >> 10];
				output += lookup[(temp >> 4) & 0x3F];
				output += lookup[(temp << 2) & 0x3F];
				output += '=';
				break;
		}

		return output;
	}

	function openDataURL(dataURI, name) {
		window.open(dataURI, name || '_self');
	}

	function createDataURL (data, mimeType, autoDownload) {
		var tmp, base64, dataURI, i;

		if (!data || (typeof data !== 'string' && !(data instanceof Array) && !(data instanceof Uint8Array))) {
			throw 'Data must be a non-empty string, Array, or Uint8Array';
		}

		if (typeof mimeType !== 'string') {
			autoDownload = mimeType;
			mimeType = 'application/octet-stream';
		}
		if (typeof autoDownload !== 'boolean') {
			autoDownload = false;
		}

		if (typeof data === 'string') {
			tmp = encodeURIComponent(data);
			tmp = unescape(tmp || data.toString());
			base64 = btoa(tmp);
		} else if (data instanceof Array) {
			tmp = new Uint8Array(data.length);
			for (i = data.length; i >= 0; i -= 1) {
				tmp[i] = data[i] & 0xFF;
			}
			base64 = uint8ToBase64(tmp);
		} else if (data instanceof Uint8Array) {
			base64 = uint8ToBase64(data);
		}

		dataURI = 'data:' + mimeType + ';base64,' + base64;

		if (autoDownload) {
			openDataURL(dataURI);
		}

		return dataURI;
	}

	exports.toDataURL = createDataURL;
	exports.openDataURL = openDataURL;
}(typeof module !== 'undefined' ? module.exports : window));
