define(['backbone'], function() {

	'use strict';
 
 	var PersonalNotification = Notification.extend({
     	defaults: {
    		personNotifiedId: null,
    		discriminator: 'P'
    	}
	});
 
  return PersonalNotification;
});