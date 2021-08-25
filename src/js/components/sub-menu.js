// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap from "gsap";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $subMenu       	= $('.submenu');

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

    $('.submenu').find('.active').on('click',function(){
        gsap.to(window, 1, {scrollTo: {y: 0 , ease: 'Power3.easeOut'}});
    });

}

// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\

// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\


