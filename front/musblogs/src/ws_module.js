import io from 'socket.io-client'

export default new io("http://127.0.0.1:8080", {
    transports : ['websocket']
})
