var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    port = 3004;

//Server start
server.listen(port, () => console.log('on port' + port))

//user server
app.use(express.static(__dirname + '/public'));

io.on('connection', onConnection);

var connectedSocket = null;
function onConnection(socket){
    connectedSocket = socket;
}


const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline');
//const ports = new SerialPort({ path: '/dev/ROBOT', baudRate: 9600 })
const ports = new SerialPort({ path: '/dev/cu.usbmodem18A01B362', baudRate: 9600 })
const parser = ports.pipe(new ReadlineParser({ delimiter: '\r\n' }))

//parser.on('data', console.log)

parser.on('data', function (data) {
    
    if(data.includes("gyrox:")){
        let gyroX = data.split("gyrox:");
        console.log("gyroX " + gyroX[1]);
        io.emit('serialdata', { gyroX: gyroX[1] });
    }
    if(data.includes("gyroy:")){
        let gyroY = data.split("gyroy:");
        console.log("gyroY " + gyroY[1]);
        io.emit('serialdata', { gyroY: gyroY[1] });
    }
    if(data.includes("gyroz:")){
        let gyroZ = data.split("gyroz:");
        console.log("gyroZ " + gyroZ[1]);
        io.emit('serialdata', { gyroZ: gyroZ[1] });
    }
    if(data.includes("temp:")){
        let temp = data.split("temp:");
        console.log("temp " + temp[1]);
        io.emit('serialdata', { temp: temp[1] });
    }
    if(data.includes("gas:")){
        let gas = data.split("gas:");
        console.log("gas " + gas[1]);
        io.emit('serialdata', { gas: gas[1] });
    }
    if(data.includes("rotation:")){
        let rotation = data.split("rotation:");
        console.log("rotation " + rotation[1]);
        io.emit('serialdata', { rotation: rotation[1] });
    }
    
    
});