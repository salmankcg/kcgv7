// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import {TimelineLite, TweenMax, Elastic, Power3} from "gsap";
import * as checkDevices  from "../modules/check-devices";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $cont			= $('.people-scramble');
var $itemScramble 	= $cont.find('.item');

var _arrPos 		= [ 
              		  [12.5 * 0, 12.5 * 1, 12.5 * 1, 12.5 * 0],
              		  [12.5 * 1, 12.5 * 2, 12.5 * 2, 12.5 * 1],
              		  [12.5 * 2, 12.5 * 3, 12.5 * 3, 12.5 * 2],
              		  [12.5 * 3, 12.5 * 4, 12.5 * 4, 12.5 * 3],
              		  [12.5 * 4, 12.5 * 5, 12.5 * 5, 12.5 * 4],
              		  [12.5 * 5, 12.5 * 6, 12.5 * 6, 12.5 * 5],
              		  [12.5 * 6, 12.5 * 7, 12.5 * 7, 12.5 * 6],
              		  [12.5 * 7, 12.5 * 8, 12.5 * 8, 12.5 * 7]
					]

					
var _arryPos		= [];
var _posElm 		= 0;
var _widthElm 		= $cont.find('.item').width();




// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){
	setScramble();
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize(){}




// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function setScramble(){
	if(!checkDevices.check()){
		$itemScramble.on('mouseenter',function(){
			var _this = this;
			onMouseEnterScramble(_this);
			$itemScramble.closest('.people-scramble').addClass('mouse-enter');
		});
		$itemScramble.on('mouseleave',function(){
			var _this = this;
			onMouseLeaveScramble(_this);
			$itemScramble.closest('.people-scramble').removeClass('mouse-enter');
		});

	}else{
		$cont.on('touchmove',checkPosTouchScramble);
		$cont.on('touchend',onTouchEndScramble);
		$itemScramble.on('touchstart',function(){
			var _this = this;
			onMouseEnterScramble(_this);
			$itemScramble.closest('.people-scramble').addClass('mouse-enter');
		});
		
		$itemScramble.on('touchend',function(){
			var _this = this;
			onMouseLeaveScramble(_this);
			$itemScramble.closest('.people-scramble').removeClass('mouse-enter');
		});

		$itemScramble.each(function(i,e){
			_posElm = Math.round($(e).width() * ( i ));
			var _padding = 30;

			_arryPos.push( (_posElm +_padding)  )
		});
	}


	var _icoCursor = new TimelineLite({delay:0.5, onComplete:function(){
		setTimeout(function(){
			_icoCursor.restart();
		}, 4000);
	}})

	_icoCursor.fromTo($cont.find('.pc-pointer'), 2, {opacity: 0 }, {opacity: 1, ease: Power3.easeInOut}, 0)
	_icoCursor.to($cont.find('.ico'), 1, {x: 10, ease: Power3.easeInOut}, 2)
	_icoCursor.to($cont.find('.ico'), 1, {x: -10, ease: Power3.easeInOut}, 3)
	_icoCursor.to($cont.find('.ico'), 1, {x: 10, ease: Power3.easeInOut}, 4)
	_icoCursor.to($cont.find('.ico'), 1, {x: -10, ease: Power3.easeInOut}, 5)
	_icoCursor.to($cont.find('.ico'), 1, {x: 10, ease: Power3.easeInOut}, 6)
	_icoCursor.to($cont.find('.ico'), 1, {x: -10, ease: Power3.easeInOut}, 7)
	_icoCursor.fromTo($cont.find('.pc-pointer'), 2, {opacity: 1 }, {opacity: 0, ease: Power3.easeInOut}, 8)
}

function onMouseEnterScramble(_this){

	var _target = $(_this).data('target');

	
	$itemScramble.each(function(i,e){
		
		var $figure = $cont.find('.wrapper').find('figure').eq(i);

		TweenMax.killTweensOf($figure);
		
		if(i == _target){
			TweenMax.to($figure, 1, { ease: Power3.easeOut, "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"});
		}else{
			
			if((i) < _target){
				TweenMax.to($figure, 1, { ease: Power3.easeOut, "clip-path": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"});
			}else{
				TweenMax.to($figure, 1, { ease: Power3.easeOut, "clip-path": "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"});
			}
		}
	});	

}

function onMouseLeaveScramble(_this){
	
	var $this 	= $(_this);

	$itemScramble.each(function(i,e){
		var _target = $(this).data('target');
		var $figure = $this.closest('.wrapper').find('figure').eq(_target);

		TweenMax.killTweensOf($figure);
		TweenMax.to($figure, 3, { ease: Elastic.easeOut, "clip-path": "polygon("+_arrPos[i][0]+"% 0%, "+_arrPos[i][1]+"% 0%, "+_arrPos[i][2]+"% 100%, "+_arrPos[i][3]+"% 100%)"});
		
	});
	
}

function onTouchEndScramble(e){
	$itemScramble.each(function(i,e){
		onMouseLeaveScramble(e);
	});    
	
}

function checkPosTouchScramble(e){
	var _touchX = Math.round(e.touches[0].clientX);

	$.each(_arryPos, function(i){
		if(_touchX > _arryPos[i] && _touchX < (_arryPos[i] + _widthElm) ){
			onMouseEnterScramble($cont.find('.item').eq(i));
		}
	});

}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }