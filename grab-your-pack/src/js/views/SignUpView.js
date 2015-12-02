define(function(require) {
    'use strict';
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        Person = require('models/person'),
        PageView = require('views/PageView'),
        AlertView = require('views/AlertView'),
        signUpTemplate = require('text!../../templates/signup.html');

    var SignUpView = PageView.extend({
        id: 'signup-page',
        template:_.template(signUpTemplate),
        events: {
            'click #submit': 'processSignUp'
        },
        processSignUp:function (e) {
            e.preventDefault();
            var self = this;
            var deferredUserPersist = this.persistUser();
            if (deferredUserPersist) {
                deferredUserPersist.done(function(data) {
                    if (data.errors) {
                        self.showAlert('info', 'Please review the following information:', data.errors);
                    } else {
                        window.App.user = new Person(data.user);
                        window.router.building();
                    }
                }).fail(function(jqXHR) {
                    self.showAlert('info', 'Please review the following information:', jqXHR.responseJSON.errors);
                });
            }
        },
        persistUser: function() {
            var personModel = new Person({
                first_name: $('#first_name').val(),
                last_name: $('#last_name').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                password: $('#password').val()
            });

            personModel.on("invalid", function(model, error) {
                self.showAlert('info', 'Please review the following information:', [ error ]);
            });

            if (personModel.isValid()) {
                return personModel.save();
            }
            return false;            
        },
        render:function (eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        },
    });

    return SignUpView;

});