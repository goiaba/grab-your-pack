define(function(require) {
    'use strict';
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        config = require('config'),
        Notification = require('../models/notification');

        var notificationCollection = Backbone.Collection.extend({
            model: Notification,
            url: function() {
                return config.api.url + '/apartments/' + this.apartmentId + '/notifications';
            },
            initialize: function(models, options) {
                if (options && options.apartmentId) {
                    this.apartmentId = options.apartmentId;
                } else {
                    // throw new MissingApartmentIdException();
                    this.apartmentId = 0;
                }
            },
            MissingApartmentIdException: function() {
               this.name = 'MissingApartmentIdException';
               this.message = 'an apartment id must be provided in order to request its notifications from the server';
               this.toString = function() {
                  return this.value + this.message;
               };
            }
        });
        return notificationCollection;
    }
)
