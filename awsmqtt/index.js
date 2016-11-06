var five = require("johnny-five");
var Edison = require("edison-io");

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://ec2-35-161-110-220.us-west-2.compute.amazonaws.com')

var board = new five.Board({
    io: new Edison()
});
var button;


client.on('connect', function() {
    client.subscribe('/test');
    client.publish('/test', 'edison online');

});


    board.on("ready", function() {
        var led = new five.Led(9);
        
        board = new five.Board();
     /*  client.on('message', function(topic, message) {
            // message is Buffer 
            console.log(message.toString() );        
        });*/
         
          board.on("ready", function() {

          // Create a new `button` hardware instance.
          button = new five.Button(2);
          board.repl.inject({
            button: button
          });

          // Button Event API

          // "down" the button is pressed
          button.on("down", function() {
            console.log("down");
          });

          // "hold" the button is pressed for specified time.
          //        defaults to 500ms (1/2 second)
          //        set
          button.on("hold", function() {
            console.log("hold");
              led.on();
          });

          // "up" the button is released
          button.on("up", function() {
            console.log("up");
          });
        

    });

    // client.publish('presence', 'Hello mqtt');




