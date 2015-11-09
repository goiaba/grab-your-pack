'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/login.html'],
    function(Backbone, _, $, PageView, loginTemplate) {
    
    var LoginView = PageView.extend({

        id: 'choose-login-signup-page',

        template:_.template(loginTemplate),

        events: {},

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return LoginView;

});