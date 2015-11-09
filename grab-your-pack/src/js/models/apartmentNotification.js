define(['backbone'], function() {

	'use strict';
 
 	var ApartmentNotification = Notification.extend({
     	defaults: {
    		apartmentNotifiedId: null,
    		discriminator: 'A'
    	}
	});
 
  return ApartmentNotification;
});