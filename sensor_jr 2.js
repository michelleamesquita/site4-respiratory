var pubnub = require('pubnub')({
    publish_key: 'pub-c-25aca95c-c423-422c-bceb-86662801ea3e',
    subscribe_key: 'sub-c-503200de-e79f-11e8-8495-720743810c32'
  });

var channel = 'sensor';
var piezo =0; 

function publish() {
    var data = { 
      'sensor': piezo,
    };
    pubnub.publish({
      channel: channel,
      message: data,
    });
  }


var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var sensor = new five.Sensor({
    pin: "A0",
    threshold: 1
  })
  var led = new five.Led(13);
  

  sensor.on("change", function() {

    for(var temp=0;temp<=60;temp++){
    //piezo = this.value;
    var threshold = 1;
    if(this.value>0){
      this.value=1;
    }else{
      this.value=0;
    }
    piezo=piezo+this.value;

    if (piezo >= threshold){
        led.on();
      
        console.log(piezo +'rpm');
    }
    else{
        led.off();
        console.log(piezo+'rpm');
    }
    }
  });

  sensor.on('data', function() {
    console.log(piezo + 'rpm');
  });
  setInterval(publish, 3000);
});

