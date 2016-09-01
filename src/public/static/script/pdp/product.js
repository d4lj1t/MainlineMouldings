// Mainline Product Page Javascript
//=============================================================================

// Console Log function to avoid windows errors
logThis = function (text) {
    if ((window['console'] !== undefined)) {
        console.log(text);
    }
}

//jQuery section
//=============================================================================

$(document).ready(function () {

    var spinViewed = 0;
    var spinType = '';
    var firstTime = 1; // 1 when page first loads

    function viewSpin() {

        spinType = $('#spinType').val();

        // For HTML5
        if (spinType == 'HTML5') {


        } else if (spinType == 'Flash') {

            // Use either the swf preloader if this is the first viewing
            // or the final swf it has already been viewed
            if (spinViewed == 0) {
                spinViewed = 1;
                var swfFile = $('#spinFileLoad').val();
            } else {
                var swfFile = $('#spinFile').val();
            }

            var swfContainer = 'spinPicSWF';

            var flashvars = {};
            var params = {};
            params.wmode = "transparent";
            var attributes = {};

            swfobject.embedSWF(swfFile, swfContainer, "310", "255", "9.0.0", false, flashvars, params, attributes);

        }

    }

    // Image control
    var imageType = 'static';
    $('#spinControl').click(function () {
        if (imageType == 'static') {
            imageType = 'spin';
            $('#spinPicSWF').show();
            $('#spinText').show();
            $('#staticPic').hide();
            viewSpin();
            $(this).css('background-position', '-200px -37px')
        } else {
            imageType = 'static';
            $('#staticPic').show();
            $('#spinPicSWF').hide();
            $('#spinText').hide();
            $(this).css('background-position', '-200px 0px')
        }
    });
    $('#spinControl').mouseover(function () {
        if (imageType == 'static') {
            $(this).css('background-position', '-200px 0px')
        } else {
            $(this).css('background-position', '-200px -37px')
        }
    });
    $('#spinControl').mouseout(function () {
        if (imageType == 'static') {
            $(this).css('background-position', '0px 0px')
        } else {
            $(this).css('background-position', '0px -37px')
        }

    });
    // Start spin on page load if requested
    if ($('#spinStart').val() == 1) {
        imageType = 'spin';
        $('#spinPicSWF').show();
        $('#spinText').show();
        $('#staticPic').hide();
        viewSpin();
        $('#spinControl').css('background-position', '-200px -38px')
    }


    // If the "Added to cart" or "Added to favourites" flashes are shown
    // fade them out after a 5 seconds
    setTimeout(function () {
        $("#addedFlashes").hide()
    }, 5000);


    // Add a sample to the cart
    var sampleAdded = 0;
    $('#addSampleToCartBtn').click(function () {
        if (sampleAdded == 0) {
            sampleAdded = 1;
            $(this).attr("disabled", true);
            $(this).addClass('disabled');
            var mainlineProductId = $('input#mainlineProductId').val();
            $.post('/shopping_cart.php', {
                ProductId: mainlineProductId,
                CartAction: '10',
                action: 'ajax_add_sample'
            }, function (data) {
                $('.addedToCartAdvice').text('The sample has been added to your cart');
                $('.addedToCartAdvice').show();
                logThis(data);
            });
        }
    });


    // User Product Code Button and Panel
    $('#UserCodeBtn').live('click', function () {
        if ($('#AutenticatedStatus').val() == 1) {
            $('#UserCodePanel').show();
        } else {
            window.location = 'https://mainlinemouldings.com/index.php?PageLink=LogIn&LoginMessage=AdduserProductCode'
        }
    });
    $('#UserCodePanel .close').live('click', function () {
        $('#UserCodePanel').hide();
    });
    $('#UserEditCodeBtn').live('click', function () {
        $('#UserCodeError').hide();
        $('#UserCodePanel').show();
    });
    $('#cancelUserCodeEntry').live('click', function () {
        $('#UserCodePanel').hide();
    });
    $('#saveUserCode').click(function () {
        var mUserProductId = $('input#userCodeEntry').val();
        var mMainlineProductId = $('input#mainlineProductId').val();
        $('#ProductIdAjax').load('/product_ajax.php', {
            userProductId: mUserProductId,
            mainlineProductId: mMainlineProductId,
            action: 'save'
        }, function () {
            // Callback
            // Check if error
            if ($('#UserCodeErrorProduct').length == 0) {
                $('#UserCodePanel').hide();
            } else {
                var dupeProductId = $('#UserCodeErrorProduct').val();
                $('#UserCodeError').html('This code is already<br />in use for <strong>' + dupeProductId + '</strong>');
                $('#UserCodeError').show();
            }
        });
    });
    $('#deleteUserCode').click(function () {
        var mUserProductId = $('input#userCodeEntry').val();
        var mMainlineProductId = $('input#mainlineProductId').val();
        $('#ProductIdAjax').load('/product_ajax.php', {
            userProductId: mUserProductId,
            mainlineProductId: mMainlineProductId,
            action: 'delete'
        }, function () {
            // Callback
            $('#UserCodePanel').hide();
        });
    });

    // Character limiter for Product Code field
    //------------------------------------------------------------------------
    function limitChars(textid, limit, infodiv) {
        var text = $('#' + textid).val();
        var textlength = text.length;
        if (textlength > limit) {
            $('#' + infodiv).html('<strong>Max ' + limit + ' characters.</strong>');
            $('#' + textid).val(text.substr(0, limit));
            return false;
        }
    }

    $(function () {
        $('#userCodeEntry').keyup(function () {
            limitChars('userCodeEntry', 9, 'charlimitinfo');
        })
    });

    /// end character limiter


    // Accordion menu
    // Product Promotions List - Starts with first item open
    if ($('#accordionPromotions').length != 0) {
        $('#accordionPromotions').accordion({
            header: "h3",
            active: false,
            autoHeight: false,
            alwaysOpen: false
        });
    }

    // Recent Items display using the SmoothDivScroll plugin
    //
    // Initialize the plugin
    $("div#smoothDivScroll").smoothDivScroll({
        mousewheelScrolling: "allDirections",
        mousewheelScrollingStep: 45
    });
    // Update Recent Items display using the built in 'getAjaxContent' method
    // of the SmoothDivScroll plugin. Uses the super search ajax file for access
    function UpdateRecentItems() {
        $("div#smoothDivScroll").smoothDivScroll("getAjaxContent", "/super_search_ajax.php?updateRecentItems=all", "replace")
    }

    // Update first time straight away
    UpdateRecentItems();

    $('#bestValueWarning').draggable();
    $('#Support').draggable();

    // CALCULATIONS

    // Data made available in invisible input fields on the page
    //-----------------------------------------------------------------------
    var productId = $('#productId').val();
    // Initial values when the page loads, there is one block of invisible fields
    // for each relevant promotion. Thses values are taken from the promotion offering the best deal
    var bestPromotionId = $('#bestPromotionId').val();
    var onPromotion = $('#onPromotion').val();
    var productsInCart = parseFloat($('#productsInCart' + bestPromotionId).val());
    var promotionThreshold = parseFloat($('#promotionThreshold' + bestPromotionId).val());
    var promotionDiscount = parseFloat($('#promotionDiscount' + bestPromotionId).val());
    var promotionUnit = $('#promotionUnit' + bestPromotionId).val();
    // end best deal initial values
    var bestPromotion;
    var bestDiscount;
    var discountedPrice = parseFloat($('#discountedPrice').val());
    var discountedPricePack = parseFloat($('#discountedPricePack').val());
    var discountedPriceSplit = parseFloat($('#discountedPriceSplit').val());
    var listPrice = parseFloat($('#listPrice').val().replace(',', ''));
    var listPrice2 = parseFloat($('#listPrice2').val().replace(',', ''));
    var packPrice = parseFloat($('#packPrice').val().replace(',', ''));
    var boxedQuantity = parseFloat($('#boxedQuantity').val());
    var packQuantity = parseFloat($('#packQuantity').val());
    var mouldingLength = parseFloat($('#mouldingLength').val());
    var isApproxLength = $('#sApproxLength').val();
    var price;
    var productType = $('#productType').val();
    var lengthVariationRate = parseFloat($('#lengthVariationRate').val());
    var metresInCart = parseFloat($('#metresInCart').val());
    var unitTxt = 'each';
    //-----------------------------------------------------------------------


    /* FOR TESTING
     supportLog('Id:' + productId);
     supportLog('Best promtion Id:' + bestPromotionId);
     supportLog('Products In Cart: ' + productsInCart);
     supportLog('On Promotion: ' + onPromotion);
     supportLog('Discounted Price: ' + discountedPrice);
     supportLog('Discounted PricePack: ' + discountedPricePack);
     supportLog('Discounted PriceSplit: ' + discountedPriceSplit);
     supportLog('listPrice: ' + listPrice);
     supportLog('listPrice2: ' + listPrice2);
     */

    // Add to cart - form submit
    // DON'T USE 'click' for this, use 'mouseup'. Experienced problems in
    // some windows firefo browsers when using 'click'.
    $('#cartButton').mouseup(function () {
        $('#product-form').submit();
    });

    // Help Buttons
    $('#helpWood').click(function () {
        $('#helpBoxWood').css('display', 'block');
    });
    $('.comment').click(function () {
        $('#helpBox').css('display', 'block');
        var lengthVariation = price * lengthVariationRate / 100;
        $('.LengthVariation').html('&#163;' + lengthVariation.toFixed(2));
    });
    $('.closeHelp').live('click', function () {
        $('#helpBox').css('display', 'none');
        $('#helpBoxWood').css('display', 'none');
        $('#bestValueWarning').css('display', 'none');
    });

    // Function to hide all ordering unit boxes and then display the correct one
    // The selectedOrderingUnit relates to the line type in the cart
    function setOrderingUnit() {
        console.log('hellop');
        $('.orderUnit').hide();
        // Moulding
        if (productType == 'Polcore' || productType == 'Wood') {
            unitTxt = 'metre';
            selectedOrderingUnit = $('#orderBy option:selected').val();
            $('.orderUnit').hide();
            if (selectedOrderingUnit == 'boxes') {
                $('#orderingBoxes').show();
                $('#quantityBoxes').focus();
                updateBoxesValue();
            }
            if (selectedOrderingUnit == 'packs') {
                $('#orderingPacks').show();
                $('#quantityPacks').focus().select();
                updatePacksValue();
            }
            if (selectedOrderingUnit == 'lengths') {
                $('#orderingLengths').show();
                $('#quantityLengths').focus().select();
                updateLengthsValue();
            }
            if (selectedOrderingUnit == 'units') {
                $('#orderingMetres').show();
                $('#quantity').focus().select();
                updateValue();
            }
            //Mountboard
        } else if (productType == 'Mountboard' || productType == 'Backing board') {
            selectedOrderingUnit = $('#orderBy option:selected').val();
            unitTxt = 'sheet';
            if (selectedOrderingUnit == 'boxes') {
                $('#orderingBoxes').show();
                $('#quantityBoxes').focus().select();
                updateBoxesValue();
            }
            else {
                $('#orderingPacks').show();
                $('#quantityPacks').focus().select();
                updatePacksValue();
            }
        } else {
            selectedOrderingUnit = $('#orderBy option:selected').val();
            unitTxt = 'each';
            $('.orderUnit').hide();
            if (selectedOrderingUnit == 'boxes') {
                $('#orderingBoxes').show();
                $('#quantityBoxes').focus().select();
                updateBoxesValue();
            }
            else if (selectedOrderingUnit == 'packs') {
                $('#orderingPacks').show();
                $('#quantityPacks').focus().select();
                updatePacksValue();
            }
            else {
                $('#orderingItems').show();
                $('#quantity').focus().select();
                updateValue();
            }
        }
    }

    if (firstTime == 1) {
        setOrderingUnit();

    }

    // Ordering unit selection
    $('#orderBy').change(function () {
        setOrderingUnit()
    });


    // Prevent 'Return' key (key 13) from submitting the form
    // 'return false' prevents the return key from submitting the form
    // and is required in order to control the Tab key (key 9)
    $('#quantityBoxes').live("keypress", function (e) {
        if (e.keyCode == 13 || e.keyCode == 9) {
            updateBoxesValue();
            return false;
        }
    });
    $('#quantityPacks').live("keypress", function (e) {
        if (e.keyCode == 13 || e.keyCode == 9) {
            updatePacksValue();
            return false;
        }
    });
    $('#quantityLengths').live("keypress", function (e) {
        if (e.keyCode == 13 || e.keyCode == 9) {
            updateLengthsValue();
            return false;
        }
    });



    //manual js addition - Daljit

    var quantityClick = null;

    $('.js-quantity-plus').click(function () {

        if (quantityClick == null) {
            setTimeout(function () {
                    $('.js-quantity').keyup();
                    quantityClick = 'triggered';
                }
                , 5000);
        } else {
            return false;
        }

    });






    $('#quantity').live("keypress", function (e) {
        if (e.keyCode == 13 || e.keyCode == 9) {
            updateValue();
            return false;
        }
    });

    // If quantity fields are clicked or changed with mouse and keyboard
    $('#quantityBoxes').keyup(function (event) {
        if (event.keyCode != 9) { // Block tab
            updateBoxesValue();
        }
    });
    $('#quantityPacks').keyup(function (event) {
        if (event.keyCode != 9) { // Block tab
            updatePacksValue();
        }
    });
    $('#quantityLengths').on('keyup mouseup', function (event) {
        if (event.keyCode != 9) { // Block tab
            updateLengthsValue();
        }
    });
    $('#quantity').keyup(function (event) {
        if (event.keyCode != 9) { // Block tab
            updateValue();
        }
    });


    // Accept better value suggestion for boxes
    $('#acceptBox').live('click', function () {
        $('#orderBy').val('boxes');
        $('.orderUnit').hide();
        $('#quantityBoxes').val(boxesRequired);
        $('#orderingBoxes').show();
        $('#orderBy option:selected').removeAttr('selected');
        $('#orderBy option').each(function () {
            if ($(this).val() == 'boxes') {
                $(this).attr('selected', 'selected');
            }
            ;
        });
        updateBoxesValue();
        $('#bestValueWarning').hide();
        //supportLog('BOX: ' + boxesRequired + ' | ' + $('#orderBy').val() );
    });

    // Accept better value suggestion for packs
    $('#acceptPack').live('click', function () {
        $('#orderBy').val('packs');
        $('.orderUnit').hide();
        $('#quantityPacks').val(packsRequired);
        $('#orderingPacks').show();
        $('#orderBy option:selected').removeAttr('selected');
        $('#orderBy option').each(function () {
            if ($(this).val() == 'packs') {
                $(this).attr('selected', 'selected');
            }
            ;
        });
        updatePacksValue();
        $('#bestValueWarning').hide();
        //supportLog('PACK: ' + packsRequired + ' | ' + $('#orderBy').val() );
    });


    // FUNCTIONS TO UPDATE VALUES

    // Update Boxes value
    //--------------------------------------------------------------------------
    function updateBoxesValue() {

        // Get quantity of Boxes entered
        qttyBoxes = ($('#quantityBoxes').val());

        if (qttyBoxes > 0) {
            // Discount
            if (discountedPrice > 0)
                price = qttyBoxes * boxedQuantity * discountedPrice;
            else
                price = qttyBoxes * boxedQuantity * listPrice2;

            // Check promotions
            var bestPromotion = GetBestPromotion(qttyBoxes, 'boxes');
            bestPromotionId = bestPromotion[0];
            bestDiscount = bestPromotion[1];

            //supportLog('Boxes Promotion - bestPromotionId: ' + bestPromotionId + ' | bestDiscount: ' + bestDiscount);
            //supportLog('bestPromotion array: ' + bestPromotion);
            //supportLog('listPrice2: ' + listPrice2 + ' | price: ' + price);

            // If there is an active promotion
            if (bestPromotionId != '') {
                productsInCart = $('#productsInCart' + bestPromotionId).val();
                if (isNaN(productsInCart)) {
                    productsInCart = 0;
                }
                promotionTotal = +qttyBoxes + +productsInCart;
                promotionThreshold = $('#promotionThreshold' + bestPromotionId).val();
                promotionDiscount = $('#promotionDiscount' + bestPromotionId).val();

                if (promotionTotal >= promotionThreshold) {
                    promotionDiscountAmount = (listPrice2 * promotionDiscount / 100).toFixed(2);
                    promotionDiscountPrice = listPrice2 - promotionDiscountAmount;
                    //supportLog(' | promotionDiscountAmount: ' + promotionDiscountAmount + ' | promotionDiscountPrice' + promotionDiscountPrice + ' | ');

                    var discountPrice = qttyBoxes * boxedQuantity * promotionDiscountPrice;
                    //supportLog(' | discountPrice: ' + discountPrice + ' | price: ' + price + ' |');
                    if (discountPrice < price) {
                        price = qttyBoxes * boxedQuantity * promotionDiscountPrice;
                        // Display additional On Promotion text and price
                        $('#discountText').show();
                        $('#discountText').html('Promotion Price: &#163;' + promotionDiscountPrice.toFixed(2) + ' ' + unitTxt);
                    }
                }
            } else if (discountedPrice > 0) {
                $('#discountText').show();
            } else {
                $('#discountText').hide();
            }

            $('#valueBoxes').html('&#163;' + price.toFixed(2));

            qtty = parseFloat(qttyBoxes * boxedQuantity);
            if (productType == 'Polcore' || productType == 'Wood') {
                qtty = qtty.toFixed(2);
            }
            // Set quantity display
            var addText = ' items';
            if (productType == 'Polcore') {
                addText = ' m';
            } else if (productType == 'Wood') {
                if (isApproxLength == '1') {
                    addText = ' m approx';
                } else {
                    addText = ' m'
                }
            } else if (productType == 'Mountboard' || productType == 'Backing board') {
                addText = ' sheets';
            }

            $('#totalQuantityBoxes').text(qtty + addText);

        }

    };


    // Update Packs value
    //--------------------------------------------------------------------------
    function updatePacksValue() {

        // Get quantity of Packs entered
        qttyPacks = ($('#quantityPacks').val());

        if (qttyPacks > 0) {
            // Discount
            if (discountedPricePack > 0)
                price = qttyPacks * packQuantity * discountedPricePack;
            else
                price = qttyPacks * packQuantity * packPrice;

            // Check promotions
            var bestPromotion = GetBestPromotion(qttyPacks, 'packs');
            bestPromotionId = bestPromotion[0];
            bestDiscount = bestPromotion[1];

            /* TESTING*/
            /////////////////////////////////////////////////////////////////////////
            /*
             supportLog('Discounted price pack: ' + discountedPricePack);
             supportLog('Quantity of packs: ' + qttyPacks);
             supportLog('Pack quantity (m/pack): ' + packQuantity);
             supportLog('Pack price: ' + packPrice);
             supportLog('Price: ' + price);
             supportLog('Packs Promotion - bestPromotionId: ' + bestPromotionId);
             supportLog('Packs Promotion - bestDiscount: ' + bestDiscount);
             supportLog('bestPromotion array: ' + bestPromotion);
             */
            /////////////////////////////////////////////////////////////////////////

            // If there is an active promotion
            if (bestPromotionId != '') {
                productsInCart = $('#productsInCart' + bestPromotionId).val();
                if (isNaN(productsInCart)) {
                    productsInCart = 0;
                }
                promotionTotal = +qttyPacks + +productsInCart;
                promotionThreshold = $('#promotionThreshold' + bestPromotionId).val();
                promotionDiscount = $('#promotionDiscount' + bestPromotionId).val();

                if (promotionTotal >= promotionThreshold) {
                    promotionDiscountAmount = (packPrice * promotionDiscount / 100).toFixed(2);
                    promotionDiscountPrice = packPrice - promotionDiscountAmount;

                    //supportLog(listPrice2 + ' | ' + promotionDiscountAmount + ' | ' + promotionDiscountPrice );

                    var discountPrice = qttyPacks * packQuantity * promotionDiscountPrice;
                    if (discountPrice < price) {
                        price = qttyPacks * packQuantity * promotionDiscountPrice;

                        // Display additional On Promotion text and price
                        $('#discountText').show();
                        var perTxt = ' per metre';
                        if (productType == 'Mountboard' || productType == 'Backing board') {
                            perTxt = ' per sheet';
                        }
                        $('#discountText').html('Promotion Price: &#163;' + promotionDiscountPrice.toFixed(2) + perTxt);
                    }
                }
            } else if (discountedPrice > 0) {
                $('#discountText').show();
            } else {
                $('#discountText').hide();
            }

            $('#valuePacks').html('&#163;' + price.toFixed(2));

            // Check if it would be cheaper by the box
            qtty = parseFloat(qttyPacks * packQuantity);
            if (productType == 'Polcore' || productType == 'Wood') {
                qtty = qtty.toFixed(2);
            }
            checkBetterValue(price, qtty);

            // Set quantity display
            var addText = ' items';
            if (productType == 'Polcore') {
                addText = ' m';
            } else if (productType == 'Wood') {
                if (isApproxLength == '1') {
                    addText = ' m approx';
                } else {
                    addText = ' m'
                }
            } else if (productType == 'Mountboard' || productType == 'Backing board') {
                addText = ' sheets';
            }
            $('#totalQuantityPacks').text(qtty + addText);

        }

    };


    // Update Lengths value
    //--------------------------------------------------------------------------
    function updateLengthsValue() {


        // Get quantity of Lengths entered
        qttyLengths = parseFloat($('#quantityLengths').val());

        if (qttyLengths > 0) {
            if (discountedPriceSplit > 0)
                price = qttyLengths * mouldingLength * discountedPriceSplit;
            else
                price = qttyLengths * mouldingLength * listPrice;

            // Check promotions
            var bestPromotion = GetBestPromotion(qttyLengths, 'lengths');
            bestPromotionId = bestPromotion[0];
            bestDiscount = bestPromotion[1];

            /* TESTING */
            /////////////////////////////////////////////////////////////////////////
            /*
             supportLog('Lengths Promotion - bestPromotionId: ' + bestPromotionId + ' - bestDiscount: ' + bestDiscount);
             */
            /////////////////////////////////////////////////////////////////////////

            // If there is an active promotion
            if (bestPromotionId != '') {
                productsInCart = $('#productsInCart' + bestPromotionId).val();
                if (isNaN(productsInCart)) {
                    productsInCart = 0;
                }
                promotionTotal = qttyLengths + productsInCart;
                promotionThreshold = $('#promotionThreshold' + bestPromotionId).val();
                promotionDiscount = $('#promotionDiscount' + bestPromotionId).val();

                if (promotionTotal >= promotionThreshold) {
                    promotionDiscountAmount = (listPrice * promotionDiscount / 100).toFixed(2);
                    promotionDiscountPrice = listPrice - promotionDiscountAmount;

                    var discountPrice = qttyLengths * mouldingLength * promotionDiscountPrice;
                    if (discountPrice < price) {
                        price = qttyLengths * mouldingLength * promotionDiscountPrice;
                        // Display additional On Promotion text and price
                        $('#discountText').show();
                        $('#discountText').html('Promotion Price: &#163;' + promotionDiscountPrice.toFixed(2) + ' per metre');
                    }

                }
            } else if (discountedPrice > 0) {
                $('#discountText').show();
            } else {
                $('#discountText').hide();
            }

            $('#valueLengths').html('&#163;' + price.toFixed(2));

            // Check if it would be cheaper by the pack or box
            qtty = (qttyLengths * mouldingLength).toFixed(2);
            checkBetterValue(price, qtty);

            // Set quantity display
            var addText = 'm';
            if (productType == 'Wood') {
                if (isApproxLength == '1') {
                    addText = ' m approx';
                } else {
                    addText = ' m'
                }
            }
            $('#totalQuantityLengths').text(qtty + addText);
        }
    };


    // Update unit value (metres, items etc)
    //--------------------------------------------------------------------------
    function updateValue() {

        // Get quantity entered
        qtty = parseFloat($('#quantity').val());

        if (qtty > 0) {

            // Reset display of On Promotion text in para id 'discountText'
            $('#discountText').removeClass('showPriceAddIn');

            if (discountedPricePack > 0)
                price = qtty * discountedPricePack;
            else if (discountedPriceSplit > 0)
                price = qtty * discountedPriceSplit;
            else
                price = qtty * listPrice;

            // Check promotions
            var bestPromotion = GetBestPromotion(qtty, 'units');
            bestPromotionId = bestPromotion[0];
            bestDiscount = bestPromotion[1];

            supportLog('Units Promotion - bestPromotionId: ' + bestPromotionId + ' - bestDiscount: ' + bestDiscount);

            // If there is an active promotion
            if (bestPromotionId != '') {
                productsInCart = $('#productsInCart' + bestPromotionId).val();
                if (isNaN(productsInCart)) {
                    productsInCart = 0;
                }
                promotionTotal = qtty + productsInCart;
                promotionThreshold = $('#promotionThreshold' + bestPromotionId).val();
                promotionDiscount = $('#promotionDiscount' + bestPromotionId).val();

                if (promotionTotal >= promotionThreshold) {
                    promotionDiscountAmount = (listPrice * promotionDiscount / 100).toFixed(2);
                    promotionDiscountPrice = listPrice - promotionDiscountAmount;

                    var discountPrice = qtty * promotionDiscountPrice;
                    if (discountPrice < price) {
                        price = qtty * promotionDiscountPrice;

                        // Display additional On Promotion text and price
                        $('#discountText').show();
                        $('#discountText').html('Promotion Price: &#163;' + promotionDiscountPrice.toFixed(2) + ' per metre');
                    }

                }
            } else if (discountedPrice > 0) {
                $('#discountText').show();
            } else {
                $('#discountText').hide();
            }

            $('#value').html('&#163;' + price.toFixed(2));

            // Check if it would be cheaper by the pack or box
            checkBetterValue(price, qtty);

            // Set quantity display
            if (productType == 'Polcore' || productType == 'Wood') {
                qtty = qtty.toFixed(2);
            }

            var addText = '';
            if (productType == 'Polcore') {
                addText = ' m';
            } else if (productType == 'Wood') {
                if (isApproxLength == '1') {
                    addText = ' m approx';
                } else {
                    addText = ' m'
                }
            } else if (productType == 'Mountboard' || productType == 'Backing board') {
                addText = ' sheet';
                if (qtty > 1) {
                    addText = ' sheets';
                }
            } else {
                addText = ' item'
                if (qtty > 1) {
                    addText = ' items';
                }
            }
            $('#totalQuantityUnits').text(qtty + addText);


        }
    };

    // FUNCTIONS

    // Check better value
    // Check whether it would be better for the customer to order a pack
    // and also check whether it would be better for the customer to order a box
    // by referencing checkBetterValueBoxed function too
    //
    //--------------------------------------------------------------------------

    var packsRequired = 0;
    var boxesRequired = 0;

    var popUpShowed = null;

    function checkBetterValue(checkVal, checkQtty) {

        // The quantity of moulding to be checked is the amount entered in the
        // quantity box plus whatever is already in the cart
        if (!$.isNumeric(metresInCart)) {
            metresInCart = 0;
        }
        checkQtty = checkQtty + metresInCart;

        var costOfPacks = 0,
            costOfBoxes = 0,
            considerFactor = 0.7,
            buyBoxes = false,
            buyPacks = false,
            considerBoxes = false,
            considerPacks = false,
            packValue = packQuantity * packPrice,
            boxValue = boxedQuantity * listPrice2,
            considerPacksValue = 0,
            considerBoxesValue = 0,
            totalMetresBoxes = 0,
            totalMetresPacks = 0,
            totalQuantityPacks = 0,
            totalQuantityBoxes = 0,
            totalMetresPacks = 0,
            totalMetresBoxes = 0,
            costOfPacks = 0,
            costOfBoxes = 0,
            promotion;

        if (discountedPrice > 0) {
            packValue = packQuantity * discountedPricePack;
            boxValue = boxedQuantity * discountedPrice;
        }

        // If the product comes by the pack find the number of packs required to
        // meet the quantity requested and their cost
        if (packQuantity > 0) {
            packsRequired = Math.ceil(checkQtty / packQuantity);
            totalMetresPacks = parseFloat(packsRequired * packQuantity).toFixed(2);

            promotion = checkPromotions('packs', packsRequired, packValue)
            if (promotion && promotion != 0) {
                packValue = promotion;
            }
            costOfPacks = parseFloat(packsRequired * packValue).toFixed(2);
            considerPacksValue = costOfPacks * considerFactor;

            packUnitCost = costOfPacks / totalMetresPacks;
        }
        // If the product comes by the box find the number of boxes required to
        // meet the quantity requested and their cost
        if (boxedQuantity > 0) {
            boxesRequired = Math.ceil(checkQtty / boxedQuantity);
            totalMetresBoxes = parseFloat(boxesRequired * boxedQuantity).toFixed(2);

            promotion = checkPromotions('boxes', boxesRequired, boxValue)
            if (promotion && promotion != 0) {
                boxValue = promotion;
            }
            packUnitCost = packValue / packQuantity;
            costOfBoxes = parseFloat(boxesRequired * boxValue).toFixed(2);
            considerBoxesValue = costOfBoxes * considerFactor;

            boxUnitCost = costOfBoxes / totalMetresBoxes;

            //logThis('NNHBGTY | ' + checkVal + ' | ' + costOfBoxes + ' | ' + boxesRequired + ' | ' + boxValue + ' | ' + promotion + ' | ');

        }

        var currentOrderByChoice = $('#orderBy').val();
        var boxPriority = false;

        if (checkVal > costOfBoxes && costOfBoxes != 0 && currentOrderByChoice != 'boxes') {
            buyBoxes = true;
        }
        if (checkVal > considerBoxesValue && considerBoxesValue != 0 && currentOrderByChoice != 'boxes') {
            considerBoxes = true;
        }
        if (checkVal > costOfPacks && costOfPacks != 0 && currentOrderByChoice != 'packs') {
            buyPacks = true;
        }
        if (checkVal > considerPacksValue && considerPacksValue != 0 && currentOrderByChoice != 'packs') {
            considerPacks = true;
        }
        // Special case where the box and pack quantities are the same AND the box and pack prices are the same
        // In this case always show the box messages
        if (costOfBoxes == costOfPacks && boxesRequired == packsRequired) {
            if (currentOrderByChoice == 'packs') {
                buyBoxes = false;
                considerPacks = false;
                buyPacks = false;
            } else {
                considerPacks = false;
                buyPacks = false;
            }
        }

        // Special case where box and pack price the same but quantities are different
        // In this case, hide the 'consider boxes' message as it will never be better value
        // as the cost per metre is the same
        if (listPrice2 == packPrice) {
            considerBoxes = false;
        }

        // Special case where Buy Packs and Buy Boxes are both true but packs are cheaper
        // This can happen if there is a pack promotion
        // Also if the pack promotion unit price is less than the box unit price then
        // we don't want to consider boxes
        if ((buyPacks || currentOrderByChoice == 'packs') && costOfPacks < costOfBoxes) {
            buyBoxes = false;
            if (packUnitCost != '' && packUnitCost < listPrice2)
                considerBoxes = false;
        }

        /* TESTING */
        /////////////////////////////////////////////////////////////////////////
        /*
         supportLog('| Check value: ' + checkVal + ' | Check quantity: ' + checkQtty + '<br />| Cost of boxes: ' + costOfBoxes + ' | Consider boxes value: ' + considerBoxesValue + '<br />| Total metres boxes: ' + totalMetresBoxes + ' | Boxes required: ' + boxesRequired + '<br />| Cost of packs: ' + costOfPacks + ' | Consider packs value: ' + considerPacksValue + '<br />| Total metres packs: ' + totalMetresPacks + '| Packs required: ' + packsRequired);
         var $logResult = ''
         if (buyBoxes) { $logResult = 'Buy boxes, '; }
         if (considerBoxes) { $logResult = 'Consider boxes, '; }
         if (buyPacks) { $logResult = 'Buy packs, '; }
         if (considerPacks) { $logResult = 'Consider packs, '; }
         supportLog('Result: ' + $logResult);
         supportLog('| Current order by choice: ' + currentOrderByChoice + ' |');
         supportLog('| Metres in cart: ' + metresInCart + ' | ');
         */
        /////////////////////////////////////////////////////////////////////////

        // Build the better value pop-up message
        var displayMessage = '';
        if (boxesRequired > 1) {
            boxText = 'boxes';
        } else {
            boxText = 'box'
        }
        ;
        if (packsRequired > 1) {
            packText = 'packs';
        } else {
            packText = 'pack'
        }
        ;

        if (buyBoxes) {
            displayMessage = 'It would be cheaper for you to order by the box:<br /><span class="betterValueText">' + boxesRequired + ' ' + boxText + ' for &#163;' + costOfBoxes + ' (total ' + totalMetresBoxes + 'm)</span><button id="acceptBox" type="button">Choose this option</button>';

        } else if (considerBoxes && buyPacks) {
            displayMessage = 'It would be cheaper for you to order by the pack:<br /><span class="betterValueText">' + packsRequired + ' ' + packText + ' for &#163;' + costOfPacks + ' (total ' + totalMetresPacks + 'm)</span><button id="acceptPack" type="button">Choose this option</button><br /> or you might consider it better value to order by the box:<br /><span class="betterValueText">' + boxesRequired + ' ' + boxText + ' for &#163;' + costOfBoxes + ' (total ' + totalMetresBoxes + 'm)</span>' + '<button id="acceptBox" type="button">Choose this option</button>';

        } else if (buyPacks) {
            displayMessage = 'It would be cheaper for you to order by the pack:<br /><span class="betterValueText">' + packsRequired + ' ' + packText + ' for &#163;' + costOfPacks + ' (total ' + totalMetresPacks + 'm)</span><button id="acceptPack" type="button">Choose this option</button>';

        } else if (considerBoxes && considerPacks) {
            displayMessage = 'You might consider it better value to order by the pack:<br /><span class="betterValueText">' + packsRequired + ' ' + packText + ' for &#163;' + costOfPacks + ' (total ' + totalMetresPacks + 'm)</span><button id="acceptPack" type="button">Choose this option</button><br /> or possibly by the box:<br /><span class="betterValueText">' + boxesRequired + ' ' + boxText + ' for &#163;' + costOfBoxes + ' (total ' + totalMetresBoxes + 'm)</span><button id="acceptBox" type="button">Choose this option</button>';

        } else if (considerBoxes) {
            displayMessage = 'You might consider it better value to order by the box:<br /><span class="betterValueText">' + boxesRequired + ' ' + boxText + ' for &#163;' + costOfBoxes + ' (total ' + totalMetresBoxes + 'm)</span><button id="acceptBox" type="button">Choose this option</button>';

        } else if (considerPacks) {
            displayMessage = 'You might consider it better value to order by the pack:<br /><span class="betterValueText">' + packsRequired + ' ' + packText + ' for &#163;' + costOfPacks + ' (total ' + totalMetresPacks + 'm)</span><button id="acceptPack" type="button">Choose this option</button>';

        } else {
            displayMessage = '';
        }

        // Show the message (unless the page has just loaded)


        if (displayMessage != '' && firstTime != 1) {


            $('#jQtext').html('<h2>Better value!</h2>');
            $('#jQtext').append('<p class="bestValueMessage">' + displayMessage + '</p>');
            if (metresInCart > 0) {
                $('#jQtext').append('<p class="bestValueMessage">You already have ' + metresInCart + ' metres of this moulding in your cart.<br />Total here and in cart ' + checkQtty + 'm</p>');
            }
            /*        var pos = $('#quantitiesPanel').position();
             var posX = $('#quantitiesPanel').outerWidth() -10;
             var posY = $('#bestValueWarning').outerHeight() - 30;
             $('#bestValueWarning').css({
             left: pos.left + posX,
             top: pos.top - posY
             }).show();*/

            if(popUpShowed == null) {
                setTimeout(function () {
                        $i('#myModal').modal('show');
                        popUpShowed = 'shown';
                        $('#bestValueWarning').show();
                    }
                    , 2000);


            } else{
                return false;
            }


        } else {
            $('#bestValueWarning').hide();
            $('#jQtext').html('&nbsp;');
        }

    }


    function checkPromotions(orderUnit, qtty, valueIn) {

        var valueOut = 0,
            bestPromotion,
            promotionId,
            discount = 0,
            promotionDiscountAmount = 0,
            promotionDiscountPrice;

        bestPromotion = GetBestPromotion(qtty, orderUnit)
        promotionId = bestPromotion[0];
        discount = bestPromotion[1];

        //logThis ('BBBBVCF | ' + orderUnit + ' | ' + promotionId + ' | ' + discount + ' | ');

        if (discount != 0) {
            if (orderUnit == 'boxes') {

                promotionDiscountAmount = (listPrice2 * promotionDiscount / 100).toFixed(2);
                promotionDiscountPrice = listPrice2 - promotionDiscountAmount;

                // Apply promotion price if it is less
                if (promotionDiscountPrice < valueIn) {
                    valueOut = boxedQuantity * promotionDiscountPrice;
                    return valueOut;
                } else {
                    return false
                }

            } else if (orderUnit == 'packs') {

                promotionDiscountAmount = (packPrice * promotionDiscount / 100).toFixed(2);
                promotionDiscountPrice = packPrice - promotionDiscountAmount;

                // Apply promotion price if it is less
                if (promotionDiscountPrice < valueIn) {
                    valueOut = packQuantity * promotionDiscountPrice;
                    return valueOut;
                } else {
                    return false
                }
            }
        } else {
            return false
        }

    }

    // Get best promotion
    function GetBestPromotion(quantity, orderUnit) {
        bestPromotionId = '';
        var bestDiscount = 0;
        var promId;

        // Loop through the promotions for the product
        $('.promotionsList').each(function () {

            id = $(this).val();

            var productsInCart = parseFloat($('#productsInCart' + id).val());
            if (isNaN(productsInCart)) {
                productsInCart = 0;
            }

            var id = $(this).val();
            var unit = $('#promotionUnit' + id).val();
            var threshold = parseFloat($('#promotionThreshold' + id).val());
            var discount = $('#promotionDiscount' + id).val();
            var total = +quantity + +productsInCart;

            //logThis('product.js 1071: id=' + id + '; orderUnit=' + orderUnit + ';  unit=' + unit + ';  total=' + total + '; threshold=' + threshold + '; Discount=' + discount  + '; bestDiscount=' + bestDiscount+ ' total=' + total);
            //supportLog('id=' + id + '; unit=' + unit + '; threshold=' + threshold + '; Discount=' + discount + '; total=' + total);

            // Update best promotion info
            if (unit == orderUnit && total >= threshold && discount > bestDiscount) {
                bestDiscount = discount;
                bestPromotionId = id;
            }

            //logThis('product.js 1080: Discount: ' + bestDiscount + ' - ID: ' + bestPromotionId);
            //supportLog('Discount: ' + bestDiscount + ' - ID: ' + bestPromotionId);

        });

        var bestPromotion = new Array(bestPromotionId, bestDiscount);
        return bestPromotion;
    }


    function supportLog(text) {
        if ($('#Support').length > 0) {
            $('#logText').append('<br />' + text)
        }
    }

    // Run code when page first loads
    $(window).load(function () {
        firstTime = 0;
    });


});
// end jQuery section
//-----------------------------------------------------------------------------

