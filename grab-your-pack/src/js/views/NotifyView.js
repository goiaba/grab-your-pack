'use strict';

//TODO: Create a separate template/view for the panel
define(['backbone', 'underscore', 'jquery', 'views/PageView', '../collections/apartmentCollection', '../models/notification', 'text!../../templates/notify.html'],
    function(Backbone, _, $, PageView, ApartmentCollection, Notification, notifyTemplate) {
    
    var NotifyView = PageView.extend({
        id: 'notify-page',
        template: _.template(notifyTemplate),
        events: {
            'swipeleft': 'renderNotifications',
            'click .apartment-btn': 'notifyApartment',
            'click #logout': 'logout'
        },
        initialize: function() {
            var self = this;
            this.collection = new ApartmentCollection([], { buildingId: this.model.id });
        },
        notifyApartment: function(e) {
            e.preventDefault();
            var self = this;
            var apartmentToBeNotifiedNumber = $(e.target).text();
            var apartmentToBeNotifiedId = $(e.target).attr('data-apartmentId');
            var notification = new Notification({
                personNotifierId: window.App.user.id,
                apartmentNotifiedId: apartmentToBeNotifiedId,
            });
            notification.save([], {
                success: function(model, response, options) {
                    console.log('A notification was sent to occupants of the apartment ' + apartmentToBeNotifiedNumber);
                    self.showAlert('info', 'A notification was sent to occupants of the apartment ' + apartmentToBeNotifiedNumber);
                },
                error: function(model, xhr, options) {
                    console.error('The notification could not be sent due to an error.');
                    console.dir(xhr);
                    self.showAlert('error', 'The notification could not be sent due to an error.');
                }
            });
        },
        renderNotifications:function(e) {
            window.App.router.navigate('notification-page', { trigger: true });
        },
        logout:function(e) {
            e.preventDefault();
            facebookConnectPlugin.logout(function() {
                console.log('logged out');
                window.App.router.navigate('tutorial-view', { trigger: true });
            });
        },
        render:function (eventName) {
            var self = this;
            this.collection.fetch({ context: this.collection }).done(function() {
                $(self.el).html(self.template({ 
                    building: self.model,
                    apartments: this.toJSON()[0].apartments,
                    userApt: window.App.user.get('apartment').unit
                }));
                self.enhance();
            });
            return this;
        }

    });
    return NotifyView;
});