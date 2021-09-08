// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $video      	= $('.video-play');
var $videoFrame 	= $('.video-frame');

var _inter			= null;
var player      	= null;



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
if($video.length){
	$video.on( 'click', function(){
		openVideo($(this).data('youtube'));
	});

	$videoFrame.find('.bt-close').on( 'click', function(){
		closeVideo();
	});
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function openVideo(_youtube){

	$videoFrame.fadeIn(200);

	var id 			= 'vd' + parseInt(Math.random() * 1e9);
	var youtubeID 	= _youtube;
	$('<div/>').attr('id', id).appendTo($videoFrame);


	onYTLoad(function(){
		player = new YT.Player(id, {
			videoId: youtubeID,
			playerVars: {
				rel: 0,
				controls: 1,
				autohide: 1,
				wmode: 'opaque',
				showinfo: 0,
				iv_load_policy: 3,
				modestbranding: 1,
			},
			events: {
				onReady: onReady,
				onStateChange: onStateChange,
			},
		});
	});

}

function closeVideo(){
	stop();
	$videoFrame.fadeOut(200);
	setTimeout(function(){
		$videoFrame.find('iframe').remove();
	},200);
	clearInterval(_inter);
}


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function onStateChange(e){

	if (e.data == -1 || e.data == 0 || e.data == 2) {
		//Paused/Stoped
	} else {
		//Playing
	}

	if (e.data == 0) {
		closeVideo();
	}

}

function onReady(){
	player.playVideo();
}


function stop(){
	player.stopVideo();
}

window.onYouTubePlayerAPIReady = function(){

	window.isYtLoaded = true;
	(window.ytCallbacks || []).forEach(function(fn){
		fn();
	});
}

function onYTLoad(callback){

	if (!window.requestedYTLib) {
		window.requestedYTLib = true;
		loadScript('https://www.youtube.com/iframe_api');
	}

	if (window.isYtLoaded) {
		callback();
	} else {
		if (!window.ytCallbacks) window.ytCallbacks = [];
		window.ytCallbacks.push(callback);
	}
}

function loadScript(src, callback){
	var s = document.createElement('script'), r = false, t;
	s.type = 'text/javascript';
	s.src = src;
	s.onload = s.onreadystatechange = function(){
		if (!r && (!this.readyState || this.readyState == 'complete')) {
			r = true;
			if (typeof callback == 'function') callback();
		}
    }
    
	t = document.getElementsByTagName('script')[0];
	t.parentNode.insertBefore(s, t);
}



// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
// export { openVideo, closeVideo }