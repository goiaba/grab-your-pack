'use strict';

define(['jquery'], function($) {
    $(document).on('mobileinit', function () {
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        // $.mobile.ajaxEnabled = false;
        // $.mobile.pushStateEnabled = false;
        // $.mobile.autoInitializePage = false;
        //FIX: Remove page from DOM when it's being replaced not working
        $('div[data-role=\'page\']').on('pagecontainerhide', function(event, ui) {
            alert( 'This page was just shown: ' + ui.nextPage + ' and this page was just hidden: ' + event.currentTarget);
            $(event.currentTarget).remove();
        });
     //    $('div[data-role='page']').on('pagehide', function (event, ui) {
     //        console.debug('onpagehide called');
     //        $(event.currentTarget).remove();
	    // });
    });
});
