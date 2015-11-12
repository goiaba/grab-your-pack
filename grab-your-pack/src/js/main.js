'use strict';

require.config({
    paths: {
        'jquery': '../../bower_components/jquery/jquery',
        'underscore': '../../bower_components/underscore/underscore',
        'backbone': '../../bower_components/backbone/backbone',
        'jquery-mobile': '../../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.2',
        'text': '../../bower_components/requirejs-text/text',
        'facebook': '../../bower_components/facebook/sdk' //'//connect.facebook.net/en_US/sdk'
    },
    shim: {

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        },

        facebook: {
            exports: 'FB'
        }
    }
});

// Require jqm-config before loading any JQM views (which router depends on).
// Trying to specify the dependency between jquery-mobile and jqm-config as a
// shim WON'T WORK. See https://github.com/jrburke/requirejs/issues/358 for
// more info.
require(['backbone', 'jquery', 'jqm-config', 'facebook', 'routers/router'], function(Backbone, $, config, FB, Router) {

    $(document).ready(function () {
        FB.init({
            appId: '542898935891721',
            cookie: true,
            xfbml: true,
            // nativeInterface: CDV.FB,
            // useCachedDialogs: false,
            version: 'v2.5'
        });
        FB.getLoginStatus(function(response) {
            console.log(response);
        });
        var router = new Router();
        Backbone.history.start();
    });
});
