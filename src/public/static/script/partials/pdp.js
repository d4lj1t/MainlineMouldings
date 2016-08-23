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

        function productDetailEvents() {

            $('.js-product-details').click(function(){
                if($(this).hasClass('clicked')){
                    $('.product-detail-content').stop().slideUp();
                    $(this).removeClass('clicked');
                } else{
                    $(this).addClass('clicked');
                    $('.product-detail-content').stop().slideDown();

                }
            });

            $('.js-product-prices').click(function(){
                if($(this).hasClass('clicked')){
                    $('.product-prices-content').stop().slideUp();
                    $(this).removeClass('clicked');
                } else{
                    $(this).addClass('clicked');
                    $('.product-prices-content').stop().slideDown();

                }
            });

            $('.js-product-sample').click(function(){
                if($(this).hasClass('clicked')){
                    $('.product-sample-content').stop().slideUp();
                    $(this).removeClass('clicked');
                } else{
                    $(this).addClass('clicked');
                    $('.product-sample-content').stop().slideDown();

                }
            });

            $('.view-items-right-arrow').click(function() {

                var leftPos = $('.view-other-items').scrollLeft();
                $(".view-other-items").animate({
                    scrollLeft: leftPos + 150
                }, 800);
            });


            $('.view-items-left-arrow').click(function() {

                var leftPos = $('.view-other-items').scrollLeft();
                $(".view-other-items").animate({
                    scrollLeft: leftPos - 150
                }, 800);
            });


        }



        quantityEvents();
        productDetailEvents();


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
