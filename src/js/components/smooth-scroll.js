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
let _h              = window.innerHeight;
let _sizeDocument   =  $('[data-scroll-content]').height();

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\
if($pages.length){

    setTimeout(function(){
       smoothScroll();
    },300);

    window.addEventListener('resize', function(){
      _h = window.innerHeight;
    }, { passive: true })

}

function pinned(scrolled){

    //______________ FOOTER PARALLAX
    _sizeDocument =  $('[data-scroll-content]').height();

    if($(window).width() > 500){
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
    }else{
      $footer.addClass('motion-in-3').addClass('motion-in-2').addClass('motion-in-1');
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