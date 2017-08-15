const ANTI_CHEAT_CODE = 'Fe12NAfA3R6z4k0z';

var decoder = {
	decode_main: function(inputString) {
		var zlibHeader = "7a990d405d2c6fb93aa8fbb0ec1a3b23";
		var output = '';
		if (inputString.substring(0, 32) == zlibHeader) {
			output = decoder.decode_zlib(inputString);
		}
		else {
			output = decoder.decode_base64(inputString);
		}
		return output;
	},

	decode_base64: function(inputString) {
		var output = '';
		if (inputString.indexOf(ANTI_CHEAT_CODE) > 0) {
	        inputString = inputString.split(ANTI_CHEAT_CODE)[0];
	        var temp = "";
	        for (var i = 0; i < inputString.length; i += 2)
	            temp += inputString[i];
	        output = JSON.parse(atob(temp));
	    }
	    else {
	    	output = JSON.parse(inputString);
	    }
	    return output;
	},

	decode_zlib: function(inputString) {
		var pako = window.pako;
		var binArray = atob(inputString.substring(32));
		var output = JSON.parse(pako.inflate(binArray, {to: 'string'}));
		return output;
	},
};