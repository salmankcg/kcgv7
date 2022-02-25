// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove from  "../components/mouse-move";
import gsap, {TweenMax, TimelineLite, Elastic, Power3} from "gsap";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

var $name 			= document.querySelector('.name');
var $area 			= document.querySelector('.area');
var _name 			= null;
var _area 			= null;
var _fxName 		= null;
var _fxArea 		= null;
var $scrollDown		= $('.scrolldown');
var $peopleList     = $('.people');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){
    
    MouseMove.init($peopleList.find('.item').find('.i-wrapper'));

	kcgScramble();

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
function resize() {
	kcgScramble();
}

function kcgScramble(){

    // ------------------------//
    // ------------------------//
    // ------------------------//
    // ---------text---------------//
    function hasTextScramble(){
        if($('.name').length >0  && $('.area').length > 0){
            return true;
        }
        return false;
    }

    if(hasTextScramble()){
        _fxName 	= new TextScramble($name);
        _fxArea 	= new TextScramble($area);
    }

    // ----------------------------------------- \\\
    // ----------------- VARS ------------------ \\\
    // ----------------------------------------- \\\
    var $peopleScramble	= $('.people-scramble');
    var $itemScramble 	= $peopleScramble.find('.item');

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

    var _arryPos	= [];
    var _posElm 	= 0;
    var _widthElm 	= $peopleScramble.find('.item').width();

    if($peopleScramble.length){
        if(is_touch_enabled()){
            $itemScramble.bind( "tap", tapHandler );
            function tapHandler( event ){
                event.preventDefault()
                return false;
            }
            $peopleScramble.on('touchmove',checkPosTouchScramble);
            $peopleScramble.on('touchend',onTouchEndScramble);
            $itemScramble.on('touchstart',function(){
                var _this = this;
                onMouseEnterScramble(_this);
                $itemScramble.closest('.people-scramble').addClass('mouse-enter');
            });
            
            $itemScramble.on('touchend', function(){
                var _this = this;
                onMouseLeaveScramble(_this);
                $itemScramble.closest('.people-scramble').removeClass('mouse-enter');
            });

            $itemScramble.each(function(i,e){
                _posElm = Math.round($(e).width() * ( i ));
                var _padding = 30;
                _arryPos.push( (_posElm +_padding)  )
            });
        } else{
            $itemScramble.on('mouseenter', function(){
                var _this = this;
                onMouseEnterScramble(_this);
                $itemScramble.closest('.people-scramble').addClass('mouse-enter');
            });
            $itemScramble.on('mouseleave',function(){
                var _this = this;
                onMouseLeaveScramble(_this);
                $itemScramble.closest('.people-scramble').removeClass('mouse-enter');

                // text
                if(hasTextScramble()){
                    _fxName.setText('the people');
                    _fxArea.setText('make the <b>magic</b> happen');
                }
            });
        }

        var _icoCursor = new TimelineLite({delay:0.5, onComplete:function(){
            setTimeout(function(){
                _icoCursor.restart();
            }, 4000);
        }})

        _icoCursor.fromTo($peopleScramble.find('.pc-pointer'), 2, {opacity: 0 }, {opacity: 1, ease: Power3.easeInOut}, 0)
        _icoCursor.to($peopleScramble.find('.ico'), 1, {x: 10, ease: Power3.easeInOut}, 2)
        _icoCursor.to($peopleScramble.find('.ico'), 1, {x: -10, ease: Power3.easeInOut}, 3)
        _icoCursor.to($peopleScramble.find('.ico'), 1, {x: 10, ease: Power3.easeInOut}, 4)
        _icoCursor.to($peopleScramble.find('.ico'), 1, {x: -10, ease: Power3.easeInOut}, 5)
        _icoCursor.to($peopleScramble.find('.ico'), 1, {x: 10, ease: Power3.easeInOut}, 6)
        _icoCursor.to($peopleScramble.find('.ico'), 1, {x: -10, ease: Power3.easeInOut}, 7)
        _icoCursor.fromTo($peopleScramble.find('.pc-pointer'), 2, {opacity: 1 }, {opacity: 0, ease: Power3.easeInOut}, 8)
    }

    function onMouseEnterScramble(_this){
        var _target = $(_this).data('target');
        console.log('hasTextScramble()',hasTextScramble());

        // text
        if(hasTextScramble()){
            _name 	= $(_this).data('name');
            _area 	= $(_this).data('area');

            _fxName.setText(_name);
            _fxArea.setText(_area);
        }

        // text
        $itemScramble.each(function(i,e){
            var $figure = $peopleScramble.find('.wrapper').find('figure').eq(i);
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
        var _touchX =  Math.round(e.touches[0].clientX) - $peopleScramble.offset().left;

        $.each(_arryPos, function(i){
            if(_touchX > _arryPos[i] && _touchX < (_arryPos[i] + _widthElm) ){
                onMouseEnterScramble($peopleScramble.find('.item').eq(i));
            }
        });

    }
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

function onScroll(){
    var scrollTop       = $(window).scrollTop();
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