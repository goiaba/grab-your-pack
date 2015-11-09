'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/building.html'],
    function(Backbone, _, $, PageView, buildingTemplate) {
    
    var BuildingView = PageView.extend({

        id: 'address-page',

        template:_.template(buildingTemplate),

        events: {},

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return BuildingView;

});