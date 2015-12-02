'use strict';

require.config({
    paths: {
        'jquery': '../../bower_components/jquery/jquery',
        'underscore': '../../bower_components/underscore/underscore',
        'backbone': '../../bower_components/backbone/backbone',
        'jquerymobile': '../../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.2',
        'text': '../../bower_components/requirejs-text/text',
        'facebook': '../../bower_components/facebookConnectPlugin/index'
    },

    shim: {

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        }
    }
});

require(['backbone', 'jquery', 'jqm-config', 'config', 'routers/router'], function(Backbone, $, jqmConfig, config, Router) {

    Backbone.$.ajaxSetup({
        headers: {
            'Authorization': config.api.Authorization,
            'Accept': config.api.Accept,
            'Content-Type': config.api.ContentType
        }
    });

    $(document).ready(function () {
        window.App = {};
        window.App.router = new Router();
        Backbone.history.start();
    });

    $(document).on('deviceready', function() {
        //Try to navigate to notify-page.
        window.App.router.notify();
    });
});
