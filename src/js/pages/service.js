// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Title from "../components/title"
import * as MouseMove from  "../components/mouse-move";
import * as ScrollMagic from  'scrollmagic';
import * as Form from  "../components/form";
import gsap, { Power3 } from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $pages       	    = $('.pages');
var $header             = $('.header');
var $scrollDown         = $('.scrolldown');
var $workList		    = $('.works-list');
var $btLearn            = $('.i-service').find('.button')
var $btDownload         = $('.services-download').find('.bt-download')
var $btClose            = $('.services-download').find('.bt-close')
var $input              = $('.services-download').find('.input');

var _controller         = null;
var _scrollPos          = 0;
var _scrollValues       = [];



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    // $pages.find('.sc-slides').find('.infos').height(window.innerHeight);

    Title.init($pages.find('.sc-slides').find('.title'));
    MouseMove.init($workList.find('.item').find('.wrapper'));

    // addScrollMagic();
    // setScrollTo();
    Form.init($input);

    $scrollDown.on('click',function(){
        gsap.to(window, 2, {scrollTo: {y: $(window).height() , ease: Power3.easeOut}});
    });

    $btLearn.on('click',function(){
        gsap.to(window, 2, {scrollTo: {y: $('.services-download').offset().top - 200 , ease: Power3.easeOut}});
    });

    $btDownload.on('click',function(){
        $('.services-download').addClass('show-inputs');
    });

    $btClose.on('click',function(){
        $('.services-download').removeClass('show-inputs');
    });

    $(window).on('scroll.service', onScroll);
	onScroll();

    resize();

}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    // $pages.find('.sc-slides').find('.infos').height(window.innerHeight);
    // _controller.update(true);
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function addScrollMagic(){

    var $slides     = $pages.find('.sc-slides');

    _scrollValues   = [];
    
    _controller     = null;

    _controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0,
            reverse: true,
        }
    });

    $slides.find('.infos').each(function(e){
        
        var _this       = this;
        var _index      = e;
        var _color      = $(this).data('color');

        var scene = new ScrollMagic.Scene({triggerElement: this, duration: "100%"})
                        .setPin(this)
                        .on("enter", function (e) {

                            $slides.find('.services-bckg').css({background:_color});
                            $header.addClass('h-white').addClass('check-header');
                            
                            _scrollPos = _index;

                            if(_index == 0){
                                
                                Title.motionIn($(_this));
                                
                                $(_this).find('.caption').addClass('motion-in');
                                $(_this).find('.submenu').addClass('motion-in');

                                setTimeout(function(){
                                    $(_this).find('.paragraph').addClass('motion-in');
                                    $(_this).find('.button').addClass('motion-in');
                                    $(_this).find('.image-services').addClass('motion-in');
                                },1000);
                            }

                            if(_index == 1){
                                $(_this).find('.caption').addClass('motion-in');
                                $(_this).find('.subtitle').addClass('motion-in');
                                $(_this).find('.paragraph').addClass('motion-in');
                                $(_this).find('.button').addClass('motion-in');
                            }

                            if(_index == 2){
                                $scrollDown.removeClass('hide');
                                $(_this).find('.services-items').addClass('motion-in');
                            }
                            
                        })
                        .on("leave", function (e) {

                            if(_index == 0){
                                
                                Title.motionOut($(_this));

                                $(_this).find('.submenu').removeClass('motion-in');
                                $(_this).find('.paragraph').removeClass('motion-in');
                                $(_this).find('.button').removeClass('motion-in');
                                $(_this).find('.caption').removeClass('motion-in');
                                $(_this).find('.image-services').removeClass('motion-in');
                            }

                            if(_index == 1){
                                $(_this).find('.caption').removeClass('motion-in');
                                $(_this).find('.subtitle').removeClass('motion-in');
                                $(_this).find('.paragraph').removeClass('motion-in');
                                $(_this).find('.button').removeClass('motion-in');
                            }

                            if(_index == 2){
                              
                                if(e.scrollDirection == "FORWARD"){
                                    $scrollDown.addClass('hide');
                                }

                                $(_this).find('.services-items').removeClass('motion-in');
                            }

                        })
                        // .addIndicators()
                        .addTo(_controller);


        _scrollValues.push(scene.scrollOffset()+(scene.duration()-10));
        
    });


}

function setScrollTo(){

    _controller.scrollTo(function (newScrollPos) {
        gsap.to(window, 1.5, {scrollTo: {y: newScrollPos , ease: Power3.easeOut}});
    });


    $scrollDown.on('click',function(){
        if(_scrollPos == 2){
            _controller.scrollTo(_scrollValues[2]+$(window).height()+10);
        }else{
            _controller.scrollTo(_scrollValues[_scrollPos+1]);
        }
        
    });
}

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






