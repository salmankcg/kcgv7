// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from 'jquery';

import * as PageLoad from './modules/page-load';
import './modules/scrollmagic'
import './modules/svg';

import * as Home        from './pages/home';
import * as About       from './pages/about';
import * as Approach    from './pages/about-approach';
import * as Team        from './pages/about-team';
import * as Works       from './pages/works';
import * as Work        from './pages/work';
import * as Contact     from './pages/contact';
import * as Services    from './pages/services';
import * as Service     from './pages/service';
import * as Buzz       from './pages/buzz';

import  './components/button';
import  './components/footer';
import  './components/header';
import  './components/sub-menu';
import  "./components/testimonial";
// import  "./components/services-items";
import  "./components/about-scramble";
import  "./components/smooth-scroll";
import  "./components/gallery";
import  "./components/video";
import  "./components/modal";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
const _pages = $('main').data('page');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\


$(function() {
    'use strict';

    // console.log('INIT');
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    switch(_pages){
        case 'home':
            PageLoad.init();
            Home.init();
        break;
        case 'about':
            About.init();
            PageLoad.hide();
            // PageLoad.init();
        break;
        case 'about-mission':
            Approach.init();
            PageLoad.hide();
            // PageLoad.init();
        break;
        case 'about-team':
            Team.init();
            PageLoad.hide();
            // PageLoad.init();
        break;
        case 'works':
            Works.init();
            PageLoad.hide();
            // PageLoad.init();
        break;
        case 'work':
            Work.init();
            PageLoad.hide();
            // PageLoad.init();
        break;
        case 'contact':
            Contact.init();
            PageLoad.hide();
            // PageLoad.init();
        break;
        case 'services':
            Services.init();
            PageLoad.hide();
            // PageLoad.init();
        break;
        case 'service':
            Service.init();
            PageLoad.hide();
            // PageLoad.init();
        break;
        case 'buzz':
            Buzz.init();
            PageLoad.hide();
            // PageLoad.init();
        break;
        default:
            PageLoad.hide();
            // PageLoad.init();
            break;
    }

    $( window ).on('resize', function() {
        switch(_pages){
            case 'home':
                Home.resize();
            break;
            case 'services':
                Services.resize();
            break;
            case 'service':
                Service.resize();
            break;
        }

        // console.log('resize');
    });

});
