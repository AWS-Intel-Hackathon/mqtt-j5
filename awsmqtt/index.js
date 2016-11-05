var five = require("johnny-five");
var Edison = require("edison-io");

var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://ec2-35-161-110-220.us-west-2.compute.amazonaws.com')

var board = new five.Board({
    io: new Edison()
});


client.on('connect', function() {
    client.subscribe('/test');
    client.publish('/test', 'edison online');

});


    board.on("ready", function() {
        var led = new five.Led(9);

        client.on('message', function(topic, message) {
            // message is Buffer 
            console.log(message.toString() );
            if(message.toString() === "ledon"){
            	led.on();
            }else if(message.toString() === "ledoff"){
            	led.off();
            }else if(message.toString() === "ledfadein"){
            	led.fadeIn(500);
            }else if(message.toString() === "ledfadeout"){
            	led.fadeOut(500);
            }

        });

    });

    // client.publish('presence', 'Hello mqtt');




