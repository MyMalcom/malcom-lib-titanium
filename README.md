malcom-lib-titanium
===================

Titanium Module for iOS

Install
-------

* Copy com.mobivery.malcom-iphone-1.0.3.zip in ~/Library/Application Support/Titanium
* In your project, add this line in tiapp.xml:

        <module platform="iphone" version="1.0.3">com.mobivery.malcom</module>
        
        
Use
---

First, you must add this line:

    var malcommodule = require('com.mobivery.malcom');
    
With this method is charged the configuration, alerts, interstitial and splash.

To access to advanced variables of configuration:

    malcommodule.advanceConfigurationForKey("test");
    
where "test" is key of variable.

Notifications:

Use this code:

      Ti.Network.registerForPushNotifications({
      types: [
        Ti.Network.NOTIFICATION_TYPE_BADGE,
        Ti.Network.NOTIFICATION_TYPE_ALERT,
        Ti.Network.NOTIFICATION_TYPE_SOUND
      ],
      success:function(e) {
        var deviceToken = e.deviceToken;
        Ti.API.info('successfully registered for apple device token with '+e.deviceToken);
        //Call method to register in Malcom. First param is token, second is a array of tags
        //(empty is wan't tags), and third if is sandbox (true) or production (false)
        malcommodule.registerForPushNotifications(e.deviceToken,['label 1', 'label 2', 'label 3'], "true");
  
        Ti.API.info('registered With Malcom');
      },
      error:function(e) {
        Ti.API.warn("ERROR: push notifications disabled: "+e.error);
        //malcommodule.didFailToRegisterForRemoteNotificationsWithError(e.error);
      },
      callback:function(e) {
      
          malcommodule.notifyPushNotificationReceived(e);
       
      }
    });


Stats:

There are four methods:

* malcommodule.initAndStartBeacon(true, true); <- Init stats module. First param is if send only with wifi, and second if you want send geolocation
* malcommodule.endBeacon(); <- Send stats to Malcom
* malcommodule.startSubBeaconWithName("name"); <- Init stats for a event
* malcommodule.endSubBeaconWithName("name"); <- End stats for a event
* malcommodule.addTag('Tag'); <- Add a tag
                          

Ads:

This is the way to add a ads to a view:

    var foo = malcommodule.createView({
      "width":320,
      "height":50, 
      "left":0,
      "top":0
    });
     
    window.add(foo);

In this moment only if support house ads, iAd and adMob.

Titanium Module for Android
--------------------------------------

Install:
--------

* First, copy android/dist/com.mobivery.malcom.android-android-1.0.0.zip and android/dist/net.iamyellow.gcmjs-android-0.2.zip to your module folder in your project.
* Copy all files of android/resources/ in "Resources" folder of your project.

Use:
------

* Init malcom:

	var malcomandroid = require('com.mobivery.malcom.android');
	malcomandroid.initMalcom(UUID, SECRET_KEY);
	
	
Stats:

There are five methods:

* malcomandroid.startBeacon(); <- Init stats module. First param is if send only with wifi, and second if you want send geolocation
* malcomandroid.endBeacon(); <- Send stats to Malcom
* malcomandroid.startBeaconWithName("name"); <- Init stats for a event
* malcomandroid.endBeaconWithName("name"); <- End stats for a event
* malcomandroid.addTag('Tag'); <- Add a tag

Notifications:

* All you have to do is copy this code after initializing Malcom:

	var gcm = require('net.iamyellow.gcmjs');

var pendingData = gcm.data;
if (pendingData && pendingData !== null) {
	
	Ti.API.info("notificationId: "+Ti.App.Properties.getString("msg.notificationId"));
	
	malcomandroid.notificationACK(Titanium.Platform.id, Ti.App.Properties.getString("msg.notificationId"), Ti.App.Properties.getString("msg.segmentId"));
	
}

gcm.registerForPushNotifications({
	success: function (ev) {
		// on successful registration
		malcomandroid.notificationRegister(ev.deviceToken, Titanium.Platform.id, 0);
	},
	error: function (ev) {
		// when an error occurs
		Ti.API.info('******* error, ' + ev.error);
	},
	callback: function (data) {
		// when a gcm notification is received WHEN the app IS IN FOREGROUND
			alert(decodeURIComponent((data.msg+'').replace(/\+/g, '%20')));
	},
	unregister: function (ev) {
		// on unregister 
		Ti.API.info('******* unregister, ' + ev.deviceToken);
	},
	data: function (data) {
		
		Ti.API.info('******* data (resumed) ' + JSON.stringify(data));
	}
});



* If you want unregister device use this method:

	malcomandroid.notificationUnregister(Titanium.Platform.id);
