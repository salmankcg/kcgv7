// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $cont       	= $('.header');
var $menu       	= $('.menu');
var $hmbrg      	= $cont.find('.hmbrg');

var _dataPage		= $('main').data('page');
var _headerH		= $('.header').find('.logo').height() + (($('.header').height()-$('.header').find('.logo').height())/2);


// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){
	setHeader();
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize(){
	$cont.find('.menu').css({'height':window.innerHeight});
}


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function setHeader(){
	$cont.find('.menu').css({'height':window.innerHeight});
	$hmbrg.on('click', function(){
		if($(this).hasClass('active')){
			hideMenu();
			
		}else{
			showMenu();	
		}
	});

	$(window).on('scroll.header', onScroll);
	$(window).on('resize', resize);
	onScroll();
}

function onScroll(){

	var dHeight 		= $(document).height();
	var wHeight			= window.innerHeight;
	var scrollTop 		= $(window).scrollTop();


	switch(_dataPage){
		case 'home':

		break;
		case 'about-mission':
			if(scrollTop + wHeight >= dHeight - _headerH){
				$cont.removeClass('h-white');
				$('.submenu').addClass('hide');
			}else{
				$cont.addClass('h-white');
				$('.submenu').removeClass('hide');
			}
		break;
		case 'journal-inner':
			if(scrollTop  >= (wHeight * 0.80) - _headerH){
				if(scrollTop + wHeight >= dHeight - _headerH){
					$cont.addClass('h-white');
				}else{
					$cont.removeClass('h-white');
				}
			}else{
				$cont.addClass('h-white');
			}
			
		break;
		case 'press-inner':
			if(scrollTop  >= (wHeight * 0.80) - _headerH){
				if(scrollTop + wHeight >= dHeight - _headerH){
					$cont.addClass('h-white');
				}else{
					$cont.removeClass('h-white');
				}
			}else{
				$cont.addClass('h-white');
			}
			
		break;
		case 'contact':
			if(scrollTop + wHeight >= dHeight - _headerH){
				$cont.removeClass('h-white');
			}else{
				$cont.addClass('h-white');
			}
		break;
		case 'service':
			
			var _scTop = $('.sc-testimonials').offset().top;

			if(scrollTop >= _scTop - _headerH){
				if(scrollTop + wHeight >= dHeight - _headerH){
					$cont.addClass('h-white');
				}else{
					$cont.removeClass('h-white');
				}

			}else{
				$cont.addClass('h-white');
			}
		break;
		case 'services':
			// if(scrollTop + wHeight >= dHeight - _headerH){
			// 	$('.submenu').addClass('hide');
			// }else{
			// 	$cont.removeClass('h-white');
			// 	$('.submenu').removeClass('hide');
			// }
			
		break;
		case 'about':
			
			var _acBTop = $('.ac-black').offset().top;
			var _acJTop = $('.ac-journal').offset().top;

			if(scrollTop >= _acBTop - _headerH && scrollTop < _acJTop - _headerH){
				$cont.addClass('h-white');
			} else if(scrollTop >= _acJTop - _headerH && scrollTop + wHeight < dHeight - _headerH){
				$cont.removeClass('h-white');
				$('.submenu').removeClass('hide');
			}else if(scrollTop + wHeight >= dHeight - _headerH){
				$cont.addClass('h-white');
				$('.submenu').addClass('hide');
			}else{
				$cont.removeClass('h-white');
			}

		break;
		default:
			if(scrollTop + wHeight >= dHeight - _headerH){
				$cont.addClass('h-white');
				$('.submenu').addClass('hide');
			}else{
				$cont.removeClass('h-white');
				$('.submenu').removeClass('hide');
			}
	}
	

}

function showMenu(){
	$cont.addClass('show-menu');
	$menu.addClass('show-menu');
	$('.submenu').addClass('hide');
	$hmbrg.addClass('active');
}

function hideMenu(){
	$cont.removeClass('show-menu');
	$menu.removeClass('show-menu');
	$('.submenu').removeClass('hide');
	$hmbrg.removeClass('active');
}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }
