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
            // this.listenTo(self.collection, 'change', window.App.router.changePage(self));
            this.collection.fetch({ context: this.collection }).done(function() {
                console.dir(self.collection.toJSON()[0].apartments);
                window.App.router.changePage(self);
            });
        },
        renderNotifications:function(e) {
            window.App.router.notification();
        },
        logout:function(e) {
            e.preventDefault();
            facebookConnectPlugin.logout(function() {
                Backbone.history.navigate('choose-login-signup-page', { trigger: true, replace: true });
            });
        },
        render:function (eventName) {
            var self = this;
            $(this.el).html(this.template({ 
                building: this.model,
                apartments: this.collection.toJSON()[0].apartments,
                userApt: window.App.user.get('apartment').unit
            }));
            this.enhance();
            return this;
        }

    });
    return NotifyView;
});