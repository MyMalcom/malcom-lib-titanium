malcom-lib-titanium
===================

Titanium Module for Malcom

Install
-------

* Copy com.mobivery.malcom-iphone-1.0.2.zip in /Library/Application Support/Titanium
* In your project, add this line in tiapp.xml:

        <module version="1.0.2">com.mobivery.malcom</module>
        
        
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