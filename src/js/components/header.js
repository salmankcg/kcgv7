// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $header       	= $('.header');
var $menu       	= $('.menu');
var $hmbrg      	= $header.find('.hmbrg');

var _dataPage		= $('main').data('page');
var _headerH		= $('.header').find('.logo').height() + (($('.header').height()-$('.header').find('.logo').height())/2);

// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
if($header.length){

	$header.find('.menu').css({'height':window.innerHeight});
	$hmbrg.on('click', function(){
		if($(this).hasClass('active')){
			hideMenu();
			
		}else{
			showMenu();	
		}
	});

	$(window).on('scroll.header', onScroll);
	$(window).on('resize', onResize);
	onScroll();
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function onResize(){
	$header.find('.menu').css({'height':window.innerHeight});
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
				$header.removeClass('h-white');
				$('.submenu').addClass('hide');
			}else{
				$header.addClass('h-white');
				$('.submenu').removeClass('hide');
			}
		break;
		case 'journal-inner':
			if(scrollTop  >= (wHeight * 0.80) - _headerH){
				if(scrollTop + wHeight >= dHeight - _headerH){
					$header.addClass('h-white');
				}else{
					$header.removeClass('h-white');
				}
			}else{
				$header.addClass('h-white');
			}
			
		break;
		case 'press-inner':
			if(scrollTop  >= (wHeight * 0.80) - _headerH){
				if(scrollTop + wHeight >= dHeight - _headerH){
					$header.addClass('h-white');
				}else{
					$header.removeClass('h-white');
				}
			}else{
				$header.addClass('h-white');
			}
			
		break;
		case 'contact':
			if(scrollTop + wHeight >= dHeight - _headerH){
				$header.removeClass('h-white');
			}else{
				$header.addClass('h-white');
			}
		break;
		case 'service':
			
			var _scTop = ($('.sc-testimonials').length > 0) ? $('.sc-testimonials').offset().top : 0;

			if(scrollTop >= _scTop - _headerH){
				if(scrollTop + wHeight >= dHeight - _headerH){
					$header.addClass('h-white');
				}else{
					$header.removeClass('h-white');
				}

			}else{
				$header.addClass('h-white');
			}
		break;
		case 'services':
			// if(scrollTop + wHeight >= dHeight - _headerH){
			// 	$('.submenu').addClass('hide');
			// }else{
			// 	$header.removeClass('h-white');
			// 	$('.submenu').removeClass('hide');
			// }
			
		break;
		case 'about':
			
			var _acBTop = ($('.ac-black').length > 0) ? $('.ac-black').offset().top : 0;
			var _acJTop = ($('.ac-journal').length > 0) ? $('.ac-journal').offset().top : 0;

			if(scrollTop >= _acBTop - _headerH && scrollTop < _acJTop - _headerH){
				$header.addClass('h-white');
			} else if(scrollTop >= _acJTop - _headerH && scrollTop + wHeight < dHeight - _headerH){
				$header.removeClass('h-white');
				$('.submenu').removeClass('hide');
			}else if(scrollTop + wHeight >= dHeight - _headerH){
				$header.addClass('h-white');
				$('.submenu').addClass('hide');
			}else{
				$header.removeClass('h-white');
			}

		break;
		default:
			if(scrollTop + wHeight >= dHeight - _headerH){
				$header.addClass('h-white');
				$('.submenu').addClass('hide');
			}else{
				$header.removeClass('h-white');
				$('.submenu').removeClass('hide');
			}
	}
	

}

function showMenu(){
	$header.addClass('show-menu');
	$menu.addClass('show-menu');
	$('.submenu').addClass('hide');
	$hmbrg.addClass('active');
}

function hideMenu(){
	$header.removeClass('show-menu');
	$menu.removeClass('show-menu');
	$('.submenu').removeClass('hide');
	$hmbrg.removeClass('active');
}
