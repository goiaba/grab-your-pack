'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/signup.html'],
    function(Backbone, _, $, PageView, signUpTemplate) {
    
    var SignUpView = PageView.extend({

        id: 'signup-page',

        template:_.template(signUpTemplate),

        events: {},

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return SignUpView;

});