// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $footer       	= $('.footer');
var $scrollup   	= $footer.find('.scrollup');
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

	$footer.css({'height':window.innerHeight});
}


function setFooter(){
	$footer.css({'height':wHeight});

    $scrollup.find('.button').on('click', function(){
		gsap.to(window, 1, {scrollTo: {y: 0 , ease: 'Power3.easeOut'}});
	});

	wHeight = window.innerHeight;
	dHeight = $(document).height();

	$(window).on('resize', resize);
	
	resize();

}





// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }
