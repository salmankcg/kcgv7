// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $loader       	= $('.loader');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function initMotion(){
    $loader.css({'display':'flex'});
}

function inMotion(){
    $loader.addClass('motion-in');
}


function progressMotion(_percent){

    var _rounded	= Math.round(_percent / 20);
		
}

function outMotion(_steps){

    if(_steps == '1'){
        $loader.addClass('motion-out-1');
    }else{
        $loader.addClass('motion-out-2');
    }
}

function hide(){
    $loader.css({'display':'none'});
    $loader.removeClass('motion-out-1').removeClass('motion-out-2').removeClass('motion-in');
    

    // LOAD MORE CHRISTMASS EFFECT SCRIPT
    if($('.snowfall-flakes').length > 0){
        setTimeout( function() {
            $('.snowfall-flakes').fadeOut(1000);
            $('html').find('script').each(function(){
                var scriptID = $(this).attr('id');
                if(scriptID) {             
                    if(scriptID.startsWith('awplife-we-snow')) {
                        $('#'+scriptID).remove();
                    }
                }   
            });
            // $('.snowfall-flakes').remove();
        }, 5000);
    }
}



// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { initMotion, inMotion, progressMotion, outMotion, hide}
