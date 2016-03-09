define(['backbone', 'config'], function(Backbone, config) {

	'use strict';
 
 	var Notification = Backbone.Model.extend({
 		url: config.api.url + '/notifications',
     	defaults: {
     		id: null,
        	person_id: null,
        	apartment_id: null,
        	created_at: null,
        	notification_type: 'PACKAGE'
    	}
	});
 
  return Notification;
});