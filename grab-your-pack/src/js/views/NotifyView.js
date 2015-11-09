'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/notify.html'],
    function(Backbone, _, $, PageView, notifyTemplate) {
    
    var NotifyView = PageView.extend({

        id: 'notify-page',

        template:_.template(notifyTemplate),

        events: {},

        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return NotifyView;

});