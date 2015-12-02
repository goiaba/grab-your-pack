'use strict';

//TODO: Create a separate template/view for the panel
define(['backbone', 'underscore', 'jquery', 'views/PageView', '../collections/apartmentCollection', 'text!../../templates/notify.html'],
    function(Backbone, _, $, PageView, ApartmentCollection, notifyTemplate) {
    
    var NotifyView = PageView.extend({
        id: 'notify-page',
        template: _.template(notifyTemplate),
        events: {
            'swipeleft': 'renderNotifications',
            'click #logout': 'logout'
        },
        initialize: function() {
            var self = this;
            this.collection = new ApartmentCollection([], { buildingId: this.model.id });
        },
        renderNotifications:function(e) {
            window.App.router.notification();
        },
        logout:function(e) {
            e.preventDefault();
            facebookConnectPlugin.logout(function() {
                console.log('logged out');
                window.App.router.tutorial();
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