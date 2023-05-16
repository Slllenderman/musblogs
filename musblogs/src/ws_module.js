import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export function ws_connect(store){
    const username = 'Alesha'
    const server = io('http://127.0.0.1:5000')

    if(username)
        server.emit("auth", { username : username })

    server.on('new_post', (post) => {
        console.log('new_post')
    })

    server.on('update_post', (post) => {
        console.log('update post')
    })

    server.on('post_update_likes', (post) => {
        console.log('post likes updated')
    })

    server.on('delete_post', (post_id) => {
        console.log('delete post')
    })

}

