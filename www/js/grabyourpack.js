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

        changeHelpBackground(nextDivNr);
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

function changeHelpBackground(pageNr) {
    const BG_FILE_PATH = 'img/bg-#.png';

    var $helpPage = $('#help-page');
    var nextBgImage = BG_FILE_PATH.replace('#', pageNr);
    $helpPage.css('background','linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + nextBgImage + ')');
    $helpPage.css('background-position', 'center center');
    $helpPage.css('background-repeat', 'none');
    $helpPage.css('background-size', 'cover');
}

$(document).on('swipeleft', '.swipeable', function(event) {
    swipePage(event, 'left');
    return false;         
});

$(document).on('swiperight', '.swipeable', function(event) {
    swipePage(event, 'right');
    return false;            
});
