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
  var count =0;
  var count2=0;

  sensor.on("change", function() {

    for(var temp=0;temp<=60;temp++){
    //piezo = this.value;
    var threshold = 1;

    count++;
    piezo=piezo+this.value;

    if (piezo >= threshold){
        led.blink();
        if(count<10){count=Math.round(count/1);}
        else if(count<100){count=Math.round(count/10);}
        else if(count>100){
        count=Math.round(count/100);}

        console.log(count +'rpm');
        led.off();
    }
    else{
        led.off();
        if(count<10){count=Math.round(count/1);}
        else if(count<100){count=Math.round(count/10);}
        else if(count>100){
        count=Math.round(count/100);}
        console.log(count+'rpm');
    }
    piezo--;
      if(piezo==0){

        cont2++;
        if(cont2>10){
           alert("Respiração Ruim!");
        }
      }


    }
  });

  sensor.on('data', function() {
    count=Math.round(count/100);
    console.log(count + 'rpm');
  });
  setInterval(publish, 1000);
});
