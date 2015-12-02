define(['backbone', 'config'], function(Backbone, config) {
    'use strict';
    var Person = Backbone.Model.extend({
        url: function() {
            return config.api.url + '/users/?email=' + this.get('email');
        },
        parse: function(response, options) {
            var building = false;
            var user = response.user;
            if (user) {
                if (user.apartments && user.apartments.length > 0) {
                    var apartment = user.apartments[0];
                    delete user.apartments;
                    user.apartment = apartment;
                }
                if (user.buildings && user.buildings.length > 0) {
                    building = user.buildings[0];
                    user.apartment.building = building;
                    delete user.buildings;
                    if (user.apartment)
                    delete user.apartment.building_id;
                }
            }
            return { 'user': user };
        }
    });
    return Person;
});