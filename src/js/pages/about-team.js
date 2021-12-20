// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove 		from  "../components/mouse-move";
import * as ScramblePeople 	from  "../components/scrample-people";
import * as Button 			from "../components/button";
import * as SubMenu         from "../components/sub-menu";
import * as checkDevices  	from "../modules/check-devices";

import gsap, {TweenMax, Elastic, Power3} from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
let $peopleList		= null;
let $peopleScramble	= null;
let $itemScramble 	= null;
let $scrollDown		= null;
 
let $name 			= null;
let $area 			= null;

let _fxName 		= null;
let _fxArea 		= null;
 
let _name 			= null;
let _area 			= null;
 
let _arryPos		= [];
let _posElm 		= 0;
let _widthElm 		= null;



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

	$peopleList		= $('.people');
	$peopleScramble	= $('.people-scramble');
	$itemScramble 	= $peopleScramble.find('.item');
	$scrollDown		= $('.scrolldown');
	$name 			= document.querySelector('.name');
	$area 			= document.querySelector('.area');
	_widthElm 		= $peopleScramble.find('.item').width();


	_fxName 	= new TextScramble($name);
	_fxArea 	= new TextScramble($area);

	MouseMove.init($peopleList.find('.item').find('.i-wrapper'));

	ScramblePeople.init();
	Button.init();
	SubMenu.init();

	if(!checkDevices.check()){
		$itemScramble.on('mouseenter',function(){
			var _this = this;
			mouseEnter(_this);
		});
			
		$peopleScramble.on('mouseleave',function(){
			_fxName.setText('the people');
			_fxArea.setText('make the <b>magic</b> happen');
		});

	}else{
		$peopleScramble.on('touchmove',checkPosTouch);
		$itemScramble.on('touchstart',function(){
			var _this = this;
			mouseEnter(_this);
		});
		
		$itemScramble.each(function(i,e){
			_posElm = Math.round($(e).width() * ( i ));
			var _padding = 30;

			_arryPos.push( (_posElm +_padding)  )
		});
	}
	
	$(window).on('scroll.about-team', onScroll);
	onScroll();


	$scrollDown.on('click',function(){
		gsap.to(window, 2, {scrollTo: {y: $(window).height() , ease: Power3.easeOut}});
	});

	$('.webdoor').find('.button').on('click',function(){
		gsap.to(window, 2, {scrollTo: {y: $(window).height() , ease: Power3.easeOut}});
	});
	

}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {}


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function mouseEnter(_this){

	_name 	= $(_this).data('name');
	_area 	= $(_this).data('area');

	_fxName.setText(_name);
	_fxArea.setText(_area);
	
}

class TextScramble {

	constructor(el) {
	  this.el 		= el
	  this.chars 	= 'abcdefghijlkmnopqrstuvxz'
	  this.update 	= this.update.bind(this)
	}

	setText(newText) {
	  const oldText = this.el.innerText
	  const length 	= Math.max(oldText.length, newText.length)
	  const promise = new Promise((resolve) => this.resolve = resolve)
	  this.queue = []
	  for (let i = 0; i < length; i++) {
		const from = oldText[i] || ''
		const to = newText[i] || ''
		const start = Math.floor(Math.random() * 40)
		const end = start + Math.floor(Math.random() * 40)
		this.queue.push({ from, to, start, end })
	  }
	  cancelAnimationFrame(this.frameRequest)
	  this.frame = 0
	  this.update()
	  return promise
	}
	update() {
	  let output = ''
	  let complete = 0
	  for (let i = 0, n = this.queue.length; i < n; i++) {
		let { from, to, start, end, char } = this.queue[i]
		if (this.frame >= end) {
		  complete++
		  output += to
		} else if (this.frame >= start) {
		  if (!char || Math.random() < 0.28) {
			char = this.randomChar()
			this.queue[i].char = char
		  }
		  output += `<span class="dud">${char}</span>`
		} else {
		  output += from
		}
	  }
	  this.el.innerHTML = output
	  if (complete === this.queue.length) {
		this.resolve()
	  } else {
		this.frameRequest = requestAnimationFrame(this.update)
		this.frame++
	  }
	}
	randomChar() {
	  return this.chars[Math.floor(Math.random() * this.chars.length)]
	}
}


function checkPosTouch(e){
	var _touchX = Math.round(e.touches[0].clientX);

	$.each(_arryPos, function(i){
		if(_touchX > _arryPos[i] && _touchX < (_arryPos[i] + _widthElm) ){
			mouseEnter($peopleScramble.find('.item').eq(i));
		}
	});

}

function onScroll(){

	var scrollTop 		= $(window).scrollTop();

	if (scrollTop > 200) {
		$scrollDown.addClass('hide');
	} else{
		$scrollDown.removeClass('hide');
	}

}

// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }