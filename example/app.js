Titanium.UI.iPhone.appBadge=0;

// De esta forma cargamos la configuracion y se muestran los alerts, splash secundaria e intersitial
var malcommodule = require('com.mobivery.malcom');

var foo = malcommodule.createView({
  "width":320,
  "height":50, 
  "left":0,
  "top":0
});
 
var window = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
 
window.add(foo);

window.open();

// Nada mas arrancar la aplicacon hay que llamar a este metodo si queremos que se active el modulo de estadisticas y se empiece a mandar beacons
malcommodule.initAndStartBeacon(true, false);

//  Si queremos obtener un valor de la configuracion avanzada se hace de esta forma:

Ti.API.info(malcommodule.advanceConfigurationForKey("test"));
	
	Ti.Network.registerForPushNotifications({
    types: [
      Ti.Network.NOTIFICATION_TYPE_BADGE,
      Ti.Network.NOTIFICATION_TYPE_ALERT,
      Ti.Network.NOTIFICATION_TYPE_SOUND
    ],
    success:function(e) {
      var deviceToken = e.deviceToken;
      Ti.API.info('successfully registered for apple device token with '+e.deviceToken);
      //Se llama al metodo para registrar en Malcom. El primer parametro es el token, el segundo es un array de tags
      //(puede ser un array vacio si no queremos enviar ningun tag), y el tercero es si queremos estar en modo development (true)
      //o produccion (false)
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

    //  Metodos para enviar eventos

    malcommodule.startSubBeaconWithName("testTitanium");
    malcommodule.endSubBeaconWithName("testTitanium");
  
  //    Este metodo se llama al salir de la aplicacion para enviar los beacons recopilados
  malcommodule.endBeacon();