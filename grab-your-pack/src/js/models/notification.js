define(['backbone'], function(Backbone) {

	'use strict';
 
 	var Notification = Backbone.Model.extend({
     	defaults: {
     		id: null,
        	personNotifierId: null,
        	notificationType: 'PACKAGE'
    	}
	});
 
  return Notification;
});