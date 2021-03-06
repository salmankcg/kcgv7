// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap, {TimelineMax, Power3} from "gsap";
import { ScrollTrigger }    from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import * as Title           from "../components/title"
import * as MouseMove       from  "../components/mouse-move";
import * as Testimonial     from  "../components/testimonial";
import * as ScramblePeople  from  "../components/scrample-people";
import * as Button          from "../components/button";
import * as SubMenu         from "../components/sub-menu";





// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
let $pages       	= null;
let $highlights     = null;
let $slides       	= null;
let $serviceBckg    = null;
let $header         = null;
let $scrollDown     = null;
let $btIcons        = null;

let _sliderPos     = 0;

// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    $pages       	= $('.pages');
    $highlights     = $('.highlights');
    $slides       	= $('.sc-slides').find('.infos');
    $serviceBckg    = $('.services-bckg');
    $header         = $('.header');
    $scrollDown     = $('.scrolldown');
    $btIcons        = $slides.find('.services-icons').find('.item');

    $pages.find('.infos').height(window.innerHeight);

    Title.init($('#slide-1').find('.title'));
    MouseMove.init($highlights.find('img'));

    setScrollTo();
    animate();

    Testimonial.init();
    ScramblePeople.init();
    Button.init();
    SubMenu.init();

    $btIcons.on('click',function(){
        let _target = $(this).attr('data-target').split('slide-')[1];
        console.log(_target);
        gsap.to(window, 1.2, {scrollTo: {y: $(window).height() * (_target-1) + 10 , ease: Power3.easeOut}});
    });

    $('.clients').find('.logos').eq(0).addClass('add-motion-1');
    $('.clients').find('.logos').eq(1).addClass('add-motion-1');
    $('.clients').find('.logos').eq(2).addClass('add-motion-2');
    $('.clients').find('.logos').eq(3).addClass('add-motion-2');
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    $pages.find('.infos').height(window.innerHeight);
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function animate() {

   
    Title.motionIn($('#slide-1').find('.title'));

    ScrollTrigger.batch($('#slide-2'), { start: 'top 40%',
        onEnter: () => { 
            $header.addClass('h-white');
            $header.find('.submenu').addClass('sb-services').removeClass('sb-white');
            $scrollDown.addClass('s-white');
            $('.services-icons').find('.item').each(function(i,e){
                gsap.to($(e), 1.2, {opacity: 0 , ease: Power3.easeOut});
            });
            Title.motionOut($('#slide-1').find('.title'));
        },
        onLeaveBack: () => { 
            $header.removeClass('h-white');
            $header.find('.submenu').removeClass('sb-services').addClass('sb-white');
            $scrollDown.removeClass('s-white');
            $('.services-icons').find('.item').each(function(i,e){
                gsap.to($(e), 1.2, {opacity: 1 , ease: Power3.easeOut, delay: 0.5*i});
                console.log(e);
            });

            Title.motionIn($('#slide-1').find('.title'));
        }
    })

    ScrollTrigger.batch($('#slide-4'), { start: 'bottom 90%',
        onEnter: () => {
            $scrollDown.addClass('hide');
        },
        onLeaveBack: () => {
            $scrollDown.removeClass('hide');
        }
    })

    ScrollTrigger.batch($('.sc-black'), { start: 'top 10%',
        onEnter: () => {
            $header.find('.submenu').css({background:'#141515'});
        },
        onLeaveBack: () => {
            $header.find('.submenu').css({background:'#B27EE4'});
        }
    })

    ScrollTrigger.batch($('.sc-clients'), { start: 'top 10%',
        onEnter: () => {
            $header.removeClass('h-white');
            $header.find('.submenu').removeClass('sb-services').addClass('sb-white');
            $header.find('.submenu').css({background:'#FFFFFF'});
        },
        onLeaveBack: () => {
            $header.addClass('h-white');
            $header.find('.submenu').addClass('sb-services').removeClass('sb-white');
            $header.find('.submenu').css({background:'#141515'});
        }
    })

    ScrollTrigger.batch($('.sc-testimonials'), { start: 'bottom 10%',
        onEnter: () => {
            $header.addClass('h-white');
            $header.find('.submenu').addClass('hide');
        },
        onLeaveBack: () => {
            $header.removeClass('h-white');
            $header.find('.submenu').removeClass('hide');
        }
    })

    $.each($slides,function(e, i){
        
        let _color          = $(i).attr('data-color');
        let _colorPrev      = $(i).prev().attr('data-color');
        let _posScroll      = e;

        ScrollTrigger.batch($(i), { start: 'top 40%',
            onEnter: () => { 
                $serviceBckg.css({background:_color});
                $header.find('.submenu').css({background:_color});

                _sliderPos = _posScroll;

                slideMotionIn(i, _posScroll);

                console.log(_posScroll);

            },
            onLeaveBack: () => { 
                $serviceBckg.css({background:_colorPrev});
                $header.find('.submenu').css({background:_colorPrev});

                slideMotionOut(i, _posScroll);

                _sliderPos = _posScroll - 1;
            }
        })

        ScrollTrigger.batch($(i), { start: 'bottom 40%',
            onEnter: () => { 
                slideMotionOut(i, _posScroll);
            },
            onLeaveBack: () => { 
                slideMotionIn(i, _posScroll);
            }
        })
    });
}

function setScrollTo(){

    $scrollDown.on('click',function(){
        gsap.to(window, 1.2, {scrollTo: {y: $(window).height() * (_sliderPos+1) + 10 , ease: Power3.easeOut}});
    });
}

function slideMotionIn(_i, _posScroll){
    
}

function slideMotionOut(_i, _posScroll){

}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }






