'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/notification.html'],
    function(Backbone, _, $, PageView, notificationTemplate) {
    
    var NotificationView = PageView.extend({

        id: 'notification-page',

        template:_.template(notificationTemplate),

        events: {},

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return NotificationView;

});