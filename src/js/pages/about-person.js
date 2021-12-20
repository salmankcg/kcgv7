// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap, {TweenMax, Elastic, Power3} from "gsap";
import * as Button from "../components/button";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\

let $scrollDown		= null;


// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

	$scrollDown		= $('.scrolldown');

	Button.init();

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