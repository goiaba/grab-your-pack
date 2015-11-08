'use strict';

require.config({
    paths: {
        'jquery': '../../bower_components/jquery/jquery',
        'underscore': '../../bower_components/underscore/underscore',
        'backbone': '../../bower_components/backbone/backbone',
        'jquery-mobile': '../../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.2',
        'text': '../../bower_components/requirejs-text/text'
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

// Require jqm-config before loading any JQM views (which router depends on).
// Trying to specify the dependency between jquery-mobile and jqm-config as a
// shim WON'T WORK. See https://github.com/jrburke/requirejs/issues/358 for
// more info.
require(['backbone', 'jquery', 'jqm-config', 'routers/router'], function(Backbone, $, config, Router) {

    $(document).ready(function () {
        console.log('document ready');
        var router = new Router();
        Backbone.history.start();
    });
});
