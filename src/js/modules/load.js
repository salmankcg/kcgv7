// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
function init(opts){

	var before 		= opts.before || function(){};
	var progress 	= opts.progress || function(){};
	var complete 	= opts.complete || function(){};
	var testDelay 	= opts.testDelay || 0;
	var $elem 		= $(opts.elem || 'body');

	var urls 		= [];
	var queue 		= [];
	var isLoaded;

	$elem.find('*').add($elem).each(function(){
		var $elem = $(this);
		var bgImg = $elem.css('background-image');
		var bgUrl = (/(^url\([\'\"]?)([^\"\']*)([\'\"]?\))/.exec(bgImg) || [])[2];
		var url;
		if ($elem.is('img')) url = $elem.attr('src');
		else if (bgUrl) url = bgUrl;
		if (url && urls.indexOf(url) < 0) {
			urls.push(url);
			queue.push({src: url, progress: 0});
		}
	});

	if (!urls.length) return complete(urls);

	before();

	function checkProgress(){

		var loaded = 0;
		var total = queue.length;

		queue.forEach(function(item){
			loaded = loaded + item.progress;
		});

		var pcent = loaded * 100 / total;
		progress(pcent);

		if (pcent >= 100 && !isLoaded) {
			isLoaded = true;
			complete(urls);
		}

	}

	queue.forEach(function(item, i){
		setTimeout(function(){

			var req = new XMLHttpRequest();

			req.onprogress = function(e){
				item.progress = e.loaded / e.total;
				checkProgress();
			};

			req.onloadend = req.ontimeout = req.onerror = req.onabort = function(e){
				item.progress = 1;
				checkProgress();
			};

			req.open('GET', item.src, true);
			req.send(null);

		}, testDelay * (i + 1));
	});

}

// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init }