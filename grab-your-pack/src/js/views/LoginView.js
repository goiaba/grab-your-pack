define(function(require) {
    'use strict';
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        PageView = require('views/PageView'),
        NotifyView = require('views/NotifyView'),
        loginTemplate = require('text!../../templates/login.html'),
        AlertView = require('views/AlertView');

    var LoginView = PageView.extend({

        id: 'choose-login-signup-page',

        template:_.template(loginTemplate),

        events: {
            'click #fb-login': 'fbLogin'
        },

        fbLogin:function(e) {
            e.preventDefault();
            facebookConnectPlugin.login(['email', 'public_profile'],
                function (response) {
                    window.App.router.navigate('notify-page', { trigger: true });
                },
                function (error) { 
                    new AlertView({ type: 'error', message: error }).render();
                },
                true
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