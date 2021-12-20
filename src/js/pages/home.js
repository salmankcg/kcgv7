// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Earth           from "../components/earth"
import * as Title           from "../components/title"
import * as Button          from "../components/button"
import * as checkDevices  	from "../modules/check-devices";
import gsap, {TimelineMax, Power3} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
let $pages       	= null;
let $slides       	= null;
let $homeInfos      = null;
let $homeBullets    = null;
let $homeBckg       = null;
let $header         = null;
let $scrollDown     = null;

let _sliderPos      = 0;
let _scrollTimeout  = null;
let _scrollAnimate  = null;
let _scrollPos      = 0;

let _gsapScroll     = null;



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    $pages       	= $('.pages');
    $slides       	= $('.hc-slides').find('.infos');
    $homeInfos      = $('.home-infos');
    $homeBullets    = $('.home-bullets');
    $homeBckg       = $('.home-bckg');
    $header         = $('.header');
    $scrollDown     = $('.scrolldown');

    if($('body').hasClass('page-template-default')){
        $('#elementor-preview-iframe', window.parent.document).contents().find('.pages').find('.infos').height(window.parent.innerHeight);
        $('#elementor-preview-iframe', window.parent.document).contents().find('.pages').find('.circle').css({'width':window.parent.innerHeight/1.8, 'height':window.parent.innerHeight/1.8});
    }else{
        $pages.find('.infos').height(window.innerHeight);
        $pages.find('.circle').css({'width': window.innerHeight/1.8, 'height': window.innerHeight/1.8});
    }

    Earth.init();
    
    Title.init($slides.find('.title'));
    Button.init();

    resize();
    setScrollTo();
        
    if(!checkDevices.check()){
        animateDesktop();
        
        $(window).on('scroll',onScroll);
        $(window).on('keydown', onInteractStart );
        $(window).on('keyup', onInteractStop );
        $(window).on('mousedown', onInteractStart );
        $(window).on('mouseup', onInteractStop );
        $(window).on('touchstart', onInteractStart );
        $(window).on('touchend', onInteractStop );
        $(window).on('wheel', onInteract);

    }else{
        $(window).on('scroll.home', onScroll);
	    onScroll();
        animateMobile();
    }
    
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    if(!checkDevices.check()){
        if($('body').hasClass('page-template-default')){
            $('#elementor-preview-iframe', window.parent.document).contents().find('.pages').find('.infos').height(window.parent.innerHeight);
        $('#elementor-preview-iframe', window.parent.document).contents().find('.pages').find('.circle').css({'width':window.parent.innerHeight/1.8, 'height':window.parent.innerHeight/1.8});
        }else{
            $pages.find('.infos').height(window.innerHeight);
            $pages.find('.circle').css({'width': window.innerHeight/1.8, 'height': window.innerHeight/1.8});
        }

        Earth.resize();
    }
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function animateDesktop() {
    
    ScrollTrigger.batch($('#slide-5'), { start: 'top 40%',
        onEnter: () => { $homeBullets.addClass('hb-dark'); },
        onLeaveBack: () => { $homeBullets.removeClass('hb-dark');}
    })

    ScrollTrigger.batch($('#slide-5'), { start: 'top 90%',
        onEnter: () => { 
            $scrollDown.removeClass('s-white');
            $('.home-globe').addClass('disabled');
        },
        onLeaveBack: () => { 
            $scrollDown.addClass('s-white');
            $('.home-globe').removeClass('disabled');
        }
    })

    ScrollTrigger.batch($('#slide-5'), { start: 'bottom 90%',
        onEnter: () => {
            $scrollDown.addClass('hide');
            gsap.to($homeBullets, 1, {ease: Power3.easeOut, x: '-300px'},0);
            $homeBckg.addClass('hide');
            _scrollPos = 5;
        },
        onLeaveBack: () => {
            $scrollDown.removeClass('hide');
            $homeBckg.removeClass('hide');
            gsap.to($homeBullets, 1, {ease: Power3.easeOut, x: '0%'},0);
        }
    })

    // HEADER
    ScrollTrigger.batch($('#slide-5'), { start: 'top 10%',
        onEnter: () => { $header.removeClass('h-white');},
        onLeaveBack: () => { $header.addClass('h-white');}
    })

    ScrollTrigger.batch($('#slide-5'), { start: 'bottom 10%',
        onEnter: () => { $header.addClass('h-white');},
        onLeaveBack: () => { $header.removeClass('h-white');}
    })

    $.each($slides,function(e, i){
        
        let _color          = $(i).attr('data-color');
        let _colorPrev      = $(i).prev().attr('data-color');
        let _colorBg        = $(i).attr('data-bkgColor');
        let _colorBgPrev    = $(i).prev().attr('data-bkgColor');
        let _posScroll      = e;

        ScrollTrigger.batch($(i), { start: 'top 40%',
            onEnter: () => { 
                $homeBckg.css({background:_color});
                $homeBckg.find('.background').attr('data-color',_colorBg);
                $homeBullets.find('.button').removeClass('active');
                $homeBullets.find('.button').eq(_posScroll).addClass('active');

                $(i).find('.home-infos').addClass('enabled');

                _sliderPos = _posScroll;

                slideMotionIn(i, _posScroll);

            },
            onEnterBack: () => { 

                if(e == 0){
                    $(i).find('.home-infos').addClass('enabled');
                }
            },
            onLeaveBack: () => { 
                $homeBckg.css({background:_colorPrev});
                $homeBckg.find('.background').attr('data-color',_colorBgPrev);
                $homeBullets.find('.button').removeClass('active');
                $homeBullets.find('.button').eq(_posScroll-1).addClass('active');

                setTimeout(function(){
                    $(i).find('.home-infos').removeClass('enabled');
                },1000);

                slideMotionOut(i, _posScroll);

                _sliderPos = _posScroll - 1;
  
            },
            onLeave: () => { 
                if(e == 4){
                    $('.home-infos').removeClass('enabled');
                }
            }
        })

        ScrollTrigger.batch($(i), { start: 'bottom 40%',
            onEnter: () => { 
                if( i != 3){
                    slideMotionOut(i, _posScroll);
                }
            },
            onLeaveBack: () => { 
                slideMotionIn(i, _posScroll);
                $(i).find('.home-infos').addClass('enabled');
            }
        })

        ScrollTrigger.batch($(i), { start: 'top 95%',
            onEnter: () => {
                _scrollPos = e;
            }
        })

        ScrollTrigger.batch($(i), { start: 'bottom 5%',
            onLeaveBack: () => {
                _scrollPos = e;
            }
        })
    });
   
}

function animateMobile(){

    ScrollTrigger.batch($('#slide-5'), { start: 'top 10%',
        onEnter: () => { $header.removeClass('h-white');},
        onLeaveBack: () => { $header.addClass('h-white');}
    })

    ScrollTrigger.batch($('#slide-5'), { start: 'bottom 10%',
        onEnter: () => { $header.addClass('h-white');},
        onLeaveBack: () => { $header.removeClass('h-white');}
    })

    $.each($slides,function(e, i){
        
        let _posScroll      = e;
        

        ScrollTrigger.batch($(i), { start: 'top 90%',
            onEnter: () => { 
                _sliderPos = _posScroll;
                slideMotionIn(i, _posScroll);
            },
            onEnterBack: () => {},
            onLeaveBack: () => { 
                slideMotionOut(i, _posScroll);

                _sliderPos = _posScroll - 1;
            },
            onLeave: () => { }
        })

    
    });
}


function setScrollTo(){

    $homeBullets.find('.button').on('click',function(){
        var _target = parseInt($(this).data('target').split('slide-')[1]);
        motionScroll($(window).height() * _target);
    });

    $scrollDown.on('click',function(){
        motionScroll($(window).height() * (_sliderPos+1));
    });
}

function slideMotionIn(_i, _posScroll){
    
    var _target = $(_i).attr('id');
    var _infos  = $('.home-infos').find('[data-target="'+_target+'"]');
    
    $(_infos).addClass('active');
    Title.motionIn($(_infos));
    $(_infos).find('.paragraph').addClass('motion-in');
    $(_infos).find('.button').addClass('motion-in');

    if( _posScroll == 0){
        gsap.to($('.home-globe').find('.g-wrapper'), 0.4, { ease: Power3.easeOut, opacity: 1, y: '0%' },0);
    }else{
        if(!checkDevices.check()){
            gsap.to($homeBckg.find('.images').find('.img').eq(_posScroll), 0.5, {ease: Power3.easeOut, opacity: 1},0);
            gsap.to($homeBckg.find('.images').find('.img').eq(_posScroll).find('img'), 2, {x: '0%', opacity: 1},0);
        }else{
            gsap.to($(_i).find('.img'), 0.5, {ease: Power3.easeOut, opacity: 1},0);
            gsap.to($(_i).find('.img').find('img'), 2, {x: '0%', opacity: 1},0);
        }
    }

    if( _posScroll == 4){
        $(_i).find('.button').addClass('motion-in');
        Title.motionIn($(_i));
        gsap.to($(_i).find('.image'), 2, {ease: Power3.easeOut, opacity: 1},0);
    }

}

function slideMotionOut(_i, _posScroll){

    var _target = $(_i).attr('id');
    var _infos  = $('.home-infos').find('[data-target="'+_target+'"]');
    
    $(_infos).removeClass('active');
    Title.motionOut($(_infos));
    $(_infos).find('.paragraph').removeClass('motion-in');
    $(_infos).find('.button').removeClass('motion-in');


    if( _posScroll == 0){
        gsap.to($('.home-globe').find('.g-wrapper'), 0.4, { ease: Power3.easeOut, opacity: 0, y: '-10%' },0);
    }else{
        if(!checkDevices.check()){
            gsap.to($homeBckg.find('.images').find('.img').eq(_posScroll), 0.5, {ease: Power3.easeOut, opacity: 0},0);
            gsap.to($homeBckg.find('.images').find('.img').eq(_posScroll).find('img'), 2, {x: '-20%', opacity: 0},0);
        }else{
            gsap.to($(_i).find('.img'), 0.5, {ease: Power3.easeOut, opacity: 0},0);
            gsap.to($(_i).find('.img').find('img'), 2, {x: '-20%', opacity: 0},0);
        }
    }

    if( _posScroll == 4){
        $(_i).find('.button').removeClass('motion-in');
        Title.motionOut($(_i));
        gsap.to($(_i).find('.image'), 1, {ease: Power3.easeOut, opacity: 0},0);
    }
}

function motionScroll(_target){
    _gsapScroll = gsap.to(window, 0.8, {scrollTo: {y: _target , ease: Power3.easeOut}});
}

function killScroll(){
    if( _gsapScroll) _gsapScroll.kill();
}

function onScroll(){
    if(!checkDevices.check()){
    let _scrollSteps    = $('[data-scroll-content]').height() / 6;
    checkScroll(_scrollSteps);
    } else{
        var scrollTop 		= $(window).scrollTop();

        if (scrollTop > 200) {
            $scrollDown.addClass('hide');
        } else{
            $scrollDown.removeClass('hide');
        }
    }
}

function checkScroll(_scrollSteps){

    clearTimeout(_scrollTimeout);

    if(_scrollAnimate){ return}

    _scrollTimeout = setTimeout(function(){
        killScroll();
        motionScroll(_scrollSteps * _scrollPos);
    }, 50);
}

function onInteractStart() {
    killScroll();
    _scrollAnimate = true;
}

function onInteractStop() {
    setTimeout(function(){
        _scrollAnimate = false;
    },1000);
}

function onInteract() {
    killScroll();
    onScroll();
}



// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }

        






