(function() {

	var adclick = function()
	{

		document.addEventListener('DOMContentLoaded', 
			function(){

				var click_it = function(url, data)
				{

					var id_pattern = /\d+/;

					// TODO: this is not brigthest idea, you should return to xhr request
					var perform_request = function(timeout) {

						//TODO: check which url to use
						// TODO: link has some num value, most likley it has to be updated
						// console.log('visiting url:' , url);
						// console.log('visiting data:', data);


						// ok, for now single request is enough! stop playing with it!?
						var xhr = new XMLHttpRequest();

						xhr.addEventListener('abort', function() {
							if( xhr.status === 0 ){
								// setTimeout(perform_request, timeout, timeout);
								// change id of the url first
							}
						});

						xhr.open('GET', url, true);
						xhr.send();

					}

					var timeouts = [750];
					timeouts.forEach(function(x) {
						// console.log(x)
						setTimeout(perform_request, x, x);
					});

				};

				var a  = document.getElementsByTagName('a');
				// There is also an issue with match pattern, (can found origin page as well)
				var re = /adurl=.+\.hr/;

				for(var i=0; i < a.length; a++){
					var id = a[i].getAttribute('id');
					var	link = a[i].getAttribute('href');
					var data = a[i].getAttribute('data-original-click-url');

					if( id && id.startsWith('aw') || data){
						// adwords flag?
						// TODO: limit to single web page
						if( link.match(re) ){
							click_it(link, data);
						}
					}
				}

			}, false);

	};

	adclick();

})();