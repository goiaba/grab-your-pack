'use strict';

//TODO: Create a separate template/view for the panel
define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/notification.html'],
    function(Backbone, _, $, PageView, notificationTemplate) {
    
    var NotificationView = PageView.extend({

        id: 'notification-page',

        template:_.template(notificationTemplate),

        events: {
            'swiperight': 'renderNotify',
            'click #logout': 'logout'
        },

        renderNotify:function(e) {
            Backbone.history.navigate('notify-page', { trigger: true, replace: true });
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

    return NotificationView;

});