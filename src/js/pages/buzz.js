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


    if($(window).width() > 550){
        msnry = new Masonry( elem, {
            itemSelector: '.item',
        });
    }

    console.log('ajax URL '+ object_kcg.siteurl);

    $filter.find('.item').on('click', function(e){
        e.preventDefault();

        $filter.find('.item').removeClass('active');
        $(this).addClass('active');

        var catID = $(this).data('id');
        var limit = $(this).data('limit');

        $.ajax({
            url: _dataAjax,
            type: 'POST',
            data: {
                action: 'kcg_filter_buzz_by_category',
                nonce: object_kcg.nonce,
                'cat-id': catID,
            },

        }).done(function(response) {

            var _html = $(response).find('.press-list');
            
            $('.press-list').fadeOut();

            setTimeout(function(){
                $('.press-list').remove();
                $('.press-content').find('.col-11').append(_html);
                $('.press-list').css('display','none').fadeIn();
            },500);

            console.log('ajax response '+ response['html']);

        }).fail(function(response) {
            console.log(response);
        });
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
