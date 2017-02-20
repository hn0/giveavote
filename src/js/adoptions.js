function save_options() 
{

	var debug    = document.getElementById('debug').checked;
	// TODO: erase api rest point after turning off debug might not be the best idea
	var rest_api = (debug) ? document.getElementById('restLogApi').value : '';

	chrome.storage.sync.set({
		debug    : debug,
		rest_api : rest_api
	},
	function(){
		var status = document.getElementById('status');
		status.textContent = 'Options saved';

		setTimeout(function() { status.textContent = ''; }, 1500);
	});

}


function restore_options()
{

	document.getElementById('save')
			.addEventListener('click', save_options);


	var rest_api = document.getElementById('restLogApi');

	document.getElementById('debug').addEventListener('change', function() {
		rest_api.disabled = document.getElementById('debug').checked;
	});


	chrome.storage.sync.get({
		debug    : true,
		rest_api : ''
	},
	function( items ) {
		document.getElementById('debug').checked = items.debug;

		rest_api.disabled = !items.debug;
		rest_api.value    =  items.rest_api;

	});

}


document.addEventListener('DOMContentLoaded', restore_options);