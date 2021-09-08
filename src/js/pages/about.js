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

let _countNA        = 0;
let _countSA        = 0;
let _countEU        = 0;
let _countAF        = 0;
let _countAS        = 0;
let _countOC        = 0;

let _nhtAmerica     = ['1','2','3','4','5'];
let _sthAmerica     = ['1','2','3','4'];
let _europe         = ['1','2','3','4'];
let _africa         = ['1','2','3'];
let _asia           = ['1','2','3'];
let _oceania        = ['1','2','3'];

let _shuNhtA        = _nhtAmerica.sort(() => 0.5 - Math.random());
let _shuShtA        = _sthAmerica.sort(() => 0.5 - Math.random());
let _shuEu          = _europe.sort(() => 0.5 - Math.random());
let _shuAf          = _africa.sort(() => 0.5 - Math.random());
let _shuAs          = _asia.sort(() => 0.5 - Math.random());
let _shuOc          = _oceania.sort(() => 0.5 - Math.random());

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


function scramblePos(_this, _place){
    var _class = null;

    switch(_place){
        case 'north-america':
            _class = 'north-america-'+_shuNhtA[_countNA];
            _countNA ++;
        break;
        case 'south-america':
            _class = 'south-america-'+_shuShtA[_countSA];
            _countSA ++;
        break;
        case 'europe':
            _class = 'europe-'+_shuEu[_countEU];
            _countEU ++;
        break;
        case 'asia':
            _class = 'asia-'+_shuAs[_countAS];
            _countAS ++;
        break;
        case 'africa':
            _class = 'africa-'+_shuAf[_countAF];
            _countAF ++;
        break;
        case 'oceania':
            _class = 'oceania-'+_shuOc[_countOC];
            _countOC ++;
        break;
    }
    $(_this).addClass(_class);
    motionIn(_this, _class);
}

function motionIn(_this, _class){

    var $item   = $(_this);
    var $figure = $(_this).find('img');


    new TimelineMax({onComplete:function(){
        TweenMax.killTweensOf($figure);
    }})
    .add([TweenMax.to($figure, 5, {scale: 1, ease: 'Elastic.easeOut'})])

      
}





// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }