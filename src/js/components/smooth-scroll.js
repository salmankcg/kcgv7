// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap, {}           from "gsap";
gsap.config({ nullTargetWarn: false, force3D: false });


// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
let $pages            = null;
let $footer           = null;
let _dataPage         = null;
let _h                = null;
let _sizeDocument     = null;
let $stickyHome       = null;
let $makeEditable = true;
const mobileAndTabletCheck = function() {
    if(window.innerWidth < 768 ){
        //Device With is more than 768 is Mobile
        return true;
    }
    else if(window.innerWidth < 991 & window.innerHeight < 550){
        return true;
    }
    return false;
};

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\
function init(){

    setTimeout(function(){

  if(/wp-admin/.test(parent.window.location.href)){
    $makeEditable = false;
    $pages            = $('#elementor-preview-iframe', window.parent.document).contents().find('.pages');
    $footer           = $('#elementor-preview-iframe', window.parent.document).contents().find('footer.footer');
    _dataPage         = $('#elementor-preview-iframe', window.parent.document).contents().find('main').data('page');
    _h                = window.innerHeight;
    _sizeDocument     = $('#elementor-preview-iframe', window.parent.document).contents().find('[data-scroll-content]').height();

    var iframe        = parent.document.getElementById("elementor-preview-iframe");
    $stickyHome       = iframe.contentWindow.document.querySelectorAll('.home-content');

  }else{

    $pages            = $('.pages');
    $footer           = $('footer.footer');
    _dataPage         = $('main').data('page');
    _h                = window.innerHeight;
    _sizeDocument     = $('[data-scroll-content]').height();
    console.log('_sizeDocument2',_sizeDocument)
    $stickyHome       = document.querySelectorAll('.home-content');

  }

  if(!mobileAndTabletCheck()){
    smoothScroll();
  }else{
    $footer.addClass('motion-in-3').addClass('motion-in-2').addClass('motion-in-1');
    iframe.contentWindow.document.body.style.height = `${_sizeDocument}px`;
  }
}, 5000 );
  
  
}

function resize() {
  _h = window.innerHeight;
}


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\

function pinned(scrolled){

    //______________ FOOTER PARALLAX
    if(/wp-admin/.test(parent.window.location.href)){
      _sizeDocument =  $('#elementor-preview-iframe', window.parent.document).contents().find('[data-scroll-content]').height();
    } else {
      _sizeDocument =  $('[data-scroll-content]').height();
    }
    

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
    }

}

function smoothScroll() {
    
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
        
        if(/wp-admin/.test(parent.window.location.href)){
          var iframe        = parent.document.getElementById("elementor-preview-iframe");

          this.dom = {
            el:       iframe.contentWindow.document.querySelector('[data-scroll]'),
            content:  iframe.contentWindow.document.querySelector('[data-scroll-content]')
          }

        } else {
          this.dom = {
            el:       document.querySelector('[data-scroll]'),
            content:  document.querySelector('[data-scroll-content]')
          }
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
        if(/wp-admin/.test(parent.window.location.href)){
          var iframe        = parent.document.getElementById("elementor-preview-iframe");
          iframe.contentWindow.document.body.style.height = `${this.dom.content.offsetHeight}px`;

        } else {
          document.body.style.height = `${this.dom.content.offsetHeight}px`;
        }
        
      }
    
  
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

    const smooth = new Smooth();
}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }
