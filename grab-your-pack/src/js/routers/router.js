'use strict';

define(['backbone', 'underscore', 'jquery',
    'views/TutorialView', 'views/LoginView', 'views/LoginWithEmailView', 
    'views/SignUpView', 'views/BuildingView', 'views/NotifyView',
    'views/NotificationView'], 
        function(Backbone, _, $, TutorialView, LoginView, LoginWithEmailView, 
            SignUpView, BuildingView, NotifyView, NotificationView) {

    var AppRouter = Backbone.Router.extend({

        routes:{
            'choose-login-signup-page':'chooseLogin',
            'app-login-page': 'login',
            'address-page': 'building',
            'signup-page': 'signup',
            'notify-page': 'notify',
            'notification-page': 'notification',
            '*path':'tutorial'
        },

        pages: {
            tutorial: new TutorialView(),
            login: new LoginWithEmailView(),
            signup: new SignUpView(),
            building: new BuildingView(),
            notify: new NotifyView(),
            notification: new NotificationView(),
            chooseLogin: new LoginView()
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

        tutorial:function(path) {
            console.log('path = ' + path);
            this.changePage(this.pages.tutorial);
        },

        login:function() {
            this.changePage(this.pages.login);
        },

        signup:function() {
            this.changePage(this.pages.signup);  
        },

        building:function() {
            this.changePage(this.pages.building);
        },

        notify:function() {
            this.changePage(this.pages.notify);
        },

        notification:function() {
            this.changePage(this.pages.notification);
        },

        chooseLogin:function() {
            this.changePage(this.pages.chooseLogin);
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
