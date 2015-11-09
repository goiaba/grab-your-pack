'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/loginWithEmail.html'],
    function(Backbone, _, $, PageView, loginWEmailTemplate) {
    
    var loginWEmailView = PageView.extend({

        id: 'app-login-page',

        template:_.template(loginWEmailTemplate),

        events: {},

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return loginWEmailView;

});