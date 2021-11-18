// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap, {Power2, Elastic} from "gsap";
gsap.config({ nullTargetWarn: false, force3D: true });



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $button       = $('.button');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
if($button.length){
    // $button.on('mouseenter', mouseEnter);
    // $button.on('mouseleave', mouseLeave);

    $button.each(function(){
        mouseMagnetic(this);
    });
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function mouseMagnetic(item) {

    var $item = $(item);

    $item.each(function() {

      var $self = $(this).find('.wrapper');
      var hover = false;
      var offsetHoverMax = $self.attr("offset-hover-max") || 0.7;
      var offsetHoverMin = $self.attr("offset-hover-min") || 0.5;
  
      var attachEventsListener = function() {
        $(window).on("mousemove", function(e) {
          //
          var hoverArea = hover ? offsetHoverMax : offsetHoverMin;
  
          // cursor
          var cursor = {
            x: e.clientX,
            y: e.clientY
          };
  
          // size
          var width   = $self.outerWidth();
          var height  = $self.outerHeight();
  
          // position
          var offset = $self.offset();
          var elPos = {
            x: offset.left + width / 2,
            y: (offset.top- $(window).scrollTop())  + height / 2
          };
        

          // comparaison
          var x = cursor.x - elPos.x;
          var y = cursor.y - elPos.y;
  
          // dist
          var dist = Math.sqrt(x * x + y * y);
  
          // mutex hover
          var mutHover = false;
  
          // anim
          if (dist < width * hoverArea) {
            mutHover = true;
            if (!hover) {
              hover = true;
            }
            onHover(x, y);
          }
  
          // reset
          if (!mutHover && hover) {
            onLeave();
            hover = false;
          }
        });
      };
  
      function onHover(x, y) {
        gsap.to($self,1.5, { x: x * 0.2, y: y * 0.2, rotation: x * 0.05, ease: Power2.easeOut },0);
      };
      function onLeave() {
        gsap.to($self, 1.5, { x: 0, y: 0, rotation: 0, ease: Elastic.easeOut },0);
      };
  
      attachEventsListener();
      
    });
};
  
