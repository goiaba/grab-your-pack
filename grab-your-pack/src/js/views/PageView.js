'use strict';

define(['backbone', './AlertView', 'jquery', 'jquerymobile'], function(Backbone, AlertView) {

    var PageView = Backbone.View.extend({
        role: 'page',
        attributes: function() {
            return {
                'data-role' : this.role
            };
        },
        // `enhance` assumes that view has already been rendered. Most likely this
        // method is called from `render`
        enhance: function() {
            this.$el.page().enhanceWithin();
            return this;
        },
        showAlert: function(type, message, errors) {
            new AlertView({
                type: type || 'info',
                message: message || '',
                errors: errors || []
            }).render();
        },
        // Override to add logic to execute on 'pagecontainershow'
        show: function(event, ui) {}
    });

    return PageView;
});
