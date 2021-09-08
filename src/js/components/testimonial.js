import $ from "jquery";
import "slick-carousel";



// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $testimonial       = $('.testimonial:not(.no-slick)');



// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\
if($testimonial.length){

  $testimonial.find('.slides').slick({
    infinite        : true,
    lazyLoad        : 'ondemand',
    slidesToShow	  : 3,
    slidesToScroll	: 1,
    arrows          : false,
    dots            : true,
    centerMode		: true,
    variableWidth: true,
    responsive: [
    {
      breakpoint: 768,
      settings: {
      arrows: false,
      centerMode: true,
      slidesToShow: 1,
      adaptiveHeight: true
      }
    }
    ]
  });

  $testimonial.find('.t-prev').on('click',function(){
    $testimonial.find('.slides').slick('slickPrev');
  });

  $testimonial.find('.t-next').on('click',function(){
    $testimonial.find('.slides').slick('slickNext');
  });  

}

