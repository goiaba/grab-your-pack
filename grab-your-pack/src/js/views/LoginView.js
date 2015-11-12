'use strict';

define(['backbone', 'underscore', 'jquery', 'facebook', 'views/PageView', 'text!../../templates/login.html'],
    function(Backbone, _, $, FB, PageView, loginTemplate) {
    
    var LoginView = PageView.extend({

        id: 'choose-login-signup-page',

        template:_.template(loginTemplate),

        events: {
            'click #fb-login': 'fbLogin'
        },

        fbLogin:function(e) {
            e.preventDefault();
            FB.login(function(response) {
                if (response.status === 'connected') {
                    console.log('Welcome! Fetching your information.... ');
                    FB.api('/me', function(response) {
                        console.log('Successful login for: ' + response.name);
                    });
                } else {
                    alert('not logged in');
                    console.log('not logged in');
                }
            }, { scope: 'email' });
        },

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return LoginView;

});