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
if($footer.length){
	$footer.css({'height':wHeight});

    $scrollup.find('.button').on('click', function(){
		gsap.to(window, 1, {scrollTo: {y: 0 , ease: 'Power3.easeOut'}});
	});

	wHeight = window.innerHeight;
	dHeight = $(document).height();

	$(window).on('resize', onResize);
	
	onResize();

}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function onResize(){
	wHeight = window.innerHeight;
	dHeight = $(document).height();

	$footer.css({'height':window.innerHeight});
}


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\

