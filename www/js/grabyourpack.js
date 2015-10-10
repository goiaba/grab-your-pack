$(document).on('swipeleft', '.swipeable', function(event) {
    // This will prevent event triggering more then once
    if(event.handled !== true) {    
        var nextpage = $.mobile.activePage.next('[data-role="page"]');
        // swipe using id of next page if exists
        if (nextpage.length > 0 && nextpage.hasClass("swipeable")) {
            $.mobile.changePage(nextpage, {
                transition: "slide", 
                reverse: false
            }, true, true);
        }
        event.handled = true;
    }
    return false;         
});

$(document).on('swiperight', '.swipeable', function(event) {
    // This will prevent event triggering more then once
    if(event.handled !== true) {
        var prevpage = $(this).prev('[data-role="page"]');
        if (prevpage.length > 0) {
            $.mobile.changePage(prevpage, {
                transition: "slide",
                reverse: true
            }, true, true);
        }
        event.handled = true;
    }
    return false;            
});
