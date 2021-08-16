// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove from  "../components/mouse-move";
import gsap, {TweenMax, TimelineMax} from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $abtWorld       = $('.about-world');
var $people         = $abtWorld.find('.item');
var $highlights     = $('.highlights');

let h               = window.innerHeight
let $footer         = $('footer.footer')

// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    addPopPeople();

    if($(window).width() >= 860){
        MouseMove.init($highlights.find('img'));
    }

    $('.clients').find('.logos').eq(0).addClass('add-motion-1');
    $('.clients').find('.logos').eq(1).addClass('add-motion-1');
    $('.clients').find('.logos').eq(2).addClass('add-motion-2');
    $('.clients').find('.logos').eq(3).addClass('add-motion-2');

}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\

function addPopPeople(){

    $people.each(function(e,i){
        var _this = this;
        var _place = $(this).attr('data-place');

        setTimeout(function(){
            scramblePos(_this, _place);
        }, e*300);
        
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scramblePos(_this, _place){
    var _posY = 0//getRandomInt(1, _inneHeight);
    var _posX = 0//getRandomInt(1, _inneWidth);

    var _random = getRandomInt(1, 3);
    var _class = null;

    var _arrayNorth = ['1','2', '3'];
    const shuffled  = _arrayNorth.sort(() => 0.5 - Math.random());
    let selected    = shuffled.slice(0, 1);


    switch(_place){
        case 'north-america':
            _class = 'north-america-'+_random;
        break;
        case 'south-america':
            _class = 'south-america-'+_random;
        break;
        case 'europe':
            _class = 'europe-'+_random;
        break;
        case 'asia':
            _class = 'asia-'+_random;
        break;
        case 'africa':
            _class = 'africa-'+_random;
        break;
        case 'oceania':
            _class = 'oceania-'+_random;
        break;
    }
    $(_this).addClass(_class);

    // console.log(_random);

    motionIn(_this, _class);
}

function motionIn(_this, _class){

    var $item   = $(_this);
    var $figure = $(_this).find('img');


    new TimelineMax({onComplete:function(){
        TweenMax.killTweensOf($figure);
        // setTimeout(function(){
            // $item.removeClass(_class);
            // scramblePos($item);
        // }, 1000);
    }})
    .add([TweenMax.to($figure, 5, {scale: 1, ease: 'Elastic.easeOut'})])
    // .add([TweenMax.to($figure, .5, {scale: 0, ease: 'Power3.easeOut'})],20)
      
}





// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }