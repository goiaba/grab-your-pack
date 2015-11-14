'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'views/NotifyView', 'text!../../templates/login.html'],
    function(Backbone, _, $, PageView, NotifyView, loginTemplate) {
    
    var LoginView = PageView.extend({

        id: 'choose-login-signup-page',

        template:_.template(loginTemplate),

        events: {
            'click #fb-login': 'fbLogin'
        },

        fbLogin:function(e) {
            e.preventDefault();

            var renderNotifyView = function() {
                console.log('Rendering NotifyView from LoginView.');
                Backbone.history.navigate('notify-page', { trigger: true, replace: true });
            }

            var success = function(response) {
                if (response.status === 'connected') {
                    renderNotifyView();
                } else {//if (response.status === 'not_ authorized') {
                    facebookConnectPlugin.login(['public_profile'],
                        function (error) { renderNotifyView(); },
                        function (error) { 
                            console.log(error);
                            alert(error);
                        },
                        true
                    );
                // } else {
                }
            }

            facebookConnectPlugin.getLoginStatus(function(response) { success(response); });
        },

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return LoginView;

});