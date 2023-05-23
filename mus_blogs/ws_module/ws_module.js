const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const app = require('http').createServer();
const io = require('socket.io')(app);

const packageDefinition = protoLoader.loadSync('backend.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const service = {
addPostEvent : function(call, callback) {
const response = { msg : 'Hello world'}
console.log('grpc requested')
io.emit('addpost', "mess")
callback(null, response)
}
};

const server = new grpc.Server();
server.addService(protoDescriptor.WsProto.service, service);
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
console.log('gRPC server running at 127.0.0.1:50051')
server.start()
});

io.on('connection', (socket) => {
console.log('WebSocket connection established');
socket.emit('addpost', 'lol')
});

io.on('disconnect', (socket) => {
console.log('WebSocket connection closed');
});

app.listen(8080, () => {
console.log('WebSocket server started on port 8080');
});
