const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const app = require('http').createServer();
const io = require('socket.io')(app, {
    serveClient : false,
    cookie : false,
    cors: {
      origin: '*'
    }
  });

const packageDefinition = protoLoader.loadSync('backend.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const service = {
addPostEvent : function(call, callback) {
const response = { msg : 'OK'}
console.log('grpc requested')
io.emit('addpost', "mess")
callback(null, response)
},
deletePostEvent : function(call, callback) {
    const response = { msg : 'OK'}
    console.log('grpc requested')
    io.emit('addpost', "mess")
    callback(null, response)
    },
    changePostEvent : function(call, callback) {
        const response = { msg : 'OK'}
        console.log('grpc requested')
        io.emit('addpost', "mess")
        callback(null, response)
        },
        changePostLikeEvent : function(call, callback) {
            const response = { msg : 'OK'}
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
    
    socket.emit('addpost', {'post' : 'post_info'})

    socket.on('setActivePage', () => {
        socket.emit('OK')
    })

    socket.on('disconnect', () => {
        console.log('WebSocket connection closed');
    });

    socket.on('mess', () => {
        console.log('assas')
    })
});

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

app.listen(8080, () => {
    console.log('WebSocket server started on port 8080');
});