// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove     from  "../components/mouse-move";
import * as Button        from "../components/button";
import * as SubMenu       from "../components/sub-menu";
import * as checkDevices  from "../modules/check-devices";
import gsap, {TweenMax, TimelineMax, Power3, Expo} from "gsap";
import "slick-carousel";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
let $abtApproach    = null;
let $item           = null;
let $videos         = null;


// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

  $abtApproach    = $('.approach');
  $item           = null;
  $videos         = $('.video-background');

  Button.init();
  SubMenu.init();
 
  $abtApproach.slick({
    infinite        : false,
    lazyLoad        : 'ondemand',
    slidesToShow	  : 3,
    slidesToScroll	: 3,
    arrows          : false,
    dots            : false,
    responsive: [{
      breakpoint: 850,
      settings: {
        dots            : true,
        slidesToShow    : 2,
        slidesToScroll	: 2,
        adaptiveHeight  : true
      }
    },{
      breakpoint: 430,
      settings: {
        dots            : true,
        slidesToShow    : 1,
        slidesToScroll	: 1,
        adaptiveHeight  : true
      }
    }]
  });

  $('.bt-prev').on('click',function(){
    $abtApproach.slick('slickPrev');
  });

  $('.bt-next').on('click',function(){
    $abtApproach.slick('slickNext');
  }); 

  $('.bt-prev').addClass('bt-disable');

  $abtApproach.on('beforeChange',function( event, slick, currentSlide, nextSlide){
    if(nextSlide == 0){
      $('.bt-prev').addClass('bt-disable');
    }else{
      $('.bt-prev').removeClass('bt-disable');
    }

    if(nextSlide == 2){
      $('.bt-next').addClass('bt-disable');
    }else{
      $('.bt-next').removeClass('bt-disable');
    }

  });

  $item  = $abtApproach.find('.item');
  
  if(!checkDevices.check()){
    MouseMove.init($abtApproach.find('.item').find('.wrapper'));

    $('video')[0].play();
    $('video')[1].play();
    $('video')[2].play();

    $item.on('mouseenter', onMouseEnter);
    $item.on('mouseleave', onMouseLeave);

  }else{

    $item.on('touchstart', onMouseEnter);
    $item.on('touchend', onMouseLeave);

  }

}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function onMouseEnter(){

  var _target = $(this).data('video');

  $item.addClass('hide');
  $(this).removeClass('hide');

  TweenMax.killTweensOf($('.title.t-center'));
  TweenMax.killTweensOf($('.header'));

  new TimelineMax ()
  .add([
    TweenMax.to($('.title.t-center'), 0.5, { ease: Power3.easeOut, opacity: 0 }),
    TweenMax.to($('.header'), 0.1, { ease: Power3.easeOut, opacity: 0 }, 0),
  ]);

  $videos.find('.video').removeClass('active');
  $videos.find('[data-target="'+_target+'"]').addClass('active');
  
  
}

function onMouseLeave(){
  
  $item.removeClass('hide');
  $videos.find('.video').removeClass('active');
  
  TweenMax.killTweensOf($('.title.t-center'));
  TweenMax.killTweensOf($('.header'));

  new TimelineMax ()
  .add([
    TweenMax.to($('.title.t-center'), 0.5, { ease: Power3.easeOut, opacity: 1 }),
    TweenMax.to($('.header'), 0.1, { ease: Power3.easeOut, opacity: 1 }, 0),
  ]);

}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }