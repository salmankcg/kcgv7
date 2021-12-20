// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $cont       	= $('.footer');
var $scrollup   	= $cont.find('.scrollup');
var dHeight 		= null;
var wHeight			= null;


// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){
	setFooter();
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize(){
	wHeight = window.innerHeight;
	dHeight = $(document).height();

	$cont.css({'height':window.innerHeight});
}


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function setFooter(){
	$cont.css({'height':wHeight});

    $scrollup.find('.button').on('click', function(){
		gsap.to(window, 1, {scrollTo: {y: 0 , ease: 'Power3.easeOut'}});
	});

	wHeight = window.innerHeight;
	dHeight = $(document).height();

	$(window).on('resize', resize);
	
	resize();
}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }

