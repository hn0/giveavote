(function() {

	var adclick = function()
	{


		var Constructor = function ()
		{
			document.addEventListener('DOMContentLoaded', this.search_links.bind(this), false);
			chrome.runtime.onMessage.addListener(this.process_headers);
		}


		// Process request headers, 302 issue with redirection to http protocol
		// still not sure how to  handle this
		Constructor.prototype.process_headers = function(msg, sender, callback) 
		{
			// console.log('Headers retrieval', msg, this);
		}


		Constructor.prototype.search_links = function()
		{
		
			// This is temporary solution, domain needs to be extracted, and only adwords cliked?
			// There is also an issue with match pattern, (can found origin page as well)
			var re = /adurl=.+\.hr/;

			var a  = document.getElementsByTagName('a');
			for(var i=0; i < a.length; a++){
				var id = a[i].getAttribute('id');
				var	link = a[i].getAttribute('href');
				var data = a[i].getAttribute('data-original-click-url');

				if( id && id.startsWith('aw') || data){
					if( link.match(re) ){
						this.request(link, data);
					}
				}
			}

		}


		Constructor.prototype.request = function(url, alt_url)
		{
			// let see statistics
			this.log_request(url, alt_url);

			// TODO: here would go the code for url of choice
			var timeouts = [250];
			timeouts.forEach(function(x) {
				setTimeout(this.new_request, x, url);
			}.bind(this));
		}


		Constructor.prototype.new_request = function(url, time_out)
		{
			console.log('visiting: ' + url);
			var xhr = new XMLHttpRequest();

			var domain = 'test';
			chrome.runtime.sendMessage({
				'domain': domain
			},
			function(resp) {

				if(resp.status){
					xhr.open('GET', url);
					xhr.send();
				}

				console.log('Background response:', resp);
			});
		}


		Constructor.prototype.log_request = function(url, alt_url)
		{
			// TODO: still don't know where the file is stored!?!!
			window.webkitRequestFileSystem(
				window.PERSISTENT,
				Math.pow(1024, 2) * 5,
				function(fs) {
					fs.root.getFile('request_log.txt', {create: false}, 
						function(fp){
							fp.createWriter(function(fw) {
								fw.seek(fw.length);

								var ln  = [url + ';' + alt_url];
								var blb = new Blob(ln, {type: 'text/plain'});
								fw.write(blb);
							});
						});
				},
				function(e) {
					console.log('ADCLICK Cannot log request', e);
				});
		}


		return new Constructor();
	};

	adclick();

})();