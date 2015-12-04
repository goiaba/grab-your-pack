'use strict';

//TODO: Create a separate template/view for the panel
define(['backbone', 'underscore', 'jquery', 'views/PageView', '../collections/notificationCollection', 'text!../../templates/notification.html'],
    function(Backbone, _, $, PageView, NotificationCollection, notificationTemplate) {
    
    var NotificationView = PageView.extend({
        id: 'notification-page',
        template:_.template(notificationTemplate),
        events: {
            'swiperight': 'renderNotify',
            'swipedown': 'test',
            'click #logout2': 'logout'
        },
        test: function(e) {
            alert('swipedown');
        },
        renderNotify:function(e) {
            window.App.router.navigate('notify-page', { trigger: true });
        },
        logout:function(e) {
            e.preventDefault();
            facebookConnectPlugin.logout(function() {
                console.log('logged out');
                delete window.App.user;
                window.App.router.navigate('tutorial-view', { trigger: true });
            });
        },
        render:function (eventName) {
            if (this.model && this.model.id) {
                var self = this;
                if (!this.collection) this.collection = new NotificationCollection();
                this.collection.apartmentId = this.model.id;

                var deferredCollFetch = this.collection.fetch({ context: this.collection });
                deferredCollFetch.done(function() {
                    console.dir(this.toJSON()[0].notifications);
                    $(self.el).html(self.template({
                        notifications: this.toJSON()[0].notifications,
                    }));
                    self.enhance();
                });
                deferredCollFetch.fail(function() {
                    $(self.el).html(self.template({ notifications: [] }));
                    self.enhance();
                });
            } else {
                self.showAlert('error', 'An Apartment model must be provided to NotificationView.');
            }
            return this;
        }
    });
    return NotificationView;
});