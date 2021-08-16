import * as ScrollMagic from  'scrollmagic';
import gsap, { TweenMax, TimelineMax, Power3 } from 'gsap';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
gsap.registerPlugin(ScrollToPlugin);
