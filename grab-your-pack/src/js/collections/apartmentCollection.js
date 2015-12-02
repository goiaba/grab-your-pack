define(function(require) {
    'use strict';
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        config = require('config'),
        Apartment = require('../models/apartment');

        var apartmentCollection = Backbone.Collection.extend({
            model: Apartment,
            url: function() {
                return config.api.url + '/buildings/' + this.buildingId + '/apartments';
            },
            initialize: function(models, options) {
                if (options.buildingId) {
                    this.buildingId = options.buildingId;
                } else {
                    throw new MissingBuildingIdException();
                }
            },
            MissingBuildingIdException: function() {
               this.name = 'MissingBuildingIdException';
               this.message = 'a building id must be provided in order to request Notifications from the server';
               this.toString = function() {
                  return this.value + this.message;
               };
            }
        });
        return apartmentCollection;
    }
)
