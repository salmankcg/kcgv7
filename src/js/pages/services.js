// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Title from "../components/title"
import * as MouseMove from  "../components/mouse-move";
import gsap, {TimelineMax, Power3} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
let $pages       	= $('.pages');
let $highlights     = $('.highlights');
let $slides       	= $('.sc-slides').find('.infos');
let $serviceBckg    = $('.services-bckg');
let $header         = $('.header');
let $scrollDown     = $('.scrolldown');
let $btIcons        = $slides.find('.services-icons').find('.item');
let _sliderPos     = 0;

// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    $pages.find('.infos').height(window.innerHeight);

    Title.init($('#slide-1').find('.title'));
    MouseMove.init($highlights.find('img'));

    setScrollTo();
    animate();

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
            $scrollDown.addClass('s-white');
            $('.services-icons').find('.item').each(function(i,e){
                gsap.to($(e), 1.2, {opacity: 0 , ease: Power3.easeOut});
            });
            Title.motionOut($('#slide-1').find('.title'));
        },
        onLeaveBack: () => { 
            $header.removeClass('h-white');
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
            $header.removeClass('h-white');
        },
        onLeaveBack: () => {
            $header.addClass('h-white');
        }
    })

    ScrollTrigger.batch($('.sc-testimonials'), { start: 'bottom 10%',
        onEnter: () => {
            $header.addClass('h-white');
        },
        onLeaveBack: () => {
            $header.removeClass('h-white');
        }
    })

    $.each($slides,function(e, i){
        
        let _color          = $(i).attr('data-color');
        let _colorPrev      = $(i).prev().attr('data-color');
        
        let _posScroll      = e;

        ScrollTrigger.batch($(i), { start: 'top 40%',
            onEnter: () => { 
                $serviceBckg.css({background:_color});

                _sliderPos = _posScroll;

                slideMotionIn(i, _posScroll);

            },
            onLeaveBack: () => { 
                $serviceBckg.css({background:_colorPrev});

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






