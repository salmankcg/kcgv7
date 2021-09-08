// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import 'slick-carousel';

// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $gallery       = $('.gallery');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
if($gallery.length){

    var $slides       	= $gallery.find('.slides');

    $slides.slick({
		arrows		    : false,
		dots		    : true,
		infinite	    : false,
		padding		    : '120px',
        // variableWidth   : true,
	});

    $gallery.find('.t-prev').on('click',function(){
        $slides.slick('slickPrev');
    });

    $gallery.find('.t-next').on('click',function(){
        $slides.slick('slickNext');
    });
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\

