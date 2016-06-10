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

        $('.js-menu-icon').click(function () {
            $('.js-side-menu').addClass('clicked').animate({width: '300px'});


            $(document).mouseup(function (e) {
                var container = $('.js-side-menu');
                console.log('ghellhh');

                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    /*container.animate({width: '0'});*/
                    if ($('.js-side-menu').hasClass('clicked')) {
                        $('.js-side-menu').animate({width: '0'});
                        $('.js-side-menu').removeClass('clicked');
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
