'use strict';

define(['backbone', 'underscore', 'jquery', 'views/TutorialView'], 
        function(Backbone, _, $, TutorialView) {
    var AppRouter = Backbone.Router.extend({

        routes:{
            '':'tutorial'
        },

        pages: {
            tutorial: new TutorialView()
        },

        initialize:function () {
            // Handle back button throughout the application
            $(document).on('click', '.back', function(event) {
                window.history.back();
                return false;
            });
            this.firstPage = true;
            $(document).on( 'pagecontainershow', _.bind(this.handlePageContainerShow, this));
        },

        tutorial:function () {
            console.log('#tutorial');
            this.changePage(this.pages.tutorial);
        },

        changePage:function (page) {
            // Render and add page to DOM once
            if ($('#' + page.id).length === 0) {
                $('body').append(page.render().$el);
            }
            if (this.firstPage) {
                // We turned off $.mobile.autoInitializePage, but now that we've
                // added our first page to the DOM, we can now call initializePage.
                $.mobile.initializePage();
                this.firstPage = false;
            }
            $( ':mobile-pagecontainer' ).pagecontainer( 'change', page.$el,
                    { changeHash: false });
        },

        handlePageContainerShow: function (event, ui) {
            // Figure out what page we are showing and call 'PageView.show' on it
            // TODO: JQM 1.4.3 has ui.toPage, which would be preferred to getActivePage
            var activePage = $( ':mobile-pagecontainer' ).pagecontainer( 'getActivePage' );
            _.each(this.pages, function(page) {
                if( activePage.get(0) === page.el ) {
                    page.show(event, ui);
                }
            });
        }

    });

    return AppRouter;
});
