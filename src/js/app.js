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
import * as Person      from './pages/about-person';
import * as Works       from './pages/works';
import * as Work        from './pages/work';
import * as Contact     from './pages/contact';
import * as Services    from './pages/services';
import * as Service     from './pages/service';
import * as Buzz        from './pages/buzz';
import * as Careers     from './pages/careers';

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
        break;
        case 'about-mission':
            Approach.init();
            PageLoad.hide();
        break;
        case 'about-team':
            Team.init();
            PageLoad.hide();
        break;
        case 'about-person':
            Person.init();
            PageLoad.hide();
        break;
        case 'works':
            Works.init();
            PageLoad.hide();
        break;
        case 'work':
            Work.init();
            PageLoad.hide();
        break;
        case 'contact':
            Contact.init();
            PageLoad.hide();
        break;
        case 'services':
            Services.init();
            PageLoad.hide();
        break;
        case 'service':
            Service.init();
            PageLoad.hide();
        break;
        case 'buzz':
            Buzz.init();
            PageLoad.hide();
        break;
        case 'careers':
            Careers.init();
            PageLoad.hide();
        break;
        default:
            PageLoad.hide();
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
            case 'works':
                Works.resize();
            break;
            case 'work':
                Work.resize();
            break;
            case 'careers':
                Careers.resize();
            break;
            default:
                console.log('resize');
        }

    });


    // ----------------------------------------- \\\
    // ----------------- UNSET COOKIE ------------------ \\\
    // ----------------------------------------- \\\
    if(_pages != 'work') {
        PageLoad.unsetCookie();
    }

});
