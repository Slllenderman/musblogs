import io from 'socket.io-client'

export function InitWS(store){
    const socket = io("http://127.0.0.1:8080", {
        transports : ['websocket']
    })
    
    socket.on('connect', (data) => {
        console.log('connected')
    })
    socket.on('addpost', (post) => {
        console.log("new post!")
        socket.disconnect()
    })
}

