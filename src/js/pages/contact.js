// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Form from  "../components/form";
import * as Button from "../components/button";
import gsap, {Power3} from "gsap";
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin);



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
let $contact		= null;
let $input          = null;
let $scrollDown     = null;


// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    $contact		= $('.contact');
    $input          = $contact.find('.input');
    $scrollDown     = $('.scrolldown');

    Form.init($input);
    Button.init();

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