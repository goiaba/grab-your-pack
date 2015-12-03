define(['backbone', 'config'], function(Backbone, config) {

	'use strict';
 
 	var Notification = Backbone.Model.extend({
 		url: config.api.url + '/notifications',
     	defaults: {
     		id: null,
        	personNotifierId: null,
        	apartmentNotifiedId: null,
        	notificationType: 'PACKAGE'
    	}
	});
 
  return Notification;
});