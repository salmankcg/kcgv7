// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Load from "./load"
import * as Loader from "../components/loader"



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $menu 		= $('.menu');
var $header 	= $('.header');
var $cont 		= $('.main-content');
var $main 		= $('main');

var _loadDelay 	= 0;
var _dataPage	= $main.data('page');


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function init(){

	//Comaçar com o scroll no topo
	for (var i = 0; i < 800; i = i + 50) setTimeout(function(){
		$(window).scrollTop(0);
	}, i);

	console.log($menu.length);

	Loader.initMotion();
	
	setTimeout(function(){
		
		Loader.inMotion();
		
		Load.init({
			elem: $('body'),
			testDelay: _loadDelay,
			progress: function(pcent){
				if(_dataPage != 'about-person'){
					var _pcent 		= parseInt(pcent);
					Loader.progressMotion(_pcent);
				}
			},
			complete: function(){
				
				// console.log('LOAD FINISHED');
				if(_dataPage != 'home'){
					$(window).trigger('LOADER_ALL');
				}
				
				
			},
		});

	}, 500 );

	$(window).bind('LOADER_ALL',function(){
		// console.log('LOAD ALL');
		setFirstLoader();
	})

}

function unsetCookie(){
    Cookies.remove('work_type');
}



function setFirstLoader(){

	setTimeout(function(){
		Loader.outMotion('1');
		
		setTimeout(function(){
			
			Loader.outMotion('2');
				
			setTimeout(function(){
				
				Loader.hide();
				
				$menu.trigger('enter').addClass('motion-in');
				$header.addClass('motion-in');
				$cont.find('> *').trigger('enter').addClass('motion-in');
		
				activeMenus(_dataPage);

			}, 1000);
			
		}, 1500);

	}, 500 );
}

function hide(){
	Loader.hide();
	
	setTimeout(function(){
		$menu.trigger('enter').addClass('motion-in');
		$header.addClass('motion-in');
		$cont.find('> *').trigger('enter').addClass('motion-in');

		activeMenus(_dataPage);
	}, 1000);
}

function activeMenus(page){
	$menu.find('.item').removeClass('active');
	$menu.find('.item').filter('[data-target="'+page+'"]').addClass('active');

    // LOAD MORE CHRISTMASS EFFECT SCRIPT
    if($('.weather-effect-image').length > 0){
        setTimeout( function() {
            $('.weather-effect-image').fadeOut(1000);
            $('html').find('script').each(function(){
                var scriptID = $(this).attr('id');
                if(scriptID) {             
                    if(scriptID.startsWith('awplife-we-snow')) {
                        $('#'+scriptID).remove();
                    }
                }   
            });
            // $('.snowfall-flakes').remove();
        }, 2000);
    }
    setTimeout( function() {
        $('.weather-effect-image').remove();
    }, 2000);
}

// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, hide, unsetCookie }