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
            notify: new NotifyView({ model: new Building({
                    id: 116,
                    address_1: "6230 N Kenmore Ave",
                    address_2: "",
                    city: "Chicago",
                    state: "IL",
                    country: "United States",
                    zip_code: "60660"
                })
            }),
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
                    if (response.status === 'connected') {
                        console.log('connected to facebook.');
                        if (window.App.user && window.App.user.get('apartment') && window.App.user.get('apartment').building.id) {
                            console.log('window.App.user is ' + JSON.stringify(window.App.user));
                            //We already have user information (including his apartment)
                            //  so what we need is the building and the apartments that 
                            //  belongs to it
                            var building = window.App.user.get('apartment').building;
                            console.log('building is ' + JSON.stringify(building));
                            self.pages.notify.model = building;
                            self.changePage(self.pages.notify);
                        } else {
                            self.getFacebookUserInfo(
                                function(response) {
                                    $.when(new Person({ 'email': response.email }).fetch()).then(
                                        function(data, textStatus, jqXHR) {
                                            window.App.user = new Person(data.user);
                                            console.dir(window.App);
                                            console.log('window.App.user set to ' + JSON.stringify(window.App.user));
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
                    } else {
                        self.changePage(self.pages.tutorial);
                    }
                }
            );
        },
        notification:function() {
            var self = this;
            this.getFacebookLoginStatus(
                function(response) {
                    if (response.status === 'connected') {
                        self.changePage(self.pages.notification);
                    } else {
                        self.changePage(self.pages.tutorial);
                    }
                },
                function(error) {
                    console.debug(error);
                    new AlertView({ type: 'error', message: error }).render();
                    self.changePage(self.pages.tutorial);
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
                this.getFacebookLoginStatus(function(response) {
                    if (response.status !== 'connected') {
                        page = self.pages.tutorial;
                    }
                    proceed(self);
                });
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

        getFacebookLoginStatus:function(success, fail) {
            facebookConnectPlugin.getLoginStatus(
                function(response) { success(response); },
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
