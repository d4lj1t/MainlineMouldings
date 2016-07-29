/**
 * Created by MainlineMouldings on 28/07/2016.
 */
// Mainline JS
//=============================================================================
// Required as well as newer js files - don't delete


// Adobe Typekit
// Using asynchronous method
(function() {
    var config = {
        kitId: 'jdr8vmi',
        scriptTimeout: 3000
    };
    var h=document.getElementsByTagName("html")[0];h.className+=" wf-loading";var t=setTimeout(function(){h.className=h.className.replace(/(\s|^)wf-loading(\s|$)/g," ");h.className+=" wf-inactive"},config.scriptTimeout);var tk=document.createElement("script"),d=false;tk.src='//use.typekit.net/'+config.kitId+'.js';tk.type="text/javascript";tk.async="true";tk.onload=tk.onreadystatechange=function(){var a=this.readyState;if(d||a&&a!="complete"&&a!="loaded")return;d=true;clearTimeout(t);try{Typekit.load(config)}catch(b){}};var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(tk,s)
})();



// Cookie handling code
// (by Peter-Paul Koch)
// NB (shopping cart cookies, set by the PHP do not use these functions)


// Create a cookie
function createCookie(name,value,days)
{
    if (days)
    {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}
// Read a cookie
function readCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i=0;i < ca.length;i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
// Erase a cookie
function eraseCookie(name)
{
    createCookie(name,"",-1);
}

// Function which can be used to check whether a function is available
// for example a ui function
function hasEffect(effect) {
    return $.effects && $.effects[effect];
}


// Detect MSIE
function msieversion() {
    var ua = window.navigator.userAgent,
        msie = ua.indexOf("MSIE ");

    // If Internet Explorer, return version number
    // If another browser, return 0
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        return  ua.substring(msie + 5, ua.indexOf(".", msie) );
    } else {
        return false;
    }
}

// Console Log function to avoid windows errors
logThis = function( text ){
    if( (window['console'] !== undefined) ){
        console.log( text );
    }
}



//jQuery section
//=============================================================================

$(document).ready(function()
{

    // Check MSIE
    checkMSIE = msieversion();

    showBetterBrowsingWarning = readCookie('better-browsing-warning');

    //logThis('XXFRRT | ' + showBetterBrowsingWarning + ' | ' + checkMSIE + ' |');

    if( checkMSIE !== false && showBetterBrowsingWarning < 5 )  {
        $('#container').append('<div id="better-browsing-warning"><div id="better-browsing-warning-close">Close</div><h2 class="problems-using-site">Enjoy better browsing!</h2><p>This site is optimised for Google Chrome and Mozilla Firefox browsers.</p><p>It is best viewed on a modern web browser and we suggest you use the latest version of <a href="https://www.google.com/intl/en/chrome/">Google Chrome</a> or <a href="http://www.mozilla.org/en-US/" class="highlightLink">Mozilla Firefox</a>.</p><p>These browsers are both free to download and use.</p><p>Always keep your browser updated for the best user experience and maximum security.</p><button id="better-browsing-cancel" type="button">Cancel</button><button id="better-browsing-no-show" type="button">Don&#39;t show this again</button></div>');
        $('#better-browsing-warning').show();
    }
    $('#better-browsing-warning-close').live('click', function() {
        $('#better-browsing-warning').hide();
        createCookie('better-browsing-warning',3,1);
    });
    $('#better-browsing-cancel').live('click', function() {
        $('#better-browsing-warning').hide();
        createCookie('better-browsing-warning',3,1);
    });
    $('#better-browsing-no-show').live('click', function() {
        $('#better-browsing-warning').hide();
        createCookie('better-browsing-warning',90,1);
    });


    // Product detail page
    if ( $(".producDetail" ).length > 1 ) {
        $(".sampleDealTooltip" ).tooltip({ content: 'The <span class="Orange">Sample Deal</span> offer is only available on products which you have not previously purchased.', position: {my: "right center-80", at: "right center"} });
    }

    // Social Media
    //
    // Facebook
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&status=0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Twitter
    !function(d,s,id){
        var js,fjs=d.getElementsByTagName(s)[0];
        if(!d.getElementById(id)){
            js=d.createElement(s);
            s.id=id;js.src="//platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js,fjs);
        }
    }(document,"script","twitter-wjs");

    // Function to get URL parameters
    $.urlParam = function(name){
        var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
        if (results === undefined || results == null)
            return false;
        else
            return results[1];
    }

    // FAQ announcement dialog
    // Check we're on the FAQ page before initializing the dialog
    // to prevent errors on pages which don't have jQuery UI active
    if($('#faqAnnouncement').length>0) {
        $('#faqAnnouncement').dialog({
            autoOpen: true,
            modal: false,
            resizable: false,
            width: 400,
            buttons: {
                "Don't show this again": function() {
                    $(this).dialog("close");
                    $.post("/customer_ajax.php?hideFAQsAnnouncement");
                },
                "OK": function() {
                    $(this).dialog("close");
                }
            }
        });
    }

    // Home page

    // Support text area
    var support = 'closed';
    //** Draggable is temporarily disabled here becasue some pages, notably SpeedShop
    // do not load the jQuery ui. This needs updating. SpeedShop will stop working
    // if this is enabled.
    //$('#Support').draggable();
    //**
    $('#Support').css({'width': '10px', 'text-indent': '-1000px'});
    $('#Support').click( function() {
        if(support == 'closed') {
            support = 'open';
            $(this).css({'width': '400px'});
            $('#supportContent').show();
        }
    });
    $('#close').live('click', function() {
        support = 'closed';
        $('#supportContent').hide();
        $('#Support').css({'width': '10px', 'top': '80px', 'left': '0'});

    });
    if($('#infoText').length > 0) {
        $('#infoText').append('<br />jQuery version: ' + $().jquery);
    } else {
        $('#Support').append('<p>jQuery version: ' + $().jquery + '</p>');
    }
    $('#clearLog').live('click', function() {
        $('#logText').text('');
        $('#Support').css({'width': '400px', 'text-indent': '0'});
    });
    function supportLog(text) {
        if( $('#Support').length > 0 ) {
            $('#logText').append('<br />' + text)
        }
    }


    // News Carousel slideshow using jQuery Cycle
    //
    // Initialize the slideshow
    if ( $('#displayPanel').length > 0 ) {
        $('#displayText0').show();
        var stopAfter = 2; // Set this to number of times the slideshow should repeat. (Set to 0 to continually repeat)
        var cycleCount = 0;
        $('#slideshow').cycle({
            fx: 'fade',
            speed: 1000,
            timeout: 5000,
            delay: 1000, // holds first slide for longer (ms)
            pager: '#slideshowNav',
            pagerEvent: 'mouseover',
            pauseOnPagerHover: true,
            // callback fn that creates the slideshow nav blocks
            pagerAnchorBuilder: function(idx, slide) {
                return '<div class="slideshowNavItem">&nbsp;</div>';
            },
            after: function(currSlideElement, nextSlideElement, options, forwardFlag) {
                if ( options.currSlide == 0 ) {
                    cycleCount ++
                }
                if (stopAfter != 0 && cycleCount > stopAfter) {
                    $('#slideshow').cycle('pause'); // Don't use 'stop' which would pevent the nav rollovers working after count is reached.
                    playPauseToggle = 'play';
                }
            }
        });
        // Play or Pause the slide  show
        var playPauseToggle = 'pause';
        $('#playPause').click( function() {
            if (playPauseToggle == 'pause') {
                playPauseToggle = 'play';
                $(this).css('background-position', '-40px 0px')
                $('#slideshow').cycle('pause');
            } else {
                playPauseToggle = 'pause';
                $(this).css('background-position', '-40px -40px')
                $('#slideshow').cycle('next');
                $('#slideshow').cycle('resume');
            }
        });
        $('#playPause').mouseover( function() {
            if (playPauseToggle == 'play') {
                pos = '-40px -40px';
            } else {
                pos = '-40px 0px';
            }
            $(this).css('background-position', pos);
        });
        $('#playPause').mouseout( function() {
            if (playPauseToggle == 'play') {
                pos = '0 -40px';
            } else {
                pos = '0px 0px';
            }
            $(this).css('background-position', pos )
        });


    };

    // Spotlight page Carousel slideshow using jQuery Cycle
    //
    // Initialize the slideshow
    if ( $('#spotlight-panel').length > 0 ) {
        $('#displayText0').show();
        var stopAfter = 2; // Set this to number of times the slideshow should repeat. (Set to 0 to continually repeat)
        var cycleCount = 0;
        $('#slideshow').cycle({
            fx: 'fade',
            speed: 1000,
            timeout: 5000,
            delay: 1000, // holds first slide for longer (ms)
            pager: '#slideshowNav',
            pagerEvent: 'mouseover',
            pauseOnPagerHover: true,
            // callback fn that creates the slideshow nav blocks
            pagerAnchorBuilder: function(idx, slide) {
                return '<div class="slideshowNavItem">&nbsp;</div>';
            },
            after: function(currSlideElement, nextSlideElement, options, forwardFlag) {
                if ( options.currSlide == 0 ) {
                    cycleCount ++
                }
                if (stopAfter != 0 && cycleCount > stopAfter) {
                    $('#slideshow').cycle('pause'); // Don't use 'stop' which would pevent the nav rollovers working after count is reached.
                    playPauseToggle = 'play';
                }
            }
        });
        // Play or Pause the slide  show
        var playPauseToggle = 'pause';
        $('#playPause').click( function() {
            if (playPauseToggle == 'pause') {
                playPauseToggle = 'play';
                $(this).css('background-position', '-40px 0px')
                $('#slideshow').cycle('pause');
            } else {
                playPauseToggle = 'pause';
                $(this).css('background-position', '-40px -40px')
                $('#slideshow').cycle('next');
                $('#slideshow').cycle('resume');
            }
        });
        $('#playPause').mouseover( function() {
            if (playPauseToggle == 'play') {
                pos = '-40px -40px';
            } else {
                pos = '-40px 0px';
            }
            $(this).css('background-position', pos);
        });
        $('#playPause').mouseout( function() {
            if (playPauseToggle == 'play') {
                pos = '0 -40px';
            } else {
                pos = '0px 0px';
            }
            $(this).css('background-position', pos )
        });


    };


    // Spotlight 2 page image pop up dialog
    //
    // Check we're on the spotlight page before initializing the dialog
    // to prevent errors on pages which don't have jQuery UI active
    if($('.spotlight-page').length>0) {
        $('#spotlight-image-popup').dialog({
            autoOpen: false,
            modal: true,
            width: 900,
            position: ['middle',20],
            open: function() {
                var imgSrc = $(this).data('imageSource');
                $('#spotlight2-popup-image').attr('src', imgSrc);
            },
            buttons: {
                "Close": function() {
                    $(this).dialog("close");
                }
            }
        })
    }
    // Image pop-up dialog box link
    $('#spotlight2-images img').click(function(){
        var imgSrc = $(this).attr('src'),
            $imgPopUpDialog = $('#spotlight-image-popup');

        imgSrc = imgSrc.replace('/thumbs', '');
        imgSrc = imgSrc.replace('_th', '');

        $imgPopUpDialog.data({
            'imageSource': imgSrc
        });

        $('#spotlight2-popup-image').attr('src', '');

        $('.dialog-box').dialog('close');
        $imgPopUpDialog.dialog('open');
        return false;
    });


    // Newsletter subscribe
    var requestingPage = 'footer';
    if ( $('#Checkout').length > 0 ) {
        requestingPage = 'checkout';
    }

    $('.Subscribe').click( function() {
        $('.SubscribeText').each( function() {
            $(this).load('/subscribe_ajax.php', {
                Page: requestingPage
            });
        });
    });

    // favourites page
    if ( $('#favourites').length > 0 ) {

        // Favourites sort order
        $('#sortOrder').click(function() {
            // Get the page number url parameter
            var pageNo = $.urlParam('PageNo');
            var page = '/favourites_ajax.php?FavouritesAction';
            if (pageNo == '100') {
                var page = '/favourites_ajax.php?FavouritesAction&PageNo=100';
            }
            var mSortOrder = $(this).val();
            $('#productsAjax').load( page, {
                sortOrder: mSortOrder,
                action: 'sort'
            }, function() {
                // Callback
            });
        });

        // Favourites stock info panels
        $('#LowStockInfo').mouseover( function() {
            $('#LowStockInfoPanel').show();
        });
        $('#LowStockInfo').mouseout( function() {
            $('.InfoPanel').hide();
        });
        $('#InStockInfo').mouseover( function() {
            $('#InStockInfoPanel').show();
        });
        $('#InStockInfo').mouseout( function() {
            $('.InfoPanel').hide();
        });
        $('#PrefsInfo').mouseover( function() {
            $('#PrefsInfoPanel').show();
        });
        $('#PrefsInfo').mouseout( function() {
            $('.InfoPanel').hide();
        });

        // Favourites stock info panels
        $('#favourites .InInfoPanel').click( function() {
            var pos = $(this).position();
            // position and show the help box
            $('#helpBox').css({ 'left': (pos.left -230) + 'px', 'top':(pos.top -80) + 'px' });
            $('#helpBox').show();
            // Set length variation cost inside help box
            var id = $(this).attr('id');
            var ref = id.substr(4);
            var lengthVariation = parseFloat( $('#LengthVariationProduct'+ref).val() );
            $('#LengthVariation').html('&#163;' + lengthVariation.toFixed(2));
        });


        // User Product Code Buttons
        var mMainlineProductId;
        var mFavouriteId;
        var mUserProductId;

        $('.ProductListFavourites').each( function (i) {

            // User Product Code Button and Panel
            $('#UserCodeBtn' + i).live('click', function() {
                var pos = $(this).parent().position();
                // position and show the panel
                $('#UserCodePanel').css({ 'left': (pos.left -25) + 'px', 'top':(pos.top ) + 'px' });
                $('#UserCodePanel').show();
                // set variables relating to the clicked button
                mMainlineProductId = $('input#mainlineProductId' + i).val();
                mUserProductId = $('input#userProductId' + i).val();
                mFavouriteId = i;
                $('#UserCodePanel .ProductId').html(mMainlineProductId);
                $('#userCodeEntry').val(mUserProductId);
                $('#userCodeEntry').select();
            });
        });

        // Save
        $('#saveUserCode').live('click', function() {
            // Remove hidden input box left by previous errors
            $('#UserCodeError' + mFavouriteId).remove();
            var mUserProductId = $('input#userCodeEntry').val();
            $('#FavouriteId' + mFavouriteId).load('/favourites_ajax.php', {
                favouriteId: mFavouriteId,
                userProductId: mUserProductId,
                mainlineProductId: mMainlineProductId,
                action: 'save'
            }, function() {
                // Callback
                // Check if error
                if ( $('#UserCodeErrorProduct' + mFavouriteId).length == 0 ) {
                    $('#UserCodePanel').hide();
                } else {
                    var dupeProductId = $('#UserCodeErrorProduct' + mFavouriteId).val();
                    $('#UserCodeError').html('This code is already<br />in use for <strong>' + dupeProductId + '</strong>');
                    $('#UserCodeError').show();
                }
            });
        });

        // Delete
        $('#deleteUserCode').live('click', function() {
            var mUserProductId = $('input#userCodeEntry').val();
            $('#FavouriteId' + mFavouriteId).load('/favourites_ajax.php', {
                userProductId: mUserProductId,
                mainlineProductId: mMainlineProductId,
                action: 'delete'
            }, function() {
                // Callback
                $('#UserCodePanel').html();
            });
        });

        // Close the panel
        $('#UserCodePanel .close').live('click', function() {
            $('#UserCodePanel').hide();
            $('#UserCodeError').hide();
        });
        // Cancel the panel
        $('#cancelUserCodeEntry').live('click', function() {
            $('#UserCodePanel').hide();
            $('#UserCodeError').hide();
        });


    } // end favourites



    // Shopping Cart and Checkout help buttons
    $('#ShoppingCart .help').click( function(ev) {
        var pos = $(this).position();
        // position and show the help box
        $('#helpBox').css({ 'left': (pos.left -230) + 'px', 'top':(pos.top -80) + 'px' });
        $('#helpBox').show();
        // Set length variation cost inside help box
        var id = $(this).attr('id');
        var ref = id.substr(4);
        var lengthVariation = parseFloat( $('#LengthVariationProduct'+ref).val() );
        $('#LengthVariation').html('&#163;' + lengthVariation.toFixed(2));
    });

    $('#Checkout .help').click( function(ev) {
        var pos = $(this).position();
        // position and show the help box
        $('#helpBox').css({ 'left': (pos.left -230) + 'px', 'top':(pos.top -80) + 'px' });
        $('#helpBox').show();
        // Set length variation cost inside help box
        var id = $(this).attr('id');
        var ref = id.substr(4);
        var lengthVariation = parseFloat( $('#LengthVariationProduct'+ref).val() );
        $('#LengthVariation').html('&#163;' + lengthVariation.toFixed(2));
    });

    $('#helpTotalSaving').click( function() {
        var pos = $('#totalSavingText').position();
        var width = $('#totalSavingText').width();
        $('#helpTotalSavingPanel').css({
            'left': pos.left + 'px',
            'top': pos.top + 'px',
            'width': width + 'px'
        });
        $('#helpTotalSavingPanel').show();
    });

    $('#helpTotalSavingPanel .close').click( function() {
        $('#helpTotalSavingPanel').hide();
    });

    // Close buttons
    $('.closeHelp').live('click', function() {
        $(this).parent().hide();
    });
    $('.closeHelpBtn').live('click', function() {
        $(this).parent().hide();
    });

    // Automatically put text cursor in first field of form pages,
    // except for the Product Search field
    $('input:text:first:not("#SearchEntry")').focus();


    // Make text of Search Panel disapear when clicked
    // and increase font size ready for search
    // (but only if it contains the default text 'Product code')
    $('#SearchEntry').focus(function() {
        $(this).css({'font-size': '13px', 'color': '#f60'});
        $(this).select();
    });

    // Display place holder image if images aren't present
    $('#MultiProductsPage img').error(function () {
        $(this).unbind('error').attr('src', 'styles/gl_images/no-image.gif');
    });
    $('.SingleProductPage img').error(function () {
        $(this).unbind('error').attr('src', 'styles/gl_images/no-image-2.gif');
    });



    // Alternating rows for tables
    //------------------------------------------------------------------------
    // Give table class 'alt_rows' to apply the effect
    $(".alt_rows tr:even").addClass("tableOdd");
    $(".alt_rows tr:odd").addClass("tableEven");
    // Note the following should work but doesn't in IE (!)
    //$(".alt_rows tr:even").css("background-color", "#f4f4fF8");
    //$(".alt_rows tr:odd").css("background-color", "#eff1f1");


    // Remember and set scroll position so that window remains in
    // the same place after updating fields - applying this to the
    // shopping cart and throughout the admin section.
    // Uses the scrollTo plugin
    //-----------------------------------------------------
    // Remember scroll position before leaving window

    // Get current scroll position
    function getScrollXY() {
        var x = 0, y = 0;
        if( typeof( window.pageYOffset ) == 'number' ) {
            // Netscape
            x = window.pageXOffset;
            y = window.pageYOffset;
        } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
            // DOM
            x = document.body.scrollLeft;
            y = document.body.scrollTop;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
            // IE6 standards compliant mode
            x = document.documentElement.scrollLeft;
            y = document.documentElement.scrollTop;
        }
        return [x, y];
    }

    // Set and remember the scroll position
    // Use the 'no-scrollto' class on a page to prevent the page from setting the scroll position
    // This is useful where a list page calls a second (short) page and then the user returns
    // to the first page we want the scroll position for the first page to be remebered.
    if ( $('#AdminPage').length != 0 && $('.no-scrollto').length == 0 )
    {
        $(window).bind('beforeunload', function() {
            scrollPos = getScrollXY()[1];
            createCookie('scrollPos',scrollPos,1);
            //logThis('OKNNBVC-Create-' + scrollPos);
        });
        // Reset scroll position
        scrollPos = readCookie('scrollPos');
        //logThis('OKNNBVC-Set-' + scrollPos);
        $.scrollTo( {top:scrollPos, left:'0px'} );
        // Reset to top of page
        createCookie('scrollPos',0,1);
    }

    //end scroll position----------------------------------


    // Accordion menu init
    //------------------------------------------------------------------------
    // The 'if' statements check whether the element is present
    // Starts with first item open
    if ($('#accordion01').length != 0)
    {
        // Index page news items
        $('#accordion01').accordion({
            header: "h3",
            autoHeight: false,
            alwaysOpen: false
        });
    }
    if ($('#accordion02').length != 0)
    {
        // Index page - Shipping info - Starts all closed
        $('#accordion02').accordion({
            header: "h3",
            autoHeight: false,
            active: false,
            alwaysOpen: false
        });
    }
    if ($('#accordion03').length != 0)
    {
        // Index page - Blade Sharpening - Starts all closed
        $('#accordion03').accordion({
            header: "h3",
            autoHeight: false,
            active: false,
            alwaysOpen: false
        });
    }
    // Index page Product Promotions - Starts with first item open
    if ($('#accordion04').length != 0)
    {
        $('#accordion04').accordion({
            header: "h3",
            autoHeight: false,
            alwaysOpen: false
        });
    }

    if ($('#accordion10').length != 0)
    {
        // Unused style - starts fully closed,
        // unless a heading has class 'current' in which case that item opens.
        $('#accordion10').accordion({
            header: "h3",
            autoHeight: false,
            active: false,
            alwaysOpen: false,
            active: "#targetItem"
        });
    }



    // Copyright notice
    $('.copyright-notice-link').click( function(){
        $('#copyright-notice').show();
    });



});


// end jQuery section