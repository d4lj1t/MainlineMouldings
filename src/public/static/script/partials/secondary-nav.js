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


        menuHeading.mouseover(function () {
                $(this).addClass(trigger).find(menuHeadingContent).stop().slideDown();
            }
        );

        menuHeading.mouseleave(function () {
                $(this).removeClass(trigger).find(menuHeadingContent).hide();
            }
        );
    };


    /*
     Internal
     ----------------------------------- */

    self.init();


// Return instance
    return self;
}
;
