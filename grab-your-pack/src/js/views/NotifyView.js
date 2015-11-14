'use strict';

//TODO: Create a separate template/view for the panel
define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/notify.html'],
    function(Backbone, _, $, PageView, notifyTemplate) {
    
    var NotifyView = PageView.extend({

        id: 'notify-page',

        template:_.template(notifyTemplate),

        events: {
            'swipeleft': 'renderNotifications',
            'click #logout': 'logout'
        },

        renderNotifications:function(e) {
            Backbone.history.navigate('notification-page', { trigger: true, replace: true });
        },

        logout:function(e) {
            e.preventDefault();
            facebookConnectPlugin.logout(function() {
                console.log('Logged out of facebook');
                Backbone.history.navigate('choose-login-signup-page', { trigger: true, replace: true });
            });
        },

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return NotifyView;

});