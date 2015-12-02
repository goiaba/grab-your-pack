define(['backbone', 'config'], function(Backbone, config) {
    'use strict';
 
    var Apartment = Backbone.Model.extend({
        url: config.api.url + '/apartments',
        fetchByProperties: function() {
            var defaultUrl = this.url;
            var url = '/apartments/?building_id={#1}&unit={#2}';
            url = url.replace('{#1}', this.get('building_id'));
            url = url.replace('{#2}', this.get('unit'));
            this.fetch();
            this.set('url', defaultUrl);
        },
        // defaults: {
        //     id: null,
        //     unit: null,
        //     building_id: null
        // }
    });
    return Apartment;
});