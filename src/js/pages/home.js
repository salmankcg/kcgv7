// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Earth from "../components/earth"
import * as Title from "../components/title"
import gsap, {TimelineMax, Power3} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { info } from "autoprefixer";


gsap.registerPlugin(ScrollTrigger);



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
let $pages       	= $('.pages');
let $slides       	= $('.hc-slides').find('.infos');
let $homeInfos      = $('.home-infos');
let $homeBullets    = $('.home-bullets');
let $homeBckg       = $('.home-bckg');
let $header         = $('.header');
let $scrollDown     = $('.scrolldown');

let _sliderPos      = 0;
let _scrollTimeout  = null;
let _scrollAnimate  = null;
let _scrollPos      = 0;

let _gsapScroll     = null;

const mobileAndTabletCheck = function() {
	let check = false;
	(function(a){ if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))  check = true;
    })(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};


window.addEventListener("orientationchange", function() {
    console.log('orientationchange ')
    location.reload()
}, false);


function isSurface() {
    const isWindows = navigator.userAgent.indexOf('Windows') > -1;
    const maxTouchPoints = navigator.maxTouchPoints || navigator.msMaxTouchPoints;
    const isTouchable = 'ontouchstart' in window
      || maxTouchPoints > 0
      || window.matchMedia && matchMedia('(any-pointer: coarse)').matches;
  
    return isWindows && isTouchable;
  }

const globeHeightWidth = function(){

    
    const ua = window.navigator.userAgent.toLowerCase();
    const isiPad = ua.indexOf('ipad') > -1 || ua.indexOf('macintosh') > -1 && 'ontouchend' in document;

   

    if(isiPad && window.innerWidth > window.innerHeight){
        console.log('ipad landscape')
        $('body').addClass('ipad-landscape')
        let globeHeight = window.innerHeight/1.4;
        return globeHeight;
    }
    else if(isiPad){
        console.log('ipad portrait')
        $('body').addClass('ipad-portrait')
        let globeHeight = window.innerHeight/1.8;
        return globeHeight;
    }else if((window.innerHeight>window.innerWidth) && (window.innerWidth >100 && window.innerWidth<=1150) ){
        console.log('portrait width 1')
        let globeHeight = window.innerHeight/2.4;
        return globeHeight;
    }
    else if((window.innerWidth>window.innerHeight) && (window.innerWidth >1110 && window.innerWidth<=1120) ){
        console.log('surface duo')
        let globeHeight = window.innerHeight*1.03 ;
        return globeHeight;
    }
    else if((window.innerWidth>window.innerHeight) && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        console.log('checking globe width')
        let globeHeight = window.innerHeight*1.4 ;
        return globeHeight;
    }else{
        console.log('checking globe width last1')
        let globeHeight = window.innerHeight/1.8;
        return globeHeight;
    }
    
}

// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\



function init(){
    console.log('init called')
    $pages.find('.infos').height(window.innerHeight);
    $pages.find('.circle').css({'width':globeHeightWidth(), 'height':globeHeightWidth()});

    setTimeout(function(){
        Earth.init();
    }, 1000);
    

    Title.init($slides.find('.title'));

    resize();
    setScrollTo();
        
    if(!mobileAndTabletCheck()){
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

    if(!mobileAndTabletCheck()){
        $pages.find('.infos').height(window.innerHeight);
        $pages.find('.circle').css({'width':globeHeightWidth(), 'height':globeHeightWidth()});
        Earth.resize(); 
    }else{
        $(window).on('scroll.home', onScroll);
	    onScroll();
        animateMobile();
    }
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function animateDesktop() {

    console.log('calling desktop function');
    
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
        if(!mobileAndTabletCheck()){
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

    // console.log('nqjkbejknblfknbfehgirjwifjwk '+_target);
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
        if(!mobileAndTabletCheck()){
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
    if(!mobileAndTabletCheck()){
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

        






