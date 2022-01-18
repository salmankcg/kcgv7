// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from 'jquery';
import * as Form from  '../components/form';
import gsap, {Power3} from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $contact		= $('.contact');
var $input          = $contact.find('.input');
var $scrollDown     = $('.scrolldown');


// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    Form.init($input);

    $scrollDown.on('click',function(){
        $(this).addClass('hide');
        gsap.to(window, .5, {scrollTo: {y: $(window).height() , ease: Power3.easeOut}});
    });
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\





// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }