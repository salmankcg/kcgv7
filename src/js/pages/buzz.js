// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import Masonry from "masonry-layout";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $filter         = $('.filter');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    var elem        = document.querySelector('.press-list');
    var _dataAjax   = $filter.data('ajax');
    var msnry       = null;
     var _toggleClick    = false;;

    if($(window).width() > 550){
        msnry = new Masonry( elem, {
            itemSelector: '.item',
        });
    }


    $filter.find('.item').on('click', function(e){
        e.preventDefault();

        if(!_toggleClick){
            $filter.find('.item').removeClass('active');
            $(this).addClass('active');

            var catID = $(this).data('id');
            var limit = $(this).data('limit');

            $('.press-list').addClass('loading');
            $('.press-list').append('<div class="ajax-loader"><svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"><path fill="#000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></path></svg></div>');
            $('.press-list').find('.message').remove();

            // $('.press-list').find('.item').fadeOut(300);
            window.dispatchEvent(new Event('resize'));

            setTimeout(function(){
                msnry.destroy();
                console.log('detroy');
            },1000);

            

            $.ajax({
                url: _dataAjax,
                type: 'POST',
                data: {
                    action: 'kcg_filter_buzz_by_category',
                    nonce: object_kcg.nonce,
                    'cat-id': catID,
                },

            }).done(function(response) {

                var _html = response['html'];
            
                setTimeout(function(){

                    $('.press-list').find('.item').remove();

                    if(_html == ''){
                        $('.press-list').append('<div class="message">Sorry, we don\'t have any item yet.</div>');
                    }else{
                        $('.press-list').append(_html);
                    }

                    if($(window).width() > 550){
                        msnry = new Masonry( elem, {
                            itemSelector: '.item',
                        });
                    }

                    setTimeout(function(){
                        window.dispatchEvent(new Event('resize'));
                        $('.press-list').find('.ajax-loader').remove();
                        $('.press-list').removeClass('loading');
                        
                        _toggleClick = false;
                    }, 1000);

                },1000);

                // console.log('ajax response '+ response);

            }).fail(function(response) {
                console.log(response);
            });

            _toggleClick = true;
        }
    });
    
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\





// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }
