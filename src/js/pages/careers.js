// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove from  "../components/mouse-move";


// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $jobsList       = $('.jobs-list');
var $filter         = $('.jobs-filter');
var $scrollload     = $('.kcg-job-listing-wrapper');
var scrollTrigger   = true;




// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    if($(window).width() >= 860){
        MouseMove.init($jobsList.find('.item').find('.wrapper'));
    }

    var filterContainer = ($('.jobs-filter-menu').length > 0) ? $('.jobs-filter-menu').outerWidth() : '';
    var filterOuter = ($('.jobs-filter-menu').length > 0) ? $('.jobs-filter-menu > li').last().position().left : '';
    if(filterOuter > filterContainer) {
        $('.work-filter-nav').show();
    }

    $filter.find('.item').on('click', function(e){
        e.preventDefault();
        $('.load-more-works').remove();
        $filter.find('.item').removeClass('active');
        $filter.find('li').removeClass('active');
        if($scrollload.data('infinite-scroll') == 1) {
            $('.onscroll-load-works').remove();
        }
        $('.kcg-case-study-wrapper').html('<div class="jobs-list"></div>');
        $('.kcg-case-study-wrapper').find('.jobs-list').hide();
        $('.kcg-case-study-wrapper').append('<div class="ajax-loader"><svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"><path fill="#000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></path></svg></div>');
        $(this).addClass('active');
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
                'onscroll': $scrollload.data('infinite-scroll'),
            },
        }).done(function(response) {
            $('.kcg-case-study-wrapper').find('.ajax-loader').remove();
            if(response['html'] == ''){
                $('.kcg-case-study-wrapper').find('.jobs-list').append('<div class="message">Sorry, we don\'t have any items yet.</div>');
            } else {
                $('.kcg-case-study-wrapper').find('.jobs-list').append(response['html']);
            }
            setTimeout(function(){
                window.dispatchEvent(new Event('resize'));
                if($(window).width() >= 860){
                    MouseMove.init($('.kcg-case-study-wrapper').find('.jobs-list').find('.item').find('.wrapper'));
                }
            }, 2000);
            $('.kcg-case-study-wrapper').find('.jobs-list').fadeIn(2000);
            if($('.load-more-works').length == 0 && $scrollload.data('infinite-scroll') == 0) {
                $('.works-content').append(response['load-more']);
            }
            if( (response['load-more'] != '') && ($scrollload.data('infinite-scroll') == 1) ) {
                $('.works-content').append(response['load-more']);
                scrollTrigger   = true;
            } else {
                scrollTrigger = false;
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
            $jobsList.append(response['html']);
            setTimeout(function(){
                window.dispatchEvent(new Event('resize'));
                if($(window).width() >= 860){
                    MouseMove.init($('.kcg-case-study-wrapper').find('.jobs-list').find('.item').find('.wrapper'));
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

    // INFINITE SCROLL LOAD
    $(window).on('scroll', function(){
        if($scrollload.data('infinite-scroll') == 1 && $('.onscroll-load-works').length > 0) {
            var page = $('.onscroll-load-works').data('page');
            var limit = $('.onscroll-load-works').data('limit');
            var currentType = $('.onscroll-load-works').data('current-type');
            var maxPages = $('.onscroll-load-works').data('max-pages');
            var scrollPoint = $('.onscroll-load-works').offset().top - 80;
            if ($(window).scrollTop() >= scrollPoint - $(window).height()) {
                if(page < maxPages && (scrollTrigger == true)) {
                    scrollTrigger = false;
                    $('.kcg-case-study-wrapper').append('<div class="jobs-list"></div>');
                    $('.jobs-list').last().append('<div class="ajax-loader"><svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"><path fill="#000" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></path></svg></div>');
                    $.ajax({
                        url: object_kcg.siteurl,
                        type: 'POST',
                        data: {
                            action: 'kcg_load_works_onscroll',
                            nonce: object_kcg.nonce,
                            'posts_per_page': limit,
                            'work-type' : currentType,
                            'page': page,
                        },
                    }).done(function(response) {
                        $('.kcg-case-study-wrapper .jobs-list').last().append(response['html']);
                        $('.kcg-case-study-wrapper .jobs-list').last().find('.ajax-loader').fadeOut(2000);
                        page = parseInt(page) + 1;
                        $('.onscroll-load-works').data('page', page);
                        if (page == maxPages){
                            scrollTrigger = false;
                            $('.onscroll-load-works').remove(); // if last page, remove the button
                        } else {
                            scrollTrigger = true;
                        }
                        setTimeout(function(){
                            $('.kcg-case-study-wrapper').find('.ajax-loader').remove();
                            window.dispatchEvent(new Event('resize'));
                            if($(window).width() >= 860){
                                MouseMove.init($('.kcg-case-study-wrapper').find('.jobs-list').find('.item').find('.wrapper'));
                            }
                        }, 2000);
                    }).fail(function(response) {
                        console.log(response);
                    });
                } else {
                    setTimeout(function(){
                        window.dispatchEvent(new Event('resize'));
                        if($(window).width() >= 860){
                            MouseMove.init($('.kcg-case-study-wrapper').find('.jobs-list').find('.item').find('.wrapper'));
                        }
                    }, 2000);
                }
            } else {
                setTimeout(function(){
                    window.dispatchEvent(new Event('resize'));
                    if($(window).width() >= 860){
                        MouseMove.init($('.kcg-case-study-wrapper').find('.jobs-list').find('.item').find('.wrapper'));
                    }
                }, 2000);
            }
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