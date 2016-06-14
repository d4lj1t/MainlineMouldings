/*
 Log in form
 ----------------------------------- */

module.exports = function LogIn() {
    'use strict';

    var self = this;

    // Dependencies
    var $ = require('jquery');


    /*
     External methods
     ----------------------------------- */

    self.init = function () {

        /*    var animationSpeed = 200,
         container = $('.js-side-menu');

         $(window).resize(function() {
         var clientHeight = $(window).height();
         container.css('height', clientHeight);
         });*/

    /*    $('.js-menu-heading').mouseover(function () {
                /!*$(this).addClass('trigger').find('.js-menu-heading-content').stop().slideDown();*!/
                $(this).addClass('trigger').find('.js-menu-content-wrapper').show().find('.js-menu-heading-content').stop().slideDown();
            }
        );

        $('.js-menu-heading').mouseleave(function () {
                /!*  $(this).find('.js-menu-heading-content').stop().slideUp(function(){
                 $(this).hide().closest('.js-menu-heading').removeClass('trigger');
                 });*!/

                $(this).find('.js-menu-heading-content').stop().slideUp().find('.js-menu-content-wrapper').hide().closest('.js-menu-heading').removeClass('trigger');

                /!*$(this).hide().closest('.js-menu-heading').removeClass('trigger');*!/
                /!*});*!/


            }
        );*/

        /*    $('.js-menu-heading').mouseout(function(){
         console.log('hello');

         $(this).find.('.js-menu-heading-content').stop().slideUp();
         });*/


        $('.js-menu-heading').mouseover(function () {
            $(this).addClass('trigger').find('.js-menu-heading-content').stop().slideDown();
            }
        );

        $('.js-menu-heading').mouseleave(function () {
                $(this).removeClass('trigger').find('.js-menu-heading-content').hide();

               /* $(this).find('.js-menu-heading-content').stop().slideUp(function(){
                    $(this).closest('.js-menu-heading').removeClass('trigger');
                });*/
            }
        );




    };


    /*
     Internal
     ----------------------------------- */

// Log in methods


    self.init();


// Return instance
    return self;
}
;
