'use strict';

define(['backbone', 'underscore', 'jquery',
        'views/TutorialView', 'views/LoginView', 'views/LoginWithEmailView', 
        'views/SignUpView', 'views/BuildingView', 'views/NotifyView',
        'views/NotificationView', 'views/AlertView', 'models/person',
        'models/building', 'collections/apartmentCollection'], 
        function(Backbone, _, $, TutorialView, LoginView, LoginWithEmailView, 
            SignUpView, BuildingView, NotifyView, NotificationView, AlertView, Person, 
            Building, ApartmentCollection) {

    var AppRouter = Backbone.Router.extend({

        securePages: ['address-page', 'notify-page', 'notification-page'],

        routes:{
            'choose-login-signup-page':'chooseLogin',
            'app-login-page': 'login',
            'address-page': 'building',
            'signup-page': 'signup',
            'notify-page': 'notify',
            'notification-page': 'notification',
            'tutorial-view':'tutorial',
            'path*': 'pageNotFound'
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
            $(document).on('pagecontainershow', _.bind(this.handlePageContainerShow, this));
        },

        pageNotFound:function(path) {
            alert('Route does not exist: ' + path);
        },

        tutorial:function() {
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
            var self = this;
            this.getFacebookLoginStatus(
                function(response) {
                    console.log('connected to facebook.');
                    if (window.App.user && window.App.user.get('apartment') && window.App.user.get('apartment').building.id) {
                        //We already have user information (including his apartment)
                        //  so what we need is the building and the apartments that 
                        //  belongs to it
                        var building = window.App.user.get('apartment').building;
                        self.pages.notify.model = building;
                        self.changePage(self.pages.notify);
                    } else {
                        self.getFacebookUserInfo(
                            function(response) {
                                $.when(new Person({ 'email': response.email }).fetch()).then(
                                    function(data, textStatus, jqXHR) {
                                        window.App.user = new Person(data.user);
                                        var building = window.App.user.get('apartment').building;
                                        self.pages.notify.model = building;
                                        self.changePage(self.pages.notify);
                                    }
                                );
                            },
                            function(error) {
                                console.debug(error);
                                new AlertView({ type: 'error', message: error }).render();
                                self.changePage(self.pages.tutorial);
                            }
                        );
                    }
                },
                function() {
                    window.App.router.navigate('tutorial-view', { trigger: true });
                }
            );
        },
        notification:function() {
            console.log('notification...');
            var self = this;
            this.getFacebookLoginStatus(
                function(response) {
                    console.log('connected to facebook.');
                    if (window.App.user && window.App.user.get('apartment').id) {
                        //We already have user's apartment information
                        var apartment = window.App.user.get('apartment');
                        self.pages.notification.model = apartment;
                        self.changePage(self.pages.notification);
                    } else {
                        self.getFacebookUserInfo(
                            function(response) {
                                $.when(new Person({ 'email': response.email }).fetch()).then(
                                    function(data, textStatus, jqXHR) {
                                        window.App.user = new Person(data.user);
                                        var apartment = window.App.user.get('apartment');
                                        self.pages.notification.model = apartment;
                                        self.changePage(self.pages.notification);
                                    }
                                );
                            },
                            function(error) {
                                console.debug(error);
                                new AlertView({ type: 'error', message: error }).render();
                                self.changePage(self.pages.tutorial);
                            }
                        );
                    }
                },
                function() {
                    window.App.router.navigate('tutorial-view', { trigger: true });
                },
                function(error) {
                    console.debug(error);
                    new AlertView({ type: 'error', message: error }).render();
                    window.App.router.navigate('tutorial-view', { trigger: true });
                }
            );
        },
        chooseLogin:function() {
            this.changePage(this.pages.chooseLogin);
        },
        changePage:function (page) {
            var self = this;
            var proceed = function(self) {
                if ($('#' + page.id).length === 0) {
                    $('body').append(page.render().$el);
                }

                if (self.firstPage) {
                    $.mobile.initializePage();
                    self.firstPage = false;
                }

                $(':mobile-pagecontainer').pagecontainer('change', page.$el,
                        { changeHash: false });
            }

            if (_.contains(this.securePages, page.id)) {
                this.getFacebookLoginStatus(
                    function(response) {
                        proceed(self);    
                    },
                    function() {
                        page = self.pages.tutorial;
                        proceed(self);
                    }
                );
            } else {
                proceed(self);
            }
        },

        handlePageContainerShow: function (event, ui) {
            var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
            _.each(this.pages, function(page) {
                if(activePage.get(0) === page.el) {
                    page.show(event, ui);
                }
            });
        },
        getFacebookLoginStatus: function(ifLoggedIn, ifNotLoggedIn, fail) {
            facebookConnectPlugin.getLoginStatus(
                function(response) { 
                    if (response.status === 'connected') {
                        if (ifLoggedIn) ifLoggedIn(response);
                    } else {
                        if (ifNotLoggedIn) ifNotLoggedIn();
                    }
                },
                function(error) { if (fail) fail(error); else console.debug(error); }
            );
        },
        getFacebookUserInfo: function(success, fail) {
            facebookConnectPlugin.api('/me?fields=id,email,name', ['public_profile', 'email'],
                function(response) { success(response); },
                function(error) { if (fail) fail(error); else console.debug(error); }
            );
        }
    });

    return AppRouter;
});
