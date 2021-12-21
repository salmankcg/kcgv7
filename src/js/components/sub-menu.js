// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap from "gsap";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $cont       	= null;

// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){
    $cont       	= $('.submenu');

    setSubMenu()
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize(){}


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function setSubMenu(){

    $cont.remove();
    $('.header').find('.content').append($cont);

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
        $('.submenu').find('.sb-wrapper').slideUp();
        $('.submenu').removeClass('open-submenu');
    });
}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }

