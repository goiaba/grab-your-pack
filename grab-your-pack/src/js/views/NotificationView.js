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
            window.App.router.navigate('notify-page', { trigger: true });
        },
        logout:function(e) {
            e.preventDefault();
            facebookConnectPlugin.logout(function() {
                window.App.router.navigate('tutorial-view', { trigger: true });
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