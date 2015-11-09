define(['backbone'], function(Backbone) {

    'use strict';
 
    var Building = Backbone.Model.extend({
        defaults: {
            id: null,
            address1: null,
            address2: null,
            city: null,
            state: null,
            country: null,
            zipCode: null
        }
    });
 
    return Building;
});