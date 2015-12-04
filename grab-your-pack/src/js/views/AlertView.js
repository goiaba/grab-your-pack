define(function(require) {
    'use strict';
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        alertTemplate = require('text!../../templates/alert.html');
 
    var View = Backbone.View.extend({
        'el': '#popupContainer',
        template: _.template(alertTemplate),
        translatedTypes:{
            'error': 'Error',
            'warning': 'Warning',
            'success': 'Success',
            'info': 'Information',
        },
        initialize: function(options) {
            this.options = options;
            if (this.options.errors) {
                this.formatErrors(this.options.errors);
            }
        },
        formatErrors: function(errors) {
            var errorList = [];
            for (var prop in errors) {
                if (errors.hasOwnProperty(prop)) {
                    errorList.push(prop + ': ' + errors[prop]);
                }
            }
            this.options.errors = errorList;
        },
        render:function() {
            if(!this.options.type) {
                this.options.type = 'info';
            }
            if(!this.options.message) {
                this.options.message = 'Information';
            }
            var data = {
                type: this.options.type,
                translatedType: this.translatedTypes[this.options.type],
                message: this.options.message,
                errors: this.options.errors
            };
            
            this.$el.html(this.template(data));
            

            $('#alertPopup').trigger('create');
            $('#alertPopup').popup({
                afterclose:function(event, ui) {
                    $(event.target).remove();
                }
            });
            $('#alertPopup').popup('open');
        }
    });

    return View;
});