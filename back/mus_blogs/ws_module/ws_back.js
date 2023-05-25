const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const app = require('http').createServer();
const io = require('socket.io')(app, { cors: { origin: '*' } });

const packageDefinition = protoLoader.loadSync('backend.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const service = {
    addPostEvent : function(call, callback) {
        const request = call.request
        const response = { msg : 'OK'}
        console.log('grpc requested')
        console.log(call.request)
        call.request.followers.users.map((item) => {
               io.sockets.in("u" + item).emit('addpost', call.request.post )
        })
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

io.on('connection', (socket) => {
    console.log('WebSocket connection established');
    
    socket.on('init', (user) => {
        console.log(user)
        socket.join("u" + user)
    })

    socket.on('setActivePage', (page) => {
        socket.leave("c" + page.old)
        socket.join("c" + page.new)
        socket.emit('OK')
    })

    socket.on('disconnect', () => {
        console.log('WebSocket connection closed');
    });
});



app.listen(8080, () => {
    console.log('WebSocket server started on port 8080');
});

const server = new grpc.Server();
server.addService(protoDescriptor.WsProto.service, service);
server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log('gRPC server running at 127.0.0.1:50051')
    server.start()
});