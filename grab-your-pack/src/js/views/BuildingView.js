define(function(require) {
    'use strict';
    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        PageView = require('views/PageView'),
        buildingTemplate = require('text!../../templates/building.html'),
        Person = require('models/person'),
        Building = require('../models/building'),
        Apartment = require('../models/apartment'),
        AlertView = require('views/AlertView'),
        NotifyView = require('views/NotifyView');

    var BuildingView = PageView.extend({
        id: 'address-page',
        template:_.template(buildingTemplate),
        events: {
            'click #submit': 'processBuildingRegistration'
        },
        processBuildingRegistration: function (e) {
            e.preventDefault();
            var self = this;
            var user = window.App.user;

            var toNotifyView = function(building) {
                window.App.router.navigate('notify-page', { trigger: true });
            };
            var showAlert = function(errors) {
                new AlertView({
                    message: 'Please review the following information:',
                    errors: errors
                }).render();
            };
            var linkUserAndApartment = function(user, apartment, building, callback) {
                //FIX: After endpoint return is fixed, change this to simple add
                // the apartment to the user:
                // user.apartment = apartment
                //Do we need an endpoint to occupant????????
                delete apartment.building_id;
                apartment.building = building;
                window.App.user.apartment = apartment;
                callback();
                // var occupant = new Occupant({ person_id: user.id, apartment_id: apartment.id });
                // occupant.save().done(function(response) {
                //     window.App.user = new Person(response.user);
                //     window.App.user.apartment = apartment;
                //     callback();
                // }).fail(function(jqXHR) {
                //     showAlert(jqXHR.responseJSON.errors);
                // });
            };
            var persistApartmentAndLinkToUser = function(user, building) {
                var deferredApartmentPersist = self.persistApartment(building.id);
                if (deferredApartmentPersist) {
                    deferredApartmentPersist.done(function(dataApartment) {
                        if (dataApartment.errors) {
                            showAlert(dataApartment.errors);
                        } else {
                            var apartment = new Apartment(dataApartment.apartment);
                            linkUserAndApartment(user, apartment, building, function() {
                                toNotifyView(building);
                            });
                        }
                    }).fail(function(jqXHR) {
                        showAlert(jqXHR.responseJSON.errors);
                    });
                }
            };

            self.fetchBuildingIfExists().done(function(response) {
                var building = new Building(response.building);
                if (building.get('id')) { //if the building already exists
                    self.fetchApartmentIfExists(building).done(function(response) {
                        var apartment = new Apartment(response.apartment);
                        if (apartment.get('id')) { //if the apartment already exists
                            linkUserAndApartment(user, apartment, building, function() {
                                toNotifyView(building);
                            });
                        } else {
                            persistApartmentAndLinkToUser(user, building);
                        }
                    }).fail(function(jqXHR) {
                        showAlert(jqXHR.responseJSON.errors);
                    });
                } else { //Otherwise creates new building and apartment
                    var deferredBuildingPersist = self.persistBuilding();
                    if (deferredBuildingPersist) {
                        deferredBuildingPersist.done(function(dataBuilding) {
                            if (dataBuilding.errors) {
                                showAlert(dataBuilding.errors);
                            } else {
                                var building = new Building(dataBuilding.building);
                                window.App.building = building;
                                persistApartmentAndLinkToUser(user, building);
                            }
                        }).fail(function(jqXHR) {
                            showAlert(jqXHR.responseJSON.errors);
                        });
                    }
                }
            });
        },
        createBuildingModel: function() {
            return new Building({
                address_1: $('#address_1').val(),
                address_2: $('#address_2').val(),
                city: $('#city').val(),
                state: $('#state').val(),
                country: $('#country').val(),
                zip_code: $('#zip_code').val()
            });
        },
        createApartmentModel: function(buildingId) {
            return new Apartment({
                building_id: buildingId,
                unit: $('#apartment_number').val()
            });
        },
        fetchApartmentIfExists: function(building) {
            var apartmentModel = this.createApartmentModel(building.id);
            return apartmentModel.fetchByProperties();
        },
        fetchBuildingIfExists: function() {
            var buildingModel = this.createBuildingModel();
            return buildingModel.fetchByProperties();
        },
        persistBuilding: function() {
            var buildingModel = this.createBuildingModel();
            buildingModel.on("invalid", function(model, error) {
                new AlertView({
                    message: 'Please review the following information:',
                    errors: [ error ]
                }).render();
            });

            if (buildingModel.isValid()) {
                return buildingModel.save();
            }
            return false;
        },
        persistApartment: function(buildingId) {
            var apartmentModel = this.createApartmentModel();

            apartmentModel.on("invalid", function(model, error) {
                new AlertView({
                    message: 'Please review the following information:',
                    errors: [ error ]
                }).render();
            });

            if (apartmentModel.isValid()) {
                return apartmentModel.save();
            }
            return false;
        },
        render: function(eventName) {
            $(this.el).html(this.template());
            this.enhance();
            return this;
        }

    });

    return BuildingView;

});