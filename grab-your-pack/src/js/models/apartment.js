define(['backbone'], function(Backbone) {

	'use strict';
 
 	var Apartment = Backbone.Model.extend({
     	defaults: {
     		id: null,
        	buildingId: null,
    		number: null
    	}
	});
 
  return Apartment;
});