(function() {
	
	var adbkg = function() {

		// function getting the message for response headers intercept
		chrome.runtime.onMessage.addListener(function(msg, sender, callback) {

			var res = false;

			if( msg.domain ){

				// TODO: place here domain name
				chrome.webRequest.onHeadersReceived.addListener(function() {

					// TODO: response needs to be controlled from this fnc?
					chrome.runtime.sendMessage({
						'msg' : 'this is msg from headers'
					});


					return true;
				}, 
				{urls: ['<all_urls>']}, 
				['responseHeaders']);

				chrome.runtime.sendMessage({
						'msgNEW!!!' : 'this is msg from headers'
					});

				res = true;
			}
			

			if( callback ){
				callback({
					"status" : res,
					"msg"    : msg
				});
			}

		});

		// ok, now we are talking at least we have a proper event listener!
		// TODO: passing urls from content script?!
		// chrome.webRequest.onHeadersReceived.addListener(function() {
		// 	console.log('web request overiden!!!');

		// 	return false;
		// }, 
		// {urls: [ "<all_urls>" ]},
		// ['responseHeaders']);

	};

	adbkg();

})();