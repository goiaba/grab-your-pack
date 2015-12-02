'use strict';

//TODO: Create a separate template/view for the panel
define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/notification.html'],
    function(Backbone, _, $, PageView, notificationTemplate) {
    
    var NotificationView = PageView.extend({
        id: 'notification-page',
        template:_.template(notificationTemplate),
        events: {
            'swiperight': 'renderNotify',
            'click #logout2': 'logout'
        },
        renderNotify:function(e) {
            window.App.router.notify();
        },
        logout:function(e) {
            e.preventDefault();
            facebookConnectPlugin.logout(function() {
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