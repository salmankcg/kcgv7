// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from 'jquery';
import gsap, {TweenMax, Elastic, Power3} from 'gsap';



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\

var $scrollDown		= $('.scrolldown');


// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

	$scrollDown.on('click',function(){
		gsap.to(window, 2, {scrollTo: {y: $(window).height() , ease: Power3.easeOut}});
	});

	$(window).on('scroll.about-person', onScroll);
	onScroll();


}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {}


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function onScroll(){

	var scrollTop 		= $(window).scrollTop();

	if (scrollTop > 200) {
		$scrollDown.addClass('hide');
	} else{
		$scrollDown.removeClass('hide');
	}

}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }