// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $subMenu       	= $('.submenu');

// var $new

// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
if($subMenu.length){
    
    $subMenu.remove();
    $('.header').find('.content').append($subMenu);

    $('.header').find('.sb-button').on('click',function(){
        var $this = $(this).parent();

        if($($this).hasClass('open-submenu')){
            $($this).find('.sb-wrapper').slideUp();
            $($this).removeClass('open-submenu');
        }else{
            $($this).find('.sb-wrapper').slideDown();
            $($this).addClass('open-submenu');
        }
    });
    // console.log($subMenu)

	// $(window).on('scroll.header', onScroll);
	// $(window).on('resize', onResize);
	// onScroll();
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function onResize(){
	
}

function onScroll(){
	

}

