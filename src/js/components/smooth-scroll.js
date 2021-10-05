// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap, {TweenMax, TimelineMax} from "gsap";


// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
let $pages          = $('.pages');
let $footer         = $('footer.footer');
let _dataPage       = $('main').data('page');
let _h              = window.innerHeight;
let _sizeDocument   = $('[data-scroll-content]').height();

let $stickyHome      = document.querySelectorAll('.home-content');

window.mobileAndTabletCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\
if($pages.length){

    setTimeout(function(){
      if(!mobileAndTabletCheck()){
        smoothScroll();
      }else{
        $footer.addClass('motion-in-3').addClass('motion-in-2').addClass('motion-in-1');
      }
    },1000);

    window.addEventListener('resize', function(){
      _h = window.innerHeight;
    }, { passive: true })

}

function pinned(scrolled){

    //______________ FOOTER PARALLAX
    _sizeDocument =  $('[data-scroll-content]').height();

    if(scrolled > _sizeDocument - (_h * 2)) {
      let percentageFromTop =  ((_sizeDocument - _h) - scrolled) / _h
      
      gsap.set($footer, { y: - (_h * percentageFromTop)})
      gsap.set($footer, { yPercent:  (percentageFromTop)})

      let _percentClass = Math.round(percentageFromTop * 100);

      if(!$footer.hasClass('motion-in-3')){
        if(_percentClass >= 70){
          $footer.addClass('motion-in-3').addClass('motion-in-2').addClass('motion-in-1');
        }
      }

    }else{
      if($footer.hasClass('motion-in-3')){
        $footer.removeClass('motion-in-1').removeClass('motion-in-2').removeClass('motion-in-3')
      }
    }

    if(_dataPage == 'home'){

      $stickyHome.forEach(function(item, index){
        let itemPosition  = item.getBoundingClientRect().top
        let itemBottom    = item.getBoundingClientRect().bottom
        let fakeOffset    = ((scrolled * -1) - (itemPosition - window.innerHeight)) * - 1

        if(itemPosition <  (window.innerHeight * 1.1) && itemBottom > 0) {
            let percentageDuration = (scrolled - fakeOffset) / ((fakeOffset + (window.innerHeight * 1.5)) - fakeOffset)
            gsap.set($('.home-bullets'), { yPercent:  (150 * percentageDuration)});
            gsap.set($('.home-infos'), { yPercent:  (150 * percentageDuration)});
            gsap.set($('.home-globe'), { yPercent:  (150 * percentageDuration)});
            gsap.set($('.home-bckg'), { yPercent:  (150 * percentageDuration)});
        }
      });

      // console.log(scrolled);
    }

}

function smoothScroll() {
    if($(window).width() > 80) {
    
      const math = {
        lerp: (a, b, n) => {
            return (1 - n) * a + n * b
        },
        norm: (value, min, max) => {
              return (value - min) / (max - min)
        }
      }
      
      const config = {
        height: window.innerHeight,
        width: window.innerWidth
      }
      
      class Smooth {
        constructor() {
          this.bindMethods()
      
          this.data = {
            ease: 0.085,
            current: 0,
            last: 0
          }
      
          this.dom = {
            el: document.querySelector('[data-scroll]'),
            content: document.querySelector('[data-scroll-content]')
          }
      
          this.rAF = null
      
          this.init()
        }
      
        bindMethods() {
          ['scroll', 'run', 'resize']
          .forEach((fn) => this[fn] = this[fn].bind(this))
        }
      
        setStyles() {
          this.dom.el.style.position = 'fixed';
          this.dom.el.style.top = 0;
          this.dom.el.style.left = 0;
          this.dom.el.style.height = '100%'
          this.dom.el.style.width = '100%'
          this.dom.el.style.overflow = 'hidden'   
        }
      
        setHeight() {
          document.body.style.height = `${this.dom.content.offsetHeight}px`
          
          console.log(`${this.dom.content.offsetHeight}px`);
        }
      
        // resize() {
        //   this.setHeight()
        //   this.scroll()
        // }
      
    
        scroll() {
          this.data.current = window.scrollY
        }
      
        run() {
          this.data.last = math.lerp(this.data.last, this.data.current, this.data.ease)
          this.data.last = Math.floor(this.data.last * 100) / 100
          
          const diff = this.data.current - this.data.last
          const acc = diff / config.width
          const velo =+ acc
          
            //console.log(velo)
          this.dom.content.style.transform = `translate3d(0, -${this.data.last.toFixed(0)}px, 0) `
          
          //call pinned
          pinned(this.data.last)
          
          this.requestAnimationFrame()
        }
          
      
        on(requestAnimationFrame = true) { 
          this.setStyles()
          this.setHeight()
          this.addEvents()
      
          requestAnimationFrame && this.requestAnimationFrame()
        }
      
        off(cancelAnimationFrame = true) {
          cancelAnimationFrame && this.cancelAnimationFrame()
      
          this.removeEvents()
        }
      
        requestAnimationFrame() {
          this.rAF = requestAnimationFrame(this.run)
        }
      
        cancelAnimationFrame() {
          cancelAnimationFrame(this.rAF)
        }
      
        destroy() {
          document.body.style.height = ''
      
          this.data = null
      
          this.removeEvents()
          this.cancelAnimationFrame()
        }
      
        resize() {
          this.setHeight();
          this.scroll();

        }
      
        addEvents() {
          window.addEventListener('resize', this.resize, { passive: true })
          window.addEventListener('scroll', this.scroll, { passive: true })
        }
      
        removeEvents() {
          window.removeEventListener('resize', this.resize, { passive: true })
          window.removeEventListener('scroll', this.scroll, { passive: true })
        }
      
        init() {
          this.on()
        }
      }
      const smooth = new Smooth()
    }
}