'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/tutorial.html'],
    function(Backbone, _, $, PageView, tutorialTemplate) {
    var TutorialView = PageView.extend({

        id: 'tutorial-view',
        template:_.template(tutorialTemplate),
        events: {
            'swipeleft': 'swipePageLeft',
            'swiperight': 'swipePageRight',
            'click #tutorial-sign-up': 'toSignup',
            'click #tutorial-login': 'toLogin'
        },
        render:function (eventName) {
            this.$el.html(this.template());
            this.enhance();
            return this;
        },
        swipePageLeft:function (e) {
            this.swipePage(e, 'left');
            return false;
        },
        swipePageRight:function (e) {
            this.swipePage(e, 'right');
            return false;
        },
        toSignup: function(e) {
            e.preventDefault();
            console.log('toSignup');
            window.App.router.signup();
        },
        toLogin: function(e) {
            e.preventDefault();
            console.log('toLogin');
            window.App.router.chooseLogin();
        },
        swipePage:function (event, side) {
            const NUM_OF_PAGES = 3;
            const DIV_ID = '#tutorial-0';

            // This will prevent event triggering more then once
            if(event.handled !== true) {
                var currentDiv = $('.visible-page');
                var currentSpan = $('.swipe-dot.current');
                var nextSpan = null;
                var nextDivNr = parseInt(currentDiv.attr('id').substring(9,11));
                if (side === 'left' && nextDivNr < NUM_OF_PAGES) {
                    nextDivNr += 1;
                    nextSpan = currentSpan.next('span');
                } else if (side === 'right' && nextDivNr > 1) {
                    nextDivNr -= 1;
                    nextSpan = currentSpan.prev('span');
                } else return;
                this.changeTutorialBackground(nextDivNr);
                var nextDiv = $(DIV_ID + nextDivNr);
                currentDiv.removeClass('visible-page');
                currentDiv.addClass('hidden-page');
                nextDiv.removeClass('hidden-page');
                nextDiv.addClass('visible-page');
                currentSpan.removeClass('current');
                nextSpan.addClass('current');

                event.handled = true;
            }
        },

        changeTutorialBackground:function (pageNr) {
            const BG_FILE_PATH = 'img/bg-#.png';

            var $tutorialPage = $('#tutorial-view');
            var nextBgImage = BG_FILE_PATH.replace('#', pageNr);
            $tutorialPage.css('background','linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + nextBgImage + ')');
            $tutorialPage.css('background-position', 'center center');
            $tutorialPage.css('background-repeat', 'none');
            $tutorialPage.css('background-size', 'cover');
        }

    });

    return TutorialView;
});

