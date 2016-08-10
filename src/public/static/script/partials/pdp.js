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


        function quantityEvents() {

            $('.js-quantity-plus').click(function () {
                var oldValue = $('.js-quantity').val();
                var newVal = parseFloat(oldValue) + 1;
                $('.js-quantity').val(newVal);
            });

            $('.js-quantity-minus').click(function () {
                var oldValue = $('.js-quantity').val();
                var newVal = parseFloat(oldValue) - 1;

                if (oldValue > 1) {
                    $('.js-quantity').val(newVal);
                }
            });


        }

        quantityEvents();


        /* menuHeading.mouseover(function () {
         $(this).addClass(trigger).find(menuHeadingContent).stop().slideDown();
         });*/


        /*  menuHeading.click(function () {
         if($(this).hasClass(trigger)) {
         $(this).removeClass(trigger).find(menuHeadingContent).hide();
         } else {

         }

         });*/
    };


    /*
     Internal
     ----------------------------------- */

    self.init();


// Return instance
    return self;
}
;
