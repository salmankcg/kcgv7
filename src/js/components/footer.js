// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap, {TimelineMax, Power3, Power2, Expo, Elastic} from "gsap";



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

	// $(window).on('scroll.footer', onScroll);
	$(window).on('resize', onResize);
	
	// onScroll();
	onResize();

	// $footer.addClass('motion-in-1').addClass('motion-in-2').addClass('motion-in-3');
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
// // ----------------------------------------- \\\
// function onScroll(){

// 	wHeight = window.innerHeight;
// 	dHeight = $(document).height();
	
// 	var scrollTop 		= $(window).scrollTop();

// 	//Scroll no bottom da página
// 	if (scrollTop + wHeight >= dHeight- (wHeight/2)) {
// 		$footer.addClass('motion-in-1');
// 	} else{
// 		$footer.removeClass('motion-in-1');
// 	}
	
// 	if (scrollTop + wHeight >= dHeight - (wHeight/3)) {
// 		$footer.addClass('motion-in-2');
// 	} else{
// 		$footer.removeClass('motion-in-2');
// 	}
	
// 	if (scrollTop + wHeight >= dHeight) {
// 		$footer.addClass('motion-in-3');
// 		$header.addClass('show-logo');
// 	}else{
// 		$footer.removeClass('motion-in-3');
// 		$header.removeClass('show-logo');
// 	}


// }


