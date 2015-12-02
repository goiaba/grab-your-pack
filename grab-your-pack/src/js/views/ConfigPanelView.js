'use strict';

define(['backbone', 'underscore', 'jquery', 'views/PageView', 'text!../../templates/configPanel.html'],
    function(Backbone, _, $, PageView, configPanelTemplate) {
    
    var ConfigPanelView = PageView.extend({

        id: 'config-panel-page',

        template:_.template(configPanelTemplate),

        events: {
            'click #logout': 'logout'
        },

        logout:function(e) {
            e.preventDefault();
            facebookConnectPlugin.logout(function() {
                Backbone.history.navigate('choose-login-signup-page');
            });
        },

        render:function (eventName) {
            $(this.el).append(this.template());
            this.enhance();
            return this;
        }

    });

    return ConfigPanelView;

});