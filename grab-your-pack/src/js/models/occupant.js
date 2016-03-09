define(['backbone'], function(Backbone) {

	'use strict';
 
 	var Occupant = Backbone.Model.extend({
     	defaults: {
     		id: null,
        	personId: null,
    		apartmentId: null
    	}
	});
 
  return Occupant;
});