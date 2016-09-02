(function() {
	
	var adbkg = function() {

		// function getting the message for response headers intercept
		chrome.runtime.onMessage.addListener(function(msg, sender, callback) {

			var res = false;

			if( msg.domain ){

				// TODO: place here domain name
				// BUT FIRST WOULD BE TO EXTRACT LISTEN DOMAIN!
				// TODO: use msg system to retrive return value
				// Actually what to do here!
				chrome.webRequest.onHeadersReceived.addListener(function(options) {
					
					chrome.tabs.query({
							active:        true,
							currentWindow: true
						}, 
						function(tabs) {
							chrome.tabs.sendMessage(tabs[0].id, {
								'url':    options.url,
								'status': options.statusCode
							});
					});


					// thread sleep until message gets back
					return true;

				}, 
				{urls: ['<all_urls>']}, 
				['responseHeaders']);

				res = true;
			}
			

			if( callback ){
				callback({
					"status" : res
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