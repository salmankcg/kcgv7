// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove from  "../components/mouse-move";
import gsap, {TweenMax, TimelineLite, Elastic, Power3} from "gsap";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $scrollDown		= $('.scrolldown');
var $peopleList     = $('.people');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){
    
    MouseMove.init($peopleList.find('.item').find('.i-wrapper'));

    $(window).on('scroll.about-team', onScroll);
    onScroll();

	$scrollDown.on('click',function(){
		gsap.to(window, 2, {scrollTo: {y: $(window).height() , ease: Power3.easeOut}});
	});

	$('.webdoor').find('.button').on('click',function(){
		gsap.to(window, 2, {scrollTo: {y: $(window).height() , ease: Power3.easeOut}});
	});
	

}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {

}


function onScroll(){
    var scrollTop       = $(window).scrollTop();
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