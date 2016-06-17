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

        var menuHeading = $('.js-menu-heading'),
            menuHeadingContent = $('.js-menu-heading-content'),
            trigger = 'trigger';

        function navEvents () {
            menuHeading.on('mouseover', function () {
                $(this).addClass(trigger).find(menuHeadingContent).stop().slideDown( function(){
                    $(this).height('');
                });
            });

            menuHeading.on('mouseleave', function () {
                if ($(this).hasClass(trigger)) {
                    $(this).removeClass(trigger).find(menuHeadingContent).hide();
                }
            });
        }

        navEvents();


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
