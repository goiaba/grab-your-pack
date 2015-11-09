define(['backbone'], function(Backbone) {

	'use strict';
 
 	var Person = Backbone.Model.extend({
     	defaults: {
     		id: null,
        	name: null,
        	lastName: null,
        	email: null,
        	cellPhone: null
    	}
	});
 
  return Person;
});