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
        notifyApartment: function(e) {
            e.preventDefault();
            var apartmentToBeNotifiedNumber = $(e.target).text();
            var confirmation = confirm('Send notification to apartment ' + apartmentToBeNotifiedNumber + '?');
            if (confirmation) {
                var self = this;
                var apartmentToBeNotifiedId = $(e.target).attr('data-apartmentId');
                var notification = new Notification({
                    person_id: window.App.user.id,
                    apartment_id: apartmentToBeNotifiedId,
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
            }
        },
        renderNotifications:function(e) {
            window.App.router.navigate('notification-page', { trigger: true });
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
                if (!this.collection) this.collection = new ApartmentCollection();
                this.collection.buildingId = this.model.id;
                console.log('rendering...');
                var deferredCollFetch = this.collection.fetch({ context: this.collection });
                deferredCollFetch.done(function() {
                    console.log('deferred done...');
                    $(self.el).html(self.template({ 
                        building: self.model,
                        apartments: this.toJSON()[0].apartments.sort(function(a,b) {
                            return (a.unit > b.unit) ? 1 
                                 : (a.unit < b.unit) ? -1 
                                 : 0;
                        }),
                        userApt: window.App.user.get('apartment').unit
                    }));
                    self.enhance();
                });
                deferredCollFetch.fail(function() {
                    console.log('deferred fail...');
                    $(self.el).html(self.template({
                        building: self.model,
                        apartments: [],
                        userApt: window.App.user.get('apartment').unit
                    }));
                    self.enhance(); 
                });
            } else {
                self.showAlert('error', 'A Building model must be provided to NotifyView.');
            }
            return this;
        }
    });
    return NotifyView;
});