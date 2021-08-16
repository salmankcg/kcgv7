// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Earth from "../components/earth"
import * as Title from "../components/title"
import * as ScrollMagic from  'scrollmagic';
import gsap, {TimelineMax, Power3} from "gsap";




// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $pages       	= $('.pages');
var $header         = $('.header');
var $scrollDown     = $('.scrolldown');
var $homeBullets    = $('.home-bullets');

var _controller     = null;
var _wHeight        = window.innerHeight;
var _scrollPos      = 0;
var _scrollValues   = [];



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){


    $pages.find('.infos').height(window.innerHeight);
    $pages.find('.circle').css({'width':window.innerHeight/1.8, 'height':window.innerHeight/1.8});

    Title.init($pages.find('.title'));

    addScrollMagic();
    setScrollTo();

    Earth.init();

    resize();
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    
    $pages.find('.infos').height(window.innerHeight);

    if($(window).width() > 500){
        $pages.find('.circle').css({'width':window.innerHeight/1.8, 'height':window.innerHeight/1.8});
    }
    

    Earth.resize();
 
    _controller.update(true);
    
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function addScrollMagic(){

    var $slides     = $pages.find('.hc-slides');
    var $slidesC    = $pages.find('.hc-clients');

    _scrollValues   = [];

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

                            $slides.find('.home-bckg').css({background:_color});
                         
                            if( _index == 0){
                                gsap.to($('.globe').find('.g-wrapper'), 0.4, { ease: Power3.easeOut, opacity: 1, y: '0%' },0);
                            }else{
                                gsap.to($slides.find('.images').find('.img').eq(_index), 0.5, {ease: Power3.easeOut, opacity: 1},0);
                            }

                            $homeBullets.find('.button').removeClass('active');
                            $homeBullets.find('.button').eq(_index).addClass('active');

                            Title.motionIn($(_this));
                            $(_this).find('.paragraph').addClass('motion-in');
                            $(_this).find('.button').addClass('motion-in');

                            _scrollPos = _index;

                        })
                        .on("leave", function (e) {

                            if(e.scrollDirection == "FORWARD"){
                                if( _index == 0){
                                    gsap.to($('.globe').find('.g-wrapper'), 0.4, { ease: Power3.easeOut, opacity: 0, y: '-10%' },0);
                                }else{
                                    gsap.to($slides.find('.images').find('.img').eq(_index), 0.5, {ease: Power3.easeOut, opacity: 0},0);
                                }
                            }

                            Title.motionOut($(_this));
                            $(_this).find('.paragraph').removeClass('motion-in');
                            $(_this).find('.button').removeClass('motion-in');
                        
                        })
                        // .addIndicators()
                        .addTo(_controller);


        // HOME SHAPE
        var homeShape = new TimelineMax()
        .add([
            gsap.to($pages.find('.shape-image').eq(_index), 2, {opacity: 1},0)
        ]);

        new ScrollMagic.Scene({triggerElement: this, duration:'100%', offset:-_wHeight}).setTween(homeShape).addTo(_controller);


        // HOME IMAGES
        var homeImages = new TimelineMax()
        .add([
            gsap.fromTo($slides.find('.images').find('.img').eq(_index).find('img'), 2, {x: '-20%', opacity: 0},{x: '0%', opacity: 1},0)
        ]);
        
        new ScrollMagic.Scene({triggerElement: this, duration:'100%', offset:-_wHeight/2}).setTween(homeImages).addTo(_controller);

        _scrollValues.push(scene.scrollOffset()+(scene.duration()-10));
        
    });


    $slidesC.find('.infos').each(function(e){

        var _this       = this;

        var scene = new ScrollMagic.Scene({triggerElement: this, duration: "100%"})
                        .setPin(this)
                        .on("enter", function (e) {
                            
                            $header.removeClass('h-white').addClass('check-footer');
                            $scrollDown.removeClass('s-white').removeClass('hide');

                            $homeBullets.find('.button').removeClass('active');
                            $homeBullets.find('.button').eq(4).addClass('active');
                            $homeBullets.addClass('hb-dark');

                            Title.motionIn($(_this));
                            $(_this).find('.button').addClass('motion-in');

                            gsap.to($homeBullets, 1, {ease: Power3.easeOut, x: '0%'},0);

                            $(_this).find('.image').each(function(i,e){
                                gsap.to($(e), 1, {ease: Power3.easeOut, opacity: 1},0);
                            });

                            _scrollPos = 4;
                        })
                        .on("leave", function (e) {
                            $homeBullets.removeClass('hb-dark');
                            
                            if(e.scrollDirection == "REVERSE"){
                                $scrollDown.addClass('s-white').removeClass('hide');
                                $header.addClass('h-white').removeClass('check-footer');
                            }

                            if(e.scrollDirection == "FORWARD"){
                                gsap.to($homeBullets, 1, {ease: Power3.easeOut, x: '-200px'},0);
                                $scrollDown.addClass('hide');
                            }

                            $(_this).find('.button').removeClass('motion-in');

                            $(_this).find('.image').each(function(){
                                gsap.to($(this), 1, {ease: Power3.easeOut, opacity: 0},0);
                            });

                            Title.motionOut($(_this));    
                        })
                        .addTo(_controller);
        
        _scrollValues.push(scene.scrollOffset()+(scene.duration()-10));

    });

    
}

function setScrollTo(){

    _controller.scrollTo(function (newScrollPos) {
        gsap.to(window, 2, {scrollTo: {y: newScrollPos , ease: Power3.easeOut}});
    });

    $homeBullets.find('.button').on('click',function(){
        var _target = parseInt($(this).data('target').split('slide-')[1]);
        _controller.scrollTo(_scrollValues[_target-1]);
    });

    $scrollDown.on('click',function(){
        if(_scrollPos == 4){
            _controller.scrollTo($(document).height());
        }else{
            _controller.scrollTo(_scrollValues[_scrollPos+1]);
        }
        
    });
}



// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }




