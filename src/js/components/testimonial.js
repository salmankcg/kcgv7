// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import "slick-carousel";



// ----------------------------------------- \\\
// ------------------ VARS ----------------- \\\
// ----------------------------------------- \\\
var $cont       = $('.testimonial:not(.no-slick)');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){
  initSlider();
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize(){}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function initSlider(){
  $cont.find('.slides').slick({
    infinite        : true,
    lazyLoad        : 'ondemand',
    slidesToScroll	: 1,
    arrows          : false,
    dots            : true,
    centerMode		: true,
    variableWidth: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        slidesToShow: 1,
        adaptiveHeight: true
        }
      }]
  });

  $cont.find('.t-prev').on('click',function(){
    $cont.find('.slides').slick('slickPrev');
  });

  $cont.find('.t-next').on('click',function(){
    $cont.find('.slides').slick('slickNext');
  });  
}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }
