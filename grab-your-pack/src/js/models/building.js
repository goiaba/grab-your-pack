define(['backbone', 'config'], function(Backbone, config) {
    'use strict';
 
    var Building = Backbone.Model.extend({
        url: config.api.url + '/buildings',
        fetchByProperties: function() {
            var defaultUrl = this.url;
            var url = '/buildings/?address_1={#1}&address_2={#2}&city={#3}&state={#4}&country={#5}&zip_code={#6}';
            url = url.replace('{#1}', this.get('address_1'));
            url = url.replace('{#2}', this.get('address_2'));
            url = url.replace('{#3}', this.get('city'));
            url = url.replace('{#4}', this.get('state'));
            url = url.replace('{#5}', this.get('country'));
            url = url.replace('{#6}', this.get('zip_code'));
            this.fetch();
            this.set('url', defaultUrl);
        },
        defaults: {
            id: null,
            address_1: null,
            address_2: null,
            city: null,
            state: null,
            country: null,
            zip_code: null,
            apartments: []
        }
    });
    return Building;
});