// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove from  "../components/mouse-move";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $workList       = $('.works-list');
var $filter         = $('.works-filter');




// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    if($(window).width() >= 860){
        MouseMove.init($workList.find('.item').find('.wrapper'));
    }

    $filter.find('.item').on('click', function(e){
        e.preventDefault();
        $('.load-more-works').remove();
        $filter.find('.item').removeClass('active');
        $filter.find('li').removeClass('active');
        $workList.addClass('loading');
        $workList.html('<div class="ajax-loader"><svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"><path fill="#000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></path></svg></div>');
        $workList.find('.message').remove();
        $(this).addClass('active');
        $(this).closest('.works-filter-menu > li').addClass('active');
        var type = $(this).data('id');
        var limit = $(this).data('limit');
        $.ajax({
            url: object_kcg.siteurl,
            type: 'POST',
            data: {
                action: 'kcg_load_works_types',
                nonce: object_kcg.nonce,
                'type': type,
                'posts_per_page': limit,
            },
        }).done(function(response) {
            if(response['html'] == ''){
                $workList.html('<div class="message">Sorry, we don\'t have any items yet.</div>');
            } else {
                $workList.html(response['html']);
            }
            $workList.find('.ajax-loader').remove();
            $workList.removeClass('loading');
            setTimeout(function(){
                window.dispatchEvent(new Event('resize'));
                if($(window).width() >= 860){
                    MouseMove.init($workList.find('.item').find('.wrapper'));
                }
            }, 1000);
            if($('.load-more-works').length == 0) {
                $('.works-content').append(response['load-more']);
            }
        }).fail(function(response) {
            console.log(response);
        });
    });

    $(document).on('click', '.load-more-works', function(e){
        e.preventDefault();
        var page = $(this).data('page');
        var limit = $(this).data('limit');
        var currentType = $(this).data('current-type');
        var maxPages = $(this).data('max-pages');
        $.ajax({
            url: object_kcg.siteurl,
            type: 'POST',
            data: {
                action: 'kcg_load_more_works',
                nonce: object_kcg.nonce,
                'posts_per_page': limit,
                'work-type' : currentType,
                'page': page,
            },
            beforeSend: function(xhr) {
                $('.load-more-works .label').text('Loading...'); // change the button text, you can also add a preloader image
            }
        }).done(function(response) {
            $workList.append(response['html']);
            setTimeout(function(){
                window.dispatchEvent(new Event('resize'));
                if($(window).width() >= 860){
                    MouseMove.init($workList.find('.item').find('.wrapper'));
                }
            }, 1000);
            page = parseInt(page) + 1;
            $('.load-more-works .label').text('LOAD MORE');
            $('.load-more-works').data('page', page);
            if (page == maxPages){
                $('.load-more-works').remove(); // if last page, remove the button
            }
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