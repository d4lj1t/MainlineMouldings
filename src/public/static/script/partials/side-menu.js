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
        console.log('hello hi hi');


        var clientHeight = $(window).height();
        $('.js-side-menu').css('height', clientHeight);


        $('.js-menu-icon').click(function () {
                var animationSpeed = 300,
                    container = $('.js-side-menu');

                $('.js-side-menu').addClass('clicked').show().stop().animate({width: '300px'}, animationSpeed);


                $(document).mouseup(function (e) {

                    if (!container.is(e.target) // if the target of the click isn't the container...
                        && container.has(e.target).length === 0) // ... nor a descendant of the container
                    {
                        /*container.animate({width: '0'});*/
                        if ($('.js-side-menu').hasClass('clicked')) {

                            $('.js-side-menu').stop().animate({
                                width: '0'
                            }, animationSpeed, function () {
                                $(this).removeClass('clicked').hide();

                            });
                        }
                    }


                });


            }
        )
        ;


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
