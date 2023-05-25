import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Settings } from './components/Settings/Settings';
import { NewPost } from './components/NewPost/NewPost';
import { Subscribers } from './components/Subscribers/Subscribers';
import { Subscriptions } from './components/Subscriptions/Subscriptions';
import { MainPage } from './components/MainPage/MainPage';
import { PostPage } from './components/PostPage/PostPage';
import { UserPage } from './components/UserPage/UserPage';
import { OtherUser } from './components/OtherUser/OtherUser';
import { OtherSubscribers } from './components/OtherSubscribers/OtherSubscribers';
import { OtherSubscriptions } from './components/OtherSubscriptions/OtherSubscriptions';
import "./styles/base.scss";
import React, { useEffect } from 'react';
import { useAppDispatch } from './store';
import { getCookies } from './store/actions/getUserInfo';
import Cookies from 'universal-cookie';
import io from 'socket.io-client'
import { useAppSelector } from './store'
import { useState } from 'react';
import socket from './ws_module';
import { userInfoFetchingAddFeedPosts } from './store/reducers/userInfoSlice';
import { FullFollowerProps, FullPostProps, UserProps } from './Types/DataBase';

function App() {
	const dispatch = useAppDispatch()
	const cookies = new Cookies()
	const {user} = useAppSelector((state) => state.userInfoReducer)

	useEffect(() => {
		if (cookies.get('auth_token'))
		dispatch(getCookies({token: cookies.get('auth_token'), login: cookies.get('username')}))
	}, [])


	useEffect(() => {
		if(user.id != 0){
			socket.emit('init', user.id)
			socket.emit('setActivePage', 0)
		}

		socket.on('addpost', (post_ : any) => {
			console.log(post_)
			let user_ : UserProps = {
				id : user.id,
				first_name : user.first_name,
				last_name : user.last_name, 
				username : user.username,
				avatar : ""
			}
			let post : FullPostProps = {
				id : post_.id,
				user_id : user_,
				date : "2023-05-25",
				content : post_.content,
				likes_count : 0,
				repost_id : 0
			}
			dispatch(userInfoFetchingAddFeedPosts([post]))
		})
		
	}, [user])

	return (
		<div className="content_body">
		<BrowserRouter basename="/">
			<Header />
			<div className='dynamic_content'>
			<main>
				<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route path="/subscribers" element={<Subscribers />} />
				<Route path="/subscriptions" element={<Subscriptions />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/new_post" element={<NewPost />} />
				<Route path="/userpage" element={<UserPage />} />
				<Route path="/post/:id" element={<PostPage />} />
				<Route path="/user/:id" element={<OtherUser />} />
				<Route path="/subscribers/:id" element={<OtherSubscribers />} />
				<Route path="/subscriptions/:id" element={<OtherSubscriptions />} />
				</Routes>    
			</main>
			</div>
		</BrowserRouter>
		</div>
  );
}

export default App;
