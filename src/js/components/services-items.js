import $ from "jquery";
import "slick-carousel";



// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $svcsItem       = $('.services-items');



// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\
if($svcsItem.length){

  $svcsItem.slick({
    infinite        : false,
    slidesToShow	  : 1,
    slidesToScroll	: 1,
    arrows          : false,
    variableWidth   : true,
    responsive: [
                {
                  breakpoint  : 768,
                  settings    : {
                                  arrows: false,
                              }
                }
    ]
  });

  $svcsItem.find('.t-prev').on('click',function(){
    $svcsItem.find('.slides').slick('slickPrev');
  });

  $svcsItem.find('.t-next').on('click',function(){
    $svcsItem.find('.slides').slick('slickNext');
  });  

}

