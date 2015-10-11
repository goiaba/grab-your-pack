function swipePage(event, side) {
    const NUM_OF_PAGES = 3;
    const DIV_ID = '#help-0';

    // This will prevent event triggering more then once
    if(event.handled !== true) {
        var currentDiv = $('.visible-page');
        var currentSpan = $('.swipe-dot.current');
        var nextSpan = null;
        var nextDivNr = parseInt(currentDiv.attr('id').substring(5,7));

        if (side === 'left' && nextDivNr < NUM_OF_PAGES) {
            nextDivNr += 1;
            nextSpan = currentSpan.next('span');
        } else if (side === 'right' && nextDivNr > 1) {
            nextDivNr -= 1;
            nextSpan = currentSpan.prev('span');
        } else return;

        var nextDiv = $(DIV_ID + nextDivNr);
        currentDiv.removeClass('visible-page');
        currentDiv.addClass('hidden-page');
        nextDiv.removeClass('hidden-page');
        nextDiv.addClass('visible-page');
        currentSpan.removeClass('current');
        nextSpan.addClass('current');

        event.handled = true;
    }
}

$(document).on('swipeleft', '.swipeable', function(event) {
    swipePage(event, 'left');
    return false;         
});

$(document).on('swiperight', '.swipeable', function(event) {
    swipePage(event, 'right');
    return false;            
});

// $(document).on('swipeleft', '.swipeable', function(event) {
//     // This will prevent event triggering more then once
//     if(event.handled !== true) {    
//         var nextpage = $.mobile.activePage.next('[data-role="page"]');
//         // swipe using id of next page if exists
//         if (nextpage.length > 0 && nextpage.hasClass("swipeable")) {
//             $.mobile.changePage(nextpage, {
//                 transition: "slide", 
//                 reverse: false
//             }, true, true);
//         }
//         event.handled = true;
//     }
//     return false;         
// });

// $(document).on('swiperight', '.swipeable', function(event) {
//     // This will prevent event triggering more then once
//     if(event.handled !== true) {
//         var prevpage = $(this).prev('[data-role="page"]');
//         if (prevpage.length > 0) {
//             $.mobile.changePage(prevpage, {
//                 transition: "slide",
//                 reverse: true
//             }, true, true);
//         }
//         event.handled = true;
//     }
//     return false;            
// });
