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
			// if(scrollTop + wHeight >= dHeight - _headerH){
			// 	$header.addClass('h-white');
			// }else{
			// 	if($header.hasClass('check-footer')){
			// 		$header.removeClass('h-white');
			// 	}
			// }
		break;
		case 'about-mission':
			if(scrollTop + wHeight >= dHeight - _headerH){
				$header.removeClass('h-white');
			}else{
				$header.addClass('h-white');
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
		case 'services':
			
		break;
		case 'service':
			
			var _scTop = $('.sc-testimonials').offset().top;

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
		case 'about':
			
			var _acBTop = $('.ac-black').offset().top;
			var _acJTop = $('.ac-journal').offset().top;

			if(scrollTop >= _acBTop - _headerH && scrollTop < _acJTop - _headerH){
				$header.addClass('h-white');
			} else if(scrollTop >= _acJTop - _headerH && scrollTop + wHeight < dHeight - _headerH){
				$header.removeClass('h-white');
			}else if(scrollTop + wHeight >= dHeight - _headerH){
				$header.addClass('h-white');
			}else{
				$header.removeClass('h-white');
			}

		break;
		default:
			if(scrollTop + wHeight >= dHeight - _headerH){
				$header.addClass('h-white');
			}else{
				$header.removeClass('h-white');
			}
	}
	

}

function showMenu(){
	$header.addClass('show-menu');
	$menu.addClass('show-menu');
	$('.submenu').addClass('show-menu');
	$hmbrg.addClass('active');
}

function hideMenu(){
	$header.removeClass('show-menu');
	$menu.removeClass('show-menu');
	$('.submenu').removeClass('show-menu');
	$hmbrg.removeClass('active');
}
