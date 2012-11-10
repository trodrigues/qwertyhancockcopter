var http = require('http'),
    faye = require('faye');


var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.disableEmergency();

//client.takeoff();

var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

// Handle non-Bayeux requests
var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello, non-Bayeux request');
  response.end();
});

bayeux.attach(server);


var notes = {
  'C3': function() {
    client.front(0.6)
  },
  'D3': function() {
    client.back(0.6)
  },
  'E3': function() {
    client.up(0.5)
  },
  'F3': function() {
    client.down(0.5)
  },
  'G3': function() {
    client.clockwise(0.5);
  },
  'A3': function() {
    client.counterClockwise(0.5);
  },
  'B3': function() {
    client.animate('flipLeft', 15);
  },
  'C4': function() {
    client.animate('flipRight', 15);
  },
  'D4': function() {
    client.animate('flipAhead', 15);
  },
  'E4': function() {
    client.animate('flipBehind', 15);
  },
  'F4': function() {
  }
};

bayeux.getClient().subscribe('/fly', function(message) {
  console.log('message', message);
  if(message.takeoff){client.takeoff(); console.log('takeoff'); }
  if(message.land){client.land(); console.log('land'); }
  if(message.stop){client.stop() }

  if(typeof notes[message.note] == 'function'){
    notes[message.note]();
  }
});

server.listen(1338);