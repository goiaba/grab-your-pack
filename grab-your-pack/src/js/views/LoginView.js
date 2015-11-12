'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/login.html'],
    function(Backbone, _, $, PageView, loginTemplate) {
    
    var LoginView = PageView.extend({

        id: 'choose-login-signup-page',

        template:_.template(loginTemplate),

        events: {
            'click #fb-login': 'fbLogin'
        },

        fbLogin:function(e) {
            e.preventDefault();

            var fbLoginSuccess = function (userData) {
                alert('UserInfo: ' + JSON.stringify(userData));
            };

            facebookConnectPlugin.login(['public_profile'],
                fbLoginSuccess,
                function (error) { console.log(error); }
            );
        },

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return LoginView;

});